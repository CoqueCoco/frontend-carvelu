import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { addPoints } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    metodoEntrega: "retiro",
    metodoPago: "tarjeta",
  });

  // Cálculo de puntos (1% del total)
  const pointsToEarn = Math.floor(totalPrice * 0.01);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    addPoints(pointsToEarn);

    clearCart();

    navigate("/compra-exitosa", { state: { pointsEarned: pointsToEarn } });
  };

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

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center text-success mb-4">Finalizar Compra</h1>

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        <h4 className="mb-4">Datos de Envío</h4>
        
        <div className="mb-3">
          <label>Nombre Completo</label>
          <input 
            type="text" className="form-control" required 
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          />
        </div>
        
        <div className="mb-3">
            <label>Dirección</label>
            <input type="text" className="form-control" required />
        </div>

        <div className="mb-4 text-center p-3 bg-light rounded">
          <h5 className="text-success fw-bold">
            Total a pagar: ${totalPrice.toLocaleString('es-CL')}
          </h5>
          <p className="text-muted mb-0">
            ✨ Ganarás <strong>{pointsToEarn}</strong> puntos con esta compra
          </p>
        </div>

        <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
          CONFIRMAR PAGO
        </button>
      </form>
    </div>
  );
}

export default Checkout;