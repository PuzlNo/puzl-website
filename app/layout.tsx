import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import JsonLd from "@/components/JsonLd";
import WebMcpTools from "@/components/WebMcpTools";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puzl.no"),
  title: {
    template: "%s | Puzl",
    default: "Puzl | Skreddersydde AI-løsninger",
  },
  description:
    "Vi bygger AI-løsninger skreddersydd til din bedrift, dine systemer og dine mål.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${workSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <WebMcpTools />
        <Nav />
        {children}
      </body>
    </html>
  );
}
