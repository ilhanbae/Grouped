<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8');

// Get DB context
$mysqli = require __DIR__ . "/database.php";


$is_invalid = false;
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":

        $user = json_decode(file_get_contents('php://input'));

        if(empty($user->email) || empty($user->password)){
            die("Please Fill Out All Fields");
            exit;
        }else{
            $sql = sprintf("SELECT * FROM `accounts`
            WHERE email = '%s'",
           $mysqli->real_escape_string($user->email));
    
            $result = $mysqli->query($sql);
    
            $matcheduser = $result->fetch_assoc();
    
            if($matcheduser){
                if(password_verify($user->password,$matcheduser["password_hash"])){
                    session_start();
                    session_regenerate_id();
                    $_SESSION["user_id"] = $matcheduser["id"];
    
                    header("HTTP/1.1 200 OK");

                    //this is only to showcase in backend that login was successful, remove this line
                    echo json_encode($matcheduser);
                    exit;
    
                }
                header("HTTP/1.1 400 BAD REQUEST");
                die("Incorrect Password or Email");
            }
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








