<?php

$username = "username";
$password = "password";
$hostname = "localhost";
$database = "database";


$dbhandle = mysqli_connect($hostname, $username, $password, $database);

// Check connection
if (!$dbhandle) {
    die("Connection failed: " . mysqli_connect_error(). '<br>');
}
//echo "Connected successfully" . '<br/>';



?>
