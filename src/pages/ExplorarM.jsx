import React, { useState, useEffect } from 'react';
import CardProducto from '../components/CardProducto';
import { products } from '../data/productData';

function ExplorarM() {
  // Cargar carrito desde localStorage al iniciar
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [productos, setProductos] = useState([]);

  // Cargar productos al montar
  useEffect(() => {
    setProductos(products);
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar al carrito
  const handleAddToCart = (productToAdd) => {
    setCarrito((prevCart) => {
      const existing = prevCart.find((item) => item.id === productToAdd.id);

      if (existing) {
        // Si el producto ya está, aumentamos la cantidad
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });

    // ⚡️ Mensaje de confirmación rápido (opcional)
    alert(`${productToAdd.nombre} agregado al carrito 🛒`);
  };

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <h1 className="text-center mt-3 mb-5">Explorar Productos</h1>

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {productos.map((product) => (
              <CardProducto
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExplorarM;
