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

        $user = json_decode(file_get_contents('php://input'));
       
        // Prepare and bind db params
        $stmt = $mysqli->prepare("INSERT INTO group_table (invite_flag, group_title, group_desc) VALUES (?,?,?)");
        $stmt->bind_param("iss",  $invite_flag, $group_title, $group_desc);

        $invite_flag = $user->invite_flag;

        $group_title = $user->group_title;
        if (empty($group_title)){
            header("HTTP/1.1 400 BAD REQUEST");
            die("No Event Title Provided");
            break;
        }

        $group_desc = $user->group_desc;

        if ($stmt->execute()) {
            $group_token = $stmt->insert_id;
            $stmt->close();
            $stmt = $mysqli->prepare("INSERT INTO group_access (group_token, group_title ,user_id, username) VALUES (?,?,?,?)");
            $stmt->bind_param("isis", $group_token,$group_title, $user_id, $username);
            $user_id = $user->user_id;
            if (empty($user_id)){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No User ID Provided");
                break;
            }
            $username = $user->username;
            if (empty($username)){
                header("HTTP/1.1 400 BAD REQUEST");
                die("No Username Provided");
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

        $stmt = $mysqli->prepare("SELECT * FROM `group_table`");
        $result = $stmt->execute();
        if ($result) {
            //$calanderEvents = $stmt->get_result()->fetch_assoc();
            $groups = mysqli_fetch_all ($stmt->get_result(), MYSQLI_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($groups);
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

