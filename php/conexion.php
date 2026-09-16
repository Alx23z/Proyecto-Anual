<?php

require_once __DIR__ . "/config.php";

$con = new mysqli(
    DB_HOST,
    DB_USUARIO,
    DB_CONTRASENA,
    DB_NOMBRE
);

if ($con->connect_error) {
    http_response_code(500);
    die(json_encode([
        "error" => "Error de conexión a la base de datos: " . $con->connect_error
    ]));
}

$con->set_charset("utf8");

?>