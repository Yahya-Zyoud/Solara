"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { products, baseRows, fmt } from "./data";
import { homeMarkup } from "./home";
import { createScene } from "./scene";



const routes = ["home", "calculator", "catalog", "service", "dashboard"];
const route = () =>
  routes.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const fresh = () => structuredClone(baseRows);
function useSaved(key, initial) {
  const [value, set] = useState(() => read(key, initial));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [value, key]);
  return [value, set];
}
const easing = [0.22, 1, 0.36, 1];
function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
function Scene({ mode = "calc", count = 6, view = "perspective" }) {
  const initialCount = useRef(count);
  const host = useRef(),
    controller = useRef();
  useEffect(() => {
    controller.current = createScene(host.current, mode, initialCount.current);
    return () => controller.current?.dispose();
  }, [mode]);
  useEffect(() => {
    controller.current?.update(count);
  }, [count]);
  useEffect(() => {
    if (mode === "calc") controller.current?.view(view);
  }, [view, mode]);
  return (
    <div
      ref={host}
      className={mode === "hero" ? "hero-scene" : "scene"}
      aria-label="Interactive 3D solar panel assembly"
    />
  );
}
function Header({ page }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <a href="#home" className="brand" aria-label="Solara home">
        <span className="sunmark">✳</span>solara
      </a>
      <nav
        id="navigation"
        className={"nav " + (open ? "open" : "")}
        aria-label="Main navigation"
      >
        {[
          ["home", "Home"],
          ["calculator", "Calculator"],
          ["catalog", "Equipment"],
          ["service", "Service"],
          ["dashboard", "Workspace ↗"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={"#" + id}
            aria-current={page === id ? "page" : undefined}
          >
            {label}
            {page === id && (
              <motion.span
                className="active-nav"
                layoutId="active-nav"
                transition={{ type: "spring", stiffness: 380, damping: 35 }}
              />
            )}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="small-link" href="#service">
          Here for the long run.
        </a>
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="btn"
          href="#calculator"
        >
          Plan your system ↗
        </motion.a>
        <button
          className="menu-toggle"
          aria-controls="navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Menu ☰
        </button>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <a href="#home" className="brand">
        <span className="sunmark">✳</span>solara
      </a>
      <p>Engineered for daylight. Designed for tomorrow.</p>
      <p>
        Interactive prototype · All products, projects & figures are
        illustrative.
      </p>
    </footer>
  );
}
function Home() {
  const reduce = useReducedMotion();
  const options = {
    replace(node) {
      if (node.type !== "tag") return;
      if (node.attribs?.id === "hero-scene")
        return <Scene mode="hero" count={6} />;
      if (node.name === "section" && node.attribs?.class !== "hero")
        return (
          <motion.section
            {...attributesToProps(node.attribs)}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.65, ease: easing }}
          >
            {domToReact(node.children, options)}
          </motion.section>
        );
      if (node.attribs?.class === "hero-copy")
        return (
          <motion.div
            className="hero-copy"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easing }}
          >
            {domToReact(node.children, options)}
          </motion.div>
        );
    },
  };
  return parse(homeMarkup(), options);
}
function Field({ label, id, children, ...props }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children || <input id={id} {...props} />}
    </div>
  );
}
function Calculator({ ask }) {
  const [values, set] = useSaved("solara-react-planner", {
    usage: 850,
    hours: 4.8,
    area: 70,
    battery: false,
  });
  const [draft, setDraft] = useState({
    usage: String(values.usage),
    area: String(values.area),
  });
  const [view, setView] = useState("perspective");
  const reduce = useReducedMotion();
  const update = (key, value) => set((v) => ({ ...v, [key]: value }));
  const need = Math.ceil(values.usage / (30 * values.hours * 0.8 * 0.45)),
    panels = Math.min(need, Math.max(1, Math.floor(values.area / 2.5))),
    kw = panels * 0.45,
    generation = kw * values.hours * 365 * 0.8,
    cost = kw * 1150 + (values.battery ? 4200 : 0);
  const entries = [
    ["Annual generation", fmt(generation) + " kWh"],
    [
      "Energy coverage",
      Math.min(100, Math.round((generation / (values.usage * 12)) * 100)) + "%",
    ],
    ["Solar modules", panels + " × 450 W"],
    ["Battery storage", values.battery ? "10.2 kWh" : "Not included"],
    ["Indicative investment", "$" + fmt(cost)],
  ];
  const number = (key, min, max) => (
    <>
      <div className="input-unit">
        <input
          id={key}
          type="number"
          min={min}
          max={max}
          required
          value={draft[key]}
          aria-describedby={key + "-help"}
          aria-invalid={
            draft[key] === "" || +draft[key] < min || +draft[key] > max
          }
          onChange={(e) => {
            setDraft((d) => ({ ...d, [key]: e.target.value }));
            if (e.target.checkValidity()) update(key, +e.target.value);
          }}
        />
        <span>{key === "usage" ? "kWh" : "m²"}</span>
      </div>
      <small id={key + "-help"}>
        {draft[key] === "" || +draft[key] < min || +draft[key] > max
          ? `Enter a number from ${min} to ${max}.`
          : key === "usage"
            ? "Find this on your latest electricity bill."
            : "Allow for access and spacing."}
      </small>
    </>
  );
  return (
    <div className="wrap">
      <Reveal className="page-intro page-top">
        <div>
          <div className="eyebrow">The Solara planning studio</div>
          <h1>Put a number on possibility.</h1>
          <p>A few details. A clearer picture of your energy future.</p>
        </div>
        <span className="badge">LIVE ESTIMATE / DEMONSTRATION</span>
      </Reveal>
      <section className="calc-layout">
        <Reveal className="calc-input">
          <div className="step-label">01 / Shape your system</div>
          <Field label="Monthly electricity use" id="usage">
            {number("usage", 100, 10000)}
            <input
              type="range"
              min="100"
              max="10000"
              step="10"
              aria-label="Monthly electricity usage slider"
              value={values.usage}
              onChange={(e) => {
                update("usage", +e.target.value);
                setDraft((d) => ({ ...d, usage: e.target.value }));
              }}
            />
          </Field>
          <Field label="Daily peak sun hours" id="sun">
            <select
              id="sun"
              value={values.hours}
              onChange={(e) => update("hours", +e.target.value)}
            >
              {[
                [3.5, "Moderate"],
                [4.8, "Sunny"],
                [5.8, "Very sunny"],
              ].map(([n, l]) => (
                <option key={n} value={n}>
                  {l} · {n} hours
                </option>
              ))}
            </select>
            <small>Illustrative climate assumption.</small>
          </Field>
          <Field label="Available roof area" id="area">
            {number("area", 5, 1000)}
          </Field>
          <label className="toggle-row">
            Add 10.2 kWh storage
            <input
              type="checkbox"
              checked={values.battery}
              onChange={(e) => update("battery", e.target.checked)}
            />
          </label>
        </Reveal>
        <div className="calc-visual">
          <div className="visual-top">
            <span>SYSTEM EXPLORER</span>
            <span className="mono">450 W / MODULE</span>
          </div>
          <Scene count={panels} view={view} />
          <div className="visual-bottom">
            <span>
              {panels} modules · {fmt(panels * 2.5)} m² footprint
            </span>
            <button
              className="icon-btn"
              onClick={() => setView(view === "top" ? "perspective" : "top")}
            >
              {view === "top" ? "Perspective" : "Top view"} ↗
            </button>
          </div>
        </div>
        <Reveal className="calc-result" delay={0.12}>
          <div className="step-label">02 / Your solar potential</div>
          <div>
            <motion.div
              className="big-value"
              key={kw}
              initial={reduce ? false : { opacity: 0.3, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {kw.toFixed(2)} <small>kWp</small>
            </motion.div>
            <p className="result-label">Your suggested system size</p>
          </div>
          <div aria-live="polite" aria-atomic="true">
            {entries.map(([label, value]) => (
              <div className="ledger-row" key={label}>
                <span>{label}</span>
                <motion.strong
                  key={value}
                  initial={reduce ? false : { opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                >
                  {value}
                </motion.strong>
              </div>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn"
            onClick={() =>
              ask(
                `${kw.toFixed(2)} kWp solar system · ${panels} modules${values.battery ? " + 10.2 kWh battery" : ""}`,
              )
            }
          >
            Request this system ↗
          </motion.button>
          <p className="note">
            {need > panels
              ? "Roof area limits this configuration. Consider reducing demand or adding suitable installation space."
              : "Preliminary estimate only. Your site survey will determine the final configuration."}
          </p>
        </Reveal>
      </section>
      <div className="assumptions">
        {[
          [
            "Built around your demand.",
            "Panel count follows monthly use and available area, allowing 2.5 m² per module including spacing.",
          ],
          [
            "Honest about assumptions.",
            "Generation uses peak sun hours and an 80% performance factor. Shading, orientation and seasonal variation need a site assessment.",
          ],
          [
            "A starting point, not a promise.",
            "Illustrative USD costs use $1,150 per kWp plus $4,200 for optional storage, excluding taxes and site-specific work.",
          ],
        ].map(([h, p]) => (
          <Reveal key={h}>
            <h3>{h}</h3>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
function Catalog({ detail }) {
  const [category, setCategory] = useState("All equipment"),
    [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const filtered = products.filter(
    (p) =>
      (category === "All equipment" || category === p.type) &&
      `${p.name} ${p.type} ${p.spec}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="wrap">
      <Reveal className="page-intro page-top">
        <div>
          <div className="eyebrow">
            Considered equipment. Lasting performance.
          </div>
          <h1>Better energy. By design.</h1>
          <p>A curated ecosystem of solar, conversion, and storage.</p>
        </div>
        <span className="mono muted">THE EQUIPMENT COLLECTION / 06</span>
      </Reveal>
      <div className="catalog-bar">
        <div className="tabs" role="group" aria-label="Equipment category">
          {["All equipment", "Solar panels", "Inverters", "Batteries"].map(
            (c) => (
              <button
                key={c}
                className={"tab " + (c === category ? "active" : "")}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <input
          className="search"
          aria-label="Search equipment"
          placeholder="Search equipment…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <p className="demo-note collection-note">
        Concept equipment collection · Illustrative specifications and USD
        prices
      </p>
      <motion.div layout className="product-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.article
              layout={!reduce}
              key={p.id}
              className="product-card"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              transition={{ duration: 0.3, ease: easing }}
            >
              <motion.button
                whileHover={reduce ? {} : { y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="product-image"
                aria-label={"View " + p.name}
                onClick={() => detail(p)}
              >
                <span className="badge">
                  {p.type === "Solar panels"
                    ? "HIGH PERFORMANCE"
                    : p.type === "Batteries"
                      ? "STORE YOUR DAYLIGHT"
                      : "INTELLIGENT CONVERSION"}
                </span>
                <Image unoptimized width={500} height={500} src={p.image} alt={p.name + " equipment illustration"} />
              </motion.button>
              <div className="product-info">
                <span className="product-type">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.spec}</p>
                <div className="product-bottom">
                  <strong>From ${fmt(p.price)}</strong>
                  <button className="detail-button" onClick={() => detail(p)}>
                    Explore equipment ↗
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
        {!filtered.length && (
          <div className="empty" role="status">
            No equipment matches your search.
            <br />
            <button
              className="btn outline"
              onClick={() => {
                setCategory("All equipment");
                setQuery("");
              }}
            >
              Clear search & filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
function Tracker({ reference, records }) {
  const row = records.find(
    (r) => r[0].toLowerCase() === reference.toLowerCase(),
  );
  return (
    <div role="status">
      {reference && !row ? (
        <p className="track-error">
          No demo ticket found. Check the reference or try SL-2048.
        </p>
      ) : row ? (
        <>
          <div className="ticket-head">
            <strong className="mono">{row[0]}</strong>
            <span className="badge">{row[3]}</span>
          </div>
          <div className="timeline">
            {(reference.toUpperCase() === "SL-2048"
              ? [
                  [
                    "Request received",
                    "08 Oct · Reduced inverter output reported.",
                  ],
                  ["Reviewed by Maya", "09 Oct · Remote checks completed."],
                  [
                    "Technician visit scheduled",
                    "13 Oct · 09:00–11:00. Next action: provide access to the inverter.",
                  ],
                ]
              : [
                  [
                    "Demo request received",
                    "Next step: initial review. No real service action has been scheduled.",
                  ],
                ]
            ).map(([h, p], i) => (
              <motion.article
                key={h}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <h4>{h}</h4>
                <p>{p}</p>
              </motion.article>
            ))}
          </div>
          <p className="demo-note">
            Fictional demo ticket. No real appointment.
          </p>
        </>
      ) : null}
    </div>
  );
}
function Service({ records, add }) {
  const [sent, setSent] = useState(null),
    [reference, setReference] = useState("SL-2048"),
    [tracked, setTracked] = useState(""),
    [fileNote, setFileNote] = useState(
      "Image up to 10 MB. Demo attachment is not uploaded.",
    );
  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      id = "SL-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    add("Tickets", [id, f.get("name"), f.get("type"), "Under review", "Today"]);
    setSent(id);
    setReference(id);
    setTracked(id);
  }
  return (
    <div className="wrap">
      <Reveal className="page-intro">
        <div className="eyebrow">Care that continues</div>
        <h1>Good energy. Ongoing support.</h1>
        <p>Tell us what’s happening. We’ll help you see the next step.</p>
      </Reveal>
      <div className="service-layout">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="success"
              className="success-box"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="success-mark">✓</span>
              <h2>We have your demo request.</h2>
              <p>
                Your reference: <strong>{sent}</strong>
              </p>
              <p>No actual service visit has been requested.</p>
              <button className="btn dark" onClick={() => setSent(null)}>
                Report another issue
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="service-form"
              onSubmit={submit}
              exit={{ opacity: 0 }}
            >
              <div className="section-head">
                <h3>Report an issue</h3>
                <span className="mono muted">01 — 03</span>
              </div>
              <div className="form-grid">
                <Field
                  label="Full name"
                  id="svc-name"
                  name="name"
                  autoComplete="name"
                  required
                />
                <Field
                  label="Email address"
                  id="svc-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                />
                <Field
                  label="Site or installation reference"
                  id="svc-site"
                  name="site"
                  required
                />
                <Field label="What can we help with?" id="svc-type">
                  <select id="svc-type" name="type">
                    {[
                      "System performance",
                      "Inverter alert",
                      "Battery or storage",
                      "Panel or mounting issue",
                      "Routine maintenance",
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </Field>
                <div className="field full">
                  <label htmlFor="svc-description">Describe the issue</label>
                  <textarea
                    id="svc-description"
                    name="description"
                    minLength={10}
                    required
                    placeholder="When did it start? Any error messages or changes in output?"
                  />
                </div>
                <div className="field full">
                  <label htmlFor="svc-photo">Add a photo (optional)</label>
                  <input
                    id="svc-photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (
                        f &&
                        (f.size > 10485760 || !f.type.startsWith("image/"))
                      ) {
                        e.target.value = "";
                        setFileNote(
                          "Please choose an image smaller than 10 MB.",
                        );
                      } else
                        setFileNote(
                          f
                            ? f.name + " selected. Demo only; not uploaded."
                            : "Image up to 10 MB. Demo attachment is not uploaded.",
                        );
                    }}
                  />
                  <small role="status">{fileNote}</small>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.98 }} className="btn dark">
                Submit maintenance request ↗
              </motion.button>
              <p className="demo-note">
                Demo submission only. No actual maintenance visit is booked.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
        <Reveal className="service-aside" delay={0.1}>
          <div className="eyebrow">Already in our care?</div>
          <h2>
            A clear view of
            <br />
            what happens next.
          </h2>
          <p>
            Follow your request from the first report to the final resolution.
          </p>
          <form
            className="track-form"
            onSubmit={(e) => {
              e.preventDefault();
              setTracked(reference.trim());
            }}
          >
            <input
              aria-label="Ticket reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
            <button className="btn dark">Track ↗</button>
          </form>
          <p>Try the sample ticket SL-2048.</p>
          <Tracker reference={tracked} records={records} />
          <p className="safety">
            If you notice smoke, fire, or an immediate electrical hazard, keep
            clear and contact local emergency services. This form is not
            monitored for emergencies.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
function DataTable({ type, rows, open, query = "" }) {
  const found = rows.filter((r) =>
    r.join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {[
              "Reference",
              type === "Products" ? "Equipment" : "Client / site",
              "Details",
              "Status",
              type === "Tickets"
                ? "Next update"
                : type === "Installations"
                  ? "Capacity"
                  : "Value",
              "",
            ].map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {found.map((r) => (
            <tr key={r[0]}>
              <td className="mono">{r[0]}</td>
              <td>{r[1]}</td>
              <td className="muted">{r[2]}</td>
              <td>
                <span
                  className={
                    "badge " +
                    (/review|New|Planning/.test(r[3]) ? "yellow" : "")
                  }
                >
                  {r[3]}
                </span>
              </td>
              <td>{r[4]}</td>
              <td>
                <button className="record-link" onClick={() => open(type, r)}>
                  Open ↗
                </button>
              </td>
            </tr>
          ))}
          {!found.length && (
            <tr>
              <td colSpan="6" className="empty">
                No matching records.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
function Dashboard({ data, tab, setTab, edit, create }) {
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <span className="mono">SOLARA / WORKSPACE</span>
        {[
          ["Overview", "◫"],
          ["Leads", "◎"],
          ["Quotations", "▤"],
          ["Installations", "⌁"],
          ["Products", "▦"],
          ["Tickets", "◷"],
        ].map(([t, i]) => (
          <button
            key={t}
            className={"side-button " + (tab === t ? "active" : "")}
            aria-current={tab === t ? "page" : undefined}
            onClick={() => setTab(t)}
          >
            <span aria-hidden="true">{i}</span>
            {t}
          </button>
        ))}
        <div className="side-bottom">
          MA · Maya Adams
          <br />
          Operations manager · Demo
        </div>
      </aside>
      <section className="dashboard-main">
        <div className="dashboard-head">
          <div>
            <div className="eyebrow">Operations / demonstration</div>
            <h1>{tab === "Overview" ? "A good day to make progress." : tab}</h1>
            <p>
              {tab === "Overview"
                ? "Your team, your projects, and what needs you next."
                : "A clear view of your " + tab.toLowerCase() + "."}
            </p>
          </div>
          <div className="avatar">MA</div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "Overview" ? (
              <>
                <div className="stats">
                  {[
                    ["Active leads", data.Leads.length, "Demo records"],
                    ["Quotation pipeline", "$84.2k", "Illustrative total"],
                    ["Installations this month", "12", "Illustrative total"],
                    [
                      "Open service tickets",
                      data.Tickets.filter((r) => r[3] !== "Resolved").length,
                      "Demo records",
                    ],
                  ].map(([h, n, p]) => (
                    <div className="stat" key={h}>
                      <span>{h}</span>
                      <strong>{n}</strong>
                      <small>{p}</small>
                    </div>
                  ))}
                </div>
                <div className="dash-columns">
                  <div className="panel">
                    <div className="panel-head">
                      <h3>Energy put to work</h3>
                      <span className="mono muted">INSTALLED kWp / 2026</span>
                    </div>
                    <div
                      className="chart"
                      role="img"
                      aria-label="Illustrative monthly installed capacity chart"
                    >
                      {[32, 47, 42, 65, 59, 86].map((n, i) => (
                        <div className="chart-col" key={i}>
                          <span className="mono muted">
                            {Math.round(n * 0.9)}
                          </span>
                          <motion.div
                            className="bar"
                            style={{
                              height: n + "%",
                              transformOrigin: "bottom",
                            }}
                            initial={{ scaleY: reduce ? 1 : 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: reduce ? 0 : i * 0.06,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="chart-labels">
                      {["MAY", "JUN", "JUL", "AUG", "SEP", "OCT"].map((x) => (
                        <span key={x}>{x}</span>
                      ))}
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-head">
                      <h3>Needs your attention</h3>
                      <span className="badge yellow">3 ACTIONS</span>
                    </div>
                    {[
                      ["Review Olive House quotation", "Quotations"],
                      ["Confirm Cedar site access", "Installations"],
                      ["Assign maintenance request", "Tickets"],
                    ].map(([h, t]) => (
                      <div className="task-row" key={t}>
                        <span className="task-dot" />
                        <div>
                          <strong>{h}</strong>
                          <small>{t} · Demo action</small>
                        </div>
                        <button
                          className="icon-btn"
                          aria-label={"Open " + t}
                          onClick={() => setTab(t)}
                        >
                          ↗
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="panel table-panel">
                  <div className="panel-head">
                    <h3>Latest leads</h3>
                    <button
                      className="record-link"
                      onClick={() => setTab("Leads")}
                    >
                      View all leads →
                    </button>
                  </div>
                  <DataTable type="Leads" rows={data.Leads} open={edit} />
                </div>
              </>
            ) : (
              <>
                <div className="dashboard-toolbar">
                  <input
                    className="search"
                    aria-label={"Search " + tab.toLowerCase()}
                    placeholder={"Search " + tab.toLowerCase() + "…"}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="btn dark" onClick={() => create(tab)}>
                    + New{" "}
                    {tab === "Products"
                      ? "equipment"
                      : tab.slice(0, -1).toLowerCase()}
                  </button>
                </div>
                <div className="panel">
                  <DataTable
                    type={tab}
                    rows={data[tab]}
                    open={edit}
                    query={query}
                  />
                </div>
              </>
            )}
            <p className="demo-note">
              Simulated operations. Records stay in this browser; overview
              totals are illustrative.
            </p>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
function Dialog({ modal, close, children }) {
  const ref = useRef(),
    reduce = useReducedMotion();
  useEffect(() => {
    if (modal && !ref.current.open) ref.current.showModal();
    if (!modal && ref.current.open) ref.current.close();
  }, [modal]);
  return (
    <dialog
      className="dialog"
      ref={ref}
      aria-labelledby="dialog-title"
      onCancel={close}
      onClose={close}
    >
      <AnimatePresence mode="wait">
        {modal && (
          <motion.div
            key={modal.kind + (modal.subject || modal.row?.[0] || "")}
            className="dialog-inner"
            initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="dialog-head">
              <h2 id="dialog-title">{modal.title}</h2>
              <button
                className="close"
                aria-label="Close dialog"
                onClick={close}
              >
                ×
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
const statuses = {
  Leads: ["New inquiry", "Qualified", "Site survey", "Proposal", "Converted"],
  Quotations: ["Draft", "Awaiting review", "Issued", "Accepted", "Declined"],
  Installations: ["Planning", "Scheduled", "In progress", "Complete"],
  Products: ["Draft", "Published", "Unavailable"],
  Tickets: ["Under review", "Visit scheduled", "In progress", "Resolved"],
};
export default function SolaraApp() {
  const [page, setPage] = useState(route),
    [tab, setTab] = useState("Overview"),
    [data, setData] = useSaved("solara-react-records", fresh()),
    [notes, setNotes] = useSaved("solara-react-notes", {}),
    [modal, setModal] = useState(null),
    [toast, setToast] = useState("");
  const reduce = useReducedMotion(),
    first = useRef(true);
  useEffect(() => {
    const change = () => {
      if (location.hash === "#main") {
        document.getElementById("main")?.focus();
        return;
      }
      setPage(route());
      setModal(null);
    };
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.title = "Solara V1 — " + page;
    window.scrollTo(0, 0);
    if (first.current) first.current = false;
    else document.getElementById("main")?.focus({ preventScroll: true });
  }, [page]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  const add = (type, row) =>
    setData((d) => ({ ...d, [type]: [row, ...d[type]] }));
  const ask = (subject) =>
    setModal({ kind: "inquiry", title: "Let’s make it yours.", subject });
  const detail = (p) =>
    setModal({ kind: "product", title: p.name, product: p });
  const close = () => setModal(null);
  const edit = (type, row) =>
    setModal({ kind: "record", title: row[1], type, row });
  const create = (type) =>
    setModal({
      kind: "create",
      title:
        "New " +
        (type === "Products" ? "equipment" : type.slice(0, -1).toLowerCase()),
      type,
    });
  let body = null;
  if (modal?.kind === "product") {
    const p = modal.product;
    body = (
      <div className="detail-layout">
        <div className="product-image">
          <Image unoptimized width={500} height={500} src={p.image} alt={p.name} />
        </div>
        <div className="detail-copy">
          <span className="product-type">{p.tag}</span>
          <p>{p.detail}</p>
          {[
            ["Rated capacity", p.power],
            ["Configuration", p.second],
            ["Demo price", "$" + fmt(p.price)],
          ].map(([a, b]) => (
            <div className="spec-row" key={a}>
              <span>{a}</span>
              <strong>{b}</strong>
            </div>
          ))}
          <p>
            Illustrative Solara concept product. Final compatibility and
            warranty require a quotation.
          </p>
          <button className="btn dark" onClick={() => ask(p.name)}>
            Inquire about this product ↗
          </button>
        </div>
      </div>
    );
  }
  if (modal?.kind === "inquiry")
    body = (
      <>
        <p className="inquiry-summary">{modal.subject}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget),
              ref = "LD-" + crypto.randomUUID().slice(0, 8).toUpperCase();
            add("Leads", [
              ref,
              f.get("name"),
              modal.subject,
              "New inquiry",
              "To assess",
            ]);
            setModal({ kind: "success", title: "A brighter start.", ref });
          }}
        >
          <div className="form-grid">
            <Field
              label="Your name"
              id="inq-name"
              name="name"
              autoComplete="name"
              required
            />
            <Field
              label="Email address"
              id="inq-email"
              name="email"
              autoComplete="email"
              type="email"
              required
            />
            <Field
              label="Project location"
              id="inq-location"
              name="location"
              required
            />
            <Field
              label="Quantity / systems"
              id="inq-qty"
              name="quantity"
              type="number"
              min="1"
              max="500"
              defaultValue="1"
              required
            />
            <div className="field full">
              <label htmlFor="inq-notes">Anything we should know?</label>
              <textarea id="inq-notes" name="notes" />
            </div>
          </div>
          <button className="btn">Submit demo inquiry ↗</button>
          <p className="demo-note">
            Nothing is sent. Your demo request stays in this browser.
          </p>
        </form>
      </>
    );
  if (modal?.kind === "success")
    body = (
      <div className="success-box">
        <span className="success-mark">✓</span>
        <h2>Demo inquiry received.</h2>
        <p>
          Your reference is <strong>{modal.ref}</strong>. No email was sent.
        </p>
        <a
          className="btn dark"
          href="#dashboard"
          onClick={() => {
            setTab("Leads");
            close();
          }}
        >
          View in workspace ↗
        </a>
      </div>
    );
  if (modal?.kind === "record")
    body = (
      <>
        <p className="inquiry-summary">
          {modal.row[0]} · {modal.row[2]}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setData((d) => ({
              ...d,
              [modal.type]: d[modal.type].map((r) =>
                r[0] === modal.row[0]
                  ? [...r.slice(0, 3), f.get("status"), r[4]]
                  : r,
              ),
            }));
            setNotes((n) => ({ ...n, [modal.row[0]]: f.get("note") }));
            close();
            setToast("Record updated in the demo workspace.");
          }}
        >
          <Field label="Status" id="record-status">
            <select
              id="record-status"
              name="status"
              defaultValue={modal.row[3]}
            >
              {[...new Set([modal.row[3], ...statuses[modal.type]])].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </Field>
          <Field label="Internal note" id="record-note">
            <textarea
              id="record-note"
              name="note"
              defaultValue={notes[modal.row[0]] || ""}
            />
          </Field>
          <button className="btn">Save demo update ✓</button>
        </form>
      </>
    );
  if (modal?.kind === "create")
    body = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          add(modal.type, [
            modal.type.slice(0, 2).toUpperCase() +
              "-" +
              crypto.randomUUID().slice(0, 8),
            f.get("name"),
            f.get("details"),
            statuses[modal.type][0],
            "—",
          ]);
          close();
          setToast("Demo record created.");
        }}
      >
        <Field
          label={
            modal.type === "Products" ? "Equipment name" : "Client / site name"
          }
          id="new-name"
          name="name"
          required
        />
        <Field label="Details" id="new-details" name="details" required />
        <button className="btn">Create demo record ↗</button>
      </form>
    );
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header key={page} page={page} />
      <main id="main" tabIndex="-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: easing }}
          >
            {page === "home" ? (
              <Home />
            ) : page === "calculator" ? (
              <Calculator ask={ask} />
            ) : page === "catalog" ? (
              <Catalog detail={detail} />
            ) : page === "service" ? (
              <Service records={data.Tickets} add={add} />
            ) : (
              <Dashboard
                  key={tab}
                data={data}
                tab={tab}
                setTab={setTab}
                edit={edit}
                create={create}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {page !== "dashboard" && <Footer />}
      <Dialog modal={modal} close={close}>
        {body}
      </Dialog>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="react-toast"
            role="status"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
