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
    case "POST":
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

            $stmt = $mysqli->prepare("UPDATE `user_calander` SET title = ?, start_time = ?, end_time = ?, descrip = ? WHERE id = $user->id");
            $stmt->bind_param("ssss", $title,$start_time,$end_time,$descrip);
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