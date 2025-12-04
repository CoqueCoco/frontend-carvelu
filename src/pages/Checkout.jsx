import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { user, addPoints } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    metodoEntrega: "retiro",
    metodoPago: "tarjeta",
  });

  // Estado para el interruptor de canje de puntos
  const [usarPuntos, setUsarPuntos] = useState(false);

  // === LÓGICA DE CÁLCULO ===
  const puntosDisponibles = user?.points || 0;
  
  // Regla: 1 punto = $1 peso de descuento.
  // El descuento no puede ser mayor al total de la compra ni a los puntos que tienes.
  const descuentoPorPuntos = usarPuntos ? Math.min(puntosDisponibles, totalPrice) : 0;
  
  const totalConDescuento = totalPrice - descuentoPorPuntos;

  // Puntos nuevos que ganará (calculado sobre lo que realmente paga en dinero: 1%)
  const pointsToEarn = Math.floor(totalConDescuento * 0.01);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    //Si usó puntos, se los restamos (enviando valor negativo)
    if (usarPuntos && descuentoPorPuntos > 0) {
      addPoints(-descuentoPorPuntos);
    }

    //Sumamos los puntos nuevos ganados por esta compra
    addPoints(pointsToEarn);

    //Limpiar carrito y navegar a la pantalla de éxito
    clearCart();
    navigate("/compra-exitosa", { state: { pointsEarned: pointsToEarn } });
  };

  // Formateador de dinero (CLP)
  const formatoMoneda = (valor) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);

  // Validación de carrito vacío
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
        
        {/* === DATOS DEL CLIENTE === */}
        <h4 className="mb-4">Datos de Envío</h4>
        
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre Completo</label>
          <input 
            type="text" 
            className="form-control" 
            id="nombre" 
            name="nombre"
            required 
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Método de entrega</label>
          <select
            className="form-select"
            name="metodoEntrega"
            value={formData.metodoEntrega}
            onChange={handleChange}
          >
            <option value="retiro">Retiro en tienda (Gratis)</option>
            <option value="delivery">Delivery a domicilio</option>
          </select>
        </div>

        {formData.metodoEntrega === 'delivery' && (
            <div className="mb-3">
                <label className="form-label">Dirección de despacho</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="direccion"
                    required 
                    placeholder="Ej: Calle Los Pinos 123"
                    value={formData.direccion}
                    onChange={handleChange}
                />
            </div>
        )}

        <div className="mb-3">
          <label className="form-label">Método de pago</label>
          <select
            className="form-select"
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
          >
            <option value="tarjeta">Tarjeta de Crédito / Débito</option>
            <option value="efectivo">Efectivo (Contra entrega)</option>
          </select>
        </div>

        {/* === SECCIÓN DE CANJE DE PUNTOS === */}
        {puntosDisponibles > 0 && (
          <div className="alert alert-warning d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong>¡Tienes {puntosDisponibles} puntos!</strong>
              <div className="small text-muted">Úsalos para obtener descuento.</div>
            </div>
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="canjearPuntos"
                checked={usarPuntos}
                onChange={(e) => setUsarPuntos(e.target.checked)}
              />
              <label className="form-check-label fw-bold" htmlFor="canjearPuntos">
                Canjear
              </label>
            </div>
          </div>
        )}

        {/* === RESUMEN DE COSTOS === */}
        <div className="mb-4 p-3 bg-light rounded border">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>{formatoMoneda(totalPrice)}</span>
          </div>
          
          {usarPuntos && descuentoPorPuntos > 0 && (
             <div className="d-flex justify-content-between mb-2 text-success">
               <span>Descuento por puntos:</span>
               <span>- {formatoMoneda(descuentoPorPuntos)}</span>
             </div>
          )}

          <hr />
          
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-success fw-bold mb-0">Total a Pagar:</h4>
            <h4 className="text-success fw-bold mb-0">{formatoMoneda(totalConDescuento)}</h4>
          </div>
          
          <p className="text-muted text-end mt-2 mb-0 small">
            ✨ Ganarás <strong>{pointsToEarn}</strong> puntos nuevos con esta compra
          </p>
        </div>

        <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
          CONFIRMAR Y PAGAR
        </button>
      </form>
    </div>
  );
}

export default Checkout;