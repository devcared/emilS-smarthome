import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Nova ist nicht direkt bei Google Fonts verfügbar, verwenden Inter als Basis
// und passen die Schriftart später an, falls Nova lokal verfügbar ist
const nova = Inter({
  variable: "--font-nova",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smarthome Dashboard",
  description: "Smart Home Dashboard Übersicht",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${nova.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
