# Visual implementation specification

## Identity and type

Use Midnight for primary text and theatrical backgrounds; Solar for the principal action and selection; Eucalyptus for secondary emphasis; Sand for diagram and equipment surfaces; Paper for reading and forms. Use Midnight text on yellow buttons. Do not use yellow body text on Paper.

Load Manrope for headings (500, 600, 700) and DM Sans for body/controls (400, 500, 600). Use the project's font loader and retain licenses for any self-hosted files. Font binaries are not included. System monospace is sufficient for technical references.

Starting sizes, to be visually tested:

| Role | Desktop | Mobile |
|---|---|---|
| Home hero | 60–78 px | 46–53 px |
| Page heading | 44–48 px | 34–38 px |
| Section heading | 36–48 px | 30–34 px |
| Body | 16 px | 16 px |
| Form input | 16 px | 16 px |
| Supporting text | 12–14 px | 12–14 px |

Heading line-height approximately 1.08–1.15; body 1.6–1.75. Use restrained negative tracking for large headings, not form labels. Some prototype annotations are smaller than these targets: improve their readability during migration.

## Layout

- Maximum marketing content width: 1440 px including padding. Horizontal page padding: approximately 5% desktop, 6% mobile.
- Use CSS Grid/Flexbox. Start adaptation around 1100 px and 760 px, but let actual content determine breaks.
- Desktop header approximately 88 px; mobile 72 px. Keep navigation usable without hover.
- Section spacing: 64–96 px desktop, 40–64 px mobile.
- Minimal shadows on ordinary containers; use borders or background changes. Reserve shadows for real elevation and equipment grounding.
- Controls: generally at least 44 px effective touch area, clear labels, visible keyboard focus.

## Page composition

Home: dark hardware hero and mini-estimator → ecosystem/service introduction → component explainer → illustrative project story → delivery process → questions → final CTA.

Calculator: title → inputs / array / estimate ledger → explanation of recommendation → saved scenario comparison → assumptions. Stack on mobile: inputs, visualization, results. Preserve entered values when coming from Home.

Catalog: heading → category/search controls → equipment gallery → comparison tray. Product details use a media/specification split; inquiry preserves product context. At narrow widths allow one column when two cannot remain readable.

Service: reporting form plus tracking panel. Track views begin with current status, next action, owner, and appointment when applicable. Then show event history. New submissions must have a clear outcome and preserved input on failure.

Dashboard: navigation rail → contextual heading → queue and summary or module-specific table. On mobile use horizontal module navigation and full-width details; do not shrink desktop tables into illegibility.

## Shared components to build first

Button (yellow, dark, outline, text); form field with helper/error; numeric field with unit; select; checkbox; status badge; dialog; disclosure; empty/error/loading states; table toolbar; record detail; navigation/header/footer. Use the initialized component library for focus handling and dialog behavior, then style it.

## Motion contract

| Effect | Purpose and trigger | Behavior | Reduced-motion/error fallback |
|---|---|---|---|
| Button feedback | Confirm hover/focus/press | Color/border change, ~160 ms | Immediate state |
| Dialog | Explain temporary layer on open | Fade/small translation, ~220 ms | Immediate open; same focus management |
| Home arrival | Reveal equipment after scene readiness | One camera settle | Static settled camera or image |
| Array update | Connect committed input to configuration | Reconfigure panels; controlled camera fit | Immediate diagram/result |
| Home → Calculator | Retain configuration during navigation | Retain canvas/state, transition camera, ~650 ms target | Immediate camera; no navigation blocking |
| View change | Explain array geometry on explicit action | Perspective/top camera transition | Instant view |
| Submission feedback | Explain pending/success/error | Inline status; announce result | Static message |

Do not auto-spin equipment, hijack scrolling, or hide essential content while waiting for animation. DOM motion and 3D camera motion must have separate owners.

## Visual review checklist

Check 390 px, 768 px, 1440 px and at least one actual phone. Check long names, large numbers, text zoom, keyboard-only use, dialog dismissal, reduced motion, failed requests, and WebGL failure. Compare screenshots with the reference and record intentional differences. Verify contrast on actual foreground/background pairs.
