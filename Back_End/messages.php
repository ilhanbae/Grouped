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

