import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    metodoEntrega: "retiro",
    metodoPago: "tarjeta",
  });

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-success mb-4">Tu carrito está vacío 🛒</h2>
        <button className="btn btn-success" onClick={() => navigate("/explorar")}>
          Volver a productos
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de pago exitoso o fallido (aleatorio)
    const pagoExitoso = Math.random() > 0.3; // 70% éxito
    clearCart();

    if (pagoExitoso) {
      navigate("/compra-exitosa");
    } else {
      navigate("/compra-fallida");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4 text-success">🧾 Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección de entrega</label>
          <input
            type="text"
            className="form-control"
            value={formData.direccion}
            onChange={(e) =>
              setFormData({ ...formData, direccion: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de entrega</label>
          <select
            className="form-select"
            value={formData.metodoEntrega}
            onChange={(e) =>
              setFormData({ ...formData, metodoEntrega: e.target.value })
            }
          >
            <option value="retiro">Retiro en tienda</option>
            <option value="delivery">Delivery a domicilio</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Método de pago</label>
          <select
            className="form-select"
            value={formData.metodoPago}
            onChange={(e) =>
              setFormData({ ...formData, metodoPago: e.target.value })
            }
          >
            <option value="tarjeta">Tarjeta de crédito / débito</option>
            <option value="efectivo">Efectivo al recibir</option>
          </select>
        </div>

        <div className="mb-4">
          <h5 className="text-success">
            Total a pagar:{" "}
            {new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
            }).format(totalPrice)}
          </h5>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Confirmar compra 💳
        </button>
      </form>
    </div>
  );
}

export default Checkout;
