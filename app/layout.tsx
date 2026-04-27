import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celine Rayner — UX/UI Designer",
  description:
    "Portfolio of Celine Rayner, a UX/UI designer working at the intersection of user needs and business goals.",
  openGraph: {
    title: "Celine Rayner — UX/UI Designer",
    description:
      "Portfolio of Celine Rayner, a UX/UI designer working at the intersection of user needs and business goals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-charcoal font-inter antialiased">
        <Navbar />
        <PageTransition>
          <main>{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
