<?php
require_once 'conexion.php';

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$ci = $_POST['ci'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];
$telefono = $_POST['telefono'];

$stmt = $con->prepare("INSERT INTO paciente (nombre, apellido, cedula, fecha_nacimiento, telefono) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nombre, $apellido, $ci, $fecha_nacimiento, $telefono);
if($stmt->execute()){
    echo "ok";
}else{
    echo "error";
};
$stmt->close();
$con->close();
?>