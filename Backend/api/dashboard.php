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

try {
    // Total registrations
    $total = $conn->query("SELECT COUNT(*) as count FROM participants")->fetch();
    
    // Total Masters
    $masters = $conn->query("SELECT COUNT(*) as count FROM participants WHERE category = 'Master'")->fetch();
    
    // Total Students
    $students = $conn->query("SELECT COUNT(*) as count FROM participants WHERE category = 'Student'")->fetch();
    
    // Payment status counts
    $pending = $conn->query("SELECT COUNT(*) as count FROM participants WHERE payment_status = 'Pending'")->fetch();
    $approved = $conn->query("SELECT COUNT(*) as count FROM participants WHERE payment_status = 'Approved'")->fetch();
    $rejected = $conn->query("SELECT COUNT(*) as count FROM participants WHERE payment_status = 'Rejected'")->fetch();
    
    // Recent registrations (last 10)
    $recentStmt = $conn->query("SELECT * FROM participants ORDER BY id DESC LIMIT 10");
    $recent = $recentStmt->fetchAll();
    
    sendSuccess([
        'total_registrations' => (int)$total['count'],
        'total_masters' => (int)$masters['count'],
        'total_students' => (int)$students['count'],
        'pending_payments' => (int)$pending['count'],
        'approved_payments' => (int)$approved['count'],
        'rejected_payments' => (int)$rejected['count'],
        'recent_registrations' => $recent
    ]);
} catch (PDOException $e) {
    sendError('Failed to fetch dashboard data: ' . $e->getMessage(), 500);
}