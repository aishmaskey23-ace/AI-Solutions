<?php
// ============================================================
// AI-Solutions | Event Registration Handler
// ============================================================

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/db.php';

// Honeypot
if (!empty($_POST['website'])) {
    echo json_encode(['success' => false, 'message' => 'Spam detected.']);
    exit;
}

// Collect & sanitize
$fullName  = sanitize($_POST['full_name']  ?? '');
$email     = sanitize($_POST['email']      ?? '');
$phone     = sanitize($_POST['phone']      ?? '');
$company   = sanitize($_POST['company']    ?? '');
$country   = sanitize($_POST['country']    ?? '');
$jobTitle  = sanitize($_POST['job_title']  ?? '');
$eventName = sanitize($_POST['event_name'] ?? '');
$eventDate = sanitize($_POST['event_date'] ?? '');
$dietary   = sanitize($_POST['dietary']    ?? '');
$message   = sanitize($_POST['message']    ?? '');

// Validate
$errors = [];
if (empty($fullName))                                             $errors[] = 'Full name is required.';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (empty($phone))                                               $errors[] = 'Phone number is required.';
if (empty($company))                                             $errors[] = 'Organisation / Company is required.';
if (empty($country))                                             $errors[] = 'Country is required.';
if (empty($jobTitle))                                            $errors[] = 'Job title is required.';
if (empty($eventName))                                           $errors[] = 'Please select an event.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

try {
    $pdo  = getDB();

    // Look up the matching event to populate the event_id foreign key.
    // The form's event_name includes a date suffix (e.g. "... (22 Jul)")
    // that isn't present in events.title, so match on event_date and
    // use the event title as a prefix of event_name.
    $eventId = null;
    $evStmt  = $pdo->prepare("SELECT id, title FROM events WHERE event_date = :date");
    $evStmt->execute([':date' => $eventDate]);
    foreach ($evStmt->fetchAll() as $ev) {
        if (stripos($eventName, $ev['title']) === 0) {
            $eventId = (int)$ev['id'];
            break;
        }
    }

    if ($eventId === null) {
        echo json_encode(['success' => false, 'message' => 'The selected event could not be found. Please choose an event again.']);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO event_registrations
            (event_id, full_name, email, phone, company, country, job_title, dietary_requirements, additional_message, status, created_at)
        VALUES
            (:event_id, :full_name, :email, :phone, :company, :country, :job_title, :dietary, :message, 'new', NOW())
    ");
    $stmt->execute([
        ':event_id'   => $eventId,
        ':full_name'  => $fullName,
        ':email'      => $email,
        ':phone'      => $phone,
        ':company'    => $company,
        ':country'    => $country,
        ':job_title'  => $jobTitle,
        ':dietary'    => $dietary,
        ':message'    => $message,
    ]);

    echo json_encode([
        'success' => true,
        'message' => "Thank you, {$fullName}! You are registered for <strong>{$eventName}</strong>. A confirmation will be sent to {$email} shortly."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again later. ' . $e->getMessage()]);
}
