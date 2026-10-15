export function homeMarkup() {
  return `<section class="hero"><div id="hero-scene" class="hero-scene" aria-label="Interactive three-dimensional solar panel assembly"></div><div class="wrap hero-grid"><div class="hero-copy"><div class="eyebrow">Engineered for daylight</div><h1>A brighter future.<br>Built on <span>solar.</span></h1><p>Exceptional equipment. Thoughtful installation.<br>Energy that works for you, for years to come.</p><div class="hero-buttons"><a class="btn" href="#calculator">Find your solar potential <span>↗</span></a><a class="btn ghost" href="#catalog">Explore equipment <span>→</span></a></div></div></div><div class="scene-tag"><span class="mono">ATLAS / 450 W</span><br>Precision. In every cell.<br><span id="scene-status">Interactive 3D · drag to explore</span></div><div class="hero-bottom"><div class="hero-counter"><strong>01</strong><i></i><i></i><i></i><span>THE POWER OF POSSIBILITY</span></div><span>FROM FIRST LIGHT TO LASTING IMPACT</span><span>SCROLL TO EXPLORE ↓</span></div></section><div class="trust-band"><span>A complete energy ecosystem</span><strong>High-performance solar</strong><span>✳</span><strong>Intelligent storage</strong><span>✳</span><strong>Expert installation</strong><span>✳</span><strong>Lifetime partnership</strong></div><div class="wrap"><section class="section"><div class="section-head"><div><div class="eyebrow">One partner. Every step.</div><h2>Good energy starts<br>with a better approach.</h2></div><p>From the equipment on your roof to the people behind it, every detail matters.</p></div><div class="services"><article class="service-item"><span class="number">01 / EQUIPMENT</span><h3>Performance, by design.</h3><p>Considered solar panels, inverters, and storage. A complete system, selected to work beautifully together.</p><a href="#catalog">Explore the collection ↗</a></article><article class="service-item"><span class="number">02 / INSTALLATION</span><h3>Your site. Its full potential.</h3><p>Careful planning and precise installation. Turn the space you already have into energy you can depend on.</p><a href="#calculator">Discover your potential ↗</a></article><article class="service-item"><span class="number">03 / ONGOING CARE</span><h3>Here for the long run.</h3><p>Clear communication, timely maintenance, and an expert team that stays with your system.</p><a href="#service">Meet your service partner ↗</a></article></div></section><section class="project"><div class="project-image" role="img" aria-label="Solar panels across a sunlit landscape"><span class="image-caption">PROJECT STUDY / ILLUSTRATIVE</span></div><div class="project-copy"><div class="eyebrow">Powering what comes next</div><h2>More possibility.<br>Less dependence.</h2><p>A concept for a working landscape powered by the light above it. Thoughtfully sized. Built for a more resilient future.</p><div class="project-stats"><div><strong>120 <small>kWp</small></strong><small>Concept system capacity</small></div><div><strong>270</strong><small>High-output modules</small></div></div><a href="#calculator" class="btn dark">Explore a system for your site ↗</a></div></section><section class="section"><div class="eyebrow">A clear path forward</div><h2 style="margin-top:20px">From a question to clean energy.</h2><div class="process">${[
    [
      "01",
      "Understand",
      "We start with your energy use, your site, and your ambitions.",
    ],
    [
      "02",
      "Design",
      "The right equipment, the right configuration, a clear proposal.",
    ],
    [
      "03",
      "Install",
      "A carefully coordinated installation, down to the last connection.",
    ],
    ["04", "Care", "Ongoing support to keep your system working at its best."],
  ]
    .map(
      (x) =>
        `<article><span class="mono muted">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`,
    )
    .join(
      "",
    )}</div></section></div><section class="cta-band"><div><h2>Your roof has potential.</h2><p>Let’s see what daylight can do for you.</p></div><a class="btn dark" href="#calculator">Start your solar estimate ↗</a></section>`;
}
