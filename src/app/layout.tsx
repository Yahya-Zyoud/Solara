import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solara — Engineered for daylight",
  description: "Solara solar-energy website, built step by step.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
