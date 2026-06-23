import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeldHub — Welding Fabrication, Technology & Training",
  description:
    "Reference and tools for welding professionals: fabrication, technology, and training, plus practical tools like the WPS Generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
