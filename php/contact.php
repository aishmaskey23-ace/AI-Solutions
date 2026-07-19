<?php
// ============================================================
// AI-Solutions | Contact Form Handler (Backend PHP)
// Author: Aish Maskey | CET333 Product Development
// ============================================================

header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/db.php';

// Honeypot anti-spam check
if (!empty($_POST['website'])) {
    echo json_encode(['success' => false, 'message' => 'Spam detected.']);
    exit;
}

// Collect & sanitize
$fullName   = sanitize($_POST['full_name']   ?? '');
$email      = sanitize($_POST['email']       ?? '');
$phone      = sanitize($_POST['phone']       ?? '');
$company    = sanitize($_POST['company']     ?? '');
$country    = sanitize($_POST['country']     ?? '');
$jobTitle   = sanitize($_POST['job_title']   ?? '');
$service    = sanitize($_POST['service']     ?? '');
$jobDetails = sanitize($_POST['job_details'] ?? '');

// Validate
$errors = [];
if (empty($fullName))                                          $errors[] = 'Full name is required.';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (empty($phone))                                             $errors[] = 'Phone number is required.';
if (empty($company))                                           $errors[] = 'Company name is required.';
if (empty($country))                                           $errors[] = 'Country is required.';
if (empty($jobTitle))                                          $errors[] = 'Job title is required.';
if (empty($jobDetails) || strlen($jobDetails) < 10)            $errors[] = 'Please provide more detail in your message (at least 10 characters).';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Insert into DB
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare("
        INSERT INTO inquiries (full_name, email, phone, company, country, job_title, service_interest, job_details, status, created_at)
        VALUES (:full_name, :email, :phone, :company, :country, :job_title, :service, :job_details, 'new', NOW())
    ");
    $stmt->execute([
        ':full_name'   => $fullName,
        ':email'       => $email,
        ':phone'       => $phone,
        ':company'     => $company,
        ':country'     => $country,
        ':job_title'   => $jobTitle,
        ':service'     => $service,
        ':job_details' => $jobDetails,
    ]);

    echo json_encode([
        'success' => true,
        'message' => "Thank you, {$fullName}! Your message has been received. We'll be in touch within 24 hours."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.']);
}
// Rate limiting — max 3 submissions per IP per hour
session_start();
$ip  = $_SERVER['REMOTE_ADDR'];
$key = 'contact_submissions_' . md5($ip);

if (!isset($_SESSION[$key])) {
    $_SESSION[$key] = ['count' => 0, 'time' => time()];
}

// Reset after 1 hour
if (time() - $_SESSION[$key]['time'] > 3600) {
    $_SESSION[$key] = ['count' => 0, 'time' => time()];
}

// Block if more than 3 submissions
if ($_SESSION[$key]['count'] >= 3) {
    echo json_encode(['success' => false, 'message' => 'Too many submissions. Please try again later.']);
    exit;
}

$_SESSION[$key]['count']++;
