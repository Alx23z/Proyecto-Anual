<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recoger los datos del formulario
    $atencion   = $_POST['atencion'] ?? '';
    $espera     = $_POST['espera'] ?? '';
    $trato      = $_POST['trato'] ?? '';
    $comentario = $_POST['comentario'] ?? '';

    // Validar campos obligatorios
    if (empty($atencion) || empty($espera) || empty($trato)) {
        echo json_encode(["error" => "Por favor, completá todos los campos obligatorios."]);
        exit;
    }

    // Consulta adaptada a tus columnas actuales: atencion, trato, espera
    $sql = "INSERT INTO respuestas_encuesta (atencion, trato, espera) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("sss", $atencion, $trato, $espera);
        
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "¡Encuesta enviada y guardada con éxito!"]);
        } else {
            echo json_encode(["error" => "Error al guardar en la base de datos: " . $stmt->error]);
        }
        
        $stmt->close();
    } else {
        echo json_encode(["error" => "Error en la consulta: " . $conexion->error]);
    }

    $conexion->close();
} else {
    echo json_encode(["error" => "Método no permitido."]);
}
?>