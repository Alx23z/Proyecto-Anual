
document.addEventListener("DOMContentLoaded", function () {

    // Botón de inicio
    const inicio = document.getElementById("inicio");

    if (inicio) {
        inicio.addEventListener("click", function () {
            window.location.href = "principal.html";
        });
    }

    // Navegación del menú
    const enlaces = document.querySelectorAll(".menu a");

    enlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            enlaces.forEach(function (item) {
                item.classList.remove("activo");
            });

            this.classList.add("activo");
        });
    });

});
