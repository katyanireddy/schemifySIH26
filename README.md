🔴 PRIORITY 1 — DATABASE
Supabase setup
 Create Supabase project

 Create users table

 Create schemes / opportunities table

 Create applications table

 Create documents table
 
Opportunity data
 Add 30–50 verified opportunities
 Scholarships
 Government internships
 Government funding/grants
 Government schemes & benefits
 Skill-development programs
 Fellowships/competitions

Each record should have:

 Name
 Category/type
 State
 Eligibility
 Income limit
 Education/course
 Age/category requirements
 Benefits
 Required documents
 Deadline
 Official application link

🟠 PRIORITY 2 — USER FLOW

Build this one complete flow:

Landing → Profile → Results → Details → Documents → Apply

Profile
 Name
 Age
 State
 Category
 Family income
 Education
 Course
 Year
 Interests
Results
 “Opportunities for you”
 Match percentage
 Eligible
 Near Eligible
 Not Eligible
 Filters by category
🟡 PRIORITY 3 — YOUR WOW FEATURES
⭐ 1. Personalized Matching
 Compare profile with eligibility rules
 Show matching opportunities
 Show WHY you qualify

Example:

Income ✓
State ✓
Category ✓
Course ✓

⭐ 2. Near-Eligible
 Identify missing condition
 Show percentage/match
 Explain what can make them eligible

Example:

82% Match
4/5 conditions met
Missing: 2nd-year requirement

⭐ 3. Document Health
 Upload document
 OCR extraction
 Name check
 Document type
 Missing fields
 Expiry check
🟢 PRIORITY 4 — AI

Don't build a complicated ML model.

 Rule-based eligibility engine
 AI-generated explanation
 AI multilingual explanation
 AI grounded only in your scheme data

Architecture:

Profile → Rules → Result → AI explains

🔵 PRIORITY 5 — APPLICATION SUPPORT

For each opportunity:

 Benefits
 Eligibility
 Required documents
 Application steps
 Deadline
 Official application link
 Save opportunity
 Mark as applied
🟣 PRIORITY 6 — REMINDERS

Prototype-level is enough.

 Upcoming deadlines page
 Deadline notification
 Document expiry notification
 Application status

You don't need to spend hours making actual WhatsApp automation work.

⚪ PRIORITY 7 — UI

Pages you actually need:

 Landing
 Profile
 Dashboard / Results
 Opportunity Details
 Near-Eligible
 Documents
 Applications / Saved
 Reminders

Keep it clean + trustworthy, not overly fancy.

🧪 PRIORITY 8 — TESTING

Before the presentation:

 Create one realistic student profile
 Make sure correct schemes appear
 Test eligible case
 Test near-eligible case
 Test document upload
 Test expiry detection
 Test application link
 Test mobile view
 Check every button
 Remove dummy/broken data 