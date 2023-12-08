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

    // Get email and username from the query
    $email = isset($_GET['email']) ? $_GET['email'] : null;
    $username = isset($_GET['username']) ? $_GET['username'] : null;

    // Prepare and bind db params
    $stmt = $mysqli->prepare("SELECT id,username,email,firstName,lastName,school,bio FROM accounts WHERE email = ? OR username = ?");
    $stmt->bind_param("ss", $email, $username);

    // Execute
    $result = $stmt->execute();

    if ($result) {
      $matchedUser = $stmt->get_result()->fetch_assoc();
      header("HTTP/1.1 200 OK");
      if ($matchedUser) {
        echo json_encode($matchedUser);
      } else {
        echo json_encode(new StdClass());
      }
    } else {
      header("HTTP/1.1 400 BAD REQUEST");
    }
  case "POST":
    break;
  case "PUT":
    break;
  case "DELTE":
    break;
}
?>