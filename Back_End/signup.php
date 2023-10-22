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
        // Get body of the request
        $user = json_decode(file_get_contents('php://input'));

        // Prepare and bind db params
        $stmt = $mysqli->prepare("INSERT INTO accounts (username, email, password_hash) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password_hash);

        // Set accounts param from body of the request
        $username = $user->username;
        if (empty($username)) {
            header("HTTP/1.1 400 BAD REQUEST");
            die("username is required");
        }
        $email = $user->email;
        if ( ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            header("HTTP/1.1 400 BAD REQUEST");
            die("Valid email is required");
        }

        $sql = sprintf("SELECT * FROM `accounts`
        WHERE email = '%s'",
        $mysqli->real_escape_string($user->email));
        $result = $mysqli->query($sql);
        $existinguser = $result->fetch_assoc();

        if($existinguser){
            die("This Email Is Already In Use");
        }

        /*if ( ! preg_match("/[0-9]/", $_POST["password"])) {
            die("Password must contain at least one number");
        }*/

        if ($user->password !== $user->confirmPassword) {
            die("Passwords must match");
        }

        $password_hash = password_hash($user->password, PASSWORD_DEFAULT);

        // Execute
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

