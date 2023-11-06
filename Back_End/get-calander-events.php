<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Get DB context
$mysqli = require __DIR__ . "/database.php";

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        // Get user_id or group_id from the query
        $user = json_decode(file_get_contents('php://input'));
        $user_id = $user->user_id;
        $group_id = $user->group_id;
        if($user_id){
            $stmt = $mysqli->prepare("SELECT title, start_time, end_time, descrip FROM user_calander WHERE user_id = ?");
            $stmt->bind_param("s", $user_id);
        }else if($group_id){
            $stmt = $mysqli->prepare("SELECT title, start_time, end_time, descrip FROM user_calander WHERE group_id = ?");
            $stmt->bind_param("s", $group_id);
        }else{
            echo "No IDs given";
            header("HTTP/1.1 400 BAD REQUEST");
            break;
        }

        // Execute
        $result = $stmt->execute();
        if ($result) {
            $calanderEvents = $stmt->get_result()->fetch_assoc();
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