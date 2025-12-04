import React, { useState } from "react";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await registerUser({ name, email, password });

      if (result.token) {
        setSuccess("Usuario registrado exitosamente. Redirigiendo...");
        
        // Esperar 1.5 segundos antes de ir al login
        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {
        setError(result.message || "Error al registrar.");
      }

    } catch (err) {
      setError("Error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registro</h2>

      {/* Mensaje de éxito */}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Mensaje de error */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="card p-4 mx-auto shadow"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico:
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Registro;
