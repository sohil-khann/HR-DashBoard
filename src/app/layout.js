
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
    <html lang="en" className="h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-gray-50 dark:bg-gray-900`}
      >
        <Navbar />
        <main className="flex-grow  py-4">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
