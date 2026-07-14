<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

// Verify admin using bcrypt password verification
verifyAdmin($conn);

// Build query with filters
$query = "SELECT * FROM participants WHERE 1=1";
$params = [];

if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search = '%' . trim($_GET['search']) . '%';
    $query .= " AND (name LIKE ? OR registration_number LIKE ? OR phone LIKE ? OR father_name LIKE ?)";
    array_push($params, $search, $search, $search, $search);
}

if (isset($_GET['category']) && !empty($_GET['category'])) {
    $query .= " AND category = ?";
    $params[] = $_GET['category'];
}

if (isset($_GET['payment_status']) && !empty($_GET['payment_status'])) {
    $query .= " AND payment_status = ?";
    $params[] = $_GET['payment_status'];
}

if (isset($_GET['district']) && !empty($_GET['district'])) {
    $query .= " AND district = ?";
    $params[] = $_GET['district'];
}

if (isset($_GET['date_from']) && !empty($_GET['date_from'])) {
    $query .= " AND DATE(created_at) >= ?";
    $params[] = $_GET['date_from'];
}

if (isset($_GET['date_to']) && !empty($_GET['date_to'])) {
    $query .= " AND DATE(created_at) <= ?";
    $params[] = $_GET['date_to'];
}

$query .= " ORDER BY id DESC";

$stmt = $conn->prepare($query);
$stmt->execute($params);
$participants = $stmt->fetchAll();

// Get distinct districts for filter
$districtStmt = $conn->query("SELECT DISTINCT district FROM participants ORDER BY district");
$districts = $districtStmt->fetchAll(PDO::FETCH_COLUMN);

sendSuccess([
    'participants' => $participants,
    'districts' => $districts,
    'total' => count($participants)
]);