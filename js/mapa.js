const mappa = L.map('mapa').setView([-32.3171, -58.08072], 17);
const INGRESOINICIO = document.getElementById('ingreso_inicio');
const UBICACIONINICIO = document.getElementById('ubicacion_inicio');
const DEPARTAMENTOINICIO = document.getElementById('departamento_inicio');
const DIRECCIONINICIO = document.getElementById('direccion_inicio');
const INGRESODESTINO = document.getElementById('ingreso_destino');
const UBICACIONDESTINO = document.getElementById('ubicacion_destino');
const DEPARTAMENTODESTINO = document.getElementById('departamento_destino');
const DIRECCIONDESTINO = document.getElementById('direccion_destino');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mappa);
let marcadorInicio = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let marcadorDestino = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let lineaRuta = null;
async function actualizarLinea() {
    const origen = [marcadorInicio.getLatLng().lat, marcadorInicio.getLatLng().lng];
    const destino = [marcadorDestino.getLatLng().lat, marcadorDestino.getLatLng().lng];
    const urlRuta = `https://api.geoapify.com/v1/routing?` +
                    `waypoints=${origen[0]},${origen[1]}|${destino[0]},${destino[1]}` +
                    `&mode=drive` +
                    `&units=metric` +
                    `&lang=es` +
                    `&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const resp = await fetch(urlRuta);
        const routeo = await resp.json();
        if (routeo.features && routeo.features.length > 0) {
            if (lineaRuta) {
                mappa.removeLayer(lineaRuta);
            }
            const dibujo = routeo.features[0].geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            lineaRuta = L.polyline(dibujo, { color: 'blue', weight: 5 }).addTo(mappa);
        }
    } catch (error) {
        console.error('Error al calcular la ruta:', error);
    }
}
marcadorInicio.on('dragend', actualizarLinea);
marcadorDestino.on('dragend', actualizarLinea);
UBICACIONINICIO.addEventListener('click', async () => {
    const texto = `${DIRECCIONINICIO.value}, ${DEPARTAMENTOINICIO.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?` +
                `text=${encodeURIComponent(texto)}` +
                `&filter=countrycode:uy` +
                `&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        const resultado = dato.results[0];
        if (resultado) {
            marcadorInicio.setLatLng([resultado.lat, resultado.lon]);
            mappa.setView([resultado.lat, resultado.lon], 16);
            await actualizarLinea(); 
            alert(`Ubicación de inicio encontrada: ${resultado.lat}, ${resultado.lon}`);
        } else {
            alert('No se pudo encontrar la ubicación de inicio ingresada.');
        }
    } catch (error) {
        alert('Ocurrió un error al consultar la dirección de inicio.');
    }
});
UBICACIONDESTINO.addEventListener('click', async () => {
    const texto = `${DIRECCIONDESTINO.value}, ${DEPARTAMENTODESTINO.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?` +
                `text=${encodeURIComponent(texto)}` +
                `&filter=countrycode:uy` +
                `&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        const resultado = dato.results[0];
        if (resultado) {
            marcadorDestino.setLatLng([resultado.lat, resultado.lon]);
            await actualizarLinea(); 
            const grupoMarcadores = L.featureGroup([marcadorInicio, marcadorDestino]);
            mappa.fitBounds(grupoMarcadores.getBounds().pad(0.2));
            alert(`Ubicación de destino encontrada: ${resultado.lat}, ${resultado.lon}`);
        } else {
            alert('No se pudo encontrar la ubicación de destino ingresada.');
        }
    } catch (error) {
        alert('Ocurrió un error al consultar la dirección de destino.');
    }
});
const mappa = L.map('mapa').setView([-32.3171, -58.08072], 17);
const INGRESO = document.getElementById('ingreso');
const UBICACION = document.getElementById('ubicacion');
const DEPARTAMENTO = document.getElementById('departamento');
const DIRECCION = document.getElementById('direccion');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mappa);

const marcador = L.marker([-32.3171, -58.08072], {draggeable: true}).addTo(mappa);