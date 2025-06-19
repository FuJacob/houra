import type { Metadata } from "next";
import { League_Spartan, Inter, Praise } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

const work_sans = League_Spartan({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const praise = Praise({
  variable: "--font-praise",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Owra",
  description: "The next generation time management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${work_sans.variable} ${praise.variable} antialiased max-w-7xl mx-auto px-2`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
