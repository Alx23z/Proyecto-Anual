const form = document.getElementById("formPaciente");
const lista = document.getElementById("lista");

function cargarPacientes() {

    fetch("pacientes.php")
    .then(res => res.json())
    .then(pacientes => {

        lista.innerHTML = "";

        pacientes.forEach(p => {

            lista.innerHTML += `
                <tr>
                    <td>${p.id_paciente}</td>
                    <td>${p.nombre}</td>
                    <td>${p.apellido}</td>
                    <td>${p.dni}</td>
                    <td>${p.fecha_nacimiento}</td>
                    <td>${p.telefono}</td>

                    <td>
                        <button onclick='editar(${JSON.stringify(p)})'>
                            Modificar
                        </button>

                        <button onclick='eliminar(${p.id_paciente})'>
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    });
}


form.addEventListener("submit", function(e) {

    e.preventDefault();

    let datos = new FormData();

    datos.append("id", document.getElementById("id").value);
    datos.append("nombre", document.getElementById("nombre").value);
    datos.append("apellido", document.getElementById("apellido").value);
    datos.append("dni", document.getElementById("dni").value);
    datos.append("fecha", document.getElementById("fecha").value);
    datos.append("telefono", document.getElementById("telefono").value);

    fetch("pacientes.php", {
        method: "POST",
        body: datos
    })
    .then(res => res.json())
    .then(data => {

        alert(data.mensaje);

        form.reset();
        document.getElementById("id").value = "";

        cargarPacientes();
    });
});


function editar(p) {

    document.getElementById("id").value = p.id_paciente;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("apellido").value = p.apellido;
    document.getElementById("dni").value = p.dni;
    document.getElementById("fecha").value = p.fecha_nacimiento;
    document.getElementById("telefono").value = p.telefono;
}


function eliminar(id) {

    if (!confirm("¿Eliminar paciente?")) return;

    let datos = new FormData();
    datos.append("eliminar", id);

    fetch("pacientes.php", {
        method: "POST",
        body: datos
    })
    .then(() => cargarPacientes());
}


cargarPacientes();