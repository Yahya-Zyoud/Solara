# Solara — step-by-step project

Solara is a planned solar-energy website for learning about solar services, browsing equipment, estimating systems, and requesting maintenance. Staff will eventually manage inquiries, quotations, installations, and tickets.

## Current status

The integrated frontend prototype has been reset to a minimal Next.js starter so we can rebuild and understand it one step at a time. The running app contains only a home-page placeholder; the five experiences below are planned work.

The previous prototype used sample data, hash navigation, browser local storage, animations, and procedural 3D. It did not connect a production database, authentication, email delivery, or persistent customer workflows. Installed packages do not mean these features are implemented.

## Run locally

Use Node.js 24 LTS and npm in the repository root:

```powershell
npm ci
npm run dev
```

Open the Local URL printed in the terminal, usually http://localhost:3000.

```powershell
npm run lint
npm run build
npm start
```

`npm start` requires a successful production build. The placeholder requires no environment variables. Never commit private environment files.

If Tailwind cannot find `@tailwindcss/postcss`, stop the server, run `npm ci --include=dev`, and restart. If the error persists after installation, stop the server and remove only the generated `.next` directory before restarting.

## Planned experiences

| Area | Purpose and intended features |
| --- | --- |
| Home | Brand introduction, hero, services, equipment overview, project story, process, FAQs, and calls to action |
| Calculator | Validated inputs, explicit units and assumptions, estimates, and inquiry handoff |
| Equipment | Categories, filters, product details, and product inquiries |
| Service | Maintenance requests, persistent tickets, and authorized customer tracking |
| Staff dashboard | Sign-in, permissions, leads, quotations, installations, products, and tickets |

These are not currently implemented routes. The original handoff also proposes a home-page mini-estimator that passes values to the calculator. Confirm its scope with the team before building it.

## Your part: home page

Build one section at a time. Understand its markup and styling, then check it in the browser before continuing.

1. Page basics: edit `src/app/page.tsx` and understand the root layout.
2. Header: brand, navigation, and later a mobile menu with working destinations.
3. Hero: headline, introduction, static visual, and main action. Add 3D later if agreed.
4. Services: equipment, installation, and ongoing care.
5. Equipment overview: explain panels, inverters, and batteries.
6. Project story: image and approved information; label sample statistics as illustrative.
7. Process: Understand, Design, Install, and Care.
8. FAQs and final action: common questions and a clear next step.
9. Footer: approved company and contact information.
10. Review: connect real destinations; add the mini-estimator if agreed; check mobile layout, keyboard use, and readability.

As sections grow, extract home-only components into `src/components/home/`. Keep shared header/footer components separate. We will implement each step together rather than generating the whole site at once.

## Code map after the reset

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Minimal home page; start here |
| `src/app/layout.tsx` | Required root HTML layout and metadata |
| `src/app/globals.css` | Tailwind imports and shared UI theme |
| `src/components/ui/` | Retained reusable UI primitives |
| `src/lib/utils.ts` | Shared class-name utility |
| `public/solara/` | Retained images and illustrations |
| `docs/solara-team-handoff/` | Historical prototypes, design references, and proposed backlog |
| `postcss.config.mjs` | Tailwind PostCSS configuration |
| `next.config.ts` | Next.js configuration |

The reset removes `src/components/solara/` implementation files and `src/app/solara.css`. The app no longer loads demo screens, demo local-storage state, or the 3D scene. Existing browser storage is not erased.

## Technology

- Next.js App Router, React, and TypeScript for the rebuild.
- Tailwind CSS and existing shared UI components for styling.
- Motion, Three.js, form, validation, Supabase, and email packages remain installed for possible later work. The starter does not connect those integrations.
- Follow `AGENTS.md`: read the relevant bundled guide in `node_modules/next/dist/docs/` before adding Next.js features.

## Design references

The green, solar-yellow, and sand visual identity is documented under `docs/solara-team-handoff/`:

- `START-HERE.md`: original handoff overview.
- `design/VISUAL-SPEC.md`: layout and visual guidance.
- `design/ASSET-REGISTER.md`: asset sources and limitations.
- `references/solara-v1-original.html` and `references/solara-v2-refined.html`: historical interactive prototypes.
- `engineering/BUILD-ORDER.md`: proposed backlog and acceptance criteria.
- `engineering/3D-HANDOFF.md`: later visualization work.

These files remain outside the active app. They describe previous plans and references, not completed features or an exact backup of the removed React implementation. This README describes the rebuild. The supplied video has not been fully reviewed and is not treated as a verified requirements specification.

## Later team milestones

After the shared foundation and home page, agree on routes and data contracts with the team. Build equipment and calculator journeys using labeled sample data, then connect a real inquiry flow to persistent storage. Add authentication and server-side permissions before exposing customer or staff records. Build service and dashboard workflows afterward.

Before production, validate solar calculations, replace sample content with approved information, implement server validation and persistence, and test full journeys including failures. Review accessibility, responsive layouts, performance, deployment, and security. A rendered screen alone does not mean its business workflow works.
