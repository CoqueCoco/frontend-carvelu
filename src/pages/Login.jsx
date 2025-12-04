import React, { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importar el Contexto

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Estado para la notificación de éxito
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Obtener la función para guardar el usuario

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    try {
      // 1. Envío de credenciales como objeto (Corrección anterior)
      const credentials = { email, password };
      const result = await login(credentials);

      // 2. Verificación de éxito usando 'token'
      if (result.token) {
        // Guardar el usuario y mostrar la notificación
        loginUser({ name: result.name, email: email });
        setSuccess(`¡Sesión iniciada! Bienvenido, ${result.name}`); 

        // 3. Navegar a la página principal después de un tiempo
        setTimeout(() => {
          navigate("/"); 
        }, 1500); 

      } else {
        // Fallo lógico: usa el mensaje que viene del backend
        setError(result.message || "Credenciales inválidas.");
      }
    } catch (err) {
      // Captura el error HTTP lanzado por api.js (ej. 401 Unauthorized)
      const errorMessage = err.message.includes("401") 
        ? "Correo o contraseña incorrectos." // Mensaje amigable
        : "Error de conexión o servidor. Intenta de nuevo.";
        
      setError(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

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
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;