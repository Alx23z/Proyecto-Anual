<?php
require_once "conexion.php";

$respuesta = $_POST["respuesta"];

$sql = "UPDATE encuesta SET respuesta = ? WHERE id_encuesta = 1";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $respuesta);

if ($stmt->execute() && $stmt->affected_rows >= 0) {
    echo "¡Encuesta enviada correctamente!";
} else {
    echo "Error al guardar la respuesta.";
}

$stmt->close();
$conexion->close();
?>