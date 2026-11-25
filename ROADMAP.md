# LipaFlow Roadmap

## What LipaFlow is
LipaFlow helps small businesses in Kenya get paid by M-Pesa and automatically knows who has paid, so owners stop reconciling payments by hand and stay KRA‑ready.

## Who it is for
Small and medium businesses of any type. Every one of them needs the same core:
- Make an invoice or receipt quickly.
- Let the customer pay by M-Pesa.
- Know who has paid, without matching payments by hand.
- Chase customers who haven’t paid.
- Stay on the right side of KRA (VAT, eTIMS).

Features that only suit one type of business (stock for shops, tables for restaurants, quotes for service providers) come later, in the order real users ask for them.

## The wedge
Pay by M-Pesa, and the invoice marks itself paid. Everything before it makes invoices worth paying, and everything after it builds on knowing who has paid.

This is a hypothesis. We confirm it by talking to real business owners before **Milestone 3**.

## Principles
- **Money must be correct.** Rounding lives in one place. Payment callbacks are idempotent, so a retry never marks something paid twice. Issued invoices are never deleted, only cancelled with a credit note.
- **Fast beats fancy.** Creating an invoice should take under 30 seconds.
- **Phone first.** Big tap targets, no tiny tables, works on a weak connection.
- **Plain language.** “Who owes me”, not accounting jargon. English first, Swahili later.
- **A human confirms.** Nothing goes to KRA or to a customer without the owner's approval, including anything suggested by AI.
- **Secrets stay on the server.** No API keys in React code.

## Milestones
Each milestone ends with something you can demo.

### Milestone 1: Foundation (React app, deployed)
- [x] Project setup, folder structure, daily commits
- [x] Reusable UI components (Button, Input, Card)
- [x] Customer form with validation
- [x] Customer list, search, delete confirmation
- [x] Invoice form with line items and 16 % VAT
- [x] Invoice list with Paid, Pending and Overdue status
- [x] Async data layer with loading and error states (fake API)
- [x] Migrate the app to TypeScript (strict mode), then keep all new code in TypeScript
- [x ] Design tokens and the new visual design (UX1 to UX2)
- [x ] React Router with sidebar and mobile layout
- [x ] Context API and useReducer
- [ ] KRA PIN field on customers
- [ ] Tests, performance pass, accessibility pass
- [ ] Deployed to Netlify or Vercel
**Demo:** a polished, deployed invoicing app.

### Milestone 2: Real backend
- [ ] Express API in TypeScript, with validation (shared types for Customer and Invoice)
- [ ] Database for customers and invoices
- [ ] Login with JWT, passwords hashed
- [ ] Roles (owner and staff)
- [ ] React talks to the API instead of the fake one
- [ ] API documented with Swagger
**Demo:** data lives on a server and survives any device.

### Milestone 3: Get paid (the wedge)
- [ ] Talk to 5 business owners and write down what you learn
- [ ] M‑Pesa Daraja sandbox: STK Push
- [ ] Pay link on every invoice
- [ ] Callback handling, idempotent
- [ ] Invoice marks itself paid on a successful payment
- [ ] Failed and cancelled payments handled clearly
**Demo:** pay an invoice from a phone and watch it turn paid.

### Milestone 4: Know who has paid
- [ ] Paybill and Till payments (C2B) received and matched by reference
- [ ] Unmatched payments queue with manual matching
- [ ] Partial payments and overpayments
- [ ] Audit trail of every change to money records
**Demo:** money arrives and invoices update without anyone touching them.

### Milestone 5: Close the loop with the customer
- [ ] PDF invoice
- [ ] SMS receipt on payment
- [ ] Shareable invoice link
- [ ] Overdue list and reminders approved by the owner
**Demo:** invoice sent, paid, receipt received, late payers nudged.

### Milestone 6: KRA‑ready
- [ ] Credit notes instead of deleting invoices
- [ ] KRA PIN validation
- [ ] Monthly VAT summary and CSV export for accountants
- [ ] eTIMS integration built and tested in the KRA sandbox
**Demo:** an invoice flows through the eTIMS sandbox.

### Milestone 7: Production
- [ ] Docker
- [ ] GitHub Actions: lint, build and tests on every push
- [ ] Error monitoring (Sentry)
- [ ] Deployed backend on one cloud provider
- [ ] Redis queue for payment callbacks and retries
- [ ] README with screenshots and an architecture diagram
**Demo:** a live URL, a green CI badge and monitoring.

### Milestone 8: Stretch (one AI feature)
- [ ] Draft an invoice from a typed or spoken message. The owner reviews it before it is created.
- [ ] Structured output validated with a schema
- [ ] Evaluation set of 30 realistic messages (including Swahili mixed with English)
- [ ] Per‑user usage limits and a spending cap

## Toolchain by milestone
- **Milestone 1 – Foundation**: TypeScript (strict), Vitest & React Testing Library, Zod, React Hook Form, TanStack Query, Tailwind with our own theme, i18n setup, Husky with lint‑staged, Figma, Lighthouse
- **Milestone 2 – Backend**: Express, a database (MongoDB or PostgreSQL), an ORM/ODM with migrations, SQL and transactions, JWT, password hashing, helmet, CORS, rate limiting, Zod on every request, Supertest, Swagger, structured logging (pino), OWASP Top 10‑3
- **Milestone 3 – Get paid**: M‑Pesa Daraja sandbox, a public tunnel (ngrok or Cloudflare Tunnel), webhook verification, idempotency keys, Postman
- **Milestone 4 – Know who has paid**: Redis & BullMQ for background jobs and retries, audit logging, reconciliation tests
- **Milestone 5 – Close the loop**: PDF generation, SMS provider, PWA and offline support
- **Milestone 6 – KRA‑ready**: eTIMS sandbox (OSCU or VSCU spec), CSV export, Playwright end‑to‑end tests
- **Milestone 7 – Production**: Docker, GitHub Actions, Sentry, Nginx, one cloud provider, Dependabot & npm audit, architecture diagrams in Mermaid, short decision records in `docs/`
- **Milestone 8 – Stretch**: LLM API called only from the backend, schema‑validated output, an evaluation set

**Not planned:** Kubernetes, Jenkins, Elasticsearch, GraphQL, extra programming languages.

## Backlog
- Next (after deployment): quotes that convert to invoices, expense logging, recurring invoices, staff permissions.
- Optional side project: a public landing page for LipaFlow (good use for Next.js, because search visibility matters there, unlike the app behind the login).
- Later (only if real users ask): inventory and stock alerts, multi‑branch tracking, WhatsApp sharing (messages are charged by Meta), receipt scanning, a conversational assistant.

## Open decisions
- Which database for money records: MongoDB (fits MERN) or PostgreSQL (strong for relational financial data)?
- Which card or gateway option, if any, to add beside M‑Pesa?
- Which cloud provider to deploy on?

## How we will know it works
- A new user creates their first invoice within 5 minutes.
- An invoice takes under 30 seconds to create for a returning customer.
- A successful M‑Pesa payment marks the invoice paid with no manual action.
- Real business owners can finish the main tasks on a phone without help.
