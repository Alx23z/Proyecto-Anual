const guardar = document.getElementById('btnGuardar');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const ci = document.getElementById('ci');
const fecha_nacimiento = document.getElementById('fecha_nacimiento');
const telefono = document.getElementById('telefono');

guardar.addEventListener('click', async (e) => {
    e.preventDefault();

    const paciente = new FormData();
    paciente.append('nombre', nombre.value);
    paciente.append('apellido', apellido.value);
    paciente.append('ci', ci.value);
    paciente.append('fecha_nacimiento', fecha_nacimiento.value);
    paciente.append('telefono', telefono.value);

    const respuesta = await fetch('../php/guardar_paciente.php', {
        metho: 'POST',
        body: paciente
    })

    const resultado = await respuesta.text();

    if (resultado.trim() === 'ok') {
        alert('Paciente guardado correctamente');
    } else {
        alert('Error al guardar el paciente');
    }
});