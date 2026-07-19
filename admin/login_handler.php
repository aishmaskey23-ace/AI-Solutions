<?php
// ============================================================
// AI-Solutions | Admin Login Handler
// Author: Aish Maskey | CET333 Product Development
// ============================================================

require_once '../php/db.php';
require_once '../php/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html');
    exit;
}

$username = sanitize($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    header('Location: login.html?error=1');
    exit;
}

try {
    $pdo  = getDB();
    $stmt = $pdo->prepare("SELECT id, username, password_hash FROM admins WHERE username = :username LIMIT 1");
    $stmt->execute([':username' => $username]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        loginAdmin($admin['id'], $admin['username']);
        header('Location: dashboard.php');
        exit;
    } else {
        header('Location: login.html?error=1');
        exit;
    }
} catch (PDOException $e) {
    header('Location: login.html?error=1');
    exit;
}
