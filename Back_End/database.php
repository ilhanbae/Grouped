<?php

$host = "oceanus.cse.buffalo.edu"; //do I need to add the port number?
$dbname = "cse442_2023_fall_team_am_db ";
$username = "sovinder";
$password = "50153713";

$mysqli = new mysqli(hostname: $host,
                     username: $username,
                     password: $password,
                     database: $dbname);
                     
if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
}

return $mysqli;