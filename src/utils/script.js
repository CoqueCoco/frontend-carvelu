// Validación del formulario de registro
document.addEventListener("DOMContentLoaded", function() {
    const registroForm = document.getElementById("registroForm");
    
    if (registroForm) {
        registroForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById("nombreCompleto").value.trim();
            const correo = document.getElementById("correoElectronico").value.trim();
            const password1 = document.getElementById("password1").value;
            const password2 = document.getElementById("password2").value;
            
            if (nombre === "" || correo === "" || password1 === "" || password2 === "") {
                alert("Por favor, completa todos los campos.");
                return;
            }
            
            if (password1 !== password2) {
                alert("Las contraseñas no coinciden.");
                return;
            }
            
            if (!validarEmail(correo)) {
                alert("Por favor, ingresa un correo electrónico válido.");
                return;
            }
            
            alert("Registro exitoso. ¡Bienvenido a Verdulería Digital!");
            registroForm.reset();
        });
    }
    
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
