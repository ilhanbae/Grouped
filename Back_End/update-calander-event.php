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
            if($user->title == null){
                echo("No Update to Event Title Provided");
            }else{
                $title = $title = $user->title;
                $stmt = $mysqli->prepare("UPDATE `user_calander` SET title = ? WHERE id = $user->id");
                $stmt->bind_param("s", $title);
                if ($stmt->execute()) {
                    echo "Title Successfully Updated";
                } else {
                    echo "Failed to Update Title";
                    header("HTTP/1.1 400 BAD REQUEST");
                    break;
                }
            }
            if($user->start_time == null){
                echo("No Update to Event Start TIme Provided");
            }else{
                $start_time = date('Y-m-d H:i:s', strtotime($user->start_time));
                $stmt = $mysqli->prepare("UPDATE `user_calander` SET start_time = ? WHERE id = $user->id");
                $stmt->bind_param("s", $start_time);
                if ($stmt->execute()) {
                    echo "Start Time Successfully Updated";
                } else {
                    echo "Failed to Update Start Time";
                    header("HTTP/1.1 400 BAD REQUEST");
                    break;
                }

            }
            if($user->end_time == null){
                echo("No Update to Event End TIme Provided");
            }else{
                $end_time = date('Y-m-d H:i:s', strtotime($user->end_time));
                $stmt = $mysqli->prepare("UPDATE `user_calander` SET end_time = ? WHERE id = $user->id");
                $stmt->bind_param("s", $end_time);
                if ($stmt->execute()) {
                    echo "End Time Successfully Updated";
                } else {
                    echo "Failed to Update End Time";
                    header("HTTP/1.1 400 BAD REQUEST");
                    break;
                }

            }
            if($user->descrip == null){
                echo("No Update to Event Description Provided");
            }else{
                $descrip = $user->descrip;
                $stmt = $mysqli->prepare("UPDATE `user_calander` SET descrip = ? WHERE id = $user->id");
                $stmt->bind_param("s", $descrip);
                if ($stmt->execute()) {
                    echo "Description Successfully Updated";
                } else {
                    echo "Failed to Update Description";
                    header("HTTP/1.1 400 BAD REQUEST");
                    break;
                }

            }
            echo "All Fields Updated";
            header("HTTP/1.1 200 OK");

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