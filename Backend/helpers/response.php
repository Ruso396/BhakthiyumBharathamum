<?php
function sendJson($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function sendSuccess($data = [], $message = 'Success') {
    sendJson([
        'success' => true,
        'message' => $message,
        'data' => $data
    ]);
}

function sendError($message = 'Something went wrong', $statusCode = 400) {
    sendJson([
        'success' => false,
        'message' => $message
    ], $statusCode);
}

function validateRequired($fields, $data) {
    $missing = [];
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $missing[] = $field;
        }
    }
    if (!empty($missing)) {
        sendError('Missing required fields: ' . implode(', ', $missing));
    }
}

function verifyAdmin($conn) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (empty($authHeader)) {
        sendError('Unauthorized - No token provided', 401);
    }
    
    $token = str_replace('Bearer ', '', $authHeader);
    $decoded = base64_decode($token);
    $parts = explode(':', $decoded);
    
    if (count($parts) !== 2) {
        sendError('Unauthorized - Invalid token format', 401);
    }
    
    $username = $parts[0];
    $password = $parts[1];
    
    $stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        sendError('Unauthorized - Admin not found', 401);
    }
    
    // Verify password against bcrypt hash
    if (!password_verify($password, $admin['password'])) {
        sendError('Unauthorized - Invalid password', 401);
    }
    
    return $admin;
}

function generateRegistrationNumber($conn) {
    $prefix = 'BB';
    $year = date('Y');
    
    $stmt = $conn->prepare("SELECT registration_number FROM participants WHERE registration_number LIKE ? ORDER BY id DESC LIMIT 1");
    $likePattern = $prefix . $year . '%';
    $stmt->execute([$likePattern]);
    $last = $stmt->fetch();
    
    if ($last) {
        $lastNum = (int)substr($last['registration_number'], -5);
        $newNum = $lastNum + 1;
    } else {
        $newNum = 1;
    }
    
    return $prefix . $year . str_pad($newNum, 5, '0', STR_PAD_LEFT);
}

function uploadFile($file, $targetDir = '../uploads/payment/') {
    if (!isset($file) || $file['error'] !== UPLOAD_ERR_OK) {
        sendError('File upload failed');
    }
    
    $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    $maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!in_array($file['type'], $allowedTypes)) {
        sendError('Only JPG, JPEG, and PNG files are allowed');
    }
    
    if ($file['size'] > $maxSize) {
        sendError('File size must be less than 10MB');
    }
    
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = time() . '_' . rand(100000, 999999) . '.' . $ext;
    $targetPath = $targetDir . $filename;
    
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        sendError('Failed to upload file');
    }
    
    return $filename;
}