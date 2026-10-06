const mappa = L.map('mapa').setView([-32.3171, -58.08072], 17);
const INGRESO = document.getElementById('ingreso');
const UBICACION = document.getElementById('ubicacion');
const DEPARTAMENTO = document.getElementById('departamento');
const DIRECCION = document.getElementById('direccion');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mappa);

const marcador = L.marker([-32.3171, -58.08072], {draggeable: true}).addTo(mappa);