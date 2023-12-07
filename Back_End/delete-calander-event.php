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
    case "DELETE":
        // Get auth header  
        $headers = getallheaders();
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : null;

        // Check if there's no auth header
        if (!$authHeader) {
            echo "No auth header";
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }

        // Check if auth header is not a bearer token
        if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            echo "Not bearer";
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }

        // Check if auth token is not valid
        $token = $matches[1];
        $isTokenValid = validateToken($token);
        if (!$isTokenValid) {
            echo "Invalid token";
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }

        $id = $_GET['id'];
      
        $sql = sprintf("SELECT * FROM `user_calander`
        WHERE id = '%s'",
        $mysqli->real_escape_string($id));

        $result = $mysqli->query($sql);

        $matchedevent = $result->fetch_assoc();

        if($matchedevent){
            $stmt = $mysqli->prepare("DELETE FROM `user_calander` WHERE id = $id");
            if ($stmt->execute()) {
                echo "success";
                header("HTTP/1.1 200 OK");
            } else {
                echo "failed";
                header("HTTP/1.1 400 BAD REQUEST");
            }
        }else{
            echo "No Event Found";
            header("HTTP/1.1 400 BAD REQUEST");
        }
        
    case "GET":
        break;
    case "POST":
        break;
    case "PUT":
        break;
}
?>