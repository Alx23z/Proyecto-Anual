const form = document.getElementById("formPaciente");
const lista = document.getElementById("lista");


// MOSTRAR PACIENTES
function cargarPacientes() {

    fetch("../php/paciente.php")
        .then(respuesta => respuesta.json())
        .then(datos => {

            lista.innerHTML = "";

            datos.forEach(paciente => {

                lista.innerHTML += `
                    <tr>
                        <td>${paciente.id_paciente}</td>
                        <td>${paciente.nombre}</td>
                        <td>${paciente.apellido}</td>
                        <td>${paciente.dni}</td>
                        <td>${paciente.fecha_nacimiento}</td>
                        <td>${paciente.telefono}</td>

                        <td>
                            <button onclick="editar(
                                '${paciente.id_paciente}',
                                '${paciente.nombre}',
                                '${paciente.apellido}',
                                '${paciente.dni}',
                                '${paciente.fecha_nacimiento}',
                                '${paciente.telefono}'
                            )">
                                Modificar
                            </button>

                            <button onclick="eliminar(${paciente.id_paciente})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;

            });

        });

}


// GUARDAR
form.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const datos = new FormData(form);

    fetch("../php/paciente.php", {
        method: "POST",
        body: datos
    })

    .then(respuesta => respuesta.json())

    .then(data => {

        alert(data.mensaje);

        form.reset();

        document.getElementById("id").value = "";

        cargarPacientes();

    });

});


// MODIFICAR
function editar(id, nombre, apellido, dni, fecha, telefono) {

    document.getElementById("id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("dni").value = dni;
    document.getElementById("fecha").value = fecha;
    document.getElementById("telefono").value = telefono;

}


// ELIMINAR
function eliminar(id) {

    if (confirm("¿Querés eliminar este paciente?")) {

        const datos = new FormData();

        datos.append("eliminar", id);

        fetch("../php/paciente.php", {
            method: "POST",
            body: datos
        })

        .then(respuesta => respuesta.json())

        .then(data => {

            alert(data.mensaje);

            cargarPacientes();

        });

    }

}


// CARGAR AL ABRIR LA PÁGINA
cargarPacientes();