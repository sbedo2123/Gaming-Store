<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'gaming_store');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Set charset to utf8
$conn->set_charset("utf8");

// Check connection
if ($conn->connect_error) {
  die(json_encode(array(
    "error" => "خطأ في الاتصال بقاعدة البيانات: " . $conn->connect_error
  )));
}

// Set timezone
date_default_timezone_set('Asia/Riyadh');
?>