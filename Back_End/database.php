<?php
$host = "oceanus.cse.buffalo.edu";
$dbname = "cse442_2023_fall_team_am_db";
$username = "sovinder";
$password = "50153713";

$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
} 

return $mysqli;
?>