import React from 'react';
import Nav from '../components/Nav';

function Home() {
  return (
    <>
      {/* 🔹 Hero principal */}
      <header className="bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Verdulería Digital</h1>
          <p className="lead">Productos frescos del campo directo a tu mesa 🍎🥦</p>
        </div>
      </header>

      {/* 🔹 Sección de bienvenida */}
      <main className="container my-5">
        <section className="bg-light p-5 rounded shadow-sm">
          <h2 className="mb-4 text-success">Bienvenido a Carvelu</h2>
          <p className="fs-5">
            Carvelu nació en 2010, en el corazón de Los Pinos, Quilpué, Chile, como un pequeño emprendimiento familiar con un solo objetivo:
            <strong> llevar lo mejor del campo directamente a la mesa de nuestros vecinos.</strong>
          </p>
          <p className="fs-5">
            Comenzamos con un pequeño local de barrio, ofreciendo frutas y verduras frescas cosechadas por agricultores locales. 
            Con el tiempo, fuimos creciendo gracias a la confianza de nuestros clientes y sumamos un área de carnicería, 
            siempre manteniendo nuestro compromiso con la calidad y la frescura.
          </p>
          <p className="fs-5">
            Hoy, Carvelu es más que una tienda: somos un puente entre el trabajo de los agricultores y ganaderos de la zona 
            y las familias que buscan alimentos frescos, sabrosos y a un precio justo.
          </p>
        </section>
      </main>

      {/* 🔹 Sección de productos destacados */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4 text-success">Nuestros productos destacados 🥕</h2>
          <div className="row g-4">

            {/* 1️⃣ Verduras */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src="/img/lechuga.jpg" 
                  className="card-img-top p-3" 
                  alt="Verduras Frescas" 
                />
                <div className="card-body">
                  <h5 className="card-title">Verduras Frescas</h5>
                  <p className="card-text">
                    Directas de huertos locales, llenas de color, sabor y nutrientes.
                  </p>
                </div>
              </div>
            </div>

            {/* 2️⃣ Frutas */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src="/img/tomate.jpg" 
                  className="card-img-top p-3" 
                  alt="Frutas Naturales" 
                />
                <div className="card-body">
                  <h5 className="card-title">Frutas Naturales</h5>
                  <p className="card-text">
                    Recién cosechadas y seleccionadas con cuidado para ti.
                  </p>
                </div>
              </div>
            </div>

            {/* 3️⃣ Carnes */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src="/img/Lomo_Vetado.webp" 
                  className="card-img-top p-3" 
                  alt="Carnes Locales" 
                />
                <div className="card-body">
                  <h5 className="card-title">Carnes Locales</h5>
                  <p className="card-text">
                    Provenientes de productores de confianza, siempre frescas y sabrosas.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-success text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; {new Date().getFullYear()} Carvelu — Verdulería Digital 🍇</p>
      </footer>
    </>
  );
}

export default Home;
