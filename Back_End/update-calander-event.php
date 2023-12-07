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
    case "POST":
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

        $user = json_decode(file_get_contents('php://input'));

        $sql = sprintf("SELECT * FROM `user_calander` WHERE id = '%s'", $mysqli->real_escape_string($user->id));

        $result = $mysqli->query($sql);

        $matchedevent = $result->fetch_assoc();

        if($matchedevent){
            
            $title = $title = $user->title;
            if (empty($title)){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No Event Title Provided");
            }

            $location = $user->location;
            if($user->start_time == null){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No Event Start Time Provided");
            }else{
                $start_time = date('Y-m-d H:i:s', strtotime($user->start_time));
            }
            if($user->end_time == null){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No Event End Time Provided");
            }else{
                $end_time = date('Y-m-d H:i:s', strtotime($user->end_time));
            }
           
            $descrip = $user->descrip;

            $stmt = $mysqli->prepare("UPDATE `user_calander` SET title = ?, location = ? ,start_time = ?, end_time = ?, descrip = ? WHERE id = $user->id");
            $stmt->bind_param("sssss", $title, $location, $start_time, $end_time, $descrip);
            if ($stmt->execute()) {
                echo "All Fields Updated";
                header("HTTP/1.1 200 OK");
            } else {
                echo "Failed to Update Event";
                header("HTTP/1.1 400 BAD REQUEST");
                break;
            }

        }else{
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Such Event");
            break;
        }
        
    case "GET":
        break;
    case "DELETE":
        break;
    case "PUT":
        break;
}
?>