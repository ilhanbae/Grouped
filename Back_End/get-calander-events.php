<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require __DIR__ . '/tokens.php';
// Get DB context
$mysqli = require __DIR__ . "/database.php";

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        // Get auth header  
        $headers = getallheaders();
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : null;

        // Check if there's no auth header
        if (!$authHeader) {
            echo "No auth header";
            header("HTTP/1.1 400 BAD REQUEST");
            exit;
        }

        // Check if auth header is not a bearer token
        if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            echo "Not bearer";
            header("HTTP/1.1 400 BAD REQUEST");
            exit;
        }

        // Check if auth token is not valid
        $token = $matches[1];
        $isTokenValid = validateToken($token);
        if (!$isTokenValid) {
            echo "Invalid token";
            header("HTTP/1.1 400 BAD REQUEST");
            exit;
        }
        
        // Get user_id or group_id
        if($_GET['user_id'] != null){
            $user_id = $_GET['user_id'];
            $stmt = $mysqli->prepare("SELECT user_id ,group_id, title, location, start_time, end_time, descrip FROM user_calander WHERE user_id = ?");
            $stmt->bind_param("s", $user_id);
        }else if($_GET['group_id'] != null){
            $group_id= $_GET['group_id'];
            $stmt = $mysqli->prepare("SELECT user_id ,group_id, title, location, start_time, end_time, descrip FROM user_calander WHERE group_id = ?");
            $stmt->bind_param("s", $group_id);
        }else{
            echo "No IDs given";
            header("HTTP/1.1 400 BAD REQUEST");
            break;
        }

        // Execute
        $result = $stmt->execute();
        if ($result) {
            //$calanderEvents = $stmt->get_result()->fetch_assoc();
            $calanderEvents = mysqli_fetch_all ($stmt->get_result(), MYSQLI_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($calanderEvents);
            
        } else {
            echo "failed";
            header("HTTP/1.1 400 BAD REQUEST");
        }

    case "POST":
        break;
    case "PUT":
        break;
    case "DELTE":
        break;
}
?>