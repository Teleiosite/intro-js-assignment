# 🎓 EduManage Pro — Complete Development Blueprint
## AI-Agent-Ready Prompt Documentation (React + Neon + Next.js)

> **Purpose**: Step-by-step prompts to build a production-ready, multi-tenant school management SaaS from scratch to deployment. Each section is a standalone prompt you can feed to Claude Code, Cursor, or any AI coding assistant.

---

## 📋 Table of Contents

### **PHASE 0: PRE-DEVELOPMENT**
- [P0.1: Project Initialization & Environment Setup](#p01)
- [P0.2: Design System & Component Library Setup](#p02)

### **PHASE 1: FOUNDATION (Weeks 1-4)**
- [P1.1: Database Schema Design](#p11)
- [P1.2: Multi-Tenant Authentication System](#p12)
- [P1.3: Role-Based Authorization](#p13)
- [P1.4: Admin User Management](#p14)

### **PHASE 2: CORE FEATURES (Weeks 5-9)**
- [P2.1: Teacher Attendance Register](#p21)
- [P2.2: WhatsApp/SMS Notification System](#p22)
- [P2.3: Student/Parent Attendance Dashboard](#p23)
- [P2.4: AI Grading Assistant](#p24)
- [P2.5: Results Management & PDF Generation](#p25)
- [P2.6: AI Timetable Generator](#p26)
- [P2.7: Lesson Plan Workflow](#p27)
- [P2.8: Staff Clock-In/Out System](#p28)

### **PHASE 3: DIFFERENTIATORS (Weeks 10-14)**
- [P3.1: AI Teaching Assistant (Lesson Co-Pilot)](#p31)
- [P3.2: Gamification System (XP, Badges, Leaderboards)](#p32)
- [P3.3: WhatsApp Bot (Two-Way Interactions)](#p33)
- [P3.4: Peer Tutoring Marketplace](#p34)
- [P3.5: Predictive Analytics Dashboard](#p35)
- [P3.6: Teacher Resource Library](#p36)

### **PHASE 4: MONETIZATION & SCALING (Weeks 15-18)**
- [P4.1: Stripe Subscription Billing](#p41)
- [P4.2: Usage-Based Metering (AI Credits, SMS)](#p42)
- [P4.3: Multi-School Network Features](#p43)
- [P4.4: Progressive Web App (Offline Mode)](#p44)

### **PHASE 5: DEPLOYMENT & MONITORING**
- [P5.1: Production Deployment (Vercel + Neon)](#p51)
- [P5.2: Monitoring & Error Tracking](#p52)
- [P5.3: Performance Optimization](#p53)
- [P5.4: Security Hardening](#p54)

### **APPENDIX**
- [A1: Testing Strategy & Prompts](#a1)
- [A2: Documentation Generation](#a2)
- [A3: Onboarding Flow](#a3)

---

> The full prompt details for **P0.1**, **P0.2**, **P1.1**, and **P1.2** are captured exactly as provided in planning input and should be treated as locked baseline prompts.

---

## ✅ Plan Completion Addendum (Remaining Sections)

The sections below complete the remainder of the roadmap with concise, AI-agent-ready implementation prompts.

<a name="p13"></a>
## P1.3: Role-Based Authorization

### Prompt for AI Agent:
```txt
Implement centralized RBAC and permission checks.

Tasks:
1) Create permission map in /src/lib/auth/permissions.ts
   - Define actions per role (super_admin/admin/teacher/student/parent)
   - Include resource-scoped checks (attendance:same_org, results:own_child, etc.)

2) Create server utilities in /src/lib/auth/rbac.ts
   - can(role, action)
   - canAccessOrgData(sessionOrgId, resourceOrgId)
   - assertAuthorized(...) that throws typed 403 error

3) Add route guards
   - Protect API routes via helper wrapper requireRole([...])
   - Prevent IDOR by validating orgId on all queries

4) Add UI guards
   - <Can action="..."> component
   - Hide unauthorized nav and action buttons

5) Add audit logs for denied attempts in audit_logs table.

Validation:
- Teacher cannot access admin endpoints
- Parent only accesses linked children records
- Cross-org data requests always return 403/404

Deliverables:
- /docs/RBAC.md with role matrix + examples
- Unit tests for authorization helpers
```

<a name="p14"></a>
## P1.4: Admin User Management

### Prompt for AI Agent:
```txt
Build Admin User Management module.

Tasks:
1) CRUD APIs in /src/app/api/users
   - list/filter/paginate by role/status
   - create users with temp password + invite status
   - update profile/role/isActive
   - soft deactivate and optional hard delete

2) Admin UI pages
   - /admin/users list table with search + role filter
   - create/edit dialog forms
   - reset password workflow (admin-initiated)

3) Security
   - enforce org isolation (admin manages only own org users)
   - disallow self-demotion for last remaining admin

4) Notifications
   - send invite/reset notifications via email channel abstraction

Validation:
- Create teacher/student/parent accounts
- Role update and deactivation rules enforced
- Pagination + filters working

Deliverables:
- /docs/USER_MANAGEMENT.md
```

<a name="p21"></a>
## P2.1: Teacher Attendance Register
```txt
Implement fast class attendance taking for teachers.
- Daily register UI by class/subject/period
- Bulk mark present/absent/late/excused
- Save drafts + final submit
- Duplicate prevention by unique (student,date,period)
- Attendance summaries by class and student
Deliverables: API + teacher page + docs/ATTENDANCE.md
```

<a name="p22"></a>
## P2.2: WhatsApp/SMS Notification System
```txt
Implement notification pipeline with Twilio + fallback rules.
- Trigger alerts on absence/late/result publish
- Queue background jobs with Inngest
- Delivery status tracking + retries
- Parent preference channel handling
Deliverables: docs/NOTIFICATIONS.md + retry policy
```

<a name="p23"></a>
## P2.3: Student/Parent Attendance Dashboard
```txt
Create dashboards for attendance visibility.
- Student own attendance timeline + trend
- Parent child selector + alerts
- Monthly present/late/absent charts
- Export CSV for admin/teacher
Deliverables: dashboards + docs/ATTENDANCE_DASHBOARDS.md
```

<a name="p24"></a>
## P2.4: AI Grading Assistant
```txt
Implement AI-assisted grading comments and rubric suggestions.
- Input score + rubric + student profile context
- Generate concise teacher comments (editable)
- Add confidence/safety guardrails
- Log prompt/response metadata (no sensitive leakage)
Deliverables: docs/AI_GRADING.md + moderation notes
```

<a name="p25"></a>
## P2.5: Results Management & PDF Generation
```txt
Build end-to-end term result processing.
- Enter/import scores, compute totals/averages/positions
- Approval + publish workflow
- PDF report card generation with branding
- Parent/student portal view + download
Deliverables: docs/RESULTS.md
```

<a name="p26"></a>
## P2.6: AI Timetable Generator
```txt
Create timetable generator with constraint solving.
- Inputs: classes, teachers, subject load, rooms, periods
- Hard constraints: no teacher/class collisions
- Soft constraints: spread difficult subjects
- Manual adjustments + conflict warnings
Deliverables: docs/TIMETABLE.md
```

<a name="p27"></a>
## P2.7: Lesson Plan Workflow
```txt
Implement lesson plan draft/submit/review flow.
- Teacher drafts with templates
- Submit to admin for approval/corrections
- Version history + comments
- Weekly compliance dashboard
Deliverables: docs/LESSON_PLANS.md
```

<a name="p28"></a>
## P2.8: Staff Clock-In/Out System
```txt
Build staff attendance with punctuality analytics.
- Clock-in/out endpoints with anti-duplicate checks
- Late detection using org settings threshold
- Monthly reports and export
Deliverables: docs/STAFF_ATTENDANCE.md
```

<a name="p31"></a>
## P3.1: AI Teaching Assistant
```txt
Develop lesson co-pilot for teachers.
- Generate lesson starters, examples, quizzes
- Adapt by class level and curriculum topic
- Save generated artifacts to resource library
Deliverables: docs/AI_COPILOT.md
```

<a name="p32"></a>
## P3.2: Gamification System
```txt
Implement XP, levels, achievements, leaderboard.
- Award XP by attendance/performance milestones
- Achievement rules engine
- Class and school leaderboard with reset policies
Deliverables: docs/GAMIFICATION.md
```

<a name="p33"></a>
## P3.3: WhatsApp Bot
```txt
Implement two-way parent/student bot interactions.
- Commands: attendance summary, result status, announcements
- Auth via verified phone mapping + PIN
- Rate limiting and abuse protection
Deliverables: docs/WHATSAPP_BOT.md
```

<a name="p34"></a>
## P3.4: Peer Tutoring Marketplace
```txt
Build tutoring matching inside each school.
- Student tutor profiles and subject strengths
- Booking requests and session tracking
- Reputation ratings and moderation controls
Deliverables: docs/TUTORING.md
```

<a name="p35"></a>
## P3.5: Predictive Analytics Dashboard
```txt
Create risk and performance insights.
- At-risk attendance/performance indicators
- Cohort trends by class/subject/term
- Explainable feature contributions (simple, transparent)
Deliverables: docs/ANALYTICS.md
```

<a name="p36"></a>
## P3.6: Teacher Resource Library
```txt
Implement searchable content repository.
- Upload/tag/filter lesson resources
- AI-powered semantic search
- Org-level sharing permissions
Deliverables: docs/RESOURCE_LIBRARY.md
```

<a name="p41"></a>
## P4.1: Stripe Subscription Billing
```txt
Implement subscription lifecycle with Stripe.
- Checkout, portal, webhook sync
- Plan enforcement middleware
- Trial-to-paid conversion flow
Deliverables: docs/BILLING.md
```

<a name="p42"></a>
## P4.2: Usage-Based Metering
```txt
Track and bill variable usage.
- Meter AI calls, SMS/WhatsApp sends
- Monthly usage summaries and overage alerts
- Admin usage dashboard
Deliverables: docs/METERING.md
```

<a name="p43"></a>
## P4.3: Multi-School Network Features
```txt
Enable district/network-level operations.
- Parent organization with child schools
- Cross-school reporting for authorized roles
- Shared templates and policies
Deliverables: docs/NETWORK_MODE.md
```

<a name="p44"></a>
## P4.4: Progressive Web App
```txt
Add installable offline-capable PWA.
- Service worker caching strategy
- Offline attendance capture + sync queue
- Add-to-home-screen UX
Deliverables: docs/PWA.md
```

<a name="p51"></a>
## P5.1: Production Deployment
```txt
Deploy production stack (Vercel + Neon).
- Environment separation (dev/staging/prod)
- Secrets setup and rotation checklist
- CI/CD with migration gates
Deliverables: docs/DEPLOYMENT.md
```

<a name="p52"></a>
## P5.2: Monitoring & Error Tracking
```txt
Implement observability baseline.
- Structured logs with correlation IDs
- Error tracking + alert routing
- Uptime checks for critical endpoints
Deliverables: docs/MONITORING.md
```

<a name="p53"></a>
## P5.3: Performance Optimization
```txt
Optimize frontend and backend performance.
- Query/index tuning and caching
- Bundle analysis and route-level optimization
- SLA metrics dashboard (p95 latency)
Deliverables: docs/PERFORMANCE.md
```

<a name="p54"></a>
## P5.4: Security Hardening
```txt
Perform production security hardening.
- OWASP checklist, CSP, headers, CSRF, rate limits
- Dependency and secret scanning in CI
- Incident response runbook
Deliverables: docs/SECURITY.md
```

<a name="a1"></a>
## A1: Testing Strategy & Prompts
```txt
Define testing pyramid:
- Unit: utilities, RBAC, grading calculations
- Integration: API handlers + DB interactions
- E2E: auth, attendance flow, result publishing
Target coverage: critical paths >= 80%
```

<a name="a2"></a>
## A2: Documentation Generation
```txt
Enforce docs-as-code:
- /docs per module
- Architecture Decision Records (ADR)
- Changelog discipline by milestone
```

<a name="a3"></a>
## A3: Onboarding Flow
```txt
Build first-run onboarding wizard:
- school profile setup
- initial classes/subjects import
- invite staff
- sample data walkthrough
```
