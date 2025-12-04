// src/pages/Categorias.jsx
import React, { useEffect, useState } from "react";
import { products as initialProducts } from "../data/productData";
import CardProducto from "../components/CardProducto";

function Categorias() {
  const [productos, setProductos] = useState([]);

  // Cargar desde localStorage si existe, si no desde el archivo productData
  useEffect(() => {
    const saved = localStorage.getItem("productos");
    if (saved) {
      setProductos(JSON.parse(saved));
    } else {
      setProductos(initialProducts);
    }
  }, []);

  // Agrupar productos por categoría
  const categorias = [...new Set(productos.map((p) => p.categoria))];

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 text-success">
        🥦 Categorías de Productos
      </h1>

      {categorias.length === 0 ? (
        <p className="text-center text-muted">
          No hay productos disponibles para mostrar.
        </p>
      ) : (
        categorias.map((categoria) => (
          <section key={categoria} className="mb-5">
            <h2 className="mb-4 text-capitalize text-center text-success border-bottom pb-2">
              {categoria}
            </h2>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {productos
                .filter((p) => p.categoria === categoria)
                .map((product) => (
                  <CardProducto key={product.id} product={product} />
                ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default Categorias;
