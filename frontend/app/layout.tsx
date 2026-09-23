import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const SHARE_TITLE = "SupportMe — Get Tipped. Get Paid.";
const SHARE_DESCRIPTION =
  "A tipping platform built on Stellar. Supporters send XLM or USDC, you cash out to your bank.";

export const metadata: Metadata = {
  // Makes the generated og/twitter image URLs absolute, which X and other
  // crawlers require.
  metadataBase: new URL(SITE_URL),
  title: "Support Me",
  description: "Support your favorite Creator",
  // og:image / twitter:image come from app/opengraph-image.tsx and
  // app/twitter-image.tsx.
  openGraph: {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    type: "website",
    siteName: "SupportMe",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}

