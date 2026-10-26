
const formulario = document.getElementById("formEncuesta");
const lista = document.getElementById("listaEncuestas");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const datos = new FormData(formulario);

    fetch("encuesta.php", {
        method: "POST",
        body: datos
    })
    .then(respuesta => respuesta.json())
    .then(resultado => {
        alert(resultado.mensaje || "Encuesta enviada correctamente");
        formulario.reset();
        cargarEncuestas();
    })
    .catch(error => {
        console.error("Error al enviar la encuesta:", error);
        alert("No se pudo enviar la encuesta.");
    });
});

function cargarEncuestas() {
    if (!lista) return;

    fetch("encuesta.php")
        .then(respuesta => respuesta.json())
        .then(encuestas => {
            lista.innerHTML = "";

            encuestas.forEach(encuesta => {
                lista.innerHTML += `
                    <tr>
                        <td>${encuesta.id_encuesta}</td>
                        <td>${encuesta.id_traslado}</td>
                        <td>${encuesta.comentario || ""}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error al cargar encuestas:", error));
}

cargarEncuestas();
