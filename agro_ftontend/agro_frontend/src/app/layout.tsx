import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

// ✅ Metadata should stay in a Server Component
export const metadata: Metadata = {
  title: "Agro Vision",
  description: "AI-powered Precision Farming Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-stone-950 bg-stone-100`}>
        <div className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
          <Sidebar /> {/* Sidebar remains visible */}
          {children}
        </div>
      </body>
    </html>
  );
}
