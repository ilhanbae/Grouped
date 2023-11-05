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

    //Create Calander Event
    case "POST":
        // Get body of the request
        $user = json_decode(file_get_contents('php://input'));

        // Prepare and bind db params
        $stmt = $mysqli->prepare("INSERT INTO user_calander (user_id, group_id, title, start_time, end_time, descrip) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissss", $user_id, $group_id, $title, $start_time, $end_time, $descrip);

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
        $start_time = $user->start_time;
        if (empty($start_time)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Event Start Time Provided");
        }

        $end_time = $user->end_time;
        if (empty($end_time)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Event End Time Provided");
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

    //Delete Calander Event
    case "DELTE":
        break;
}


?>