<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

$requiredFields = ['category', 'name', 'father_name', 'phone', 'age', 'address', 'district', 'state', 'upi_id'];
$data = $_POST;

validateRequired($requiredFields, $data);

$category = trim($data['category']);
$name = trim($data['name']);
$father_name = trim($data['father_name']);
$phone = trim($data['phone']);
$age = trim($data['age']);
$address = trim($data['address']);
$district = trim($data['district']);
$state = trim($data['state']);
$upi_id = trim($data['upi_id']);

// Validate category
if (!in_array($category, ['Master', 'Student'])) {
    sendError('Invalid category. Must be Master or Student');
}

// Validate phone (10 digits)
if (!preg_match('/^[0-9]{10}$/', $phone)) {
    sendError('Phone number must be exactly 10 digits');
}

// Validate age (numeric, 1-150)
if (!ctype_digit($age) || $age < 1 || $age > 150) {
    sendError('Age must be a valid number between 1 and 150');
}

// Validate UPI ID format (basic validation)
if (!preg_match('/^[\w.\-_]+@[\w.\-_]+$/', $upi_id)) {
    sendError('Invalid UPI ID format');
}

// Check for duplicate registration (same phone + UPI)
$checkStmt = $conn->prepare("SELECT id FROM participants WHERE phone = ? AND upi_id = ?");
$checkStmt->execute([$phone, $upi_id]);
if ($checkStmt->fetch()) {
    sendError('A registration with this phone number and UPI ID already exists');
}

// Handle payment screenshot upload
if (!isset($_FILES['payment_screenshot'])) {
    sendError('Payment screenshot is required');
}
$screenshot = uploadFile($_FILES['payment_screenshot']);

// Generate registration number
$registration_number = generateRegistrationNumber($conn);

// Insert into database
$stmt = $conn->prepare("
    INSERT INTO participants (registration_number, category, name, father_name, phone, age, address, district, state, upi_id, payment_screenshot)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

try {
    $stmt->execute([
        $registration_number,
        $category,
        $name,
        $father_name,
        $phone,
        $age,
        $address,
        $district,
        $state,
        $upi_id,
        $screenshot
    ]);

    sendSuccess([
        'id' => $conn->lastInsertId(),
        'registration_number' => $registration_number
    ], 'Registration submitted successfully! Your registration number is: ' . $registration_number);

} catch (PDOException $e) {
    // If file was uploaded, clean it up
    $filePath = __DIR__ . '/../uploads/payment/' . $screenshot;
    if (file_exists($filePath)) {
        unlink($filePath);
    }
    sendError('Registration failed: ' . $e->getMessage(), 500);
}