<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

verifyAdmin($conn);

$data = $_POST;

if (!isset($data['id']) || empty($data['id'])) {
    sendError('Participant ID is required');
}

$id = (int)$data['id'];

// Check participant exists
$checkStmt = $conn->prepare("SELECT * FROM participants WHERE id = ?");
$checkStmt->execute([$id]);
$existing = $checkStmt->fetch();

if (!$existing) {
    sendError('Participant not found', 404);
}

$fields = [];
$params = [];

if (isset($data['category'])) {
    $category = trim($data['category']);
    if (!in_array($category, ['Master', 'Student'])) {
        sendError('Invalid category');
    }
    $fields[] = "category = ?";
    $params[] = $category;
}

if (isset($data['name'])) {
    $fields[] = "name = ?";
    $params[] = trim($data['name']);
}

if (isset($data['father_name'])) {
    $fields[] = "father_name = ?";
    $params[] = trim($data['father_name']);
}

if (isset($data['phone'])) {
    $phone = trim($data['phone']);
    if (!preg_match('/^[0-9]{10}$/', $phone)) {
        sendError('Phone number must be exactly 10 digits');
    }
    $fields[] = "phone = ?";
    $params[] = $phone;
}

if (isset($data['age'])) {
    $age = trim($data['age']);
    if (!ctype_digit($age) || $age < 1 || $age > 150) {
        sendError('Age must be a valid number between 1 and 150');
    }
    $fields[] = "age = ?";
    $params[] = $age;
}

if (isset($data['address'])) {
    $fields[] = "address = ?";
    $params[] = trim($data['address']);
}

if (isset($data['district'])) {
    $fields[] = "district = ?";
    $params[] = trim($data['district']);
}

if (isset($data['state'])) {
    $fields[] = "state = ?";
    $params[] = trim($data['state']);
}

if (isset($data['upi_id'])) {
    $fields[] = "upi_id = ?";
    $params[] = trim($data['upi_id']);
}

// Handle new payment screenshot
if (isset($_FILES['payment_screenshot']) && $_FILES['payment_screenshot']['error'] === UPLOAD_ERR_OK) {
    $screenshot = uploadFile($_FILES['payment_screenshot']);
    $fields[] = "payment_screenshot = ?";
    $params[] = $screenshot;
    
    // Delete old screenshot
    $oldFile = __DIR__ . '/../uploads/payment/' . $existing['payment_screenshot'];
    if (file_exists($oldFile)) {
        unlink($oldFile);
    }
}

if (empty($fields)) {
    sendError('No fields to update');
}

$params[] = $id;
$query = "UPDATE participants SET " . implode(', ', $fields) . " WHERE id = ?";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute($params);
    sendSuccess([], 'Participant updated successfully');
} catch (PDOException $e) {
    sendError('Update failed: ' . $e->getMessage(), 500);
}