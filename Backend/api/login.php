<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['username']) || !isset($data['password'])) {
    sendError('Username and password are required');
}

$username = trim($data['username']);
$password = trim($data['password']);

$stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->execute([$username]);
$admin = $stmt->fetch();

if (!$admin) {
    sendError('Invalid credentials', 401);
}

// Verify password against bcrypt hash stored in database
if (!password_verify($password, $admin['password'])) {
    sendError('Invalid credentials', 401);
}

// Generate token (base64 encoded username:password for simple auth)
$token = base64_encode($username . ':' . $password);

sendSuccess([
    'token' => $token,
    'username' => $username
], 'Login successful');