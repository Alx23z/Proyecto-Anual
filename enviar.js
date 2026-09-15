document.getElementById("encuesta").addEventListener("submit", function(event) {
    event.preventDefault();
    var nombre = document.getElementById("Nombre").value;
    var apellido = document.getElementById("Apellido").value;
    var edad = document.getElementById("Edad").value;
    var direccion = document.getElementById("Direccion").value;
    var email = document.getElementById("Gmail").value;
    var messageElement = document.getElementById("mensaje");
    if (nombre && apellido && edad && direccion && email) {
        messageElement.textContent = `Gracias por completar la encuesta, ${nombre} ${apellido}! Tus datos han sido registrados.`;
        messageElement.style.color = "green";
    } else {
        messageElement.textContent = "Por favor, completa todos los campos.";
        messageElement.style.color = "red";
    }
});