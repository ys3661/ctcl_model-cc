# CTCL Insight

A clinical decision-support web app that helps dermatologists assess the risk of
cutaneous T-cell lymphoma (CTCL) and access related staging, documentation, and
referral resources.

> **Clinical disclaimer:** This tool is intended to support, not replace, clinical
> judgment. The risk score is a weighted heuristic over clinical features and does
> not incorporate histopathology. It is not a diagnostic device.

## Features

- **Risk calculator** (`/calculator`) — select clinical features (multiple biopsies,
  failed steroids, scaly patch/plaque, erythema, xerosis, pruritus, etc.) to compute
  a weighted risk score via the `/api/predict` endpoint, with an identical offline
  fallback. High-risk results generate a copy-paste **assessment & plan note**.
- **Clinical tools** (`/tools`) — a hub of point-of-care aids:
  - **Biopsy requisition builder** (`/biopsy-requisition`) — rule-out-MF clinical
    history, IHC panel (CD3/CD4/CD8/CD7/CD30/CD20), and TCR clonality request.
  - **Referral routing** (`/specialist-referral`) — red flags → urgent / routine /
    observe, plus what to send with the patient.
  - **TNMB stager** (`/clinical-support`) — interactive ISCL/EORTC stage calculator
    and full reference table.
  - **mSWAT / BSA calculator** (`/mswat`) — quantify skin burden and track response.
  - **Lesion tracker** (`/lesion-tracker`) — body-map lesion mapping with serial
    photos, stored on-device in the browser (no upload).
  - **Patient handouts** (`/patient-handout`) — printable biopsy/referral explainers.
- **Information, resources, treatments** — reference content on CTCL diagnosis,
  staging, and management.
- **Documentation** (`/documentation`) — downloadable evaluation-note templates and a
  medical-form / EPIC automation helper.
- **Search** (`/search`) — full-text search across the app's content.
- **Feedback** (`/feedback`) — feedback form that emails submissions via Resend, or
  logs them to the server console when no API key is configured.
- **Installable PWA** — web app manifest and a conservative service worker for
  offline/home-screen use.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- [Resend](https://resend.com/) for feedback email delivery

## Getting started

Requires Node.js 18+ and [pnpm](https://pnpm.io/) 9 (see the `packageManager` field).

```bash
pnpm install
cp .env.example .env.local   # optional — only needed to email feedback
pnpm dev                     # http://localhost:3000
```

## Environment variables

| Variable         | Required | Purpose                                                                 |
| ---------------- | -------- | ----------------------------------------------------------------------- |
| `RESEND_API_KEY` | No       | Enables emailing feedback submissions. When unset, they are logged to the server console instead. |

## Scripts

- `pnpm dev` — start the development server
- `pnpm build` — production build (type-checks and lints)
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint

## The risk model

Feature weights, labels, thresholds, and the scoring/interpretation logic live in a
single module, `lib/risk-model.ts`. Both the API route (`app/api/predict/route.ts`)
and the client calculator import from it, so there is only one source of truth. A
score below 0.3 is reported as **Low Risk**, otherwise **High Risk**. The score is a
transparent weighted sum and a decision-support heuristic — not a validated diagnostic
device.

Other shared clinical logic lives alongside it: `lib/ctcl-staging.ts` (TNMB staging),
`lib/mswat.ts` (skin burden), `lib/requisition.ts`, `lib/referral.ts`, and
`lib/note-builder.ts`.
