# AI-Solutions Website — Complete Setup Guide
### Author: Aish Maskey | CET333 Product Development
### Stack: HTML5 · CSS3 · JavaScript · PHP · MySQL · XAMPP

---

## 📁 COMPLETE PROJECT STRUCTURE

```
ai-solutions/
│
├── index.html                  ← Homepage (hero, stats, services preview, chatbot)
│
├── pages/
│   ├── about.html              ← About Us (mission, team, values, stats, timeline)
│   ├── services.html           ← Services page (6 AI services with detail cards)
│   ├── projects.html           ← Case Studies / Portfolio (filterable grid)
│   ├── pricing.html            ← Pricing plans (monthly/annual toggle, 3 tiers)
│   ├── testimonials.html       ← Client Testimonials (slider + ratings)
│   ├── blog.html               ← Blog & Articles (search, filter, read + download)
│   ├── events.html             ← Events & Webinars (gallery, timeline, gallery lightbox)
│   └── contact.html            ← Contact Form (7-field form → PHP → MySQL)
│
├── css/
│   ├── style.css               ← Main stylesheet (all pages, glassmorphism, variables)
│   ├── extras.css              ← Extra UI components (preloader, cookie banner, progress
│   │                             ring, theme toggle, chatbot, modal, mobile CTA, tooltips,
│   │                             feedback form, partner scroll, announcement bar)
│   └── admin.css               ← Admin panel stylesheet
│
├── js/
│   ├── main.js                 ← Core JS (navbar, scroll reveal, counters, typing effect,
│   │                             contact form submission, project modal, chatbot ARIA)
│   ├── features.js             ← Feature JS (blog/case study reader with Read + PDF/Word
│   │                             download, website rating widget, enhanced chatbot Q&A,
│   │                             keyword suggestion chips for ARIA chatbot)
│   ├── extras.js               ← Extras JS (preloader, cookie consent, dark/light mode
│   │                             toggle, toast notifications, announcement bar, progress
│   │                             ring/back-to-top, partner scroll ticker, tooltips,
│   │                             feedback form submission, billing toggle for pricing)
│   └── admin.js                ← Admin dashboard JS (table search, chart rendering,
│                                 inquiry view/delete, filter controls)
│
├── php/
│   ├── db.php                  ← Database connection (PDO, sanitize helper)
│   ├── auth.php                ← Session & login functions
│   ├── contact.php             ← Contact form handler — validates & saves all 7 fields
│   │                             (name, email, phone, company, country, job_title,
│   │                             job_details) + honeypot spam protection + rate limiting
│   ├── save_feedback.php       ← Site feedback handler (name, email, category, rating,
│   │                             message → site_feedback table)
│   ├── save_rating.php         ← Star rating handler
│   └── seed_admin.php          ← One-time admin user creator (bcrypt password)
│
├── admin/
│   ├── login.html              ← Admin login page
│   ├── login_handler.php       ← Login form processor (session + bcrypt verify)
│   ├── dashboard.php           ← Admin dashboard (password-protected, CRUD, Chart.js)
│   └── logout.php              ← Logout + session destroy handler
│
├── images/
│   ├── logo.svg                ← AI-Solutions brand logo (SVG, scalable)
│   └── favicon.svg             ← Browser tab favicon (SVG)
│
└── database.sql                ← Full MySQL schema + sample seed data
```

---

## ⚙️ STEP-BY-STEP SETUP — XAMPP + VS CODE

---

### STEP 1 — Install XAMPP

1. Download XAMPP from **https://www.apachefriends.org/**
2. Install it (default options are fine)
3. On **Windows** → install to `C:\xampp`
4. On **Mac** → install to `/Applications/XAMPP`

---

### STEP 2 — Start XAMPP Services

1. Open **XAMPP Control Panel**
2. Click **Start** next to **Apache**
3. Click **Start** next to **MySQL**
4. Both should show green ✅

---

### STEP 3 — Place the Project Folder

**Windows:**
```
Copy the entire "ai-solutions" folder into:
C:\xampp\htdocs\ai-solutions\
```

**Mac:**
```
Copy the entire "ai-solutions" folder into:
/Applications/XAMPP/htdocs/ai-solutions/
```

After copying, your structure should be:
```
htdocs/
└── ai-solutions/
    ├── index.html
    ├── pages/
    ├── css/
    ├── js/
    ├── php/
    ├── admin/
    ├── images/
    └── database.sql
```

---

### STEP 4 — Set Up the MySQL Database

1. Open your browser and go to:
   ```
   http://localhost/phpmyadmin
   ```

2. In the left panel, click **"New"**

3. Enter the database name:
   ```
   ai_solutions
   ```
   Collation: `utf8mb4_unicode_ci` → Click **Create**

4. Click the **SQL** tab at the top

5. Open the file `database.sql` in any text editor (Notepad, VS Code)

6. **Select All** the contents → **Copy** → **Paste** into phpMyAdmin SQL box

7. Click **Go**

8. You should see:
   ```
   ✅ Database setup complete!
   ```
   Tables created: `admins`, `inquiries`, `testimonials`, `blog_articles`, `events`, `site_feedback`

---

### STEP 5 — Create the Admin User

1. In your browser go to:
   ```
   http://localhost/ai-solutions/php/seed_admin.php
   ```

2. You should see:
   ```
   ✅ Admin user created successfully!
   Username: admin
   Password: admin123
   ```

3. ⚠️ **DELETE** the seed file after use (or keep it for demo purposes)

---

### STEP 6 — Open the Website

**Frontend (no PHP needed for HTML pages):**
```
http://localhost/ai-solutions/index.html
```

**Or open directly in browser (double-click):**
```
ai-solutions/index.html
```
> Note: HTML/CSS/JS pages work without a server.  
> The contact form, feedback form, and admin panel require XAMPP to be running.

---

### STEP 7 — Test the Contact Form

1. Go to: `http://localhost/ai-solutions/pages/contact.html`
2. Fill in all 7 required fields:
   - Full Name, Email Address, Phone Number, Company Name, Country, Job Title, Job Details
3. Optionally select a service
4. Click **Send Message**
5. Check the admin dashboard to see the saved inquiry

---

### STEP 8 — Access Admin Dashboard

1. Go to: `http://localhost/ai-solutions/admin/login.html`
2. Login with:
   - **Username:** `admin`
   - **Password:** `admin123`
3. You will be redirected to the dashboard
4. Dashboard features:
   - View all customer inquiries (including Job Details)
   - Search and filter inquiries by keyword or status
   - Click **View** to see full inquiry details
   - Click **Delete** to remove an inquiry
   - Live bar chart of monthly inquiry volume (Chart.js)

---

## 🖥️ OPENING IN VISUAL STUDIO CODE

1. Open **VS Code**
2. Go to **File → Open Folder**
3. Navigate to your `ai-solutions` folder and click **Open**
4. Install recommended extensions:
   - **Live Server** by Ritwick Dey (HTML-only preview without XAMPP)
   - **PHP Intelephense** (PHP syntax highlighting & intellisense)
5. Right-click `index.html` → **Open with Live Server**  
   (Frontend pages only — use XAMPP URL for PHP features)

---

## 🔑 LOGIN CREDENTIALS

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | admin    | admin123  |

---

## 🌐 LOCAL URLs (XAMPP running)

| Page              | URL                                                    |
|-------------------|--------------------------------------------------------|
| Homepage          | http://localhost/ai-solutions/index.html               |
| About Us          | http://localhost/ai-solutions/pages/about.html         |
| Services          | http://localhost/ai-solutions/pages/services.html      |
| Case Studies      | http://localhost/ai-solutions/pages/projects.html      |
| Pricing           | http://localhost/ai-solutions/pages/pricing.html       |
| Testimonials      | http://localhost/ai-solutions/pages/testimonials.html  |
| Blog              | http://localhost/ai-solutions/pages/blog.html          |
| Events            | http://localhost/ai-solutions/pages/events.html        |
| Contact           | http://localhost/ai-solutions/pages/contact.html       |
| Admin Login       | http://localhost/ai-solutions/admin/login.html         |
| Admin Dashboard   | http://localhost/ai-solutions/admin/dashboard.php      |

---

## 🗃️ DATABASE TABLES REFERENCE

| Table            | Purpose                                              |
|------------------|------------------------------------------------------|
| `admins`         | Admin users with bcrypt-hashed passwords             |
| `inquiries`      | Contact form submissions (all 7 fields incl. job_details) |
| `testimonials`   | Client reviews and star ratings                      |
| `blog_articles`  | Blog posts with categories and metadata              |
| `events`         | Upcoming and past promotional events                 |
| `site_feedback`  | Site feedback form submissions (category + rating)   |

---

## 📄 PAGES OVERVIEW

### 🏠 Homepage (`index.html`)
- Animated hero section with typing effect
- Stats counters (clients, projects, uptime, support)
- Services preview cards
- Partners/clients scroll ticker
- ARIA AI chatbot (bottom-right)
- Scroll reveal animations throughout

### 👥 About Us (`pages/about.html`)
- Company mission and vision statements
- Core values grid
- Team member profiles
- Company timeline / history
- Animated statistics section
- Call-to-action to Contact page

### 🛠️ Services (`pages/services.html`)
- 6 AI service offerings:
  - AI Virtual Assistant
  - AI Automation
  - AI Chatbot Development
  - AI Analytics
  - Smart Business Solutions
  - AI Prototyping Solutions
- Each service has detail cards with features listed

### 📁 Case Studies (`pages/projects.html`)
- Filterable project grid (by industry/type)
- Modal popup for full project detail view
- Past client success stories with results

### 💰 Pricing (`pages/pricing.html`)
- 3 pricing tiers: Starter, Professional, Enterprise
- Monthly / Annual billing toggle (20% saving on annual)
- Feature comparison per plan
- 14-day free trial messaging
- FAQ section for pricing queries

### 💬 Testimonials (`pages/testimonials.html`)
- Client review slider / carousel
- Star ratings display
- Client name, company, and photo placeholders

### 📰 Blog (`pages/blog.html`)
- Featured article hero card
- Blog post grid with search and category filter
- Inline article reader (opens full article in-page)
- Download article as PDF or Word document

### 📅 Events (`pages/events.html`)
- Upcoming events listing with dates and details
- Photo gallery of past promotional events
- Gallery lightbox for full-screen image viewing
- Event timeline section

### 📬 Contact (`pages/contact.html`)
- **7-field contact form** (all required):
  - Full Name
  - Email Address
  - Phone Number
  - Company Name
  - Country (dropdown)
  - Job Title
  - Job Details / Project Description (textarea)
  - Service Interested In (optional dropdown)
- Honeypot anti-spam field (hidden)
- Rate limiting (max 3 submissions per IP per hour)
- Company contact info panel (email, phone, address, hours)
- Social media links
- FAQ accordion section
- Site feedback form with star rating and category

---

## 🤖 ARIA CHATBOT

ARIA (AI-Solutions' onsite assistant) is built into every page.

| Feature | Detail |
|---------|--------|
| Location | Bottom-right floating button (🤖) |
| Activation | Click the robot icon to open/close |
| Q&A | Keyword-matched responses for services, pricing, contact, demos, events |
| Suggestion chips | Clickable quick-reply prompts shown after responses |
| Escalation | Suggests contacting a human for complex queries |
| Persistence | Chat history persists within the page session |

---

## 🎨 UI & UX FEATURES

| Feature | File | Description |
|---------|------|-------------|
| Dark / Light mode toggle | `extras.js` | Persists preference via localStorage |
| Page preloader | `extras.js` / `extras.css` | Animated logo bar shown on every page load |
| Cookie consent banner | `extras.js` / `extras.css` | GDPR-compliant accept/decline banner |
| Toast notifications | `extras.js` | Slide-in status messages (success/error/info) |
| Announcement bar | `extras.js` / `extras.css` | Dismissible top banner with promo message |
| Scroll progress bar | `extras.css` | Thin gradient line at top tracking scroll % |
| Progress ring + back-to-top | `extras.js` / `extras.css` | Circular SVG progress ring with scroll-to-top button |
| Custom animated cursor | `style.css` / `main.js` | Dot + ring cursor effect (desktop only) |
| Scroll reveal animations | `main.js` | Elements animate in as they enter the viewport |
| Animated counters | `main.js` | Numbers count up when scrolled into view |
| Typing effect | `main.js` | Hero headline cycles through phrases |
| Mobile hamburger menu | `main.js` | Full-screen nav overlay for mobile |
| Mobile CTA strip | `extras.css` | Fixed bottom bar with Get Started + Call Us on mobile |
| Glassmorphism cards | `style.css` | Frosted-glass card style throughout |
| Billing toggle | `extras.js` | Switches pricing between monthly/annual dynamically |
| Article reader | `features.js` | Opens full blog/case study article inline on page |
| Article download | `features.js` | Download any article as PDF or Word (.docx) |
| Website rating widget | `features.js` | Star rating widget with localStorage persistence |
| Partner ticker | `extras.js` | Auto-scrolling horizontal partner logo strip |
| Gallery lightbox | `main.js` | Full-screen image viewer for event photos |
| Project modal | `main.js` | Popup overlay showing full case study detail |
| Feedback form | `extras.js` | Star rating + category + message → save_feedback.php |
| Tooltips | `extras.js` | Hover tooltips on elements with `data-tooltip` |

---

## 🔐 SECURITY FEATURES

| Feature | Implementation |
|---------|---------------|
| SQL injection prevention | PDO prepared statements with bound parameters |
| Password hashing | PHP `password_hash()` with `PASSWORD_BCRYPT` |
| Session security | `session_regenerate_id()` on login, session destroy on logout |
| Admin access control | `auth.php` included on all admin pages, redirects if not logged in |
| Honeypot anti-spam | Hidden `website` field in contact form — bots fill it, humans don't |
| Rate limiting | Max 3 contact form submissions per IP per hour (session-based) |
| Input sanitisation | `sanitize()` helper strips tags and special characters on all POST data |

---

## 🗃️ CONTACT FORM — FIELD MAPPING

The contact form captures all fields required by the CET333 brief:

| HTML Field ID | PHP Variable | DB Column | Required |
|---------------|-------------|-----------|----------|
| `full_name` | `$fullName` | `full_name` | ✅ Yes |
| `email` | `$email` | `email` | ✅ Yes |
| `phone` | `$phone` | `phone` | ✅ Yes |
| `company` | `$company` | `company` | ✅ Yes |
| `country` | `$country` | `country` | ✅ Yes |
| `job_title` | `$jobTitle` | `job_title` | ✅ Yes |
| `job_details` | `$jobDetails` | `job_details` | ✅ Yes (min 10 chars) |
| `service` | `$service` | `service_interest` | ❌ Optional |

---

## 🛠️ COMMON ISSUES & FIXES

**❌ "Page not found" on contact form submit**
- Make sure XAMPP Apache is running
- Use `http://localhost/...` not `file:///...`

**❌ "Database connection failed"**
- Make sure MySQL is running in XAMPP
- Open `php/db.php` and confirm `DB_USER = 'root'` and `DB_PASS = ''`

**❌ Admin login says "Invalid credentials"**
- Run the seed script again: `http://localhost/ai-solutions/php/seed_admin.php`

**❌ Fonts not loading**
- You need internet access for Google Fonts
- Or download and self-host the fonts locally

**❌ Chart not showing in admin dashboard**
- Chart.js loads from CDN — ensure internet access
- Or download Chart.js and link it locally

**❌ Article download (PDF/Word) not working**
- The download uses browser-side JS (jsPDF / docx.js via CDN)
- Ensure internet access for the CDN libraries to load

**❌ Dark mode not saving between sessions**
- Dark/light preference is stored in `localStorage`
- If you're using incognito/private mode, it won't persist

---

## ✅ FEATURES CHECKLIST

| Feature | Status |
|------------------------------------------|--------|
| Homepage with hero & animations | ✅ |
| About Us page (mission, team, values) | ✅ |
| Services page (6 AI services) | ✅ |
| Case Studies with filter + modal | ✅ |
| Pricing page (3 tiers, monthly/annual) | ✅ |
| Testimonials slider | ✅ |
| Blog with search, filter & reader | ✅ |
| Article download (PDF + Word) | ✅ |
| Events with gallery & lightbox | ✅ |
| Contact form — all 7 required fields | ✅ |
| Contact form — PHP + MySQL backend | ✅ |
| Contact form — honeypot + rate limiting | ✅ |
| Site feedback form (rating + category) | ✅ |
| ARIA AI Chatbot with suggestion chips | ✅ |
| Admin Login (bcrypt + sessions) | ✅ |
| Admin Dashboard (CRUD + search) | ✅ |
| Monthly inquiry chart (Chart.js) | ✅ |
| Dark / Light mode toggle | ✅ |
| Page preloader animation | ✅ |
| Cookie consent banner (GDPR) | ✅ |
| Toast notification system | ✅ |
| Announcement bar (dismissible) | ✅ |
| Custom animated cursor | ✅ |
| Scroll progress bar | ✅ |
| Progress ring + back-to-top | ✅ |
| Mobile hamburger menu | ✅ |
| Mobile CTA strip | ✅ |
| Glassmorphism UI | ✅ |
| Fully responsive (mobile/tablet/desktop) | ✅ |
| Scroll reveal animations | ✅ |
| Animated counters | ✅ |
| Typing effect (hero) | ✅ |
| Partner scroll ticker | ✅ |
| Billing toggle (pricing page) | ✅ |
| Website rating widget | ✅ |
| SQL injection prevention (PDO) | ✅ |
| Password hashing (bcrypt) | ✅ |
| Session security | ✅ |
| Input sanitisation | ✅ |

---

*AI-Solutions | CET333 Product Development Module*  
*Author: Aish Maskey | University of Sunderland*
