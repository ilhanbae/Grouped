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

    //Create Calander Event
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

        // Get body of the request
        $user = json_decode(file_get_contents('php://input'));

        

        // Prepare and bind db params
        $stmt = $mysqli->prepare("INSERT INTO user_calander (user_id, group_id, title, location, start_time, end_time, descrip) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iisssss", $user_id, $group_id, $title, $location, $start_time, $end_time, $descrip);

        // Set accounts param from body of the request
        $user_id = $user->user_id;
        $group_id = $user->group_id;
        // check that a user_id (for an indiviual event) or group_id (for a group event) was provided
        if (empty($user_id) && empty($group_id)) {
            header("HTTP/1.1 400 BAD REQUEST");
            die("No User or Group ID Provided");
        }

        $title = $user->title;
        // check that an event title was provided
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


        // Execute
        if ($stmt->execute()) {
            echo "success";
            header("HTTP/1.1 200 OK");
        } else {
            echo "failed";
            header("HTTP/1.1 400 BAD REQUEST");
        }


    case "GET":
        break;
    case "PUT":
        break;
    case "DELTE":
        break;
}


?>