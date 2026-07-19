/* ============================================================
   AI-Solutions | features.js  — v3 CLEAN REWRITE
   1. Blog & Case Study Reader (Read + Download PDF / Word)
   2. Website Rating Widget
   3. Enhanced Chatbot Q&A + Keyword Suggestion Chips
   ============================================================ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   ARTICLE DATA  (IDs match data-article-id in HTML)
   ═══════════════════════════════════════════════════════════════ */
const ARTICLES = {

  /* ── FEATURED BLOG (hero section on blog page) ───────────────── */
  'blog-featured': {
    emoji:'🤖', category:'AI Business', type:'blog',
    title:'How AI Virtual Assistants Are Reshaping Employee Experience in 2025',
    author:'Daniel Osei', date:'May 2025', readTime:'8 min read',
    content:`
      <p>The modern workplace is under relentless pressure. Employees expect instant answers, seamless support, and round-the-clock access to information — but traditional HR and IT helpdesks simply cannot scale to meet these demands.</p>
      <div class="highlight-box">💡 <strong>Key Finding:</strong> AI virtual assistants now handle an average of 80% of all internal employee queries without any human intervention.</div>
      <h2>The Scale Problem</h2>
      <p>When a company grows from 200 to 2,000 employees, support ticket volume doesn't just double — it multiplies by a factor of 10 to 15. Legacy helpdesk systems and stretched HR teams buckle under the load. Response times creep from hours to days, employee satisfaction plummets, and top talent starts looking elsewhere.</p>
      <p>AI virtual assistants solve this by absorbing the volume — answering FAQs about benefits, onboarding steps, IT access requests, leave policies, and payroll queries — instantly, at any hour, in any language.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">80%</div><div class="stat-lbl">Queries Resolved by AI</div></div>
        <div class="stat-box"><div class="stat-num">4x</div><div class="stat-lbl">Faster Response Time</div></div>
        <div class="stat-box"><div class="stat-num">£120K</div><div class="stat-lbl">Avg Annual Savings</div></div>
      </div>
      <h2>What Modern AI Assistants Can Handle</h2>
      <ul>
        <li><strong>HR queries:</strong> Leave balances, benefits explanations, policy documents, onboarding checklists</li>
        <li><strong>IT support:</strong> Password resets, software access requests, troubleshooting guides</li>
        <li><strong>Finance:</strong> Expense submission help, payslip queries, budget approvals</li>
        <li><strong>Learning & Development:</strong> Course recommendations, certification tracking, skill gap analysis</li>
      </ul>
      <h2>Real-World Results</h2>
      <p>Our deployment for TechVenture Ltd — a 500-person digital agency — reduced IT and HR ticket volume by 60% within the first month. The assistant integrated directly with their Slack workspace and ServiceNow ITSM platform, meaning employees never had to leave their existing tools.</p>
      <h2>The Human Element</h2>
      <p>The most successful deployments don't try to replace human teams — they amplify them. By handling high-volume, repetitive queries automatically, AI assistants free your HR and IT staff to focus on complex cases, strategic initiatives, and the genuinely human interactions that build culture and trust.</p>
      <div class="highlight-box">🚀 <strong>Getting Started:</strong> Most organisations see positive ROI within 60–90 days of deployment. A well-configured assistant can go live in as little as 2–3 weeks with the right implementation partner.</div>`
  },

  /* ── BLOGS ────────────────────────────────────────────────── */
  'blog-1': {
    emoji:'⚡', category:'Automation', type:'blog',
    title:'The ROI of AI Automation: Real Numbers from Real Businesses',
    author:'AI-Solutions Team', date:'Apr 2025', readTime:'6 min read',
    content:`
      <p>Every boardroom conversation about AI eventually arrives at the same question: what is the return on investment? We analysed data from 30+ automation deployments to give you the clearest picture of what AI automation actually delivers.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">340%</div><div class="stat-lbl">Average 12-Month ROI</div></div>
        <div class="stat-box"><div class="stat-num">6 wks</div><div class="stat-lbl">Average Break-Even</div></div>
        <div class="stat-box"><div class="stat-num">£85K</div><div class="stat-lbl">Avg Annual Saving</div></div>
      </div>
      <h2>Where the Savings Come From</h2>
      <p>AI automation ROI comes from three main buckets: direct labour cost reduction, error-related cost elimination, and speed-of-processing gains.</p>
      <ul>
        <li><strong>Labour redeployment:</strong> A team processing 400 invoices weekly manually can be redeployed to strategic tasks while automation handles data entry, matching, and routing.</li>
        <li><strong>Error elimination:</strong> Manual data entry errors cost UK businesses an estimated £10,000+ per year per FTE in rework and corrections.</li>
        <li><strong>Processing speed:</strong> Automated document workflows run 24/7 and complete in seconds what takes humans hours.</li>
      </ul>
      <h2>Calculating Your ROI</h2>
      <p>A simple framework: (Hours saved per week × hourly rate × 52) + Error cost reduction = Annual savings. Subtract your annual subscription cost. Divide by subscription cost. Multiply by 100 for your ROI percentage.</p>
      <div class="highlight-box">📊 <strong>Example:</strong> Emma at ScaleUp HQ saves 20+ hours/week across her ops team at £25/hr blended cost. That's £26,000/year saved — against a £9,588/year Professional plan. ROI: 171% in year one.</div>
      <h2>Sectors With Highest Returns</h2>
      <p>Finance and legal document processing consistently deliver the highest ROI due to high error costs and regulatory penalties. Healthcare administration, supply chain management, and customer service automation follow closely.</p>`
  },

  'blog-2': {
    emoji:'📊', category:'Analytics', type:'blog',
    title:'Predictive AI Analytics: Moving from Reactive to Proactive Decision-Making',
    author:'Daniel Osei', date:'Apr 2025', readTime:'9 min read',
    content:`
      <p>There is a fundamental difference between a business that looks at last month's numbers and a business that knows what next month's numbers will be before they happen. Predictive AI analytics makes the latter possible.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">87%</div><div class="stat-lbl">Forecast Accuracy</div></div>
        <div class="stat-box"><div class="stat-num">3x</div><div class="stat-lbl">Faster Decisions</div></div>
        <div class="stat-box"><div class="stat-num">40%</div><div class="stat-lbl">Fewer Stockouts</div></div>
      </div>
      <h2>The Reactive vs. Proactive Divide</h2>
      <p>Reactive analytics answers: "What happened?" Predictive analytics answers: "What will happen, and what should we do about it?" The companies winning their markets in 2025 are firmly in the second camp.</p>
      <h2>Core Predictive Capabilities</h2>
      <ul>
        <li><strong>Demand forecasting:</strong> Predict product and service demand by region, channel, season, and customer segment.</li>
        <li><strong>Churn prediction:</strong> Identify customers likely to leave before they do, triggering automated retention workflows.</li>
        <li><strong>Anomaly detection:</strong> Flag unusual patterns in real time — fraud, equipment failure, supply disruption — before they cause damage.</li>
        <li><strong>Lead scoring:</strong> Rank sales opportunities by conversion probability so teams focus where it matters most.</li>
      </ul>
      <h2>Case in Point: DataBridge Solutions</h2>
      <p>DataBridge had three years of Snowflake data gathering dust. Our team built a predictive dashboard integrating directly with their CRM and inventory systems, providing daily sales forecasts with 87% accuracy. Their sales team now prioritises leads based on AI-scored conversion probability — reducing wasted outreach by 45% and improving close rates by 22%.</p>
      <div class="highlight-box">🔮 <strong>The Compound Effect:</strong> The longer a predictive model runs, the better it gets. Models trained on 12 months of data typically achieve 15–25% better accuracy than those trained on 3 months.</div>`
  },

  'blog-3': {
    emoji:'💬', category:'Chatbots', type:'blog',
    title:'Building a Chatbot That Customers Actually Love: 7 Design Principles',
    author:'AI-Solutions Team', date:'Mar 2025', readTime:'7 min read',
    content:`
      <p>Most chatbots are frustrating. They misunderstand questions, dead-end conversations, and make customers feel dismissed. After 50+ chatbot deployments, we know exactly what separates a chatbot customers love from one they abandon in seconds.</p>
      <h2>Principle 1: Understand Intent, Not Just Keywords</h2>
      <p>Legacy chatbots match keywords. Modern NLP-powered bots understand intent — the actual meaning behind what someone types. "I can't log in", "my account is broken", and "password not working" all mean the same thing. Your bot must handle all variations gracefully.</p>
      <h2>Principle 2: Set Expectations Early</h2>
      <p>Great chatbots immediately tell users what they can and cannot help with. This prevents frustration and builds trust from the first message.</p>
      <h2>Principle 3: Graceful Escalation</h2>
      <p>The most important feature in any chatbot is a smooth handoff to a human. Know when to escalate — complex complaints, upset customers, queries requiring account access — and make the transition seamless.</p>
      <h2>Principle 4: Personality Without Pretence</h2>
      <p>Users do not mind talking to a bot — they mind being deceived. Give your bot a distinct, consistent personality. Never deny being an AI when directly asked.</p>
      <h2>Principle 5: Optimise for Mobile First</h2>
      <p>Over 65% of chatbot interactions happen on mobile devices. Design responses to be short, scannable, and tap-friendly.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">65%</div><div class="stat-lbl">Mobile Interactions</div></div>
        <div class="stat-box"><div class="stat-num">92%</div><div class="stat-lbl">Satisfaction (done right)</div></div>
        <div class="stat-box"><div class="stat-num">3s</div><div class="stat-lbl">Max Response Time</div></div>
      </div>
      <h2>Principle 6: Learn Continuously</h2>
      <p>Build feedback loops — thumbs up/down on responses, escalation analysis, unanswered query logs — and use them to retrain and refine regularly.</p>
      <h2>Principle 7: Measure What Matters</h2>
      <p>Track containment rate, CSAT score, and session length — not just volume. A bot handling 10,000 conversations with 50% containment underperforms compared to one handling 3,000 with 90% containment.</p>`
  },

  'blog-4': {
    emoji:'🔬', category:'AI Business', type:'blog',
    title:'AI Prototyping in 2 Weeks: How to Validate Your AI Idea Before Spending Big',
    author:'AI-Solutions Team', date:'Mar 2025', readTime:'7 min read',
    content:`
      <p>The biggest mistake companies make with AI is spending six months and £200,000 building something before testing whether it works. AI prototyping flips that completely — validate first, invest second.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">12 days</div><div class="stat-lbl">Typical Prototype</div></div>
        <div class="stat-box"><div class="stat-num">90%</div><div class="stat-lbl">Faster Validation</div></div>
        <div class="stat-box"><div class="stat-num">£500K</div><div class="stat-lbl">Funding Secured (InnovateCo)</div></div>
      </div>
      <h2>What Is AI Prototyping?</h2>
      <p>An AI prototype is a functional — but deliberately limited — version of your AI product, built specifically to test whether your core hypothesis works. It answers the question: "Does this AI approach actually solve this problem?" before you commit full development resources.</p>
      <h2>The Two-Week Sprint Process</h2>
      <ul>
        <li><strong>Days 1–2:</strong> Requirements, data audit, feasibility assessment</li>
        <li><strong>Days 3–6:</strong> Core AI model training on available data</li>
        <li><strong>Days 7–10:</strong> Frontend integration and basic UI</li>
        <li><strong>Days 11–12:</strong> Testing, refinement, stakeholder demo prep</li>
      </ul>
      <h2>What You Get at the End</h2>
      <p>A working, demonstrable AI product you can show to investors, clients, or internal stakeholders. Real performance data — accuracy rates, processing speeds, user feedback. A clear technical roadmap for full production development.</p>
      <div class="highlight-box">🚀 <strong>InnovateCo Result:</strong> Walked into their investor meeting with a live AI demo showing 38% conversion uplift. Closed £500K seed funding within 3 weeks. Time from idea to funded: 5 weeks total.</div>`
  },

  'blog-5': {
    emoji:'🛡️', category:'Security', type:'blog',
    title:'AI Security in 2025: Protecting Your Models, Data, and Users',
    author:'AI-Solutions Team', date:'Feb 2025', readTime:'10 min read',
    content:`
      <p>AI has dramatically expanded the attack surface for malicious actors. From prompt injection attacks to data poisoning and model theft, the security landscape for AI-deploying organisations has fundamentally changed.</p>
      <h2>The New AI Threat Landscape</h2>
      <ul>
        <li><strong>Prompt injection:</strong> Malicious users manipulate AI inputs to extract sensitive data or bypass guardrails.</li>
        <li><strong>Data poisoning:</strong> Attackers corrupt training datasets to cause systematic model misbehaviour.</li>
        <li><strong>Model extraction:</strong> Repeated queries can allow adversaries to reverse-engineer proprietary models.</li>
        <li><strong>Privacy leakage:</strong> Models trained on personal data can inadvertently expose it in outputs.</li>
      </ul>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">340%</div><div class="stat-lbl">Rise in AI Attacks (2024)</div></div>
        <div class="stat-box"><div class="stat-num">£4.5M</div><div class="stat-lbl">Avg AI Breach Cost</div></div>
        <div class="stat-box"><div class="stat-num">72hr</div><div class="stat-lbl">GDPR Breach Notification</div></div>
      </div>
      <div class="highlight-box">⚠️ <strong>GDPR Note:</strong> AI systems processing personal data must comply fully with GDPR. Data minimisation, purpose limitation, and the right to explanation apply to AI decisions as much as any data processing.</div>
      <h2>Essential Security Controls</h2>
      <p>Input validation and sanitisation must be applied to every query reaching your AI system. Output filtering should scan responses for sensitive data patterns before delivery. Access controls must be granular — your customer-facing chatbot should never have access to internal data.</p>
      <h2>Building a Secure AI Architecture</h2>
      <p>Implement defence in depth: multiple security layers so that no single failure compromises the whole system. Log all AI interactions for audit purposes. Conduct regular red-team exercises specifically designed to probe AI-specific vulnerabilities.</p>`
  },

  'blog-6': {
    emoji:'🌍', category:'AI Business', type:'blog',
    title:"Multilingual AI: Why Your Virtual Assistant Must Speak Your Customers' Language",
    author:'Daniel Osei', date:'Jan 2025', readTime:'6 min read',
    content:`
      <p>If your AI assistant only speaks English, you are losing customers. In an increasingly global market, language barriers are one of the most significant — and most overlooked — gaps in customer experience.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">75%</div><div class="stat-lbl">Buy in Native Language</div></div>
        <div class="stat-box"><div class="stat-num">40+</div><div class="stat-lbl">Languages Supported</div></div>
        <div class="stat-box"><div class="stat-num">2x</div><div class="stat-lbl">Conversion Rate Uplift</div></div>
      </div>
      <h2>The Scale of the Opportunity</h2>
      <p>Over 75% of consumers prefer to buy products in their native language. Less than 25% of the world's internet users are native English speakers. Yet the overwhelming majority of enterprise AI deployments are English-only.</p>
      <h2>Modern Multilingual AI Architecture</h2>
      <p>The best multilingual systems do not simply translate queries into English and back again — they understand context, idiom, and cultural nuance in the native language. This distinction is critical: translation-based systems produce stilted responses. Native multilingual models feel natural and build trust.</p>
      <h2>Beyond Language — Cultural Personalisation</h2>
      <p>True localisation goes beyond language. Date formats, currency, regulatory references, formality levels, and even humour differ significantly across cultures.</p>
      <div class="highlight-box">🌐 <strong>Our Approach:</strong> We deploy models that natively handle 40+ languages, with custom cultural tuning available for major markets including MENA, APAC, and Latin America.</div>`
  },

  /* ── CASE STUDIES ─────────────────────────────────────────── */
  'cs-1': {
    emoji:'💬', category:'AI Chatbot', type:'casestudy',
    title:'TechVenture — Intelligent Support Bot',
    author:'AI-Solutions Team', date:'2024', readTime:'5 min read',
    content:`
      <h2>The Challenge</h2>
      <p>TechVenture Ltd, a 500-person digital agency in London, was drowning in internal support tickets. Their HR and IT helpdesks handled over 5,000 queries per month with a 4-hour average response time. Employee satisfaction scores were falling and senior staff spent 30% of their time answering repetitive questions.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">5,000+</div><div class="stat-lbl">Monthly Tickets</div></div>
        <div class="stat-box"><div class="stat-num">60%</div><div class="stat-lbl">Ticket Reduction</div></div>
        <div class="stat-box"><div class="stat-num">&lt;30s</div><div class="stat-lbl">Response Time</div></div>
      </div>
      <h2>Our Solution</h2>
      <p>We deployed a custom NLP-powered AI chatbot integrated directly with TechVenture's Slack workspace and ServiceNow ITSM platform. The bot was trained on 3 years of historical ticket data, their full HR policy library, and IT knowledge base.</p>
      <ul>
        <li>Seamless Slack integration — employees never left their existing tools</li>
        <li>ServiceNow ticket creation and status tracking via natural language</li>
        <li>Escalation routing to the correct human specialist with full context</li>
        <li>Multi-language support covering 12 languages spoken by their global team</li>
      </ul>
      <h2>Results — 90 Days Post-Launch</h2>
      <p>60% of tickets now handled by AI (up from 0%). Average response time: 28 seconds (down from 4 hours). Employee satisfaction score: 4.7/5 (up from 3.1/5). HR and IT teams redeployed to strategic initiatives, saving an estimated £85,000 per year.</p>
      <div class="highlight-box">🏆 <strong>Client Feedback:</strong> "The chatbot transformed our internal support overnight. Our helpdesk team now focuses on genuinely complex cases, and employees get instant answers to everything else." — Sarah Mitchell, Head of Digital, TechVenture Ltd</div>`
  },

  'cs-2': {
    emoji:'⚡', category:'AI Automation', type:'casestudy',
    title:'NexaFlow — Document Automation',
    author:'AI-Solutions Team', date:'2024', readTime:'5 min read',
    content:`
      <h2>The Challenge</h2>
      <p>NexaFlow Inc, a FinTech company processing financial documents for SME clients across the US and UK, faced a bottleneck threatening their entire growth trajectory. Their manual processing team of 8 could handle roughly 500 documents per day. Client demand was growing at 40% per quarter.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">95%+</div><div class="stat-lbl">Processing Accuracy</div></div>
        <div class="stat-box"><div class="stat-num">10,000+</div><div class="stat-lbl">Documents Per Day</div></div>
        <div class="stat-box"><div class="stat-num">20x</div><div class="stat-lbl">Throughput Increase</div></div>
      </div>
      <h2>Our Solution</h2>
      <p>We built a multi-stage AI document processing pipeline using computer vision for classification, OCR with correction for data extraction, and custom ML models for validation and exception flagging. The system connects directly to NexaFlow's existing ERP and reconciliation platforms via API.</p>
      <ul>
        <li>Automatic document classification across 14 document types</li>
        <li>AI-powered data extraction with 95.3% accuracy out of the box</li>
        <li>Human-in-the-loop workflow for the 4.7% requiring review</li>
        <li>Full audit trail for financial compliance requirements</li>
      </ul>
      <h2>Results</h2>
      <p>From 500 documents/day (manual) to 10,000+ documents/day (automated) — a 20x throughput increase. Processing cost per document dropped from £0.85 to £0.08. The team of 8 was redeployed to client relationship management with zero redundancies.</p>
      <div class="highlight-box">💡 <strong>ROI:</strong> Automation cost £9,588/year (Professional plan). It replaced what would have been £180,000+ in additional hiring. First-year ROI: 1,777%.</div>`
  },

  'cs-3': {
    emoji:'📊', category:'AI Analytics', type:'casestudy',
    title:'DataBridge — Predictive Analytics Dashboard',
    author:'AI-Solutions Team', date:'2024', readTime:'6 min read',
    content:`
      <h2>The Challenge</h2>
      <p>DataBridge Solutions, a B2B software company, had 3 years of rich sales, customer, and product usage data sitting in Snowflake — completely untapped. Their sales team worked from gut instinct and last quarter's numbers. Forecast accuracy was around 35%, making planning nearly impossible.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">87%</div><div class="stat-lbl">Forecast Accuracy</div></div>
        <div class="stat-box"><div class="stat-num">45%</div><div class="stat-lbl">Less Wasted Outreach</div></div>
        <div class="stat-box"><div class="stat-num">22%</div><div class="stat-lbl">Better Close Rate</div></div>
      </div>
      <h2>Our Solution</h2>
      <p>We built a real-time analytics platform connecting directly to their Snowflake warehouse, Salesforce CRM, and product usage APIs. Three core predictive models were trained: revenue forecasting, lead scoring, and churn risk. All outputs surface in a custom dashboard designed around the daily workflows of sales, operations, and leadership.</p>
      <h2>Results — 6 Months Post-Launch</h2>
      <p>Revenue forecast accuracy improved from 35% to 87%. Sales team now prioritises based on AI-scored lead quality — resulting in 45% less time spent on low-probability deals. Churn risk model flagged 12 at-risk accounts that were saved through proactive outreach, representing £420K in retained ARR.</p>
      <div class="highlight-box">🔮 <strong>David Thompson, CTO:</strong> "Outstanding analytics dashboard. We now have real-time visibility into every customer touchpoint. The predictive models have been frighteningly accurate — a complete game-changer for our planning."</div>`
  },

  'cs-4': {
    emoji:'🤖', category:'Virtual Assistant', type:'casestudy',
    title:'ScaleUp HQ — HR Virtual Assistant',
    author:'AI-Solutions Team', date:'2024', readTime:'5 min read',
    content:`
      <h2>The Challenge</h2>
      <p>ScaleUp HQ, a rapidly growing 200-person operations consultancy, was scaling faster than their HR function could keep up. A team of 3 HR professionals was fielding 400+ queries per month on top of their strategic responsibilities. Burnout was setting in, and response times averaged 36 hours.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">80%</div><div class="stat-lbl">Queries Automated</div></div>
        <div class="stat-box"><div class="stat-num">20hrs</div><div class="stat-lbl">Saved Per Week</div></div>
        <div class="stat-box"><div class="stat-num">5 wks</div><div class="stat-lbl">Delivery Timeline</div></div>
      </div>
      <h2>Our Solution</h2>
      <p>A conversational HR virtual assistant, integrated with their HRIS (BambooHR) and document management system, trained on their complete policy library, employee handbook, and benefits documentation. The assistant handles the full employee lifecycle: onboarding queries, leave management, benefits questions, performance review guidance, and offboarding.</p>
      <h2>Results</h2>
      <p>80% query containment rate from week 2 onwards. HR team saves 20+ hours per week — time redirected to talent development, culture initiatives, and strategic hiring. Response time for automated queries: instant.</p>
      <div class="highlight-box">💚 <strong>Emma Clarke, Operations Manager:</strong> "The automation saves our team 20+ hours per week. What I loved most was how they listened to our specific needs rather than pushing a generic solution."</div>`
  },

  'cs-5': {
    emoji:'🔬', category:'AI Prototyping', type:'casestudy',
    title:'InnovateCo — Product Prototype to £500K Funding',
    author:'AI-Solutions Team', date:'2023', readTime:'4 min read',
    content:`
      <h2>The Challenge</h2>
      <p>InnovateCo had a compelling concept for an AI-powered product recommendation engine — but an investor meeting in 14 days and nothing to show. They needed a working, demonstrable prototype fast enough to matter and polished enough to impress.</p>
      <div class="stat-row">
        <div class="stat-box"><div class="stat-num">12 days</div><div class="stat-lbl">Prototype Delivery</div></div>
        <div class="stat-box"><div class="stat-num">£500K</div><div class="stat-lbl">Seed Funding Secured</div></div>
        <div class="stat-box"><div class="stat-num">38%</div><div class="stat-lbl">Conversion Uplift (Demo)</div></div>
      </div>
      <h2>Our Sprint Approach</h2>
      <p>We deployed a dedicated 3-person sprint team: an AI engineer, a UX designer, and a product strategist.</p>
      <ul>
        <li><strong>Day 1–2:</strong> Requirements and data audit</li>
        <li><strong>Day 3–6:</strong> Core recommendation model trained on their product catalogue</li>
        <li><strong>Day 7–10:</strong> Frontend integration and admin controls</li>
        <li><strong>Day 11–12:</strong> Testing, refinement, and investor demo preparation</li>
      </ul>
      <h2>The Outcome</h2>
      <p>InnovateCo walked into their investor meeting with a live, interactive demonstration showing 38% conversion rate uplift against a control group. The investors were impressed — InnovateCo closed £500K in seed funding within 3 weeks of the meeting.</p>
      <div class="highlight-box">🚀 <strong>Priya Sharma, Product Director:</strong> "Their AI prototyping service helped us validate our product concept in 12 days instead of 3 months. That speed helped us secure our seed round. Truly remarkable team."</div>`
  }
};

/* ═══════════════════════════════════════════════════════════════
   1. READER MODAL
   ═══════════════════════════════════════════════════════════════ */
(function initReader() {
  // Inject modal HTML into page
  document.body.insertAdjacentHTML('beforeend', `
    <div class="reader-overlay" id="reader-overlay">
      <div class="reader-box">
        <div class="reader-head">
          <div class="reader-emoji" id="r-emoji">📄</div>
          <div class="reader-meta">
            <div class="reader-cat" id="r-cat"></div>
            <div class="reader-title" id="r-title"></div>
            <div class="reader-byline" id="r-byline"></div>
          </div>
          <button class="reader-close-btn" id="r-close">✕</button>
        </div>
        <div class="reader-body" id="r-body"></div>
        <div class="reader-foot">
          <span class="reader-dl-label">📥 Download as:</span>
          <div class="reader-dl-group">
            <button class="reader-btn primary-dl" id="r-pdf">📄 PDF</button>
            <button class="reader-btn" id="r-word">📝 Word</button>
          </div>
          <button class="reader-btn" id="r-close2">Close</button>
        </div>
      </div>
    </div>`);

  let current = null;

  // ── Open reader
  window.openReader = function(id) {
    current = ARTICLES[id];
    if (!current) return;
    document.getElementById('r-emoji').textContent  = current.emoji;
    document.getElementById('r-cat').textContent    = current.category;
    document.getElementById('r-title').textContent  = current.title;
    document.getElementById('r-byline').innerHTML   =
      `✍️ ${current.author} &nbsp;·&nbsp; 📅 ${current.date} &nbsp;·&nbsp; ⏱ ${current.readTime}`;
    document.getElementById('r-body').innerHTML     = current.content;
    document.getElementById('reader-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeReader() {
    document.getElementById('reader-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('r-close').addEventListener('click', closeReader);
  document.getElementById('r-close2').addEventListener('click', closeReader);
  document.getElementById('reader-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeReader();
  });

  // ── Download as PDF (print dialog)
  document.getElementById('r-pdf').addEventListener('click', function() {
    if (!current) return;
    var w = window.open('', '_blank');
    w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + current.title + '</title><style>'
      + 'body{font-family:Georgia,serif;max-width:720px;margin:40px auto;color:#111;line-height:1.8;}'
      + 'h1{font-size:1.8rem;margin-bottom:6px;}'
      + '.meta{color:#666;font-size:.85rem;border-bottom:2px solid #00d4ff;padding-bottom:10px;margin-bottom:28px;}'
      + 'h2{font-size:1.2rem;color:#0a0a23;margin-top:28px;}'
      + '.highlight-box{background:#f0faff;border-left:4px solid #00d4ff;padding:14px 18px;margin:20px 0;border-radius:4px;}'
      + '.stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:20px 0;}'
      + '.stat-box{border:1px solid #ddd;padding:14px;text-align:center;border-radius:6px;}'
      + '.stat-num{font-size:1.4rem;font-weight:800;color:#0070f3;}'
      + '.stat-lbl{font-size:.78rem;color:#666;margin-top:4px;}'
      + 'ul{padding-left:20px;}li{margin-bottom:6px;}'
      + '.footer{margin-top:40px;border-top:1px solid #ddd;padding-top:12px;color:#999;font-size:.8rem;}'
      + '@media print{body{margin:20px;}}'
      + '</style></head><body>'
      + '<h1>' + current.title + '</h1>'
      + '<div class="meta">✍️ ' + current.author + ' &nbsp;|&nbsp; 📅 ' + current.date + ' &nbsp;|&nbsp; ⏱ ' + current.readTime + '</div>'
      + current.content
      + '<div class="footer">© 2025 AI-Solutions Ltd · info@ai-solutions.com · Sunderland, UK</div>'
      + '</body></html>');
    w.document.close();
    setTimeout(function() { w.focus(); w.print(); }, 400);
  });

  // ── Download as Word (RTF format — opens in Word)
  document.getElementById('r-word').addEventListener('click', function() {
    if (!current) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = current.content;
    var body = '';
    tmp.querySelectorAll('h2,h3,p,li').forEach(function(el) {
      var t = el.textContent.trim()
        .replace(/\\/g,'\\\\').replace(/\{/g,'\\{').replace(/\}/g,'\\}');
      if (!t) return;
      if (el.tagName === 'H2') body += '\\pard\\sb280\\sa120\\b\\fs28 ' + t + '\\b0\\par\n';
      else if (el.tagName === 'H3') body += '\\pard\\sb200\\sa80\\b\\fs24 ' + t + '\\b0\\par\n';
      else if (el.tagName === 'LI') body += '\\pard\\sb60\\sa60\\li360 \\bullet  ' + t + '\\par\n';
      else body += '\\pard\\sb100\\sa100 ' + t + '\\par\n';
    });
    var rtf = '{\\rtf1\\ansi\\deff0\n'
      + '{\\fonttbl{\\f0 Georgia;}{\\f1 Calibri;}}\n'
      + '{\\colortbl;\\red0\\green100\\blue200;}\n'
      + '\\f0\\fs24\n'
      + '\\pard\\sb400\\sa160\\b\\fs36 '
        + current.title.replace(/\\/g,'\\\\').replace(/\{/g,'\\{').replace(/\}/g,'\\}')
        + '\\b0\\par\n'
      + '\\pard\\sa200\\f1\\fs20\\cf1 '
        + current.author + ' | ' + current.date + ' | ' + current.readTime
        + '\\cf0\\f0\\par\n'
      + '\\pard\\sb0\\sa300\\brdrb\\brdrs\\brdrw10 \\par\n'
      + body
      + '\\pard\\sb400\\brdrb\\brdrs\\brdrw5 \\par\n'
      + '\\pard\\sb100\\f1\\fs18\\cf1 \u00A9 2025 AI-Solutions Ltd | info@ai-solutions.com\\par\n'
      + '}';
    var blob = new Blob([rtf], { type: 'application/rtf' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ai-solutions-' + (current.type === 'blog' ? 'blog' : 'casestudy')
      + '-' + current.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,40) + '.rtf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  });

  // ── Wire "Read" buttons onto blog and case study cards
  function wireCards() {
    // Featured article button (blog page hero)
    var featuredBtn = document.getElementById('featured-read-btn');
    if (featuredBtn) {
      featuredBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.openReader('blog-featured');
      });
    }

    // Blog cards
    document.querySelectorAll('.blog-card').forEach(function(card) {
      var id = card.getAttribute('data-article-id');
      if (!id || !ARTICLES[id]) return;
      var body = card.querySelector('.blog-body');
      if (body && !body.querySelector('.read-btn')) {
        var btn = document.createElement('button');
        btn.className = 'read-btn';
        btn.innerHTML = '📖 Read Article';
        btn.onclick = function() { window.openReader(id); };
        body.appendChild(btn);
      }
    });
    // Case study cards
    document.querySelectorAll('.proj-card').forEach(function(card) {
      var id = card.getAttribute('data-article-id');
      if (!id || !ARTICLES[id]) return;
      var body = card.querySelector('.proj-body');
      if (body && !body.querySelector('.read-btn')) {
        var btn = document.createElement('button');
        btn.className = 'read-btn';
        btn.innerHTML = '📖 Read Case Study';
        btn.onclick = function() { window.openReader(id); };
        body.appendChild(btn);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireCards);
  } else {
    wireCards();
  }
})();


/* ═══════════════════════════════════════════════════════════════
   2. WEBSITE RATING WIDGET
   ═══════════════════════════════════════════════════════════════ */
(function initRating() {
  if (window.location.pathname.indexOf('/admin') !== -1) return;
  // Show on every new browser session (sessionStorage clears when browser/tab closes)
  if (sessionStorage.getItem('rated_this_session')) return;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="rating-widget" id="rating-widget">
      <button class="rating-dismiss" id="rating-dismiss">✕</button>
      <div class="rating-widget-title">⭐ Rate Our Website</div>
      <div class="rating-stars" id="rating-stars">
        <span class="rating-star" data-val="1">★</span>
        <span class="rating-star" data-val="2">★</span>
        <span class="rating-star" data-val="3">★</span>
        <span class="rating-star" data-val="4">★</span>
        <span class="rating-star" data-val="5">★</span>
      </div>
      <div class="rating-label" id="rating-label">Tap a star to rate</div>
      <button class="rating-submit" id="rating-submit" disabled>Submit Rating</button>
    </div>`);

  var selected = 0;
  var labels = ['','Poor 😕','Fair 🙁','Good 🙂','Great 😊','Excellent! 🤩'];
  var stars = document.querySelectorAll('.rating-star');
  var labelEl = document.getElementById('rating-label');
  var submitBtn = document.getElementById('rating-submit');
  var widget = document.getElementById('rating-widget');

  stars.forEach(function(star) {
    star.addEventListener('mouseenter', function() {
      var v = +this.dataset.val;
      stars.forEach(function(s) { s.classList.toggle('hovered', +s.dataset.val <= v); });
      labelEl.textContent = labels[v];
    });
    star.addEventListener('mouseleave', function() {
      stars.forEach(function(s) { s.classList.remove('hovered'); });
      labelEl.textContent = selected ? labels[selected] : 'Tap a star to rate';
    });
    star.addEventListener('click', function() {
      selected = +this.dataset.val;
      stars.forEach(function(s) { s.classList.toggle('selected', +s.dataset.val <= selected); });
      labelEl.textContent = labels[selected];
      submitBtn.disabled = false;
    });
  });

  submitBtn.addEventListener('click', function() {
    if (!selected) return;
    var entry = { rating: selected, page: window.location.pathname, timestamp: new Date().toISOString() };
    // Save to localStorage
    var existing = JSON.parse(localStorage.getItem('ai_ratings') || '[]');
    existing.push(entry);
    localStorage.setItem('ai_ratings', JSON.stringify(existing));
    localStorage.setItem('ai_site_rated_time', Date.now().toString());
    sessionStorage.setItem('rated_this_session', '1');
    // Detect correct PHP path (root vs /pages/ subfolder)
    var phpPath = window.location.pathname.indexOf('/pages/') !== -1
      ? '../php/save_rating.php'
      : 'php/save_rating.php';
    fetch(phpPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    }).catch(function() {});
    widget.innerHTML = '<div class="rating-thankyou"><div style="font-size:2rem;margin-bottom:8px;">'
      + (selected === 5 ? '🤩' : selected >= 4 ? '😊' : '🙏')
      + '</div><strong>Thank you!</strong><br>'
      + '<span style="font-size:.78rem;color:var(--text-muted)">Your ' + selected + '★ rating helps us improve.</span></div>';
    setTimeout(function() { widget.classList.add('hidden'); }, 3000);
  });

  document.getElementById('rating-dismiss').addEventListener('click', function() {
    widget.classList.add('hidden');
    sessionStorage.setItem('rated_this_session', '1');
  });
})();


/* ═══════════════════════════════════════════════════════════════
   3. ENHANCED CHATBOT — override botReply + keyword chips
   ═══════════════════════════════════════════════════════════════ */
(function initChatbot() {

  // ── Extended Q&A responses
  var QA = {
    'pric':      '💰 Our Pricing Plans:\n\n• Starter — £299/month\n  1 AI solution, 5,000 conversations/month, email support\n\n• Professional — £799/month\n  Up to 3 AI solutions, 25,000 conversations/month, priority support\n\n• Enterprise — Custom pricing\n  Unlimited solutions, dedicated manager, 1-hour SLA, 24/7 on-call\n\nAll plans billed monthly. Annual billing saves 20%!',
    'service':   '🤖 Our 6 AI Services:\n\n• 🤖 AI Virtual Assistants — 24/7 employee & customer support\n• ⚡ AI Automation — eliminate repetitive workflows\n• 💬 Chatbot Development — NLP-powered bots for any channel\n• 📊 AI Analytics — predictive dashboards & forecasting\n• 🧠 Smart Business Solutions — end-to-end AI strategy\n• 🔬 AI Prototyping — validate your AI idea in 2 weeks\n\nWhich would you like to know more about?',
    'how long':  '⏱ Typical Delivery Timelines:\n\n• AI Chatbot — 4–6 weeks\n• AI Virtual Assistant — 5–8 weeks\n• Automation Workflows — 6–10 weeks\n• Analytics Dashboard — 8–12 weeks\n• AI Prototype (MVP) — as fast as 12 days!\n\nWe\'ll give you a precise timeline after a free discovery call.',
    'timeline':  '⏱ Typical Delivery Timelines:\n\n• AI Chatbot — 4–6 weeks\n• AI Virtual Assistant — 5–8 weeks\n• Automation Workflows — 6–10 weeks\n• Analytics Dashboard — 8–12 weeks\n• AI Prototype (MVP) — as fast as 12 days!',
    'start':     '🚀 Getting Started is Easy:\n\n1. Book a free 30-min discovery call via our Contact page\n2. We audit your use case and recommend the right solution\n3. You receive a detailed proposal within 48 hours\n4. Most projects go live within 4–8 weeks\n\nNo commitment required for the discovery call!',
    'demo':      '🎯 We offer free discovery calls where we demo our solutions tailored to your use case.\n\n➡ Visit our Contact page to book — or email info@ai-solutions.com\n\nWe typically respond within 24 hours on business days.',
    'support':   '🛡️ Support Tiers:\n\n• Starter — Email support, 2-day response\n• Professional — Priority email & chat, same-day response\n• Enterprise — Dedicated account manager, 1-hour SLA, 24/7 on-call\n\nAll plans include guided onboarding and access to our knowledge base.',
    'integrat':  '🔗 We Integrate With Your Existing Tools:\n\n• CRM: Salesforce, HubSpot, Zoho\n• ITSM: ServiceNow, Jira\n• Comms: Slack, MS Teams, WhatsApp\n• ERP: SAP, Oracle, NetSuite\n• Data: Snowflake, BigQuery, AWS, Azure\n• HR: BambooHR, Workday, ADP\n\nDon\'t see yours? Ask us — we almost certainly support it!',
    'industr':   '🏭 Industries We Serve:\n\n• FinTech & Finance\n• Healthcare & MedTech\n• Retail & E-commerce\n• EdTech & Training\n• Professional Services\n• Manufacturing & Logistics\n• Real Estate\n• Legal & Compliance\n\nOur industry expertise means we understand your specific challenges.',
    'roi':       '📈 Real Results from Real Clients:\n\n• 340% average ROI within 12 months\n• Break-even in as little as 6 weeks\n• 60% ticket reduction (TechVenture)\n• 95%+ document accuracy (NexaFlow)\n• £420K ARR saved (DataBridge)\n• £2M+ total client ROI generated\n\nVisit our Case Studies page for full verified numbers!',
    'result':    '🏆 Our Track Record:\n\n• 50+ projects delivered\n• 12+ industries served\n• £2M+ in client ROI generated\n• 4.9★ average client rating\n\nCheck our Case Studies page for detailed breakdowns.',
    'secur':     '🔒 Security & Compliance:\n\n• Fully GDPR compliant throughout\n• Data encrypted at rest and in transit\n• Role-based access controls\n• Full audit trails for all AI interactions\n• Regular penetration testing\n• SOC 2 aligned architecture\n\nAsk us about specific regulatory requirements for your industry.',
    'gdpr':      '📋 Yes, all our solutions are fully GDPR compliant:\n\n• Data minimisation by design\n• Purpose-limited processing\n• Right to erasure built-in\n• Data Processing Agreements provided\n• No training on your data without explicit consent',
    'contact':   '📞 Get In Touch:\n\n• 📧 Email: info@ai-solutions.com\n• 📱 Phone: +44 191 000 0000\n• 📍 Location: Sunderland, UK (remote delivery worldwide)\n• 🗓 Book a call: visit our Contact page\n\nWe respond within 24 hours on business days.',
    'about':     '🏢 About AI-Solutions:\n\nWe\'re a specialist AI software house based in Sunderland, UK, serving clients globally. Founded by AI engineers and product strategists, we focus exclusively on practical, ROI-positive AI deployments.\n\n• 50+ projects delivered\n• Team of AI engineers, data scientists & UX designers\n• Remote-first — we work with clients worldwide',
    'chatbot':   '💬 AI Chatbot Development:\n\n• NLP-powered bots for websites, apps & messaging platforms\n• Handle thousands of queries simultaneously, 24/7\n• Seamless escalation to human agents\n• Learns and improves from every conversation\n• Delivery: 4–6 weeks | From £299/month',
    'automat':   '⚡ AI Automation Service:\n\nCommon use cases:\n• Invoice & document processing\n• Data entry & validation\n• Compliance checking\n• Document routing & classification\n\nTypical results: 60% productivity improvement, 95%+ accuracy, ROI within 6 weeks.',
    'hello':     '👋 Hello! Welcome to AI-Solutions. I\'m ARIA, your AI assistant. I can instantly answer questions about our pricing, services, timelines, integrations, and more. Just ask — or tap one of the topic buttons below!',
    'hi':        '👋 Hi there! I\'m ARIA. Tap any topic below or type your question — I\'ll answer instantly, no waiting needed!',
    'hey':       '😊 Hey! I\'m ARIA, AI-Solutions\' virtual assistant. What can I help you with today?'
  };

  // Escalation keywords — triggers human handoff message
  var escalationTriggers = [
    'human', 'agent', 'staff', 'person', 'speak to someone',
    'talk to someone', 'real person', 'speak to a human',
    'transfer', 'escalate', 'connect me', 'representative',
    'specific', 'complex', 'urgent', 'complaint', 'not helpful',
    'need help with something', 'very specific', 'something specific'
  ];

  // Override the botReply function from main.js
  window.botReply = function(input) {
    var l = input.toLowerCase();

    // Check escalation triggers first
    for (var i = 0; i < escalationTriggers.length; i++) {
      if (l.indexOf(escalationTriggers[i]) !== -1) {
        return '__ESCALATE__';
      }
    }

    // Match QA keywords
    for (var key in QA) {
      if (l.indexOf(key) !== -1) return QA[key];
    }

    // Final fallback — also escalate for truly unrecognised input
    return '__ESCALATE__';
  };

  // ── Inject keyword chip panel into chatbot
  var cbWin = document.getElementById('cb-win');
  if (!cbWin) return;

  var panel = document.createElement('div');
  panel.id = 'chat-suggest-panel';
  panel.innerHTML = '<button type="button" class="suggest-toggle" id="suggest-toggle" aria-expanded="false">'
    + '<span class="suggest-label">💡 Tap a topic — get instant answers</span>'
    + '<span class="suggest-caret">▾</span>'
    + '</button>'
    + '<div class="suggest-chips" id="suggest-chips"></div>';

  var chips = [
    { label:'💰 Pricing',       key:'pric'      },
    { label:'🤖 Services',      key:'service'   },
    { label:'⏱ Timeline',       key:'timeline'  },
    { label:'🚀 Get Started',   key:'start'     },
    { label:'📈 ROI & Results', key:'roi'       },
    { label:'🔗 Integrations',  key:'integrat'  },
    { label:'🏭 Industries',    key:'industr'   },
    { label:'🔒 Security',      key:'secur'     },
    { label:'🛡️ Support',       key:'support'   },
    { label:'📞 Contact',       key:'contact'   }
  ];

  var chipsContainer = panel.querySelector('#suggest-chips');
  chips.forEach(function(c) {
    var btn = document.createElement('button');
    btn.className = 'suggest-chip';
    btn.textContent = c.label;
    btn.addEventListener('click', function() {
      var cbMsgs = document.getElementById('cb-msgs');

      // Add user bubble
      var userBubble = document.createElement('div');
      userBubble.className = 'msg-bubble user';
      userBubble.textContent = c.label;
      cbMsgs.appendChild(userBubble);
      cbMsgs.scrollTo({ top: cbMsgs.scrollHeight, behavior: 'smooth' });

      // Typing indicator
      var typing = document.createElement('div');
      typing.className = 'msg-bubble bot typing-indicator';
      typing.innerHTML = '<div class="tdot"></div><div class="tdot"></div><div class="tdot"></div>';
      cbMsgs.appendChild(typing);
      cbMsgs.scrollTo({ top: cbMsgs.scrollHeight, behavior: 'smooth' });

      setTimeout(function() {
        typing.remove();
        var reply = QA[c.key] || window.botReply(c.key);
        var botBubble = document.createElement('div');
        botBubble.className = 'msg-bubble bot';
        botBubble.textContent = reply;
        cbMsgs.appendChild(botBubble);
        cbMsgs.scrollTo({ top: cbMsgs.scrollHeight, behavior: 'smooth' });
      }, 600 + Math.random() * 300);
    });
    chipsContainer.appendChild(btn);
  });

  var chatFooter = cbWin.querySelector('.chat-footer');
  if (chatFooter) cbWin.insertBefore(panel, chatFooter);

  // ── Collapsible toggle (starts collapsed so chat replies stay visible)
  var suggestToggle = panel.querySelector('#suggest-toggle');
  suggestToggle.addEventListener('click', function() {
    var isOpen = panel.classList.toggle('open');
    suggestToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

})();


/* ═══════════════════════════════════════════════════════════════
   5. FEEDBACK FORM
   ═══════════════════════════════════════════════════════════════ */
(function initFeedback() {
  var form = document.getElementById('feedback-form-wrap');
  if (!form) return;

  var fbRating  = 0;
  var starLabels = ['','Poor 😕','Fair 🙁','Good 🙂','Great 😊','Excellent! 🤩'];
  var stars     = document.querySelectorAll('.fb-star');
  var starLabel = document.getElementById('fb-star-label');
  var charCount = document.getElementById('fb-char');
  var textarea  = document.getElementById('fb-message');
  var errorEl   = document.getElementById('fb-error');
  var submitBtn = document.getElementById('fb-submit');
  var btnText   = document.getElementById('fb-btn-text');
  var successEl = document.getElementById('fb-success');
  var formWrap  = document.getElementById('feedback-form-wrap');
  var againBtn  = document.getElementById('fb-again');

  // Star interaction
  stars.forEach(function(star) {
    star.addEventListener('mouseenter', function() {
      var v = +this.dataset.val;
      stars.forEach(function(s) { s.classList.toggle('hovered', +s.dataset.val <= v); });
      starLabel.textContent = starLabels[v];
    });
    star.addEventListener('mouseleave', function() {
      stars.forEach(function(s) { s.classList.remove('hovered'); });
      starLabel.textContent = fbRating ? starLabels[fbRating] : 'Select rating';
    });
    star.addEventListener('click', function() {
      fbRating = +this.dataset.val;
      stars.forEach(function(s) {
        s.classList.toggle('selected', +s.dataset.val <= fbRating);
        s.classList.remove('hovered');
      });
      starLabel.textContent = starLabels[fbRating];
    });
  });

  // Character counter
  if (textarea) {
    textarea.addEventListener('input', function() {
      if (charCount) charCount.textContent = this.value.length;
    });
  }

  // Submit
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      var name     = (document.getElementById('fb-name')     || {}).value || '';
      var email    = (document.getElementById('fb-email')    || {}).value || '';
      var category = (document.getElementById('fb-category') || {}).value || 'General';
      var message  = textarea ? textarea.value : '';

      // Validate
      if (!name.trim()) { showError('Please enter your name.'); return; }
      if (!message.trim()) { showError('Please enter your feedback message.'); return; }
      if (message.trim().length < 10) { showError('Please write at least 10 characters.'); return; }
      clearError();

      // Disable button
      submitBtn.disabled = true;
      btnText.textContent = '⏳ Sending…';

      var payload = {
        name: name.trim(),
        email: email.trim(),
        category: category,
        rating: fbRating || 5,
        message: message.trim()
      };

      // Detect correct PHP path
      var phpPath = window.location.pathname.indexOf('/pages/') !== -1
        ? '../php/save_feedback.php'
        : 'php/save_feedback.php';

      fetch(phpPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success) {
          formWrap.style.display = 'none';
          successEl.style.display = 'block';
        } else {
          showError(data.message || 'Something went wrong. Please try again.');
          submitBtn.disabled = false;
          btnText.textContent = '📤 Submit Feedback';
        }
      })
      .catch(function() {
        showError('Connection error. Please check your internet and try again.');
        submitBtn.disabled = false;
        btnText.textContent = '📤 Submit Feedback';
      });
    });
  }

  // Submit another
  if (againBtn) {
    againBtn.addEventListener('click', function() {
      successEl.style.display = 'none';
      formWrap.style.display  = 'block';
      // Reset form
      ['fb-name','fb-email','fb-message'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
      });
      var cat = document.getElementById('fb-category');
      if (cat) cat.value = 'General';
      fbRating = 0;
      stars.forEach(function(s) { s.classList.remove('selected','hovered'); });
      if (starLabel) starLabel.textContent = 'Select rating';
      if (charCount) charCount.textContent = '0';
      clearError();
      submitBtn.disabled = false;
      btnText.textContent = '📤 Submit Feedback';
    });
  }

  function showError(msg) {
    if (errorEl) { errorEl.textContent = msg; }
  }
  function clearError() {
    if (errorEl) { errorEl.textContent = ''; }
  }
})();
