# Solara — V1 + Motion

The original Solara V1 experience is integrated into the main Next.js application. Run this repository from its root; no separate prototype project is required.

## Run locally

Use Node.js 24 LTS and npm. After cloning or pulling the updated repository:

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run build
npm start
```

## Five experiences

- `/#home` — brand introduction, services and projects.
- `/#calculator` — interactive system estimate and Three.js panel preview.
- `/#catalog` — equipment filters, details and inquiry flow.
- `/#service` — maintenance request and sample ticket tracking.
- `/#dashboard` — demo leads, quotations, installations, products and tickets.

The original green, yellow and sand visual identity is preserved. Motion (Framer Motion) handles React transitions and feedback, with reduced-motion support.

## Where to work

- `src/app/page.tsx`: application entry point.
- `src/app/layout.tsx`: global styles and page metadata.
- `src/app/solara.css`: V1 design and responsive styles.
- `src/components/solara/SolaraApp.jsx`: screens, forms and motion components.
- `src/components/solara/SolaraClient.tsx`: browser-only loading boundary.
- `src/components/solara/scene.js`: procedural Three.js hardware scene and cleanup.
- `src/components/solara/data.js`: illustrative products and operational data.
- `src/components/solara/home.js`: home-page content.
- `public/solara`: local product illustrations and project image.
- `docs/solara-team-handoff`: existing team materials, retained.
- `src/components/ui`: existing shared UI library, retained.

## Demo scope

This is an interactive frontend prototype. Requests, planner settings and workspace notes stay in the browser's local storage. No emails are sent and no production database or authentication is connected. Products, project figures and estimates are illustrative. The Three.js hardware is procedural geometry, not manufacturer CAD.

Navigation currently uses URL hashes. The experience loads on the client because the scene and demo storage use browser APIs. Production routing, backend integration, authentication and engineering validation of solar estimates are future team work.

## Updating the existing GitHub repository

Extract the update ZIP and upload its contents into the repository root with **Add file → Upload files**, preserving the `src` and `public` folder structure. Do not upload the ZIP itself or place the changes inside another folder. Commit the upload. Team members then pull the changes and run `npm ci`.

The previously uploaded `solara-v1-react-source` directory is not needed to run the integrated app; it can remain as a reference. Never upload `node_modules`, `.next`, or private environment files.
