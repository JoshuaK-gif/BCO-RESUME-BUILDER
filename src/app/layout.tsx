import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Bridge Collective Opportunities - CV Builder",
    template: "%s | Bridge Collective Opportunities",
  },
  description:
    "Build a professional, ATS-friendly CV in minutes with beautiful templates. Powered by Bridge Collective Opportunities.",
  keywords: [
    "CV builder",
    "resume builder",
    "Bridge Collective Opportunities",
    "BCO",
    "youth opportunities",
    "professional CV",
    "free CV builder",
    "CV templates",
    "resume templates",
  ],
  authors: [{ name: "Bridge Collective Opportunities" }],
  creator: "Bridge Collective Opportunities",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bridgecollectiveopport.org",
    siteName: "Bridge Collective Opportunities",
    title: "Bridge Collective Opportunities - CV Builder",
    description:
      "Build a professional, ATS-friendly CV in minutes with beautiful templates.",
    images: [
      {
        url: "/BRIDGE.png",
        width: 1200,
        height: 630,
        alt: "Bridge Collective Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge Collective Opportunities - CV Builder",
    description:
      "Build a professional, ATS-friendly CV in minutes with beautiful templates.",
    images: ["/BRIDGE.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f5e9e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://www.bridgecollectiveopport.org" />
      </head>
      <body className="antialiased min-h-screen bg-white">{children}</body>
    </html>
  );
}
