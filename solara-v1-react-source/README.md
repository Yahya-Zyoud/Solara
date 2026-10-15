# Solara V1 — React + Framer Motion

The original green/yellow V1, converted to React with Motion for React (the modern Framer Motion package). All earlier HTML editions are preserved.

## Run

Use Node 22.12+ or Node 24. In this folder:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4187/#calculator. Keep the terminal running. Do not open index.html as a file URL.

```sh
npm run build
npm run preview
```

Stop the development server before running preview; both use port 4187.

## Source

- `src/main.jsx`: React pages, controls, forms, dialogs, local demo state, AnimatePresence and motion components.
- `src/home.js`: preserved V1 homepage content, converted to React elements by the Home component.
- `src/scene.js`: original V1 Three.js renderer with explicit React mount/update/dispose lifecycle.
- `src/data.js`: illustrative equipment and operational records.
- `src/style.css`: V1 styling.
- `src/motion.css`: limited integration styles.
- `public/`: original illustrations and project image.

## Motion

Page enter/exit transitions; animated navigation indicator; scroll reveals; product filter layout animations; dialog entry; calculator result changes; chart entry; service confirmations; workspace section transitions. MotionConfig respects the device's reduced-motion preference. Three.js continues to control the hardware and camera.

## Scope and verification

All five pages are included. Browser checks exercised estimate changes, storage selection, quote dialog, catalog filtering, product inquiry submission, workspace records and sections, and service submission/tracking. Desktop calculator and 390px mobile layout were inspected. The build passes. This is not a full accessibility certification.

Data is simulated and stored only in this browser. The React edition uses its own storage keys and does not migrate old HTML demo records. There is no backend, email delivery, real account authentication, or file upload. Google Fonts requires internet; application dependencies and hardware assets are bundled by the build.

Motion documentation: https://motion.dev/docs/react-installation
