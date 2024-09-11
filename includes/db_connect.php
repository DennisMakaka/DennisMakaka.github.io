<?php
// Database connection details
$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'root';
$password = 'MakakaMakaka1@';

// Establishing a connection to the database
try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // You may remove the success message for production
    // echo "Database connected successfully";
} catch(PDOException $e) {
    // Show error if the connection fails
    die("Database connection failed: " . $e->getMessage());
}
?>
