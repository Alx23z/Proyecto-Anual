function mostrarMensaje() {

    alert("Bienvenido al Sistema Informático de Gestión de Servicios Médicos.");
}


function nuevoPaciente() {

    alert("Aquí se abrirá el formulario para registrar un nuevo paciente.");
}


function nuevaConsulta() {

    alert("Aquí se podrá registrar una nueva consulta médica.");
}


function verServicios() {

    alert("Aquí se mostrarán los servicios médicos disponibles.");
}


function buscarPaciente() {

    var nombre = prompt("Ingrese el nombre del paciente:");

    if (nombre) {

        alert("Buscando paciente: " + nombre);

    } else {

        alert("No ingresaste ningún nombre.");
    }
}