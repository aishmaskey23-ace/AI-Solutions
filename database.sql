-- ============================================================
-- AI-Solutions | Complete MySQL Database Schema
-- Author: Aish Maskey | CET333 Product Development
-- Database: ai_solutions
-- 
-- HOW TO USE:
-- 1. Open phpMyAdmin at http://localhost/phpmyadmin
-- 2. Click "New" to create a new database called: ai_solutions
-- 3. Click the "SQL" tab
-- 4. Paste this entire file and click "Go"
-- ============================================================

-- Create & select database
CREATE DATABASE IF NOT EXISTS `ai_solutions`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `ai_solutions`;

-- ─── DROP TABLES (clean install) ────────────────────────────
DROP TABLE IF EXISTS `event_registrations`;
DROP TABLE IF EXISTS `site_ratings`;
DROP TABLE IF EXISTS `site_feedback`;
DROP TABLE IF EXISTS `inquiries`;
DROP TABLE IF EXISTS `testimonials`;
DROP TABLE IF EXISTS `blog_articles`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `admins`;

-- ─── TABLE: admins ───────────────────────────────────────────
CREATE TABLE `admins` (
  `id`            INT          UNSIGNED NOT NULL AUTO_INCREMENT,
  `username`      VARCHAR(80)  NOT NULL UNIQUE,
  `email`         VARCHAR(180) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin user
-- Username: admin | Password: admin123
-- (password_hash is bcrypt of "admin123")
INSERT INTO `admins` (`username`, `email`, `password_hash`) VALUES
(
  'admin',
  'admin@ai-solutions.com',
  '$2y$12$YourHashHere'
);

-- NOTE: The hash above is a placeholder.
-- Run this PHP snippet once to generate a real hash and UPDATE the row:
--
--   <?php echo password_hash('admin123', PASSWORD_BCRYPT, ['cost' => 12]); ?>
--
-- Then run:
--   UPDATE admins SET password_hash = '<paste_hash_here>' WHERE username = 'admin';
--
-- OR use the seed script: php/seed_admin.php


-- ─── TABLE: inquiries ────────────────────────────────────────
CREATE TABLE `inquiries` (
  `id`               INT          UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id`         INT          UNSIGNED          DEFAULT NULL,
  `full_name`        VARCHAR(120) NOT NULL,
  `email`            VARCHAR(180) NOT NULL,
  `phone`            VARCHAR(30)  NOT NULL,
  `company`          VARCHAR(150) NOT NULL,
  `country`          VARCHAR(80)  NOT NULL,
  `job_title`        VARCHAR(120) NOT NULL,
  `service_interest` VARCHAR(120)          DEFAULT NULL,
  `job_details`      TEXT         NOT NULL,
  `status`           ENUM('new','read','archived') NOT NULL DEFAULT 'new',
  `ip_address`       VARCHAR(45)           DEFAULT NULL,
  `created_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status`     (`status`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_email`      (`email`),
  INDEX `idx_admin_id`   (`admin_id`),
  CONSTRAINT `fk_inquiries_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample inquiry data
INSERT INTO `inquiries`
  (`full_name`, `email`, `phone`, `company`, `country`, `job_title`, `service_interest`, `job_details`, `status`, `created_at`)
VALUES
  ('Sarah Mitchell',  'sarah@techventure.com',  '+44 7700 100001', 'TechVenture Ltd',     'UK',        'Head of Digital',   'AI Virtual Assistant',    'We want to deploy a virtual assistant for our 500-person HR team to reduce internal ticket volume. Looking for a solution that integrates with our existing Slack and ServiceNow setup.', 'read',    NOW() - INTERVAL 10 DAY),
  ('James Park',      'james@nexaflow.com',      '+1 415 555 0102',  'NexaFlow Inc',        'US',        'CEO',               'AI Chatbot Development',  'Building a customer-facing chatbot for our SaaS platform. We process around 3,000 support requests daily and need to automate at least 70% of them.', 'read',    NOW() - INTERVAL 8  DAY),
  ('Priya Sharma',    'priya@innovateco.com',    '+91 98765 43210',  'InnovateCo',          'India',     'Product Director',  'AI Prototyping',          'We have a concept for an AI recommendation engine for our e-commerce platform. Need to validate it fast — ideally have a prototype in 2 weeks to show investors.', 'read',    NOW() - INTERVAL 6  DAY),
  ('David Thompson',  'david@databridge.com',    '+44 7800 200002',  'DataBridge Solutions','UK',        'CTO',               'AI Analytics',            'We have 3 years of sales data sitting in Snowflake doing nothing. We want real-time dashboards with predictive forecasting to help our sales team prioritise leads.', 'new',     NOW() - INTERVAL 3  DAY),
  ('Emma Clarke',     'emma@scaleuphq.com',      '+44 7900 300003',  'ScaleUp HQ',          'UK',        'Operations Manager','AI Automation',           'Our team manually processes 400+ purchase orders a week. We want to automate data extraction, validation and routing into our ERP system.', 'new',     NOW() - INTERVAL 2  DAY),
  ('Michael Torres',  'michael@finedge.com',     '+1 212 555 0199',  'FinEdge Capital',     'US',        'VP Engineering',    'AI Virtual Assistant',    'We serve HNW clients who expect instant portfolio insights. We need an AI assistant that can pull live data and give spoken briefings via our mobile app.', 'new',     NOW() - INTERVAL 1  DAY),
  ('Anna Beaumont',   'anna@eduplatform.io',     '+44 7700 400004',  'EduPlatform',         'UK',        'CEO',               'AI Chatbot Development',  'We run an online learning platform with 50,000 students. We need a personalised learning assistant that can guide students, answer course questions and flag at-risk learners.', 'new',     NOW()),
  ('Raj Patel',       'raj@retailplus.co.uk',    '+44 7800 500005',  'RetailPlus Group',    'UK',        'CIO',               'Smart Business Solutions', 'Our supply chain is reactive rather than predictive. We want AI that can forecast demand by SKU, recommend reorder quantities, and alert us to anomalies before they cause stock-outs.', 'new',     NOW());


-- ─── TABLE: testimonials ─────────────────────────────────────
CREATE TABLE `testimonials` (
  `id`          INT          UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(120) NOT NULL,
  `client_role` VARCHAR(180) NOT NULL,
  `company`     VARCHAR(150) NOT NULL,
  `initials`    VARCHAR(4)   NOT NULL,
  `rating`      TINYINT      UNSIGNED NOT NULL DEFAULT 5,
  `review_text` TEXT         NOT NULL,
  `is_featured` TINYINT(1)   NOT NULL DEFAULT 0,
  `approved_by` INT          UNSIGNED          DEFAULT NULL,
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_featured` (`is_featured`),
  INDEX `idx_approved_by` (`approved_by`),
  CONSTRAINT `fk_testimonials_admin` FOREIGN KEY (`approved_by`) REFERENCES `admins`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials`
  (`client_name`, `client_role`, `company`, `initials`, `rating`, `review_text`, `is_featured`, `approved_by`)
VALUES
  ('Sarah Mitchell',  'Head of Digital',      'TechVenture Ltd',     'SM', 5, 'Implementing AI-Solutions virtual assistant transformed how we handle employee support. Ticket volumes dropped by 60% in the first month. The team expertise and responsiveness throughout the project was outstanding.',            1, 1),
  ('James Park',      'CEO',                  'NexaFlow Inc',        'JP', 5, 'The chatbot they built for us handles thousands of daily queries flawlessly. ROI was visible within 6 weeks of deployment. I would recommend AI-Solutions to any business serious about leveraging AI.',                      1, 1),
  ('Priya Sharma',    'Product Director',     'InnovateCo',          'PS', 5, 'Their AI prototyping service helped us validate our product concept in 12 days instead of 3 months. That speed helped us secure our seed round. Truly remarkable team with a pragmatic approach.',                            1, 1),
  ('David Thompson',  'CTO',                  'DataBridge Solutions','DT', 5, 'Outstanding AI analytics dashboard. We now have real-time visibility into every customer touchpoint. The predictive models have been frighteningly accurate — a complete game-changer for our planning.',                      0, 1),
  ('Emma Clarke',     'Operations Manager',   'ScaleUp HQ',          'EC', 5, 'The automation they built saves our team 20+ hours per week. The ROI has been phenomenal. What I loved most was how they listened to our specific needs rather than pushing a generic solution.',                              0, 1),
  ('Michael Torres',  'VP Engineering',       'FinEdge Capital',     'MT', 5, 'Rock-solid delivery, exceptional code quality, and a team that genuinely cares about outcomes. The AI wealth assistant is used daily by our client-facing team and clients absolutely love it.',                                0, 1),
  ('Anna Beaumont',   'CEO',                  'EduPlatform',         'AB', 5, 'Our student completion rates jumped 45% after deploying the AI learning assistant. The personalisation engine is incredibly sophisticated yet the team made the whole process feel completely simple.',                          0, 1),
  ('Raj Patel',       'CIO',                  'RetailPlus Group',    'RP', 5, 'Stock-outs reduced by 40%, delivery times improved by 25% — all within 3 months of deploying their supply chain AI. The ROI calculation practically wrote itself. Brilliant team.',                                            0, 1),
  ('Sophie Laurent',  'Director of Innovation','MedTech Corp',       'SL', 5, 'Building a GDPR-compliant clinical analytics tool is notoriously difficult. AI-Solutions navigated all the regulatory requirements while still delivering a genuinely powerful predictive platform.',                            0, NULL);


-- ─── TABLE: blog_articles ────────────────────────────────────
CREATE TABLE `blog_articles` (
  `id`          INT          UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL UNIQUE,
  `category`    VARCHAR(80)  NOT NULL,
  `excerpt`     TEXT         NOT NULL,
  `content`     LONGTEXT     NOT NULL,
  `admin_id`    INT          UNSIGNED          DEFAULT NULL,
  `read_time`   VARCHAR(20)  NOT NULL DEFAULT '5 min read',
  `emoji`       VARCHAR(10)  NOT NULL DEFAULT '📝',
  `is_featured` TINYINT(1)   NOT NULL DEFAULT 0,
  `is_published`TINYINT(1)   NOT NULL DEFAULT 1,
  `published_at`DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category`   (`category`),
  INDEX `idx_published`  (`is_published`),
  INDEX `idx_featured`   (`is_featured`),
  INDEX `idx_admin_id`   (`admin_id`),
  FULLTEXT `ft_search`   (`title`, `excerpt`, `content`),
  CONSTRAINT `fk_blog_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blog_articles`
  (`title`, `slug`, `category`, `excerpt`, `content`, `admin_id`, `read_time`, `emoji`, `is_featured`)
VALUES
  (
    'How AI Virtual Assistants Are Reshaping Employee Experience in 2025',
    'ai-virtual-assistants-employee-experience-2025',
    'AI Business',
    'The modern workplace demands instant answers. AI virtual assistants are now handling 80% of internal queries, freeing humans for higher-value work.',
    'Full article content goes here...',
    1, '8 min read', '🤖', 1
  ),
  (
    'The ROI of AI Automation: Real Numbers from Real Businesses',
    'roi-ai-automation-real-numbers',
    'Automation',
    'A data-driven look at how businesses are calculating the return on investment from intelligent automation initiatives in 2024–2025.',
    'Full article content goes here...',
    1, '6 min read', '⚡', 0
  ),
  (
    'Predictive AI Analytics: Moving from Reactive to Proactive Decision-Making',
    'predictive-ai-analytics-proactive-decisions',
    'Analytics',
    'Most businesses are still reacting to data. Predictive AI flips that entirely — here is how companies use foresight models to stay 3 steps ahead.',
    'Full article content goes here...',
    1, '9 min read', '📊', 0
  ),
  (
    'Building a Chatbot That Customers Actually Love: 7 Design Principles',
    'chatbot-design-principles-customers-love',
    'Chatbots',
    'Most chatbots frustrate users. These 7 principles, drawn from 50+ chatbot deployments, separate delightful AI conversations from dead ends.',
    'Full article content goes here...',
    1, '7 min read', '💬', 0
  ),
  (
    'AI Prototyping in 2 Weeks: Validate Your Idea Before Spending Big',
    'ai-prototyping-two-weeks-validate',
    'AI Business',
    'Speed-to-validation is the competitive advantage of 2025. Our framework for rapid AI prototyping has helped 20+ startups secure funding faster.',
    'Full article content goes here...',
    1, '5 min read', '🔬', 0
  ),
  (
    'AI Security in 2025: Protecting Your Models, Data, and Users',
    'ai-security-2025-protecting-models-data',
    'Security',
    'As AI adoption accelerates, so do the attack surfaces. This guide covers the essential security practices every AI-deploying organisation must implement.',
    'Full article content goes here...',
    1, '10 min read', '🛡️', 0
  );


-- ─── TABLE: events ───────────────────────────────────────────
CREATE TABLE `events` (
  `id`           INT          UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`        VARCHAR(255) NOT NULL,
  `description`  TEXT         NOT NULL,
  `event_date`   DATE         NOT NULL,
  `event_time`   VARCHAR(20)  NOT NULL,
  `location`     VARCHAR(255) NOT NULL,
  `price`        VARCHAR(20)  NOT NULL DEFAULT 'Free',
  `event_type`   ENUM('webinar','workshop','conference','bootcamp','other') NOT NULL DEFAULT 'webinar',
  `is_upcoming`  TINYINT(1)   NOT NULL DEFAULT 1,
  `max_capacity` SMALLINT     UNSIGNED          DEFAULT NULL,
  `created_by`   INT          UNSIGNED          DEFAULT NULL,
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_date`     (`event_date`),
  INDEX `idx_upcoming` (`is_upcoming`),
  INDEX `idx_created_by` (`created_by`),
  CONSTRAINT `fk_events_admin` FOREIGN KEY (`created_by`) REFERENCES `admins`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `events`
  (`title`, `description`, `event_date`, `event_time`, `location`, `price`, `event_type`, `max_capacity`, `created_by`)
VALUES
  ('AI for Business Leaders — Free Webinar',          'A practical session for executives exploring how AI can reduce costs, automate operations, and create competitive advantages.',                              '2025-07-15', '2:00 PM BST',  'Online / Zoom',    'Free',  'webinar',    500, 1),
  ('Build Your First AI Chatbot — Workshop',           'A hands-on workshop walking you through designing, building, and deploying a production-ready AI chatbot using modern NLP frameworks.',                    '2025-07-22', '10:00 AM BST', 'Sunderland, UK',   '£49',   'workshop',   30, 1),
  ('AI Analytics Masterclass — Half Day',              'Deep-dive into AI-powered analytics, from building predictive models to designing dashboards that make data-driven decisions effortless.',                '2025-08-05', '9:00 AM BST',  'Online / Teams',   '£29',   'webinar',    200, 1),
  ('AI Startup Summit 2025 — Full Day Conference',     'Our flagship annual event bringing together AI entrepreneurs, investors, and thought leaders for a day of keynotes, demos, and networking.',              '2025-08-19', '9:00 AM BST',  'Newcastle, UK',    '£99',   'conference', 320, 1),
  ('No-Code AI Automation Workshop',                   'Learn to build powerful AI automation workflows without writing a single line of code using our no-code builder and real business scenarios.',             '2025-09-10', '1:00 PM BST',  'Online / Zoom',    'Free',  'workshop',   150, 1),
  ('AI Prototyping Sprint — 2-Day Intensive',          'Work side-by-side with our AI experts to take your product idea from concept to validated prototype in just two intensive days.',                         '2025-09-24', '9:00 AM BST',  'Sunderland, UK',   '£299',  'bootcamp',   12, 1);


-- ─── VERIFY SETUP ────────────────────────────────────────────
SELECT 'Database setup complete!' AS message;
SELECT TABLE_NAME, TABLE_ROWS
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'ai_solutions'
ORDER BY TABLE_NAME;

-- ── Website Feedback Table ────────────────────────────────────
CREATE TABLE IF NOT EXISTS `site_feedback` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(120) NOT NULL,
  `email`      VARCHAR(180) NOT NULL DEFAULT '',
  `category`   ENUM('General','UI/UX','Services','Pricing','Support','Other') NOT NULL DEFAULT 'General',
  `rating`     TINYINT UNSIGNED NOT NULL DEFAULT 5,
  `message`    TEXT NOT NULL,
  `status`     ENUM('new','read','archived') NOT NULL DEFAULT 'new',
  `reviewed_by` INT UNSIGNED DEFAULT NULL,
  `ip_address` VARCHAR(45) NOT NULL DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_reviewed_by` (`reviewed_by`),
  CONSTRAINT `fk_feedback_admin` FOREIGN KEY (`reviewed_by`) REFERENCES `admins`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Website Ratings Table (added for rating feature) ─────────
-- Optionally linked to site_feedback when a visitor submits a
-- rating together with their feedback (0..1 relationship).
CREATE TABLE IF NOT EXISTS `site_ratings` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rating`     TINYINT UNSIGNED NOT NULL,
  `page`       VARCHAR(255) NOT NULL DEFAULT '/',
  `feedback_id` INT UNSIGNED DEFAULT NULL,
  `ip_address` VARCHAR(45) NOT NULL DEFAULT '',
  `user_agent` VARCHAR(255) NOT NULL DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_feedback_id` (`feedback_id`),
  CONSTRAINT `fk_ratings_feedback` FOREIGN KEY (`feedback_id`) REFERENCES `site_feedback`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ─── TABLE: event_registrations ──────────────────────────────
-- Normalized: event details (name, date) come from EVENTS via event_id.
CREATE TABLE IF NOT EXISTS `event_registrations` (
  `id`                    INT          UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_id`              INT          UNSIGNED          DEFAULT NULL,
  `full_name`             VARCHAR(120) NOT NULL,
  `email`                 VARCHAR(180) NOT NULL,
  `phone`                 VARCHAR(30)  NOT NULL,
  `company`               VARCHAR(150) NOT NULL,
  `country`               VARCHAR(80)  NOT NULL,
  `job_title`             VARCHAR(120) NOT NULL,
  `dietary_requirements`  VARCHAR(255)          DEFAULT NULL,
  `additional_message`    TEXT                  DEFAULT NULL,
  `status`                ENUM('new','read','archived') NOT NULL DEFAULT 'new',
  `ip_address`            VARCHAR(45)           DEFAULT NULL,
  `created_at`            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status`      (`status`),
  INDEX `idx_created_at`  (`created_at`),
  INDEX `idx_event_id`    (`event_id`),
  CONSTRAINT `fk_eventreg_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
