
<?php
session_start();
require_once "../conexion.php";

$usuario = $_POST["username"] ?? "";
$contraseña = $_POST["password"] ?? "";

$sql = "SELECT id_funcionario, usuario, contraseña
        FROM funcionario
        WHERE usuario = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();

$resultado = $stmt->get_result();

if ($funcionario = $resultado->fetch_assoc()) {
    if (password_verify($contraseña, $funcionario["contraseña"])) {
        session_regenerate_id(true);
        $_SESSION["id_funcionario"] = $funcionario["id_funcionario"];

        header("Location: principal.html");
        exit;
    }
}

echo "Usuario o contraseña incorrectos.";
?>
