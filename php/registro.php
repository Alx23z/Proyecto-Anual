<?php
session_start();
require_once __DIR__ . DIRECTORY_SEPARATOR . 'conexion.php';

if (!isset($conn) || !($conn instanceof mysqli)) {
    die('No se pudo establecer la conexión a la base de datos.');
}

$error = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (!empty($username) && !empty($password)) {
        // Consulta preparada para evitar inyección SQL
        $stmt = $conn->prepare("SELECT id_usuario_pk, nombre, contraseña, rol FROM USUARIO WHERE email = ? OR nombre = ?");
        $stmt->bind_param("ss", $username, $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            // Verifica la contraseña encriptada (o texto plano si aún no usas password_hash)
            if (password_verify($password, $row['contraseña']) || $password === $row['contraseña']) {
                
                // Guardar datos en la sesión
                $_SESSION['usuario_id'] = $row['id_usuario_pk'];
                $_SESSION['usuario_nombre'] = $row['nombre'];
                $_SESSION['usuario_rol'] = $row['rol'];

                // Redirigir al panel principal
                header("Location: principal.php");
                exit();
            } else {
                $error = "La contraseña ingresada es incorrecta.";
            }
        } else {
            $error = "El usuario o correo no existe.";
        }
        $stmt->close();
    } else {
        $error = "Por favor, complete todos los campos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Hospital CL</title>
    <link rel="stylesheet" href="../css/medicos.css">
</head>
<body>

    <h1>Bienvenido, Funcionario</h1>
    <p>Esta es la página para el ingreso de los funcionarios del hospital, por favor ingrese sus datos.</p>

    <main class="login-card">
        <header class="login-header">
            <img src="../Img/Gemini_Generated_Image_logo_sin_tantas_cosas.png" alt="Hospital CL" class="login-logo">
            <p>Login</p>
            <h1>Iniciar Sesión</h1>
        </header>

        <!-- Mostrar mensaje de error si existe -->
        <?php if (!empty($error)): ?>
            <div style="color: red; margin-bottom: 15px; text-align: center;">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form action="login.php" method="POST" class="login-form">
            <div class="input-group">
                <label for="username">Usuario / Email:</label>
                <input type="text" id="username" name="username" required>
            </div>

            <div class="input-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required>
            </div>

            <div class="form-actions">
                <input type="submit" value="Iniciar Sesión" class="btn-submit"> 
            </div>
        </form>
    </main>

</body>
</html>