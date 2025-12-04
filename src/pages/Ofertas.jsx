import React, { useEffect, useState } from "react";
import { products as initialProducts } from "../data/productData";
import CardProducto from "../components/CardProducto";

function Ofertas() {
  const [productos, setProductos] = useState([]);

  // Carga desde localStorage si existen productos personalizados (desde AdminPanel)
  useEffect(() => {
    const saved = localStorage.getItem("productos");
    if (saved) {
      setProductos(JSON.parse(saved));
    } else {
      setProductos(initialProducts);
    }
  }, []);

  // Filtramos solo los productos con descuento
  const ofertas = productos.filter((p) => p.isSale);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-danger">🔥 Ofertas Especiales</h1>
      <p className="text-center text-muted mb-5">
        Aprovecha los mejores descuentos de la semana.
      </p>

      {/* Grilla de productos */}
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {ofertas.length > 0 ? (
          ofertas.map((product) => (
            <CardProducto key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-muted">
            No hay productos en oferta actualmente.
          </p>
        )}
      </div>
    </div>
  );
}

export default Ofertas;
