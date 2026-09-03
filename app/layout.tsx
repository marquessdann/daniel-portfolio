import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/lib/SmoothScroll";
import Cursor from "@/components/Cursor";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danielmarques.dev"),
  title: <Daniel Marques /> — Backend & AI Dev,
  description:
    "Junior backend developer building with Python, Java and APIs, moving into AI engineering — LLM integration, RAG pipelines, agents and MCP.",
  keywords: [
    "Daniel Marques",
    "Backend Developer",
    "Python",
    "Java",
    "FastAPI",
    "Spring Boot",
    "AI Engineering",
    "RAG",
    "LLM",
    "MCP",
  ],
  openGraph: {
    title: <Daniel Marques /> — Backend & AI Dev,
    description:
      "Backend systems, APIs and AI-powered applications. Python · Java · APIs · AI Automation.",
    url: "https://danielmarques.dev",
    siteName: "Daniel Marques",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: <Daniel Marques /> — Backend & AI Dev,
    description:
      "Backend systems, APIs and AI-powered applications. Python · Java · APIs · AI Automation.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>
          <div className="bg-grain" aria-hidden="true" />
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
