<?php
// ============================================================
// AI-Solutions | Save Site Rating
// Receives JSON from features.js and stores in site_ratings
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

    $rating = isset($data['rating']) ? (int)$data['rating'] : 0;
    $page   = isset($data['page'])   ? substr(trim($data['page']), 0, 255) : '/';
    $feedbackId = isset($data['feedback_id']) && ctype_digit((string)$data['feedback_id']) ? (int)$data['feedback_id'] : null;

    if ($rating < 1 || $rating > 5) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid rating value']);
        exit;
    }

    $ip = $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? $_SERVER['REMOTE_ADDR']
        ?? 'unknown';
    $ip = substr($ip, 0, 45);

    $ua = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);

    $db   = getDB();
    $stmt = $db->prepare(
        'INSERT INTO site_ratings (rating, page, feedback_id, ip_address, user_agent)
         VALUES (:rating, :page, :feedback_id, :ip, :ua)'
    );
    $stmt->execute([
        ':rating' => $rating,
        ':page'   => $page,
        ':feedback_id' => $feedbackId,
        ':ip'     => $ip,
        ':ua'     => $ua,
    ]);

    echo json_encode(['success' => true, 'message' => 'Rating saved']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
