import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    id: "",
    nombre: "",
    categoria: "",
    price: "",
    img: "",
    isSale: false,
  });

  // Cargar productos desde localStorage o iniciar vacío
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(guardados);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nuevoProducto.nombre || !nuevoProducto.price) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (modoEdicion) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === productoEditado.id ? { ...nuevoProducto, id: p.id } : p
        )
      );
      setModoEdicion(false);
      setProductoEditado(null);
    } else {
      const nuevo = {
        ...nuevoProducto,
        id: Date.now(),
        price: parseInt(nuevoProducto.price),
      };
      setProductos([...productos, nuevo]);
    }

    setNuevoProducto({
      id: "",
      nombre: "",
      categoria: "",
      price: "",
      img: "",
      isSale: false,
    });
  };

  const handleEdit = (producto) => {
    setModoEdicion(true);
    setProductoEditado(producto);
    setNuevoProducto(producto);
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-success mb-4">🧑‍💻 Panel Administrativo</h1>

      {/* Formulario */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="card-title">
            {modoEdicion ? "✏️ Editar Producto" : "➕ Agregar Producto"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nuevoProducto.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  value={nuevoProducto.categoria}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={nuevoProducto.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Imagen (nombre archivo)</label>
                <input
                  type="text"
                  className="form-control"
                  name="img"
                  value={nuevoProducto.img}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isSale"
                    checked={nuevoProducto.isSale}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">¿Está en oferta?</label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-4 w-100">
              {modoEdicion ? "Guardar Cambios" : "Agregar Producto"}
            </button>
          </form>
        </div>
      </div>

      {/* Tabla de productos */}
      <h3 className="mb-3">📦 Lista de productos</h3>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Oferta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${p.price}</td>
                  <td>{p.isSale ? "Sí" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(p)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;