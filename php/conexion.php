<?php

$con = new mysqli("localhost", "root", "", "sistema_hospitalario");

if ($con->connect_error) {
    die("Error de conexión: " . $con->connect_error);
}

?>