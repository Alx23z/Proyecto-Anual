const mappa = L.map('mapa').setView([-32.3171, -58.08072], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mappa);
const UBICACIONINICIO1 = document.getElementById('ubicacion_inicio_1');
const DEPARTAMENTOINICIO1 = document.getElementById('departamento_inicio_1');
const DIRECCIONINICIO1 = document.getElementById('direccion_inicio_1');
const UBICACIONDESTINO1 = document.getElementById('ubicacion_destino_1');
const DEPARTAMENTODESTINO1 = document.getElementById('departamento_destino_1');
const DIRECCIONDESTINO1 = document.getElementById('direccion_destino_1');
let marcadorInicio1 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let marcadorDestino1 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let lineaRuta1 = null;
async function actualizarLinea1() {
    const origen = [marcadorInicio1.getLatLng().lat, marcadorInicio1.getLatLng().lng];
    const destino = [marcadorDestino1.getLatLng().lat, marcadorDestino1.getLatLng().lng];
    const urlRuta = `https://api.geoapify.com/v1/routing?waypoints=${origen[0]},${origen[1]}|${destino[0]},${destino[1]}&mode=drive&units=metric&lang=es&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const resp = await fetch(urlRuta);
        const routeo = await resp.json();
        if (routeo.features && routeo.features.length > 0) {
            if (lineaRuta1) { mappa.removeLayer(lineaRuta1); }
            const dibujo = routeo.features[0].geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            lineaRuta1 = L.polyline(dibujo, { color: 'blue', weight: 5 }).addTo(mappa);
        }
    } catch (error) { console.error(error); }
}
marcadorInicio1.on('dragend', actualizarLinea1);
marcadorDestino1.on('dragend', actualizarLinea1);
UBICACIONINICIO1.addEventListener('click', async () => {
    const texto = `${DIRECCIONINICIO1.value}, ${DEPARTAMENTOINICIO1.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorInicio1.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            mappa.setView([dato.results[0].lat, dato.results[0].lon], 16);
            await actualizarLinea1();
        }
    } catch (error) { console.error(error); }
});
UBICACIONDESTINO1.addEventListener('click', async () => {
    const texto = `${DIRECCIONDESTINO1.value}, ${DEPARTAMENTODESTINO1.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorDestino1.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            await actualizarLinea1();
            mappa.fitBounds(L.featureGroup([marcadorInicio1, marcadorDestino1]).getBounds().pad(0.2));
        }
    } catch (error) { console.error(error); }
});
const UBICACIONINICIO2 = document.getElementById('ubicacion_inicio_2');
const DEPARTAMENTOINICIO2 = document.getElementById('departamento_inicio_2');
const DIRECCIONINICIO2 = document.getElementById('direccion_inicio_2');
const UBICACIONDESTINO2 = document.getElementById('ubicacion_destino_2');
const DEPARTAMENTODESTINO2 = document.getElementById('departamento_destino_2');
const DIRECCIONDESTINO2 = document.getElementById('direccion_destino_2');
let marcadorInicio2 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let marcadorDestino2 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let lineaRuta2 = null;
async function actualizarLinea2() {
    const origen = [marcadorInicio2.getLatLng().lat, marcadorInicio2.getLatLng().lng];
    const destino = [marcadorDestino2.getLatLng().lat, marcadorDestino2.getLatLng().lng];
    const urlRuta = `https://api.geoapify.com/v1/routing?waypoints=${origen[0]},${origen[1]}|${destino[0]},${destino[1]}&mode=drive&units=metric&lang=es&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const resp = await fetch(urlRuta);
        const routeo = await resp.json();
        if (routeo.features && routeo.features.length > 0) {
            if (lineaRuta2) { mappa.removeLayer(lineaRuta2); }
            const dibujo = routeo.features[0].geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            lineaRuta2 = L.polyline(dibujo, { color: 'red', weight: 5 }).addTo(mappa);
        }
    } catch (error) { console.error(error); }
}
marcadorInicio2.on('dragend', actualizarLinea2);
marcadorDestino2.on('dragend', actualizarLinea2);
UBICACIONINICIO2.addEventListener('click', async () => {
    const texto = `${DIRECCIONINICIO2.value}, ${DEPARTAMENTOINICIO2.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorInicio2.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            mappa.setView([dato.results[0].lat, dato.results[0].lon], 16);
            await actualizarLinea2();
        }
    } catch (error) { console.error(error); }
});
UBICACIONDESTINO2.addEventListener('click', async () => {
    const texto = `${DIRECCIONDESTINO2.value}, ${DEPARTAMENTODESTINO2.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorDestino2.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            await actualizarLinea2();
            mappa.fitBounds(L.featureGroup([marcadorInicio2, marcadorDestino2]).getBounds().pad(0.2));
        }
    } catch (error) { console.error(error); }
});
const UBICACIONINICIO3 = document.getElementById('ubicacion_inicio_3');
const DEPARTAMENTOINICIO3 = document.getElementById('departamento_inicio_3');
const DIRECCIONINICIO3 = document.getElementById('direccion_inicio_3');
const UBICACIONDESTINO3 = document.getElementById('ubicacion_destino_3');
const DEPARTAMENTODESTINO3 = document.getElementById('departamento_destino_3');
const DIRECCIONDESTINO3 = document.getElementById('direccion_destino_3');
let marcadorInicio3 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let marcadorDestino3 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let lineaRuta3 = null;
async function actualizarLinea3() {
    const origen = [marcadorInicio3.getLatLng().lat, marcadorInicio3.getLatLng().lng];
    const destino = [marcadorDestino3.getLatLng().lat, marcadorDestino3.getLatLng().lng];
    const urlRuta = `https://api.geoapify.com/v1/routing?waypoints=${origen[0]},${origen[1]}|${destino[0]},${destino[1]}&mode=drive&units=metric&lang=es&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const resp = await fetch(urlRuta);
        const routeo = await resp.json();
        if (routeo.features && routeo.features.length > 0) {
            if (lineaRuta3) { mappa.removeLayer(lineaRuta3); }
            const dibujo = routeo.features[0].geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            lineaRuta3 = L.polyline(dibujo, { color: 'green', weight: 5 }).addTo(mappa);
        }
    } catch (error) { console.error(error); }
}
marcadorInicio3.on('dragend', actualizarLinea3);
marcadorDestino3.on('dragend', actualizarLinea3);
UBICACIONINICIO3.addEventListener('click', async () => {
    const texto = `${DIRECCIONINICIO3.value}, ${DEPARTAMENTOINICIO3.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorInicio3.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            mappa.setView([dato.results[0].lat, dato.results[0].lon], 16);
            await actualizarLinea3();
        }
    } catch (error) { console.error(error); }
});
UBICACIONDESTINO3.addEventListener('click', async () => {
    const texto = `${DIRECCIONDESTINO3.value}, ${DEPARTAMENTODESTINO3.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorDestino3.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            await actualizarLinea3();
            mappa.fitBounds(L.featureGroup([marcadorInicio3, marcadorDestino3]).getBounds().pad(0.2));
        }
    } catch (error) { console.error(error); }
});
const UBICACIONINICIO4 = document.getElementById('ubicacion_inicio_4');
const DEPARTAMENTOINICIO4 = document.getElementById('departamento_inicio_4');
const DIRECCIONINICIO4 = document.getElementById('direccion_inicio_4');
const UBICACIONDESTINO4 = document.getElementById('ubicacion_destino_4');
const DEPARTAMENTODESTINO4 = document.getElementById('departamento_destino_4');
const DIRECCIONDESTINO4 = document.getElementById('direccion_destino_4');
let marcadorInicio4 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let marcadorDestino4 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let lineaRuta4 = null;
async function actualizarLinea4() {
    const origen = [marcadorInicio4.getLatLng().lat, marcadorInicio4.getLatLng().lng];
    const destino = [marcadorDestino4.getLatLng().lat, marcadorDestino4.getLatLng().lng];
    const urlRuta = `https://api.geoapify.com/v1/routing?waypoints=${origen[0]},${origen[1]}|${destino[0]},${destino[1]}&mode=drive&units=metric&lang=es&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const resp = await fetch(urlRuta);
        const routeo = await resp.json();
        if (routeo.features && routeo.features.length > 0) {
            if (lineaRuta4) { mappa.removeLayer(lineaRuta4); }
            const dibujo = routeo.features[0].geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            lineaRuta4 = L.polyline(dibujo, { color: 'orange', weight: 5 }).addTo(mappa);
        }
    } catch (error) { console.error(error); }
}
marcadorInicio4.on('dragend', actualizarLinea4);
marcadorDestino4.on('dragend', actualizarLinea4);
UBICACIONINICIO4.addEventListener('click', async () => {
    const texto = `${DIRECCIONINICIO4.value}, ${DEPARTAMENTOINICIO4.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorInicio4.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            mappa.setView([dato.results[0].lat, dato.results[0].lon], 16);
            await actualizarLinea4();
        }
    } catch (error) { console.error(error); }
});
UBICACIONDESTINO4.addEventListener('click', async () => {
    const texto = `${DIRECCIONDESTINO4.value}, ${DEPARTAMENTODESTINO4.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorDestino4.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            await actualizarLinea4();
            mappa.fitBounds(L.featureGroup([marcadorInicio4, marcadorDestino4]).getBounds().pad(0.2));
        }
    } catch (error) { console.error(error); }
});
const UBICACIONINICIO5 = document.getElementById('ubicacion_inicio_5');
const DEPARTAMENTOINICIO5 = document.getElementById('departamento_inicio_5');
const DIRECCIONINICIO5 = document.getElementById('direccion_inicio_5');
const UBICACIONDESTINO5 = document.getElementById('ubicacion_destino_5');
const DEPARTAMENTODESTINO5 = document.getElementById('departamento_destino_5');
const DIRECCIONDESTINO5 = document.getElementById('direccion_destino_5');
let marcadorInicio5 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let marcadorDestino5 = L.marker([-32.3171, -58.08072], { draggable: true }).addTo(mappa);
let lineaRuta5 = null;
async function actualizarLinea5() {
    const origen = [marcadorInicio5.getLatLng().lat, marcadorInicio5.getLatLng().lng];
    const destino = [marcadorDestino5.getLatLng().lat, marcadorDestino5.getLatLng().lng];
    const urlRuta = `https://api.geoapify.com/v1/routing?waypoints=${origen[0]},${origen[1]}|${destino[0]},${destino[1]}&mode=drive&units=metric&lang=es&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const resp = await fetch(urlRuta);
        const routeo = await resp.json();
        if (routeo.features && routeo.features.length > 0) {
            if (lineaRuta5) { mappa.removeLayer(lineaRuta5); }
            const dibujo = routeo.features[0].geometry.coordinates[0].map(([lon, lat]) => [lat, lon]);
            lineaRuta5 = L.polyline(dibujo, { color: 'purple', weight: 5 }).addTo(mappa);
        }
    } catch (error) { console.error(error); }
}
marcadorInicio5.on('dragend', actualizarLinea5);
marcadorDestino5.on('dragend', actualizarLinea5);
UBICACIONINICIO5.addEventListener('click', async () => {
    const texto = `${DIRECCIONINICIO5.value}, ${DEPARTAMENTOINICIO5.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorInicio5.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            mappa.setView([dato.results[0].lat, dato.results[0].lon], 16);
            await actualizarLinea5();
        }
    } catch (error) { console.error(error); }
});
UBICACIONDESTINO5.addEventListener('click', async () => {
    const texto = `${DIRECCIONDESTINO5.value}, ${DEPARTAMENTODESTINO5.value}, Uruguay`;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(texto)}&filter=countrycode:uy&lang=es&limit=1&format=json&apiKey=4572a7318c164b3b873097a1f7b2c618`;
    try {
        const respuesta = await fetch(url);
        const dato = await respuesta.json();
        if (dato.results[0]) {
            marcadorDestino5.setLatLng([dato.results[0].lat, dato.results[0].lon]);
            await actualizarLinea5();
            mappa.fitBounds(L.featureGroup([marcadorInicio5, marcadorDestino5]).getBounds().pad(0.2));
        }
    } catch (error) { console.error(error); }
});