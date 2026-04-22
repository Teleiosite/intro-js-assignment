# EduManage Pro — End-to-End SaaS System Design

## 1) Product Scope

EduManage Pro is a multi-tenant school management SaaS that supports school administrators, teachers, students, and parents from onboarding to daily operations, analytics, and billing.

### Core Goals
- Provide strict tenant data isolation by organization.
- Deliver role-based user journeys (admin, teacher, student, parent).
- Support academic workflows: attendance, grading, results, timetable, lesson plans.
- Add differentiators: AI co-pilot, gamification, predictive insights.
- Support reliable monetization and production operations.

---

## 2) Architecture Overview

### Frontend
- **Next.js 15 App Router + TypeScript strict mode**.
- **Tailwind + shadcn/ui + Radix** component system.
- **React Query** for server-state caching and optimistic updates.
- **Zustand** for local UI/session utilities.

### Backend
- **Next.js Route Handlers** for APIs.
- **NextAuth v5** (credentials + future OAuth) with org-aware auth logic.
- **Drizzle ORM + Neon Postgres** for relational data.
- **Inngest** for asynchronous workflows.

### Integrations
- **Anthropic + Vercel AI SDK** for AI features.
- **Twilio + Resend** for notifications.
- **Stripe** for subscriptions and metering.

### Deployment
- **Vercel** frontend/backend runtime.
- **Neon** managed Postgres.
- Observability via logs, traces, and error tracking.

---

## 3) Tenant Isolation Strategy

1. Every business table stores `org_id`.
2. Every authenticated request includes session `orgId`.
3. Every query applies `WHERE org_id = session.orgId`.
4. API wrappers reject cross-tenant IDs (403/404).
5. Background jobs carry tenant context and re-validate it.
6. Admin users cannot access data outside their own org.

Optional hardening (future): Postgres RLS + per-tenant encryption keys.

---

## 4) Security Model

### Authentication
- Credentials login with organization slug + email + password.
- Password hashing with bcrypt (cost 12).
- JWT session strategy with typed role/org claims.

### Authorization
- Permission matrix by role and action.
- Resource ownership checks (e.g., parent-child, student-self).
- Centralized `assertAuthorized` helpers across route handlers.

### Platform Security
- CSRF protections for auth and mutation routes.
- Rate limiting on login, registration, and messaging endpoints.
- Secure headers (CSP, HSTS, X-Frame-Options, Referrer-Policy).
- Input validation via Zod on all API payloads.
- Audit logs for sensitive actions and denied access attempts.

---

## 5) Data Design (Domain Model)

### Core Entities
- `organizations`
- `users` (role-scoped)
- `students`, `teachers`, `parents`
- `classes`, `subjects`, `teacher_subject_assignments`

### Academic Entities
- `student_attendance`, `staff_attendance`
- `scores`, `term_results`
- `timetables`, `lesson_plans`

### Engagement & Messaging
- `notifications`, `announcements`
- `achievements`, `student_achievements`, `xp_transactions`

### Governance & Commerce
- `audit_logs`
- `fee_structures`, `fee_payments`
- Stripe-linked fields on organizations for billing

---

## 6) Phase-by-Phase Delivery Plan (Beginning → Deployment)

## Phase 0 — Pre-Development (Week 0)

### P0.1 Initialization
Deliver:
- Next.js TypeScript project scaffold.
- Tailwind purple theme, path aliases, env templates.
- Drizzle, NextAuth, AI, notification, billing dependencies.
- Base folder architecture for API/UI/lib/stores/docs.

Acceptance:
- `pnpm dev` starts.
- TypeScript passes.
- Tailwind tokens render.

### P0.2 Design System
Deliver:
- shadcn components + shared primitives (`StatCard`, `PageHeader`, etc.).
- Utility functions (`cn`, date/percentage/currency helpers).
- `/design-system` visual showcase route.

Acceptance:
- All components compile and render.
- No unresolved imports or type errors.

---

## Phase 1 — Foundation (Weeks 1–4)

### P1.1 Database Schema
Deliver:
- Full Drizzle schema with enums, constraints, indexes.
- Migration generation + migration execution.
- Seed script with demo organization and accounts.
- `docs/DATABASE.md` with ERD narrative and migration workflow.

Acceptance:
- Migrations run successfully.
- Seed data queryable.
- Uniqueness + FK constraints validated.

### P1.2 Multi-Tenant Authentication
Deliver:
- NextAuth credentials provider with org slug.
- Login/register pages + organization registration API.
- Session claims: userId, role, orgId, orgSlug.
- Middleware route protection.
- `docs/AUTH.md`.

Acceptance:
- New school registration works.
- Login works and persists.
- Cross-role routes are blocked.

### P1.3 Role-Based Authorization
Deliver:
- Permission map (`resource:action` style).
- Server guards + UI guards.
- Ownership validation for student/parent resources.
- Denied action audit logging.

Acceptance:
- Parent cannot access unrelated student.
- Teacher cannot mutate admin resources.
- All protected routes return consistent 403.

### P1.4 Admin User Management
Deliver:
- Admin users CRUD with search/filter/pagination.
- Invite + password reset initiation.
- Safeguards for last-admin lockout.

Acceptance:
- Admin can manage org users only.
- Deactivation and role updates enforce rules.

---

## Phase 2 — Core Features (Weeks 5–9)

### P2.1 Teacher Attendance Register
Deliver:
- Class-period attendance sheet.
- Bulk actions, draft save, final submission.
- Duplicate guard and attendance summaries.

### P2.2 WhatsApp/SMS Notifications
Deliver:
- Event-driven alert service with Inngest jobs.
- Delivery retries and failure logging.
- Parent channel preference routing.

### P2.3 Student/Parent Attendance Dashboards
Deliver:
- Student timeline, parent child selector, trend charts.
- CSV export for admin and teacher roles.

### P2.4 AI Grading Assistant
Deliver:
- Comment suggestions from score/rubric context.
- Editable outputs and moderation guardrails.
- Prompt logging with redaction.

### P2.5 Results + PDF Reports
Deliver:
- Score aggregation and class positions.
- Publish workflow with approval states.
- PDF report card generation and download.

### P2.6 AI Timetable Generator
Deliver:
- Constraint-based timetable engine.
- Conflict detection and manual override UI.

### P2.7 Lesson Plan Workflow
Deliver:
- Draft → submit → review → approve lifecycle.
- Admin feedback and version history.

### P2.8 Staff Clock-In/Out
Deliver:
- Daily staff attendance capture.
- Late minutes and monthly reporting.

Acceptance for Phase 2:
- Core teaching/admin daily workflows completed end-to-end.
- Notifications and reports verified in staging.

---

## Phase 3 — Differentiators (Weeks 10–14)

### P3.1 AI Teaching Assistant
- Generate lesson starters, quizzes, examples by class level.

### P3.2 Gamification
- XP rules, badge awarding, class leaderboards.

### P3.3 WhatsApp Bot
- Two-way queries (attendance, results, announcements).

### P3.4 Peer Tutoring Marketplace
- Tutor listings, bookings, session feedback.

### P3.5 Predictive Analytics
- Risk flags for attendance/performance; explainable indicators.

### P3.6 Resource Library
- Upload, tag, semantic search, and sharing controls.

Acceptance:
- Differentiators improve teacher efficiency and engagement KPIs.

---

## Phase 4 — Monetization & Scaling (Weeks 15–18)

### P4.1 Stripe Subscriptions
- Checkout, billing portal, webhook synchronization.
- Plan limits and entitlements middleware.

### P4.2 Usage Metering
- Track AI requests + SMS/WhatsApp units.
- Overage alerts and billing summaries.

### P4.3 Multi-School Network Mode
- District hierarchy and cross-school analytics for privileged users.

### P4.4 PWA Offline Mode
- Service worker caching and offline attendance queue sync.

Acceptance:
- Billing lifecycle tested (trial → paid → cancel/past due).
- Offline critical flows function and sync reliably.

---

## Phase 5 — Deployment & Monitoring

### P5.1 Production Deployment
- Vercel projects for dev/staging/prod.
- Neon branch strategy + migration gates.
- Secrets management and rotation cadence.

### P5.2 Monitoring
- Structured logging + correlation IDs.
- Error tracking alerts and on-call routing.
- Uptime checks for auth, attendance, and result APIs.

### P5.3 Performance
- Query optimization and index audits.
- Bundle analysis and route-level caching.
- p95 latency + error budget dashboards.

### P5.4 Security Hardening
- OWASP checks, dependency scans, secret scanning.
- Incident response playbook and tabletop drills.

Go-Live Acceptance:
- SLOs met for availability and latency.
- No critical unresolved security issues.
- Rollback and backup/restore tested.

---

## 7) API Surface Blueprint

### Auth & Organization
- `POST /api/organizations/register`
- `POST /api/auth/[...nextauth]`

### Users & Admin
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id`
- `POST /api/users/:id/reset-password`

### Attendance
- `POST /api/attendance/student/bulk`
- `GET /api/attendance/student?classId=&date=`
- `POST /api/attendance/staff/clock-in`
- `POST /api/attendance/staff/clock-out`

### Academic
- `POST /api/grading/scores`
- `POST /api/results/publish`
- `GET /api/results/student/:studentId`

### Timetable & Plans
- `POST /api/timetable/generate`
- `PATCH /api/lesson-plans/:id/status`

### Messaging & AI
- `POST /api/notifications/send`
- `POST /api/ai/grading-comment`
- `POST /api/ai/teaching-assistant`

### Billing
- `POST /api/stripe/checkout`
- `POST /api/stripe/webhooks`
- `GET /api/billing/usage`

---

## 8) Testing Strategy

### Unit
- Utility functions, grading calculations, permissions, mappers.

### Integration
- API route handlers with test DB.
- Notification and billing webhook handlers.

### End-to-End
- Register school → login → create class/subject/user → take attendance → publish result.

### Non-Functional
- Load tests for attendance and dashboard endpoints.
- Security tests (auth bypass, IDOR, injection attempts).

Release Gate:
- Critical path e2e green.
- No sev-1/sev-2 open bugs.

---

## 9) DevOps, CI/CD, and Environments

### Branching
- `main` (production), `develop` (staging), feature branches.

### CI Pipeline
1. Install + typecheck + lint.
2. Unit/integration tests.
3. Build and artifact checks.
4. Security scans.
5. Controlled migration step for deployment.

### Environment Promotion
- Dev → Staging (automated)
- Staging → Production (approval + checklist)

### Backup & Recovery
- Daily backups and point-in-time restore policy.
- Disaster recovery drill each quarter.

---

## 10) Documentation Deliverables Checklist

- `docs/DATABASE.md`
- `docs/AUTH.md`
- `docs/RBAC.md`
- `docs/USER_MANAGEMENT.md`
- `docs/ATTENDANCE.md`
- `docs/RESULTS.md`
- `docs/TIMETABLE.md`
- `docs/LESSON_PLANS.md`
- `docs/BILLING.md`
- `docs/DEPLOYMENT.md`
- `docs/MONITORING.md`
- `docs/SECURITY.md`

---

## 11) Implementation Prompt Pattern (Reusable)

Use this standard prompt format for each module:

```txt
Build <module> for EduManage Pro.

Context:
- Next.js 15 + TypeScript strict + Drizzle + NextAuth.
- Multi-tenant: enforce orgId isolation in every query.

Tasks:
1) Data contracts and Zod schemas.
2) API routes with role guards.
3) UI pages/components with loading/error states.
4) Tests (unit + integration).
5) Module documentation under /docs.

Validation:
- Happy path + authz failures + cross-tenant denial tests.
```

---

## 12) Final Delivery Milestones

1. **M1 (Weeks 0–4)**: Working multi-tenant foundation.
2. **M2 (Weeks 5–9)**: Core school operations live.
3. **M3 (Weeks 10–14)**: AI and engagement differentiators.
4. **M4 (Weeks 15–18)**: Billing, scaling, and network features.
5. **M5 (Go-Live)**: Production hardening, observability, and launch.

This plan is now complete from project creation to deployment readiness.
