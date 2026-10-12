# 3D handoff

## What you have

`reference-code/scene-v2.js` is the actual procedural scene used by v2. It builds geometry, draws the solar-cell texture, creates a studio reflection environment, and positions the camera. The equipment SVGs are separate 2D illustrations, not exported 3D models.

This script depends on the prototype's THREE import, state, selectors, and scene callbacks. It is reference code, not a drop-in React component. Consult full `app.js` for its context. Production should use your installed Three.js/React Three Fiber packages rather than copying a bundled engine.

## Model and materials

Concept module dimensions: approximately 1.14 × 2.075 scene units; visual units are not certified product dimensions. Array spacing: 1.23 across and 2.18 along. Parts include a backsheet, glass surface, four frame members, rails, feet, clamps, and bolts.

| Material | Settings from prototype |
|---|---|
| Cell/glass surface | Procedural 512 × 1024 texture; metalness .18; roughness .25; clearcoat 1; clearcoat roughness .16; environment intensity .8 |
| Aluminum | #87918F; metalness .88; roughness .32; environment intensity 1.2 |
| Dark mounting metal | #22332C; metalness .75; roughness .4 |
| Fasteners | #C4CCC8; metalness .9; roughness .24 |

Lighting: hemisphere light, warm directional key, cooler fill, and a generated reflection environment with three broad light cards. Shadows establish contact with a ground plane. Reference renderer uses ACES tone mapping, exposure 1.1, and a pixel-ratio cap of 1.6. These are starting settings; test against real devices and color output.

## React component breakdown

- SolarScene: client-only Canvas boundary, loading/failure states, rendering quality.
- SolarPanel: reusable geometry/material references.
- SolarArray: panel count, placement, and shared geometry/instancing strategy.
- StudioLighting: environment, key/fill, ground shadow.
- CameraRig: named hero/perspective/top poses, bounds-aware framing.
- SceneControls: pointer/keyboard rotation and explicit view buttons.
- SolarPreviewFallback: image or useful 2D array diagram with panel count.

Keep configuration state in a shared provider above Home and Calculator. Keep the Canvas mounted in their shared layout when navigating between them. Other routes should not pay for ongoing rendering. Do not instantiate a second renderer just to transition pages.

Calculator input produces a configuration object; both the numbers and visual preview read that object. Rendering never determines prices or engineering results. Keep GPU animation updates outside React state updates per frame.

## Work order

1. Render one module against a neutral background.
2. Add cell pattern and material highlights.
3. Add frame, mounts, ground contact, and lighting.
4. Lay out N modules and fit the camera to bounds.
5. Add accessible top/perspective controls.
6. Share configuration and Canvas between routes.
7. Add reduced-motion behavior, load failure/context-loss fallback, and mobile quality limits.
8. Test the smallest/largest supported arrays and measure frame time. Instance repeated parts if necessary; do not assume hundreds of individual meshes are production-ready.

Use the current procedural model initially. If Blender/CAD becomes necessary, request real dimensions, separate sensible material groups, export GLB, optimize geometry/textures, and produce matching still images. There is no need to block initial page development on those assets.
