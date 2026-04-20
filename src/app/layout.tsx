import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";
import { imagePath } from "@/lib/imagePath";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUXE BEAUTY - Premium Cosmetics & Skincare",
  description: "Discover luxury beauty that celebrates your unique radiance. Premium skincare, makeup, and fragrances from around the world.",
  keywords: ["luxury beauty", "cosmetics", "skincare", "makeup", "perfume", "premium beauty", "luxe beauty"],
  authors: [{ name: "LUXE BEAUTY" }],
  icons: {
    icon: imagePath('/download/hero-cosmetics.jpg'),
  },
  openGraph: {
    title: "LUXE BEAUTY - Premium Cosmetics & Skincare",
    description: "Discover luxury beauty that celebrates your unique radiance",
    url: "https://luxebeauty.com",
    siteName: "LUXE BEAUTY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE BEAUTY - Premium Cosmetics & Skincare",
    description: "Discover luxury beauty that celebrates your unique radiance",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
