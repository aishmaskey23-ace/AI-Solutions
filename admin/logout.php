<?php
// ============================================================
// AI-Solutions | Admin Logout
// ============================================================
require_once '../php/auth.php';
logoutAdmin();
header('Location: login.html?logout=1');
exit;
