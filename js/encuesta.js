const formulario = document.getElementById("formEncuesta");
const atencion = document.getElementById("atencion");
const espera = document.getElementById("espera");
const trato = document.getElementById("trato");
const comentario = document.getElementById("comentario");

formulario.addEventListener("submit", async function(e) {
    e.preventDefault();

    const datos = new FormData();
    datos.append("atencion", atencion.value);
    datos.append("espera", espera.value);
    datos.append("trato", trato.value);
    datos.append("comentario", comentario.value);

    try {
        const respuesta = await fetch('../php/encuesta.php', {
            method: 'POST',
            body: datos
        });

        // Verificamos si la respuesta del servidor es correcta
        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const resultado = await respuesta.json();

        if (resultado.error) {
            alert(resultado.error);
            return;
        }

        alert(resultado.mensaje || "¡Gracias por responder la encuesta!");
        formulario.reset();

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo enviar la encuesta. Verificá la conexión." + error);
    }
});
