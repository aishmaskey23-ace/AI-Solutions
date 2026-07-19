<?php
// ============================================================
// AI-Solutions | Save Feedback
// ============================================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once 'db.php';

try {
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw, true);

    $name     = trim($data['name']     ?? '');
    $email    = trim($data['email']    ?? '');
    $category = trim($data['category'] ?? 'General');
    $rating   = (int)($data['rating']  ?? 5);
    $message  = trim($data['message']  ?? '');

    if (empty($name) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Name and message are required.']);
        exit;
    }
    if ($rating < 1 || $rating > 5) $rating = 5;

    $allowed = ['General','UI/UX','Services','Pricing','Support','Other'];
    if (!in_array($category, $allowed)) $category = 'General';

    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
    $ip = substr($ip, 0, 45);

    $db   = getDB();
    $stmt = $db->prepare(
        'INSERT INTO site_feedback (name, email, category, rating, message, ip_address)
         VALUES (:name, :email, :category, :rating, :message, :ip)'
    );
    $stmt->execute([
        ':name'     => substr($name, 0, 120),
        ':email'    => substr($email, 0, 180),
        ':category' => $category,
        ':rating'   => $rating,
        ':message'  => $message,
        ':ip'       => $ip,
    ]);

    echo json_encode(['success' => true, 'message' => 'Feedback submitted successfully!']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again.']);
}
