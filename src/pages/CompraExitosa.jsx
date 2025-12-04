import React from "react";
import { Link } from "react-router-dom";

function CompraExitosa() {
  return (
    <div className="container text-center my-5">
      <h2 className="text-success mb-4">✅ ¡Compra realizada con éxito!</h2>
      <p>Gracias por tu compra. Pronto recibirás un correo con los detalles.</p>
      <Link to="/" className="btn btn-success mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}

export default CompraExitosa;
