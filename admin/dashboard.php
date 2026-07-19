<?php
require_once '../php/db.php';
require_once '../php/auth.php';
requireAdmin();
$pdo = getDB();

if (isset($_GET['delete']) && ctype_digit($_GET['delete'])) {
    $pdo->prepare("DELETE FROM inquiries WHERE id = :id")->execute([':id' => (int)$_GET['delete']]);
    header('Location: dashboard.php?msg=deleted'); exit;
}
if (isset($_GET['read']) && ctype_digit($_GET['read'])) {
    $pdo->prepare("UPDATE inquiries SET status = 'read' WHERE id = :id")->execute([':id' => (int)$_GET['read']]);
    exit;
}

// Assign / unassign an inquiry to the currently logged-in admin
if (isset($_GET['assign']) && ctype_digit($_GET['assign'])) {
    $pdo->prepare("UPDATE inquiries SET admin_id = :aid WHERE id = :id")
        ->execute([':aid' => $_SESSION['admin_id'], ':id' => (int)$_GET['assign']]);
    header('Location: dashboard.php?msg=assigned'); exit;
}
if (isset($_GET['unassign']) && ctype_digit($_GET['unassign'])) {
    $pdo->prepare("UPDATE inquiries SET admin_id = NULL WHERE id = :id")
        ->execute([':id' => (int)$_GET['unassign']]);
    header('Location: dashboard.php?msg=unassigned'); exit;
}

// Handle event registration delete/read actions
if (isset($_GET['del_reg']) && ctype_digit($_GET['del_reg'])) {
    try { $pdo->prepare("DELETE FROM event_registrations WHERE id = :id")->execute([':id' => (int)$_GET['del_reg']]); } catch(Exception $e){}
    header('Location: dashboard.php?section=event_registrations&msg=reg_deleted'); exit;
}
if (isset($_GET['read_reg']) && ctype_digit($_GET['read_reg'])) {
    try { $pdo->prepare("UPDATE event_registrations SET status = 'read' WHERE id = :id")->execute([':id' => (int)$_GET['read_reg']]); } catch(Exception $e){}
    exit;
}

$totalCount = (int)$pdo->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();
$newCount   = (int)$pdo->query("SELECT COUNT(*) FROM inquiries WHERE status='new'")->fetchColumn();
$todayCount = (int)$pdo->query("SELECT COUNT(*) FROM inquiries WHERE DATE(created_at)=CURDATE()")->fetchColumn();
$weekCount  = (int)$pdo->query("SELECT COUNT(*) FROM inquiries WHERE created_at >= DATE_SUB(NOW(),INTERVAL 7 DAY)")->fetchColumn();
$serviceBreakdown = $pdo->query("SELECT COALESCE(NULLIF(service_interest,''),'Not specified') AS svc, COUNT(*) AS total FROM inquiries GROUP BY svc ORDER BY total DESC")->fetchAll();

// Event registration counts
$evRegTotal = 0; $evRegNew = 0;
try {
    $evRegTotal = (int)$pdo->query("SELECT COUNT(*) FROM event_registrations")->fetchColumn();
    $evRegNew   = (int)$pdo->query("SELECT COUNT(*) FROM event_registrations WHERE status='new'")->fetchColumn();
} catch(Exception $e){}

$chartRows = $pdo->query("SELECT DATE_FORMAT(created_at,'%b') AS month, COUNT(*) AS total FROM inquiries WHERE created_at >= DATE_SUB(NOW(),INTERVAL 6 MONTH) GROUP BY YEAR(created_at),MONTH(created_at) ORDER BY YEAR(created_at),MONTH(created_at)")->fetchAll();
$chartLabels = array_column($chartRows,'month');
$chartValues = array_map('intval', array_column($chartRows,'total'));

$search  = sanitize($_GET['search'] ?? '');
$like    = "%{$search}%";
$perPage = 10;
$page    = max(1,(int)($_GET['page'] ?? 1));
$offset  = ($page-1)*$perPage;

$cs = $pdo->prepare("SELECT COUNT(*) FROM inquiries WHERE full_name LIKE :s1 OR email LIKE :s2 OR company LIKE :s3 OR country LIKE :s4 OR job_title LIKE :s5");
$cs->execute([
    ':s1' => $like,
    ':s2' => $like,
    ':s3' => $like,
    ':s4' => $like,
    ':s5' => $like
]);
$filteredCount = (int)$cs->fetchColumn();
$totalPages    = (int)ceil($filteredCount/$perPage);

$stmt = $pdo->prepare("SELECT i.*, a.username AS assigned_username FROM inquiries i LEFT JOIN admins a ON i.admin_id = a.id WHERE i.full_name LIKE :s1 OR i.email LIKE :s2 OR i.company LIKE :s3 OR i.country LIKE :s4 OR i.job_title LIKE :s5 ORDER BY i.created_at DESC LIMIT :lim OFFSET :off");
$stmt->bindValue(':s1', $like, PDO::PARAM_STR);
$stmt->bindValue(':s2', $like, PDO::PARAM_STR);
$stmt->bindValue(':s3', $like, PDO::PARAM_STR);
$stmt->bindValue(':s4', $like, PDO::PARAM_STR);
$stmt->bindValue(':s5', $like, PDO::PARAM_STR);

$stmt->bindValue(':lim',$perPage,PDO::PARAM_INT);
$stmt->bindValue(':off',$offset,PDO::PARAM_INT);
$stmt->execute();
$inquiries = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Admin Dashboard — AI-Solutions</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%2300d4ff'/><text x='16' y='22' font-size='16' text-anchor='middle' fill='%23050a14'>✦</text></svg>"/>
  <link rel="stylesheet" href="../css/style.css?v=2"/>
  <link rel="stylesheet" href="../css/extras.css?v=2"/>
  <link rel="stylesheet" href="../css/admin.css?v=3"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="admin-body">
<div class="bg-grid"></div>
<div class="admin-wrapper">

<aside class="admin-sidebar">
  <div class="sidebar-logo"><div class="logo-icon">✦</div><span><span class="logo-gradient">AI</span>-Solutions</span></div>
  <div class="sidebar-section-label">Main Menu</div>
  <nav class="sidebar-nav" id="sidebar-nav">
    <a href="#" data-section="dashboard" class="sidebar-link active"><span class="s-icon">📊</span> Dashboard <?php if($newCount>0):?><span class="sidebar-badge"><?=$newCount?></span><?php endif;?></a>
    <a href="#" data-section="inquiries" class="sidebar-link"><span class="s-icon">📩</span> Inquiries</a>
    <a href="#" data-section="event_registrations" class="sidebar-link"><span class="s-icon">🎟️</span> Event Registrations <?php if($evRegNew>0):?><span class="sidebar-badge"><?=$evRegNew?></span><?php endif;?></a>
    <a href="#" data-section="analytics" class="sidebar-link"><span class="s-icon">📈</span> Analytics</a>
    <a href="#" data-section="ratings" class="sidebar-link"><span class="s-icon">⭐</span> User Ratings</a>
    <a href="#" data-section="feedback" class="sidebar-link"><span class="s-icon">💬</span> Feedback</a>
  </nav>
  <div class="sidebar-section-label">Website</div>
  <nav class="sidebar-nav">
    <a href="../index.html" target="_blank"><span class="s-icon">🌐</span> View Website</a>
    <a href="../pages/contact.html" target="_blank"><span class="s-icon">📋</span> Contact Form</a>
    <a href="../pages/register-event.html" target="_blank"><span class="s-icon">🎟️</span> Event Reg Form</a>
  </nav>
  <div class="sidebar-footer">
    <div class="admin-user-card">
      <div class="admin-user-avatar"><?=strtoupper(substr($_SESSION['admin_username']??'A',0,1))?></div>
      <div><div class="admin-user-name"><?=htmlspecialchars($_SESSION['admin_username']??'Admin')?></div><div class="admin-user-role">Administrator</div></div>
    </div>
    <a href="logout.php" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;">🚪 Sign Out</a>
  </div>
</aside>

<main class="admin-main">
  <div class="admin-topbar">
    <div class="admin-topbar-left">
      <button class="admin-sidebar-toggle" id="sidebar-toggle" aria-label="Toggle menu">☰ Menu</button>
      <h2 class="admin-topbar-title">📊 Admin Dashboard</h2>
    </div>
    <div class="admin-topbar-right"><span class="admin-date">📅 <?=date('D, d M Y')?></span><div class="theme-toggle" id="theme-toggle" title="Toggle dark/light mode"><div class="theme-toggle-thumb">🌙</div></div><a href="logout.php" class="btn btn-outline btn-sm">Sign Out</a></div>
  </div>
  <div class="admin-content">

    <?php if(isset($_GET['msg'])&&$_GET['msg']==='deleted'):?>
      <div class="admin-alert admin-alert-success" data-auto-dismiss>✅ Inquiry deleted successfully.</div>
    <?php endif;?>
    <?php if(isset($_GET['msg'])&&$_GET['msg']==='assigned'):?>
      <div class="admin-alert admin-alert-success" data-auto-dismiss>✅ Inquiry assigned to you.</div>
    <?php endif;?>
    <?php if(isset($_GET['msg'])&&$_GET['msg']==='unassigned'):?>
      <div class="admin-alert admin-alert-success" data-auto-dismiss>✅ Inquiry unassigned.</div>
    <?php endif;?>

    <div class="dash-stats-row" id="section-dashboard">
      <div class="dash-stat-card" style="--stat-color:var(--accent)"><div class="dash-stat-icon">📩</div><div class="dash-stat-value"><?=$totalCount?></div><div class="dash-stat-label">Total Inquiries</div><div class="dash-stat-sub">All time submissions</div></div>
      <div class="dash-stat-card" style="--stat-color:#ff6b6b"><div class="dash-stat-icon">🔔</div><div class="dash-stat-value"><?=$newCount?></div><div class="dash-stat-label">New / Unread</div><div class="dash-stat-sub"><?=$newCount>0?$newCount.' awaiting review':'All caught up ✅'?></div></div>
      <div class="dash-stat-card" style="--stat-color:var(--accent3)"><div class="dash-stat-icon">📅</div><div class="dash-stat-value"><?=$todayCount?></div><div class="dash-stat-label">Today's Inquiries</div><div class="dash-stat-sub"><?=date('d M Y')?></div></div>
      <div class="dash-stat-card" style="--stat-color:var(--accent2)"><div class="dash-stat-icon">📆</div><div class="dash-stat-value"><?=$weekCount?></div><div class="dash-stat-label">This Week</div><div class="dash-stat-sub">Last 7 days</div></div>
      <div class="dash-stat-card" style="--stat-color:#a78bfa"><div class="dash-stat-icon">🎟️</div><div class="dash-stat-value"><?=$evRegTotal?></div><div class="dash-stat-label">Event Registrations</div><div class="dash-stat-sub"><?=$evRegNew?> new</div></div>
    </div>

    <div class="chart-card" id="section-analytics">
      <div class="chart-card-header"><h3>📈 Inquiries — Last 6 Months</h3><span style="font-size:.82rem;color:var(--text-muted)">Monthly breakdown</span></div>
      <canvas id="inquiry-chart" height="80"></canvas>
    </div>

    <div class="chart-card" style="margin-top:24px;">
      <div class="chart-card-header"><h3>📊 Inquiries by Service Interest</h3><span style="font-size:.82rem;color:var(--text-muted)">Number of customers per interest type</span></div>
      <div style="overflow-x:auto;margin-top:16px;">
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color,#e5e7eb);">
              <th style="text-align:left;padding:10px 12px;font-weight:600;">Service / Interest</th>
              <th style="text-align:center;padding:10px 12px;font-weight:600;">Inquiries</th>
              <th style="text-align:left;padding:10px 12px;font-weight:600;">Demand Bar</th>
            </tr>
          </thead>
          <tbody>
            <?php
              $maxSvc = !empty($serviceBreakdown) ? max(array_column($serviceBreakdown,'total')) : 1;
              $colors = ['Schedule a Demo'=>'#6366f1','Join Our Events'=>'#f59e0b','AI Virtual Assistant'=>'#10b981','AI Prototyping Solutions'=>'#3b82f6','AI Automation'=>'#8b5cf6','AI Chatbot Development'=>'#ec4899','AI Analytics'=>'#14b8a6','Smart Business Solutions'=>'#f97316','Not sure yet'=>'#9ca3af','Not specified'=>'#d1d5db'];
              foreach($serviceBreakdown as $row):
                $pct = $maxSvc > 0 ? round(($row['total']/$maxSvc)*100) : 0;
                $col = $colors[$row['svc']] ?? '#6366f1';
            ?>
            <tr style="border-bottom:1px solid var(--border-color,#f3f4f6);">
              <td style="padding:10px 12px;"><?=htmlspecialchars($row['svc'])?></td>
              <td style="text-align:center;padding:10px 12px;font-weight:700;"><?=(int)$row['total']?></td>
              <td style="padding:10px 12px;">
                <div style="background:#f3f4f6;border-radius:4px;height:10px;width:100%;">
                  <div style="background:<?=$col?>;border-radius:4px;height:10px;width:<?=$pct?>%;"></div>
                </div>
              </td>
            </tr>
            <?php endforeach; ?>
            <?php if(empty($serviceBreakdown)): ?>
            <tr><td colspan="3" style="padding:16px;text-align:center;color:#9ca3af;">No inquiries yet. Submit a contact form to see data here.</td></tr>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>

    <div class="data-card" id="section-inquiries">
      <div class="data-card-header">
        <h3>📩 Customer Inquiries <span style="font-size:.82rem;color:var(--text-muted);font-weight:400">(<?=$filteredCount?> result<?=$filteredCount!==1?'s':''?>)</span></h3>
        <div class="data-card-header-actions">
          <form method="GET" style="display:flex;gap:8px;align-items:center;">
            <input type="text" name="search" class="admin-search-input" placeholder="🔍 Search…" value="<?=htmlspecialchars($search)?>"/>
            <button type="submit" class="btn btn-primary btn-sm">Search</button>
            <?php if($search):?><a href="dashboard.php" class="btn btn-ghost btn-sm">✕ Clear</a><?php endif;?>
          </form>
        </div>
      </div>

      <?php if(empty($inquiries)):?>
        <div class="empty-state"><div class="empty-icon">📭</div><h3>No inquiries found</h3><p><?=$search?'Try a different search term.':'Inquiries from the contact form appear here.'?></p></div>
      <?php else:?>
        <div class="admin-table-scroll">
          <table class="admin-table" id="inquiries-table">
            <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Company</th><th>Country</th><th>Job Title</th><th>Service</th><th>Status</th><th>Assigned</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              <?php foreach($inquiries as $row):?>
                <tr data-id="<?=(int)$row['id']?>">
                  <td style="color:var(--text-muted);font-size:.82rem"><?=(int)$row['id']?></td>
                  <td style="font-weight:600;white-space:nowrap"><?=htmlspecialchars($row['full_name'])?></td>
                  <td><a href="mailto:<?=htmlspecialchars($row['email'])?>" style="color:var(--accent);font-size:.85rem"><?=htmlspecialchars($row['email'])?></a></td>
                  <td style="font-size:.87rem"><?=htmlspecialchars($row['company'])?></td>
                  <td style="font-size:.87rem"><?=htmlspecialchars($row['country'])?></td>
                  <td style="font-size:.82rem;color:var(--text-secondary)"><?=htmlspecialchars($row['job_title'])?></td>
                  <td style="font-size:.82rem;color:var(--text-muted)"><?=htmlspecialchars($row['service_interest']??'—')?></td>
                  <td><?php if($row['status']==='new'):?><span class="status-badge status-new">New</span><?php elseif($row['status']==='archived'):?><span class="status-badge status-archived">Archived</span><?php else:?><span class="status-badge status-read">Read</span><?php endif;?></td>
                  <td style="font-size:.82rem;color:var(--text-secondary);white-space:nowrap">
                    <?php if($row['assigned_username']):?>
                      <span title="Assigned">👤 <?=htmlspecialchars($row['assigned_username'])?></span>
                    <?php else:?>
                      <span style="color:var(--text-muted)">— Unassigned</span>
                    <?php endif;?>
                  </td>
                  <td style="font-size:.82rem;color:var(--text-muted);white-space:nowrap"><?=date('d M Y',strtotime($row['created_at']))?></td>
                  <td style="white-space:nowrap">
                    <button class="act-btn act-view" onclick="viewInquiry(<?=htmlspecialchars(json_encode($row),ENT_QUOTES)?>)">👁 View</button>
                    <?php if($row['admin_id']):?>
                      <a href="?unassign=<?=(int)$row['id']?>" class="act-btn act-view">↩ Unassign</a>
                    <?php else:?>
                      <a href="?assign=<?=(int)$row['id']?>" class="act-btn act-view">✅ Assign to me</a>
                    <?php endif;?>
                    <button class="act-btn act-delete" onclick="confirmDelete(<?=(int)$row['id']?>,'<?=htmlspecialchars(addslashes($row['full_name']))?>')">🗑 Delete</button>
                  </td>
                </tr>
              <?php endforeach;?>
            </tbody>
          </table>
        </div>
        <?php if($totalPages>1):?>
          <div class="admin-pagination">
            <a href="?page=<?=max(1,$page-1)?>&search=<?=urlencode($search)?>" class="pg-btn <?=$page<=1?'disabled':''?>">← Prev</a>
            <?php for($p=1;$p<=$totalPages;$p++):?><a href="?page=<?=$p?>&search=<?=urlencode($search)?>" class="pg-btn <?=$p===$page?'active':''?>"><?=$p?></a><?php endfor;?>
            <a href="?page=<?=min($totalPages,$page+1)?>&search=<?=urlencode($search)?>" class="pg-btn <?=$page>=$totalPages?'disabled':''?>">Next →</a>
          </div>
        <?php endif;?>
      <?php endif;?>
    </div>

    <!-- Website Ratings Panel — PHP/DB powered -->
    <div class="data-card" style="margin-top:32px;" id="section-ratings">
      <div class="data-card-header">
        <h3>⭐ Website Ratings from Visitors</h3>
        <span style="font-size:.82rem;color:var(--text-muted)">Submitted via the rating widget on the main site</span>
      </div>
      <div style="padding:0;">
      <?php
        try {
          $db2   = getDB();
          $total = (int)$db2->query('SELECT COUNT(*) FROM site_ratings')->fetchColumn();
          $avg   = $total > 0 ? (float)$db2->query('SELECT AVG(rating) FROM site_ratings')->fetchColumn() : 0;
          $week  = (int)$db2->query("SELECT COUNT(*) FROM site_ratings WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)")->fetchColumn();
          $five  = (int)$db2->query('SELECT COUNT(*) FROM site_ratings WHERE rating=5')->fetchColumn();
          $dist  = [];
          for ($i=1;$i<=5;$i++) $dist[$i] = (int)$db2->query("SELECT COUNT(*) FROM site_ratings WHERE rating=$i")->fetchColumn();
          $recent = $db2->query('SELECT * FROM site_ratings ORDER BY created_at DESC LIMIT 10')->fetchAll();

          if ($total == 0) {
            echo '<div class="empty-state" style="padding:40px 20px;text-align:center;"><div class="empty-icon">⭐</div><h3>No ratings yet</h3><p>When visitors submit a rating on the main website, it will appear here instantly.</p></div>';
          } else {
            $avgRound = number_format($avg, 1);
            $starsFull = str_repeat('★', (int)round($avg));
            $starsEmpty = str_repeat('☆', 5 - (int)round($avg));
      ?>
        <div class="ratings-stats-grid">
          <div class="dash-stat-card" style="--stat-color:#fbbf24">
            <div class="dash-stat-icon">⭐</div>
            <div class="dash-stat-value"><?= $avgRound ?></div>
            <div class="dash-stat-label">Average Rating</div>
            <div class="dash-stat-sub" style="color:#fbbf24;letter-spacing:2px;font-size:1.1rem;"><?= $starsFull.$starsEmpty ?></div>
          </div>
          <div class="dash-stat-card" style="--stat-color:var(--accent)">
            <div class="dash-stat-icon">📊</div>
            <div class="dash-stat-value"><?= $total ?></div>
            <div class="dash-stat-label">Total Ratings</div>
            <div class="dash-stat-sub">All time submissions</div>
          </div>
          <div class="dash-stat-card" style="--stat-color:var(--accent3)">
            <div class="dash-stat-icon">🌟</div>
            <div class="dash-stat-value"><?= $five ?></div>
            <div class="dash-stat-label">5-Star Ratings</div>
            <div class="dash-stat-sub"><?= $total > 0 ? round($five/$total*100) : 0 ?>% of total</div>
          </div>
          <div class="dash-stat-card" style="--stat-color:var(--accent2)">
            <div class="dash-stat-icon">📅</div>
            <div class="dash-stat-value"><?= $week ?></div>
            <div class="dash-stat-label">This Week</div>
            <div class="dash-stat-sub">Last 7 days</div>
          </div>
        </div>

        <div class="ratings-detail-grid">
          <div class="data-card" style="padding:20px;">
            <h4 style="margin-bottom:16px;font-family:var(--font-display);font-size:.95rem;">⭐ Rating Breakdown</h4>
            <?php for($i=5;$i>=1;$i--): $pct = $total > 0 ? round($dist[$i]/$total*100) : 0; ?>
            <div class="rating-bar-row">
              <span class="rating-bar-label"><?= $i ?>★</span>
              <div class="rating-bar-bg"><div class="rating-bar-fill" style="width:<?= $pct ?>%"></div></div>
              <span class="rating-bar-count"><?= $dist[$i] ?></span>
            </div>
            <?php endfor; ?>
          </div>

          <div class="data-card" style="padding:0;overflow:hidden;">
            <div class="data-card-header" style="padding:16px 20px;"><h4 style="font-family:var(--font-display);font-size:.95rem;">📋 Recent Ratings</h4></div>
            <div class="admin-table-scroll">
            <table class="admin-table">
              <thead><tr><th>#</th><th>Rating</th><th>Stars</th><th>Page</th><th>Date & Time</th></tr></thead>
              <tbody>
              <?php foreach($recent as $idx => $r): ?>
                <tr>
                  <td style="color:var(--text-muted);font-size:.8rem;"><?= $total - $idx ?></td>
                  <td><strong><?= $r['rating'] ?>/5</strong></td>
                  <td style="color:#fbbf24;letter-spacing:2px;"><?= str_repeat('★',$r['rating']) ?></td>
                  <td style="font-size:.8rem;color:var(--text-muted);"><?= htmlspecialchars($r['page']) ?></td>
                  <td style="font-size:.8rem;color:var(--text-muted);white-space:nowrap;"><?= date('d M Y, H:i', strtotime($r['created_at'])) ?></td>
                </tr>
              <?php endforeach; ?>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      <?php } } catch(Exception $e) { ?>
        <div style="padding:32px;text-align:center;">
          <div class="empty-icon">⚙️</div>
          <h3 style="margin:12px 0 8px;font-family:var(--font-display);">One quick setup step needed</h3>
          <p style="color:var(--text-muted);max-width:500px;margin:0 auto;">Open <strong>phpMyAdmin</strong>, select your <code>ai_solutions</code> database, go to the <strong>SQL</strong> tab, and run:<br><br>
          <code style="background:var(--bg-card);padding:8px 14px;border-radius:6px;display:inline-block;margin-top:8px;">
          CREATE TABLE IF NOT EXISTS site_ratings (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, rating TINYINT UNSIGNED NOT NULL, page VARCHAR(255) NOT NULL DEFAULT '/', feedback_id INT UNSIGNED DEFAULT NULL, ip_address VARCHAR(45) DEFAULT '', user_agent VARCHAR(255) DEFAULT '', created_at DATETIME DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
          </code></p>
        </div>
      <?php } ?>
      </div>
    </div>

    <!-- ══ EVENT REGISTRATIONS PANEL ══════════════════════════════ -->
    <div class="data-card" style="margin-top:32px;" id="section-event_registrations">
      <div class="data-card-header">
        <h3>🎟️ Event Registrations</h3>
        <span style="font-size:.82rem;color:var(--text-muted)">Submitted via the Event Registration form</span>
      </div>
      <?php
        $evRegs = [];
        try {
          $erStmt = $pdo->query("SELECT er.*, e.title AS event_title, e.event_date AS event_date FROM event_registrations er LEFT JOIN events e ON er.event_id = e.id ORDER BY er.created_at DESC LIMIT 50");
          $evRegs = $erStmt->fetchAll();
        } catch(Exception $e){}

        if(isset($_GET['msg']) && $_GET['msg']==='reg_deleted'):?>
      <div class="alert-success" style="padding:12px 18px;background:rgba(0,255,170,.08);border:1px solid rgba(0,255,170,.2);border-radius:8px;margin-bottom:16px;color:#00ffaa;">✅ Registration deleted.</div>
        <?php endif;?>
      <div style="margin-bottom:14px;font-size:.88rem;color:var(--text-secondary);">
        Total: <strong><?=$evRegTotal?></strong> &nbsp;|&nbsp; New: <strong style="color:var(--accent)"><?=$evRegNew?></strong>
      </div>
      <?php if(empty($evRegs)):?>
        <div style="text-align:center;padding:48px;color:var(--text-muted);">
          <div style="font-size:3rem;margin-bottom:12px;">🎟️</div>
          <p>No event registrations yet. They will appear here once visitors register.</p>
        </div>
      <?php else:?>
      <div style="overflow-x:auto;">
        <table class="admin-table" style="width:100%;">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Event</th>
              <th>Country</th>
              <th>Company</th>
              <th>Job Title</th>
              <th>Dietary / Notes</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          <?php foreach($evRegs as $reg):?>
            <tr class="<?=($reg['status']==='new')?'row-new':''?>">
              <td><?=$reg['id']?></td>
              <td><strong><?=htmlspecialchars($reg['full_name'])?></strong></td>
              <td><a href="mailto:<?=htmlspecialchars($reg['email'])?>"><?=htmlspecialchars($reg['email'])?></a></td>
              <td><?=htmlspecialchars($reg['phone'])?></td>
              <td style="max-width:200px;white-space:normal;font-size:.82rem;"><?=htmlspecialchars($reg['event_title'] ?? '—')?><?php if($reg['event_date']):?><br><span style="color:var(--text-muted)"><?=date('d M Y', strtotime($reg['event_date']))?></span><?php endif;?></td>
              <td><?=htmlspecialchars($reg['country'])?></td>
              <td><?=htmlspecialchars($reg['company'])?></td>
              <td><?=htmlspecialchars($reg['job_title'])?></td>
              <td style="max-width:180px;white-space:normal;font-size:.82rem;"><?=htmlspecialchars(($reg['dietary_requirements']?:'-').($reg['additional_message']?' | '.$reg['additional_message']:''))?></td>
              <td><span class="status-badge status-<?=$reg['status']?>"><?=$reg['status']?></span></td>
              <td style="white-space:nowrap;font-size:.82rem;"><?=date('d M Y', strtotime($reg['created_at']))?></td>
              <td style="white-space:nowrap;">
                <?php if($reg['status']==='new'):?>
                <button class="btn btn-ghost btn-xs er-read-btn" data-id="<?=$reg['id']?>">Mark Read</button>
                <?php endif;?>
                <a href="?del_reg=<?=$reg['id']?>" class="btn btn-danger btn-xs" onclick="return confirm('Delete this registration?')">Delete</a>
              </td>
            </tr>
          <?php endforeach;?>
          </tbody>
        </table>
      </div>
      <?php endif;?>
    </div>

    <!-- ══ FEEDBACK PANEL ════════════════════════════════════════ -->
    <div class="data-card" style="margin-top:32px;" id="section-feedback">
      <div class="data-card-header">
        <h3>💬 Website Feedback from Visitors</h3>
        <span style="font-size:.82rem;color:var(--text-muted)">Submitted via the feedback form on the main site</span>
      </div>
      <?php
        try {
          $fdb   = getDB();
          $ftotal = (int)$fdb->query('SELECT COUNT(*) FROM site_feedback')->fetchColumn();
          $fnew   = (int)$fdb->query("SELECT COUNT(*) FROM site_feedback WHERE status='new'")->fetchColumn();
          $fweek  = (int)$fdb->query("SELECT COUNT(*) FROM site_feedback WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)")->fetchColumn();
          $favg   = $ftotal > 0 ? (float)$fdb->query('SELECT AVG(rating) FROM site_feedback')->fetchColumn() : 0;

          // Category distribution
          $fcats = $fdb->query("SELECT category, COUNT(*) as cnt FROM site_feedback GROUP BY category ORDER BY cnt DESC")->fetchAll();

          // Mark as read
          if (isset($_GET['fb_read']) && ctype_digit($_GET['fb_read'])) {
            $fdb->prepare("UPDATE site_feedback SET status='read', reviewed_by=:aid WHERE id=:id")->execute([':aid'=>$_SESSION['admin_id'], ':id'=>(int)$_GET['fb_read']]);
            header('Location: dashboard.php#section-feedback'); exit;
          }
          if (isset($_GET['fb_delete']) && ctype_digit($_GET['fb_delete'])) {
            $fdb->prepare("DELETE FROM site_feedback WHERE id=:id")->execute([':id'=>(int)$_GET['fb_delete']]);
            header('Location: dashboard.php#section-feedback'); exit;
          }

          $flist = $fdb->query('SELECT * FROM site_feedback ORDER BY created_at DESC LIMIT 50')->fetchAll();

          if ($ftotal == 0) {
            echo '<div class="empty-state" style="padding:40px;text-align:center;"><div class="empty-icon">💬</div><h3>No feedback yet</h3><p>When visitors submit feedback on the website, it will appear here.</p></div>';
          } else {
            $avgStars = str_repeat('★',(int)round($favg)) . str_repeat('☆', 5-(int)round($favg));
      ?>
        <!-- Summary stats -->
        <div class="feedback-stats-grid">
          <div class="dash-stat-card" style="--stat-color:var(--accent)">
            <div class="dash-stat-icon">💬</div>
            <div class="dash-stat-value"><?= $ftotal ?></div>
            <div class="dash-stat-label">Total Feedback</div>
            <div class="dash-stat-sub">All time submissions</div>
          </div>
          <div class="dash-stat-card" style="--stat-color:#ff6b6b">
            <div class="dash-stat-icon">🔔</div>
            <div class="dash-stat-value"><?= $fnew ?></div>
            <div class="dash-stat-label">New / Unread</div>
            <div class="dash-stat-sub"><?= $fnew > 0 ? $fnew.' awaiting review' : 'All caught up ✅' ?></div>
          </div>
          <div class="dash-stat-card" style="--stat-color:var(--accent3)">
            <div class="dash-stat-icon">⭐</div>
            <div class="dash-stat-value"><?= number_format($favg,1) ?></div>
            <div class="dash-stat-label">Avg Rating</div>
            <div class="dash-stat-sub" style="color:#fbbf24;letter-spacing:2px;"><?= $avgStars ?></div>
          </div>
          <div class="dash-stat-card" style="--stat-color:var(--accent2)">
            <div class="dash-stat-icon">📅</div>
            <div class="dash-stat-value"><?= $fweek ?></div>
            <div class="dash-stat-label">This Week</div>
            <div class="dash-stat-sub">Last 7 days</div>
          </div>
        </div>

        <!-- Category breakdown -->
        <?php if (!empty($fcats)): ?>
        <div style="padding:16px 24px;display:flex;flex-wrap:wrap;gap:8px;border-bottom:1px solid var(--border);">
          <span style="font-size:.8rem;color:var(--text-muted);margin-right:4px;align-self:center;">By category:</span>
          <?php foreach($fcats as $cat): ?>
          <span style="background:rgba(0,212,255,.1);color:var(--accent);border:1px solid rgba(0,212,255,.25);padding:4px 12px;border-radius:100px;font-size:.78rem;font-weight:600;">
            <?= htmlspecialchars($cat['category']) ?> <strong>(<?= $cat['cnt'] ?>)</strong>
          </span>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <!-- Feedback table -->
        <div class="admin-table-scroll">
          <table class="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            <?php foreach($flist as $fb): ?>
              <tr <?= $fb['status']==='new' ? 'style="background:rgba(0,212,255,.03);"' : '' ?>>
                <td style="color:var(--text-muted);font-size:.8rem;"><?= $fb['id'] ?></td>
                <td><strong><?= htmlspecialchars($fb['name']) ?></strong></td>
                <td style="font-size:.8rem;color:var(--text-muted);">
                  <?= $fb['email'] ? '<a href="mailto:'.htmlspecialchars($fb['email']).'" style="color:var(--accent)">'.htmlspecialchars($fb['email']).'</a>' : '—' ?>
                </td>
                <td><span style="background:rgba(123,94,167,.15);color:#a78bda;padding:3px 10px;border-radius:100px;font-size:.75rem;font-weight:600;"><?= htmlspecialchars($fb['category']) ?></span></td>
                <td style="color:#fbbf24;letter-spacing:1px;"><?= str_repeat('★',$fb['rating']) ?></td>
                <td style="max-width:280px;">
                  <div style="font-size:.83rem;color:var(--text-secondary);line-height:1.5;max-height:60px;overflow:hidden;cursor:pointer;" title="<?= htmlspecialchars($fb['message']) ?>" onclick="this.style.maxHeight=this.style.maxHeight==='none'?'60px':'none'">
                    <?= htmlspecialchars($fb['message']) ?>
                  </div>
                </td>
                <td>
                  <?php if($fb['status']==='new'): ?>
                    <span class="fb-badge-new">🔵 New</span>
                  <?php elseif($fb['status']==='read'): ?>
                    <span class="fb-badge-read">✅ Read</span>
                  <?php else: ?>
                    <span class="fb-badge-archived">📁 Archived</span>
                  <?php endif; ?>
                </td>
                <td style="font-size:.78rem;color:var(--text-muted);white-space:nowrap;"><?= date('d M Y', strtotime($fb['created_at'])) ?></td>
                <td>
                  <div style="display:flex;gap:6px;">
                    <?php if($fb['status']==='new'): ?>
                    <a href="?fb_read=<?= $fb['id'] ?>" class="btn btn-ghost btn-sm" style="font-size:.72rem;padding:4px 8px;" title="Mark as read">✓ Read</a>
                    <?php endif; ?>
                    <a href="?fb_delete=<?= $fb['id'] ?>" class="btn btn-ghost btn-sm" style="font-size:.72rem;padding:4px 8px;color:#ff6b6b;" onclick="return confirm('Delete this feedback?')" title="Delete">🗑</a>
                  </div>
                </td>
              </tr>
            <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      <?php } } catch(Exception $e) { ?>
        <div style="padding:32px;text-align:center;">
          <div class="empty-icon">⚙️</div>
          <h3 style="margin:12px 0 8px;font-family:var(--font-display);">One quick setup step needed</h3>
          <p style="color:var(--text-muted);max-width:520px;margin:0 auto;">
            Open <strong>phpMyAdmin</strong> → select <code>ai_solutions</code> → <strong>SQL tab</strong> → run:<br><br>
            <code style="background:var(--bg-card);padding:8px 14px;border-radius:6px;display:inline-block;margin-top:8px;font-size:.78rem;text-align:left;">
              CREATE TABLE IF NOT EXISTS site_feedback (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL, email VARCHAR(180) DEFAULT '', category VARCHAR(50) DEFAULT 'General', rating TINYINT UNSIGNED DEFAULT 5, message TEXT NOT NULL, status ENUM('new','read','archived') DEFAULT 'new', reviewed_by INT UNSIGNED DEFAULT NULL, ip_address VARCHAR(45) DEFAULT '', created_at DATETIME DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
            </code>
          </p>
        </div>
      <?php } ?>
    </div>

  </div>
</main>
</div>

<!-- View Modal -->
<div class="view-modal-overlay" id="view-modal">
  <div class="view-modal-box">
    <button class="view-modal-close" onclick="closeViewModal()">✕</button>
    <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:800;margin-bottom:24px;">📋 Inquiry Details</h2>
    <div id="view-modal-body"></div>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border)"><button class="btn btn-outline" onclick="closeViewModal()">Close</button></div>
  </div>
</div>

<script src="../js/admin.js?v=2"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // ── Chart
  initInquiryChart('inquiry-chart',
    <?=json_encode($chartLabels?:['Jan','Feb','Mar','Apr','May','Jun'])?>,
    <?=json_encode($chartValues?:[0,0,0,0,0,0])?>
  );

  // ── Mobile sidebar toggle
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var adminSidebar  = document.querySelector('.admin-sidebar');
  if (sidebarToggle && adminSidebar) {
    sidebarToggle.addEventListener('click', function() {
      adminSidebar.classList.toggle('mobile-open');
    });
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
      if (!adminSidebar.contains(e.target) && e.target !== sidebarToggle) {
        adminSidebar.classList.remove('mobile-open');
      }
    });
  }
  var links = document.querySelectorAll('#sidebar-nav .sidebar-link');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var sectionName = this.getAttribute('data-section');
      var target = document.getElementById('section-' + sectionName);

      // Update active state
      links.forEach(function(l) { l.classList.remove('active'); });
      this.classList.add('active');

      // Scroll to section
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
</script>
</body>
</html>

<!-- Ratings Panel (reads from localStorage via JS) -->
<script>
// Ratings panel — reads localStorage data submitted by users
(function() {
  function renderRatingsPanel() {
    const ratings = JSON.parse(localStorage.getItem('ai_ratings') || '[]');
    const panel = document.getElementById('ratings-panel');
    if (!panel) return;

    if (ratings.length === 0) {
      panel.innerHTML = '<div class="empty-state"><div class="empty-icon">⭐</div><h3>No ratings yet</h3><p>Ratings submitted by website visitors will appear here. The rating widget appears automatically to new visitors on the main site.</p></div>';
      return;
    }

    // Calculate stats
    const total = ratings.length;
    const avg = (ratings.reduce((s,r) => s + r.rating, 0) / total).toFixed(1);
    const dist = [0,0,0,0,0];
    ratings.forEach(r => dist[r.rating-1]++);
    const recent = [...ratings].reverse().slice(0, 10);

    const stars = n => '★'.repeat(n) + '☆'.repeat(5-n);

    panel.innerHTML = `
      <div class="rating-summary-row">
        <div class="dash-stat-card" style="--stat-color:#fbbf24">
          <div class="dash-stat-icon">⭐</div>
          <div class="dash-stat-value">${avg}</div>
          <div class="dash-stat-label">Average Rating</div>
          <div class="dash-stat-sub avg-stars">${stars(Math.round(avg))}</div>
        </div>
        <div class="dash-stat-card" style="--stat-color:var(--accent)">
          <div class="dash-stat-icon">📊</div>
          <div class="dash-stat-value">${total}</div>
          <div class="dash-stat-label">Total Ratings</div>
          <div class="dash-stat-sub">All time submissions</div>
        </div>
        <div class="dash-stat-card" style="--stat-color:var(--accent3)">
          <div class="dash-stat-icon">🌟</div>
          <div class="dash-stat-value">${dist[4]}</div>
          <div class="dash-stat-label">5-Star Ratings</div>
          <div class="dash-stat-sub">${Math.round(dist[4]/total*100)}% of total</div>
        </div>
        <div class="dash-stat-card" style="--stat-color:var(--accent2)">
          <div class="dash-stat-icon">📅</div>
          <div class="dash-stat-value">${ratings.filter(r=>new Date(r.timestamp) > new Date(Date.now()-7*86400000)).length}</div>
          <div class="dash-stat-label">This Week</div>
          <div class="dash-stat-sub">Last 7 days</div>
        </div>
      </div>

      <div class="data-card" style="margin-bottom:24px;">
        <div class="data-card-header"><h3>⭐ Rating Distribution</h3></div>
        <div style="padding:20px 28px;">
          ${[5,4,3,2,1].map(n => `
            <div class="rating-bar-row">
              <span class="rating-bar-label">${n}★</span>
              <div class="rating-bar-bg">
                <div class="rating-bar-fill" style="width:${total ? (dist[n-1]/total*100).toFixed(1) : 0}%"></div>
              </div>
              <span class="rating-bar-count">${dist[n-1]}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="data-card">
        <div class="data-card-header"><h3>📋 Recent Ratings</h3></div>
        <div class="admin-table-scroll">
          <table class="admin-table">
            <thead><tr><th>#</th><th>Rating</th><th>Stars</th><th>Page</th><th>Date & Time</th></tr></thead>
            <tbody>
              ${recent.map((r,i) => `
                <tr>
                  <td style="color:var(--text-muted);font-size:.82rem">${total-i}</td>
                  <td><strong>${r.rating}/5</strong></td>
                  <td style="color:#fbbf24;font-size:1.1rem;letter-spacing:2px">${stars(r.rating)}</td>
                  <td style="font-size:.82rem;color:var(--text-secondary)">${r.page || '/'}</td>
                  <td style="font-size:.82rem;color:var(--text-muted);white-space:nowrap">${new Date(r.timestamp).toLocaleString('en-GB')}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;">
          <button class="btn btn-ghost btn-sm" onclick="if(confirm('Clear all rating data?')){localStorage.removeItem('ai_ratings');location.reload();}">🗑 Clear All Ratings</button>
        </div>
      </div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('ratings-panel');
    if (panel) renderRatingsPanel();
  });
})();
</script>
<script>
// Event registration Mark Read buttons
document.querySelectorAll('.er-read-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var id = this.dataset.id;
    fetch('dashboard.php?read_reg=' + id)
      .then(function(){
        var row = btn.closest('tr');
        if(row){ row.classList.remove('row-new'); btn.remove(); }
      });
  });
});

// Dark / light mode toggle (synced with main site via localStorage)
(function initDashboardTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const thumb = toggle.querySelector('.theme-toggle-thumb');

  function applyLight() {
    document.body.classList.add('light-mode');
    toggle.classList.add('light');
    if (thumb) thumb.textContent = '☀️';
  }
  function applyDark() {
    document.body.classList.remove('light-mode');
    toggle.classList.remove('light');
    if (thumb) thumb.textContent = '🌙';
  }

  if (localStorage.getItem('ai_theme') === 'light') applyLight();

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      applyDark();
      localStorage.setItem('ai_theme', 'dark');
    } else {
      applyLight();
      localStorage.setItem('ai_theme', 'light');
    }
  });
})();
</script>
