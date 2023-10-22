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

        $sql = sprintf("SELECT * FROM `accounts`
        WHERE email = '%s'",
        $mysqli->real_escape_string($user->email));
        $result = $mysqli->query($sql);
        $matcheduser = $result->fetch_assoc();

        $stmt = $mysqli->prepare("UPDATE `accounts` SET firstname = ? ,lastname = ?,school= ?,bio = ?
         WHERE email = ?");
        
        $stmt->bind_param("sssss", $firstname, $lastname, $school,$bio,$email);

        $firstname = $user->firstname;
        $lastname = $user->lastname;
        $school = $user->school;
        $bio = $user->bio;
        $email = $user->email;

        if ($stmt->execute()) {
            // echo "success";
            header("HTTP/1.1 200 OK");
        } else {
            // echo "failed";
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
