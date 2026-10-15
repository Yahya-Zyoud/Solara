import * as THREE from "three";
export function createScene(el, mode, count) {
  let sceneUpdate = () => {},
    sceneView = () => {},
    disposeScene = () => {};
  const state = { view: "perspective" };
  let renderer, raf, observer;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute(
      "aria-label",
      "Real-time three-dimensional solar hardware",
    );
  } catch {
    el.innerHTML = `<img class="fallback-img" src="${mode === "hero" ? "solar-field.jpg" : "panel.svg"}" alt="Solar hardware"><span class="fallback-note">Static preview · WebGL unavailable</span>`;
    sceneUpdate = () => {};
    sceneView = () => {};
    return { update() {}, view() {}, dispose() {} };
  }
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(
      mode === "hero" ? 33 : 38,
      1,
      0.1,
      200,
    );
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.HemisphereLight(0xe9f4e9, 0x364238, 2.5));
  const key = new THREE.DirectionalLight(0xfff1d0, 5);
  key.position.set(-5, 10, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -15;
  key.shadow.camera.right = 15;
  key.shadow.camera.top = 15;
  key.shadow.camera.bottom = -15;
  key.shadow.bias = -0.001;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc6e4ff, 3);
  rim.position.set(5, 3, -4);
  scene.add(rim);
  const texCanvas = document.createElement("canvas");
  texCanvas.width = 512;
  texCanvas.height = 1024;
  const ctx = texCanvas.getContext("2d");
  ctx.fillStyle = "#111e28";
  ctx.fillRect(0, 0, 512, 1024);
  for (let r = 0; r < 12; r++)
    for (let c = 0; c < 6; c++) {
      const x = 8 + c * 83,
        y = 9 + r * 84;
      const g = ctx.createLinearGradient(x, y, x + 80, y + 80);
      g.addColorStop(0, "#233441");
      g.addColorStop(0.55, "#11242e");
      g.addColorStop(1, "#304249");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect(x, y, 78, 78, 5);
      ctx.fill();
      ctx.strokeStyle = "#9aafb62c";
      ctx.lineWidth = 0.7;
      for (let l = 0; l < 14; l++) {
        ctx.beginPath();
        ctx.moveTo(x + 3, y + 4 + l * 5.2);
        ctx.lineTo(x + 75, y + 4 + l * 5.2);
        ctx.stroke();
      }
      ctx.strokeStyle = "#b7c4c052";
      ctx.lineWidth = 1.1;
      [20, 40, 60].forEach((a) => {
        ctx.beginPath();
        ctx.moveTo(x + a, y + 2);
        ctx.lineTo(x + a, y + 76);
        ctx.stroke();
      });
    }
  const texture = new THREE.CanvasTexture(texCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const glass = new THREE.MeshPhysicalMaterial({
    map: texture,
    metalness: 0.48,
    roughness: 0.23,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
  });
  const frame = new THREE.MeshStandardMaterial({
    color: 0x78858a,
    metalness: 0.9,
    roughness: 0.3,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x17211f,
    metalness: 0.6,
    roughness: 0.45,
  });
  const panelGeo = new THREE.BoxGeometry(1.1, 0.055, 2.04),
    frameGeo = new THREE.BoxGeometry(1.15, 0.105, 2.09),
    railGeo = new THREE.BoxGeometry(0.07, 0.15, 2.14);
  function makeArray(n) {
    while (group.children.length) group.remove(group.children[0]);
    const cols =
        mode === "hero" ? 3 : Math.min(6, Math.ceil(Math.sqrt(n * 1.5))),
      rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) {
      const unit = new THREE.Group();
      const f = new THREE.Mesh(frameGeo, frame);
      f.castShadow = true;
      f.receiveShadow = true;
      unit.add(f);
      const surface = new THREE.Mesh(panelGeo, glass);
      surface.position.y = 0.057;
      surface.castShadow = true;
      unit.add(surface);
      for (const a of [-0.39, 0.39]) {
        const rail = new THREE.Mesh(railGeo, black);
        rail.position.set(a, -0.12, 0);
        unit.add(rail);
      }
      unit.position.set(
        ((i % cols) - (cols - 1) / 2) * 1.2,
        0,
        (Math.floor(i / cols) - (rows - 1) / 2) * 2.15,
      );
      group.add(unit);
    }
    group.rotation.set(
      mode === "hero" ? 0.16 : 0,
      mode === "hero" ? -0.18 : 0,
      mode === "hero" ? -0.08 : 0,
    );
    group.position.y = 0.55;
    const size = Math.max(cols * 1.2, rows * 2.15);
    target.set(
      mode === "hero" ? 7 : size * 0.75,
      mode === "hero" ? 7.2 : size * 1.05,
      mode === "hero" ? 10 : size * 1.1,
    );
    if (mode === "hero") target.set(7, 7, 11);
    if (mode === "calc" && state.view === "top")
      target.set(0, size * 1.7, 0.01);
  }
  const target = new THREE.Vector3();
  makeArray(count);
  camera.position
    .copy(target)
    .multiplyScalar(mode === "hero" && !reduced ? 1.13 : 1);
  camera.lookAt(0, 0, 0);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: mode === "hero" ? 0.4 : 0.15 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.25;
  ground.receiveShadow = true;
  scene.add(ground);
  let dragging = false,
    lastX = 0,
    rotation = group.rotation.y;
  const down = (e) => {
      dragging = true;
      lastX = e.clientX;
    },
    move = (e) => {
      if (dragging) {
        rotation += (e.clientX - lastX) * 0.007;
        lastX = e.clientX;
      }
    },
    up = () => (dragging = false);
  el.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  function resize() {
    const w = el.clientWidth,
      h = el.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    if (mode === "calc") camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(38 / 2)) / Math.min(1, camera.aspect)));
    camera.updateProjectionMatrix();
  }
  observer = new ResizeObserver(resize);
  observer.observe(el);
  resize();
  let live = true;
  const draw = () => {
    if (!live) return;
    raf = requestAnimationFrame(draw);
    if (document.hidden) return;
    camera.position.lerp(target, reduced ? 1 : 0.055);
    camera.lookAt(0, 0, 0);
    group.rotation.y += (rotation - group.rotation.y) * 0.12;
    renderer.render(scene, camera);
  };
  draw();
  sceneUpdate = (n) => {
    if (n !== count) {
      count = n;
      makeArray(n);
      rotation = group.rotation.y;
    }
  };
  sceneView = (v) => {
    state.view = v;
    const size = Math.max(
      Math.min(6, Math.ceil(Math.sqrt(count * 1.5))) * 1.2,
      Math.ceil(count / Math.min(6, Math.ceil(Math.sqrt(count * 1.5)))) * 2.15,
    );
    target.set(
      v === "top" ? 0 : size * 0.75,
      v === "top" ? size * 1.7 : size * 1.05,
      v === "top" ? 0.01 : size * 1.1,
    );
  };
  const lost = (e) => {
    e.preventDefault();
    live = false;
    el.innerHTML =
      '<img class="fallback-img" src="panel.svg" alt="Solar panel static view"><span class="fallback-note">3D paused · static preview</span>';
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  disposeScene = () => {
    live = false;
    cancelAnimationFrame(raf);
    observer.disconnect();
    el.removeEventListener("pointerdown", down);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    texture.dispose();
    [glass, frame, black, ground.material].forEach((m) => m.dispose());
    [panelGeo, frameGeo, railGeo, ground.geometry].forEach((g) => g.dispose());
    renderer.dispose();
    sceneUpdate = () => {};
    sceneView = () => {};
  };
  return {
    update: (n) => sceneUpdate(n),
    view: (v) => sceneView(v),
    dispose: () => disposeScene(),
  };
}

