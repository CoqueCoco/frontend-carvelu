import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { CartContext } from '../context/CartContext'; 

function Nav() {
  const { user, logout } = useAuth(); 
  const { totalItems } = useContext(CartContext); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand fw-bold" to="/">Carvelu</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* ✅ MENÚ PRINCIPAL (IZQUIERDA) */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/explorar">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
            {/* 🔹 Botones Restaurados */}
            <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ubicacion">Ubicación</Link></li>
          </ul>

          {/* ✅ MENÚ DE USUARIO Y CARRITO (DERECHA) */}
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* SIEMPRE MOSTRAR CARRITO */}
            <li className="nav-item me-3">
                <Link className="nav-link position-relative" to="/carrito">
                    🛒 Carrito 
                    {totalItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </li>

            {user ? (
              <>
                {/* PUNTOS VISIBLES */}
                <li className="nav-item me-3">
                  <span className="badge bg-warning text-dark fs-6">
                    ⭐ {user.points} pts
                  </span>
                </li>
                
                <li className="nav-item dropdown">
                   <span className="nav-link text-white fw-bold">
                     Hola, {user.name}
                   </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light ms-2" onClick={logout}>
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Ingresar</Link></li>
                <li className="nav-item"><Link className="btn btn-outline-light ms-2" to="/registro">Registrarse</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;