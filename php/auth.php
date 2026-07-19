<?php
// ============================================================
// AI-Solutions | Session / Auth Helper
// Author: Aish Maskey | CET333 Product Development
// ============================================================

if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure'   => false,   // Set true in production (HTTPS)
        'cookie_samesite' => 'Strict',
    ]);
}

/**
 * Require admin to be logged in.
 * Redirects to login page if not authenticated.
 */
function requireAdmin(): void {
    if (empty($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        header('Location: login.html');
        exit;
    }
}

/**
 * Log the admin in and regenerate session ID.
 */
function loginAdmin(int $adminId, string $username): void {
    session_regenerate_id(true);
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_id']        = $adminId;
    $_SESSION['admin_username']  = $username;
    $_SESSION['login_time']      = time();
}

/**
 * Log the admin out.
 */
function logoutAdmin(): void {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}
