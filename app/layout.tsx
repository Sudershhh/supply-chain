import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
// import { ThemeProvider } from "@/components/ThemeProvider";

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
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <Header />

          {children}

          <Toaster position="top-center" />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
