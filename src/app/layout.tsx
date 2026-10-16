import type { Metadata } from "next";
import "./globals.css";
import "./solara.css";

export const metadata: Metadata = {
  title: "Solara — Engineered for daylight",
  description: "Explore solar equipment, estimate your system, and follow maintenance requests. Solara interactive demonstration.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
