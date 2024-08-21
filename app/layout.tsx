import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Didero - Supply Chain",
  description:
    "Didero is a comprehensive supply chain management tool designed to streamline your operations, enhance visibility, and optimize efficiency.",
  keywords: [
    "Supply Chain",
    "Management",
    "Optimization",
    "Logistics",
    "Didero",
  ],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="bg-white">
        <ClerkProvider>
          <Header />
          {children}
        </ClerkProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
