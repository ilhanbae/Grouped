<?php
// Function to generate a random token
function generateToken($userId, $username)
{
    $secretKey = 'your_secret_key';

    $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload = base64_encode(json_encode(['userId' => $userId, 'username' => $username]));

    // Create the signature using HMAC-SHA256
    $signature = hash_hmac('sha256', "$header.$payload", $secretKey, true);
    $signatureBase64 = base64_encode($signature);

    // Combine the header, payload, and signature to create the JWT
    $token = "$header.$payload.$signatureBase64";

    return $token;
}

// Function to validate a token
function validateToken($token)
{
    $secretKey = 'your_secret_key';

    // Split the token into header, payload, and signature
    list($header, $payload, $signature) = explode('.', $token);

    // Recreate the signature using the secret key
    $expectedSignature = hash_hmac('sha256', "$header.$payload", $secretKey, true);
    $expectedSignatureBase64 = base64_encode($expectedSignature);

    // Compare the recreated signature with the provided signature
    if ($expectedSignatureBase64 === $signature) {
        // Token is valid
        return json_decode(base64_decode($payload), true);
    } else {
        // Token is invalid
        return false;
    }
}
?>