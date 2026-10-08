<?php

require_once __DIR__ . "/conexion.php";

header("Content-Type: application/json");


// ELIMINAR
if (isset($_POST["eliminar"])) {

    $id = $_POST["eliminar"];

    $con->query("DELETE FROM paciente WHERE id_paciente = $id");

    echo json_encode(["mensaje" => "Paciente eliminado"]);
    exit;
}


// AGREGAR O MODIFICAR
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $dni = $_POST["dni"];
    $fecha = $_POST["fecha"];
    $telefono = $_POST["telefono"];


    // AGREGAR
    if ($id == "") {

        $sql = "INSERT INTO paciente
        (nombre, apellido, dni, fecha_nacimiento, telefono)
        VALUES
        ('$nombre', '$apellido', '$dni', '$fecha', '$telefono')";

        $con->query($sql);

        echo json_encode(["mensaje" => "Paciente agregado"]);

    } 
    
    // MODIFICAR
    else {

        $sql = "UPDATE paciente SET
        nombre = '$nombre',
        apellido = '$apellido',
        dni = '$dni',
        fecha_nacimiento = '$fecha',
        telefono = '$telefono'
        WHERE id_paciente = $id";

        $con->query($sql);

        echo json_encode(["mensaje" => "Paciente modificado"]);
    }

    exit;
}


// MOSTRAR PACIENTES

$resultado = $con->query("SELECT * FROM paciente");

$pacientes = [];

while ($fila = $resultado->fetch_assoc()) {
    $pacientes[] = $fila;
}

echo json_encode($pacientes);

?>