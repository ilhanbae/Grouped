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
        $user = json_decode(file_get_contents('php://input'));

        if(validateToken($user->token) == false){
            header("HTTP/1.1 400 BAD REQUEST");
            die("INVALID REQUEST");
            break;
        }

        $stmt = $mysqli->prepare("INSERT INTO messages (user_id, username, group_id, message) VALUES (?,?,?,?)");
        $stmt->bind_param("isis",  $user_id, $username,$group_id, $message);

        $user_id = $user->user_id;
        if (empty($user_id)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No User Id Provided");
            break;
        }

        $username = $user->username;
        if (empty($username)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Username Provided");
            break;
        }

        $group_id = $user->group_id;
        if (empty($group_id)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Group Id Provided");
            break;
        }

        $message = $user->message;
        if (empty($message)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Message");
            break;
        }

        if ($stmt->execute()) {
            echo "success";
            header("HTTP/1.1 200 OK");
            break;
        } else {
            echo "failed";
            header("HTTP/1.1 400 BAD REQUEST");
            break;
        }

    case "GET":
        $group_id = $_GET['group_id'];
        $stmt = $mysqli->prepare("SELECT * FROM messages WHERE group_id = ?");
        $stmt->bind_param("s", $group_id);

        $result = $stmt->execute();
        if ($result) {
            $message = mysqli_fetch_all ($stmt->get_result(), MYSQLI_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($message);
            break;
            
        } else {
            echo "failed";
            header("HTTP/1.1 400 BAD REQUEST");
            break;
        }

    case "PUT":
        break;
    case "DELTE":
        break;
}
?>

