import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Carrito() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-success mb-4">🛒 Mi Carrito (0 productos)</h2>
        <p className="text-muted">Tu carrito está vacío.</p>
        <Link to="/explorar" className="btn btn-success">
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4">
        🛒 Mi Carrito ({totalItems} productos)
      </h2>

      <div className="row">
        <div className="col-md-8">
          <ul className="list-group mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`/img/${item.img}`}
                    alt={item.nombre}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                    <small className="text-muted">
                      {item.quantity} x{" "}
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      }).format(item.price)}
                    </small>
                  </div>
                </div>

                <div className="text-end">
                  <strong>
                    {new Intl.NumberFormat("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    }).format(item.price * item.quantity)}
                  </strong>
                  <button
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button className="btn btn-outline-danger" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold text-success">Resumen de compra</h5>
            <hr />
            <p>
              <strong>Total:</strong>{" "}
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(totalPrice)}
            </p>
            <Link to="/checkout" className="btn btn-success w-100 mt-3">
              Ir al pago 💳
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
