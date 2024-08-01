import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./_components/sessionWrapper";
import NavBar from "./_components/navBar";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vibe police",
  description: "is ur playlist a vibe?",
  icons: {
    icon: "/siren.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={kumbh.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
