
const formulario = document.getElementById("formEncuesta");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const datos = new FormData(formulario);

    fetch("../encuesta.php", {
        method: "POST",
        body: datos
    })
    .then(respuesta => respuesta.json())
    .then(resultado => {
        if (resultado.error) {
            alert(resultado.error);
            return;
        }

        alert(resultado.mensaje || "¡Gracias por responder la encuesta!");
        formulario.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("No se pudo enviar la encuesta. Verificá la conexión.");
    });
});
