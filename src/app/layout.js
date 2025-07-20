
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans", 
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"], 
});

export const metadata = {
  title: "HR Dashboard",
  description: "A dashboard for HR managers to track employee performance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      {/* Apply fonts and basic styling to body */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}
      >
        {/* Add navigation bar at the top */}
        <Navbar />
        {/* Main content area that grows to fill available space */}
        <main className="flex-grow">
          {children} {/* Display page content here */}
        </main>
      </body>
    </html>
  );
}
