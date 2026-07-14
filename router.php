<?php
/**
 * PHP Built-in Server Router
 * Run: php -S localhost:8000 router.php
 * 
 * Routes /api/* requests to Backend/api/*
 * Routes /uploads/* to Backend/uploads/*
 * Serves static files from Backend/ directory
 */

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Handle CORS preflight
if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit();
}

// Route /api/* to Backend/api/*
if (strpos($uri, '/api/') === 0) {
    $apiFile = __DIR__ . '/Backend' . $uri;
    if (file_exists($apiFile)) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        require $apiFile;
        return true;
    } else {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'API endpoint not found: ' . $uri]);
        return true;
    }
}

// Route /uploads/* to Backend/uploads/*
if (strpos($uri, '/uploads/') === 0) {
    $filePath = __DIR__ . '/Backend' . $uri;
    if (file_exists($filePath)) {
        // Set proper content type for images
        $ext = pathinfo($filePath, PATHINFO_EXTENSION);
        $mimeTypes = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ];
        if (isset($mimeTypes[$ext])) {
            header('Content-Type: ' . $mimeTypes[$ext]);
        }
        readfile($filePath);
        return true;
    } else {
        http_response_code(404);
        echo 'File not found';
        return true;
    }
}

// For root path, return 404 (this is API-only server)
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['success' => false, 'message' => 'Not found']);
return true;