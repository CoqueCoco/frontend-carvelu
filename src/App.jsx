import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";

// Páginas
import Home from "./pages/Home.jsx";
import ExplorarM from "./pages/ExplorarM.jsx";
import Carrito from "./pages/Carrito.jsx";
import Registro from "./pages/Registro.jsx";
import Login from "./pages/Login.jsx";
import Ubicacion from "./pages/Ubicacion.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Checkout from "./pages/Checkout.jsx";
import CompraExitosa from "./pages/CompraExitosa.jsx";
import CompraFallida from "./pages/CompraFallida.jsx";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<ExplorarM />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
      </Routes>
    </Router>
  );
}

export default App;
