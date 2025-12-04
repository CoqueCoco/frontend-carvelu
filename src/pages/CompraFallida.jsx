import React from "react";
import { Link } from "react-router-dom";

function CompraFallida() {
  return (
    <div className="container text-center my-5">
      <h2 className="text-danger mb-4">❌ Error en la compra</h2>
      <p>Hubo un problema al procesar tu pago. Intenta nuevamente.</p>
      <Link to="/checkout" className="btn btn-outline-danger mt-3">
        Volver al Checkout
      </Link>
    </div>
  );
}

export default CompraFallida;
