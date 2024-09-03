import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice AI",
  description:
    "Invoice AI is a comprehensive supply chain management tool designed to streamline your operations, enhance visibility, and optimize efficiency.",
  keywords: [
    "Supply Chain",
    "Management",
    "Optimization",
    "Logistics",
    "Didero",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
        </head>

        <body className={`${inter.className} bg-white`}>
          <Header />

          {children}

          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
