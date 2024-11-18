<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Get form inputs
$location = isset($_POST['location']) ? $_POST['location'] : '';
$raw_time = isset($_POST['time']) ? $_POST['time'] : '';
$species = isset($_POST['species']) ? $_POST['species'] : [];
$count = isset($_POST['count']) ? $_POST['count'] : [];

// Check if form data exists
if (empty($location) || empty($raw_time) || empty($species) || empty($count)) {
    die("Missing required fields.");
}

// Format time to MySQL DATETIME
$time = str_replace('T', ' ', $raw_time);
if (strlen($time) === 16) { // If no seconds are present
    $time .= ':00';
}

// Connect to the database
$conn = new mysqli('127.0.0.1', 'root', 'Li$aRockstar1', 'kc_birding_db');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL query (Using prepared statements)
$stmt = $conn->prepare("INSERT INTO bird_sightings (location, time, species, count) VALUES (?, ?, ?, ?)");

if ($stmt === false) {
    die('Error preparing statement: ' . $conn->error);
}

// Insert data into the database using prepared statements
$all_inserted = true;
foreach ($species as $index => $bird_species) {
    $bird_count = (int) $count[$index];

    // Bind parameters
    $stmt->bind_param("sssi", $location, $time, $bird_species, $bird_count);
    
    // Execute the statement
    if (!$stmt->execute()) {
        echo "Error executing query: " . $stmt->error . "<br>";
        $all_inserted = false;
        break;
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
