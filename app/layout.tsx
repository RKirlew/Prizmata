import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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

        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />

            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-981815739"
            />

            <Script id="google-ads">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-981815739');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
