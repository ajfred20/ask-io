import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ask.io - AI-Powered Question Answering",
  description:
    "Get instant, accurate answers to your questions with our AI-powered platform. Features smart search, natural language processing, and verified sources.",
  openGraph: {
    title: "ask.io - AI-Powered Question Answering",
    description:
      "Get instant, accurate answers to your questions with our AI-powered platform. Features smart search, natural language processing, and verified sources.",
    type: "website",
    url: "https://ask.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ask.io preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ask.io - AI-Powered Question Answering",
    description:
      "Get instant, accurate answers to your questions with our AI-powered platform. Features smart search, natural language processing, and verified sources.",
    images: ["/og-image.png"],
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
        {children}
      </body>
    </html>
  );
}
