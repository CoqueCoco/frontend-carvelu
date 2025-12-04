// Manejo de comentarios
document.addEventListener("DOMContentLoaded", function() {
    const formComentario = document.getElementById("comentarioForm");
    const listaComentarios = document.getElementById("listaComentarios");

    if (formComentario) {
        formComentario.addEventListener("submit", function(e) {
            e.preventDefault();

            const nombre = document.getElementById("nombreCliente").value.trim();
            const comentario = document.getElementById("comentarioTexto").value.trim();

            if (nombre === "" || comentario === "") {
                alert("Por favor, completa todos los campos.");
                return;
            }

            const nuevoComentario = document.createElement("div");
            nuevoComentario.classList.add("comentario");
            nuevoComentario.innerHTML = `<strong>${nombre}</strong><p>${comentario}</p>`;
            listaComentarios.appendChild(nuevoComentario);

            formComentario.reset();
        });
    }
});

