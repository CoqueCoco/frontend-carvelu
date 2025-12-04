// src/components/CardProducto.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CardProducto({ product }) {
  const { addToCart } = useContext(CartContext);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);

  const getImageUrl = (imgName) => `/img/${imgName}`;
  const isSale = product.isSale;

  return (
    <div className="col mb-5">
      <div className="card h-100 shadow-sm border-0">
        
        {/* 🔥 Etiqueta visual mejorada de oferta */}
        {isSale && (
          <div
            className="badge bg-danger text-white position-absolute"
            style={{
              top: "0.5rem",
              right: "0.5rem",
              fontSize: "0.9rem",
              padding: "0.5em",
              borderRadius: "8px",
            }}
          >
            🔥 Oferta
          </div>
        )}

        <img
          className="card-img-top"
          src={getImageUrl(product.img)}
          alt={product.nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.nombre}</h5>
            {isSale ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="fw-bold text-danger">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="fw-semibold">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>

        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button
              className="btn btn-outline-success mt-auto"
              onClick={() => addToCart(product)}
            >
              Agregar al carrito 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
