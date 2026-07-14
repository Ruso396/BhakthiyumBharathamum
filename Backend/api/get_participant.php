<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

// Verify admin
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
if (empty($authHeader)) {
    sendError('Unauthorized', 401);
}

$token = str_replace('Bearer ', '', $authHeader);
$decoded = base64_decode($token);
$parts = explode(':', $decoded);

if (count($parts) !== 2) {
    sendError('Invalid token', 401);
}

$stmt = $conn->prepare("SELECT id FROM admins WHERE username = ? AND password = ?");
$stmt->execute([$parts[0], $parts[1]]);
if (!$stmt->fetch()) {
    sendError('Invalid credentials', 401);
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    sendError('Participant ID is required');
}

$id = (int)$_GET['id'];

$stmt = $conn->prepare("SELECT * FROM participants WHERE id = ?");
$stmt->execute([$id]);
$participant = $stmt->fetch();

if (!$participant) {
    sendError('Participant not found', 404);
}

sendSuccess($participant);