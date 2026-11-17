// src/app/layout.tsx
import type { Metadata } from "next";
import { Cinzel, Pinyon_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wedding Invitation | Ahmad & Hania",
  description: "Join us in celebrating the union of Ahmad and Hania",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${pinyonScript.variable} ${cormorant.variable}`}
    >
      <body className="bg-[#FAF7F2] text-[#2C2724] antialiased selection:bg-[#C5A880] selection:text-white">
        {children}
      </body>
    </html>
  );
}
