
const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(event) {
    const usuario = document.getElementById("username").value.trim();
    const contraseña = document.getElementById("password").value;

    if (usuario === "" || contraseña === "") {
        event.preventDefault();
        alert("Completa todos los campos.");
    }
});
