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
  case "GET":
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