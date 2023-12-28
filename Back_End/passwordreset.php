<?php
// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json; charset=utf-8');


require __DIR__ . '/tokens.php';
// Get DB context
$mysqli = require __DIR__ . "/database.php";

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

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

        /*$sql = sprintf("SELECT * FROM `accounts`
        WHERE id = '%s'",
        $mysqli->real_escape_string($_SESSION["user_id"]));*/

        $sql = sprintf("SELECT * FROM `accounts`
        WHERE id = '%s'",
        $mysqli->real_escape_string($user->id));

        $result = $mysqli->query($sql);
    
        $matcheduser = $result->fetch_assoc();

        if($matcheduser){
            if(password_verify($user->password,$matcheduser["password_hash"])){
                if ($user->newPassword !== $user->confirmnewPassword) {
                    die("Passwords Must Match");
                }
                
                //$stmt = $mysqli->prepare("UPDATE `accounts` SET password_hash = ? WHERE id = $_SESSION["user_id"]");
                $stmt = $mysqli->prepare("UPDATE `accounts` SET password_hash = ? WHERE id = $user->id");
                $stmt->bind_param("s",$new_password_hash);
                $new_password_hash = password_hash($user->newPassword, PASSWORD_DEFAULT);

                if ($stmt->execute()) {
                    echo "success";
                    header("HTTP/1.1 200 OK");
			break;
                } else {
                    echo "failed";
                    header("HTTP/1.1 400 BAD REQUEST");
			break;
                }

            }
		echo "Incorrect Password";
            header("HTTP/1.1 400 BAD REQUEST");
		break;
        }else{
            die("No Such User");
        }



    case "GET":
        break;
    case "PUT":
        break;
    case "DELTE":
        break;

}


?>