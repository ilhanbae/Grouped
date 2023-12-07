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
        $id = $_GET['id'];
        $token = isset($_GET['token']) ? $_GET['token'] : null;

        if(validateToken($token) == false){
            header("HTTP/1.1 400 BAD REQUEST");
            die("INVALID REQUEST");
            break;
          }
      
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