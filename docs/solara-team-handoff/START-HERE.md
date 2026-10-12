# Solara — team implementation handoff

Use Solara v2 as the current visual and interaction reference. Keep v1 as the historical baseline. Build the Next.js implementation separately; neither prototype is production application code.

## What is included

- `references/solara-v2-refined.html`: self-contained interactive design reference.
- `references/solara-v1-original.html`: preserved original.
- `assets/`: the three equipment illustrations and landscape photograph actually used by the prototype.
- `design/tokens.css`: named color, spacing, type, and motion tokens for integration.
- `design/VISUAL-SPEC.md`: layout, typography, controls, responsive behavior, and motion direction.
- `design/ASSET-REGISTER.md`: provenance, limitations, and missing production assets.
- `reference-code/`: prototype CSS, application source, and procedural 3D scene for inspection.
- `engineering/BUILD-ORDER.md`: issues, responsibilities, boundaries, and acceptance checks.
- `engineering/3D-HANDOFF.md`: geometry, materials, light, camera, and React migration instructions.

## First team session

1. Open v2 in a browser and walk through all five experiences together.
2. Agree whether the first release serves one company or multiple companies. Company isolation changes the data model and permissions.
3. Assign owners for shared UI, data/workflows, and 3D/visual QA. Assign a reviewer to each issue.
4. Put this kit's design documents under `docs/design/` in the repository. Put prototype HTML under `references/`, outside `public/`.
5. Copy approved working images to `public/images/solara/`. Keep the asset register with the project.
6. Merge tokens into your existing global stylesheet. Do not replace shadcn's entire stylesheet or configuration.
7. Create the issues in BUILD-ORDER.md, starting with the shared shell and a component gallery.

## Decisions already made

- Identity: Midnight, Solar yellow, Eucalyptus, Soft Sand, Paper.
- Implemented prototype fonts: Manrope headings, DM Sans body/interface, system monospace technical annotations. The earlier proposal mentioned IBM Plex Mono, but the prototype does not load it.
- Five experiences: Home, Calculator, Catalog, Service, Dashboard.
- Next.js/React/TypeScript application; preserve the agreed component-library choice from your initialized repository.
- Prototype calculations and product data are illustrative. Do not promote them to commercial promises.

## First deliverable from the team

A pull request containing the five navigable routes, shared header/footer, Solara tokens and fonts, and a component gallery with button/input/dialog states. Check at 390 px and 1440 px. This is the foundation for all five pages, before detailed feature implementation.

## Verification status

Prototype script initialization and selected interaction flows were tested programmatically. Full rendered desktop/mobile, accessibility, and GPU verification remains outstanding. Treat this kit as a working design reference requiring visual review, not certified pixel-perfect or production-ready specifications.
