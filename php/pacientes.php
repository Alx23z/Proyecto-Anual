<?php

require_once __DIR__ . "/../conexion.php";

header("Content-Type: application/json");


// CREAR O ACTUALIZAR
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST["eliminar"])) {

        $id = $_POST["eliminar"];

        $con->query("DELETE FROM paciente
                     WHERE id_paciente=$id");

        echo json_encode([
            "mensaje" => "Paciente eliminado"
        ]);

        exit;
    }


    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $dni = $_POST["dni"];
    $fecha = $_POST["fecha"];
    $telefono = $_POST["telefono"];


    if ($id == "") {

        $con->query("INSERT INTO paciente
        (nombre, apellido, dni, fecha_nacimiento, telefono)
        VALUES
        ('$nombre','$apellido','$dni','$fecha','$telefono')");

        $mensaje = "Paciente creado";

    } else {

        $con->query("UPDATE paciente SET
        nombre='$nombre',
        apellido='$apellido',
        dni='$dni',
        fecha_nacimiento='$fecha',
        telefono='$telefono'
        WHERE id_paciente=$id");

        $mensaje = "Paciente actualizado";
    }


    echo json_encode([
        "mensaje" => $mensaje
    ]);

    exit;
}


// LEER
$resultado = $con->query(
    "SELECT * FROM paciente"
);

$pacientes = [];

while ($p = $resultado->fetch_assoc()) {
    $pacientes[] = $p;
}

echo json_encode($pacientes);

?>