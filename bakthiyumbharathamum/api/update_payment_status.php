<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

verifyAdmin($conn);

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id']) || empty($data['id'])) {
    sendError('Participant ID is required');
}

if (!isset($data['payment_status']) || empty($data['payment_status'])) {
    sendError('Payment status is required');
}

$id = (int)$data['id'];
$payment_status = trim($data['payment_status']);

if (!in_array($payment_status, ['Pending', 'Approved', 'Rejected'])) {
    sendError('Invalid payment status. Must be Pending, Approved, or Rejected');
}

// Check participant exists
$checkStmt = $conn->prepare("SELECT id FROM participants WHERE id = ?");
$checkStmt->execute([$id]);
if (!$checkStmt->fetch()) {
    sendError('Participant not found', 404);
}

$stmt = $conn->prepare("UPDATE participants SET payment_status = ? WHERE id = ?");
try {
    $stmt->execute([$payment_status, $id]);
    sendSuccess(['payment_status' => $payment_status], 'Payment status updated to ' . $payment_status);
} catch (PDOException $e) {
    sendError('Update failed: ' . $e->getMessage(), 500);
}