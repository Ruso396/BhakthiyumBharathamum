<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

verifyAdmin($conn);

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