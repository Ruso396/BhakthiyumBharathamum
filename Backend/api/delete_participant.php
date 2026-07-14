<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id']) || empty($data['id'])) {
    sendError('Participant ID is required');
}

$id = (int)$data['id'];

// Get participant to delete screenshot
$checkStmt = $conn->prepare("SELECT * FROM participants WHERE id = ?");
$checkStmt->execute([$id]);
$participant = $checkStmt->fetch();

if (!$participant) {
    sendError('Participant not found', 404);
}

// Delete screenshot file
$filePath = __DIR__ . '/../uploads/payment/' . $participant['payment_screenshot'];
if (file_exists($filePath)) {
    unlink($filePath);
}

$stmt = $conn->prepare("DELETE FROM participants WHERE id = ?");
try {
    $stmt->execute([$id]);
    sendSuccess([], 'Participant deleted successfully');
} catch (PDOException $e) {
    sendError('Delete failed: ' . $e->getMessage(), 500);
}