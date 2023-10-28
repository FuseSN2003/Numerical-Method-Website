import type { Metadata } from "next";
import "./globals.css";
import 'katex/dist/katex.min.css';
import Navbar from "@/components/Nabvar";

export const metadata: Metadata = {
  title: "Numerical Methods",
  description: "Numerical Methods",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="max-w-7xl py-16 mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
