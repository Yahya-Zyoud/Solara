"use client";
import dynamic from "next/dynamic";

// The prototype reads browser storage and owns a WebGL canvas. Initialize it
// after hydration so browser-only state cannot mismatch server-rendered HTML.
const SolaraApp = dynamic(() => import("./SolaraApp"), {
  ssr: false,
  loading: () => <main aria-busy="true" style={{ padding: "12vh 6%", minHeight: "70vh" }}><h1>solara</h1><p role="status">Loading your solar workspace…</p></main>,
});
export default function SolaraClient() { return <SolaraApp />; }
