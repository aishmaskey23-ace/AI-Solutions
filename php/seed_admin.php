<?php
// ============================================================
// AI-Solutions | Admin Seeder Script
// Author: Aish Maskey | CET333 Product Development
//
// USAGE:
//   1. Make sure XAMPP is running (Apache + MySQL)
//   2. Import database.sql first via phpMyAdmin
//   3. Open browser: http://localhost/ai-solutions/php/seed_admin.php
//   4. This creates the admin user with username: admin / password: admin123
//   5. DELETE this file after use for security!
// ============================================================

require_once __DIR__ . '/db.php';

$username = 'admin';
$email    = 'admin@ai-solutions.com';
$password = 'admin123';
$hash     = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

try {
    $pdo  = getDB();

    // Remove old placeholder admin if exists
    $pdo->prepare("DELETE FROM admins WHERE username = :u")->execute([':u' => $username]);

    // Insert real admin
    $stmt = $pdo->prepare("INSERT INTO admins (username, email, password_hash) VALUES (:u, :e, :h)");
    $stmt->execute([':u' => $username, ':e' => $email, ':h' => $hash]);

    echo "<h2 style='font-family:sans-serif;color:green;'>✅ Admin user created successfully!</h2>";
    echo "<p style='font-family:sans-serif;'>Username: <strong>{$username}</strong><br>Password: <strong>{$password}</strong></p>";
    echo "<p style='font-family:sans-serif;color:red;'><strong>⚠️ Delete this file immediately after use!</strong></p>";
    echo "<p><a href='../admin/login.html' style='font-family:sans-serif;'>→ Go to Admin Login</a></p>";
} catch (PDOException $e) {
    echo "<h2 style='font-family:sans-serif;color:red;'>❌ Error: " . htmlspecialchars($e->getMessage()) . "</h2>";
}
