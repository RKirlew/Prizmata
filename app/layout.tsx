import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const geistMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prizmata — Auto-fill security questionnaires from your SOC2",
  description:
    "Upload your security documentation once. Paste any questionnaire. Get a completed CSV ready for Excel or Google Sheets.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
