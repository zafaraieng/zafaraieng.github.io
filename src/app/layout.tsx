import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zafaraieng.github.io"),
  alternates: {
    canonical: "/",
  },
  title: "Zafarullah — Undergraduate AI Researcher | Computer Vision · Conversational AI · Robotics & Embodied AI",
  description:
    "Portfolio of Zafarullah, undergraduate AI researcher at Emerson University Multan, Pakistan. Independent research in AI-generated image detection (CIFake), NOVA-Mem research software for conversational memory evaluation, and an annotated reading log on robotic manipulation and embodied AI. Exploring funded graduate research opportunities for Fall 2027.",
  keywords: [
    "Zafarullah",
    "undergraduate researcher",
    "artificial intelligence",
    "computer vision",
    "deep learning",
    "AI-generated image detection",
    "CIFake",
    "NOVA-Mem",
    "conversational memory",
    "RAG",
    "conversational AI",
    "robotics",
    "embodied AI",
    "dexterous manipulation",
    "vision-language-action",
    "CALICO",
    "LeetCode",
    "graduate research opportunities",
    "Fall 2027",
    "research portfolio",
  ],
  authors: [{ name: "Zafarullah" }],
  openGraph: {
    title: "Zafarullah — Undergraduate AI Researcher",
    description:
      "Computer Vision · Conversational AI · Robotics & Embodied AI. Independent research in AI-generated image detection, NOVA-Mem research software, and a verified robotics reading log. Exploring funded graduate research opportunities — Fall 2027.",
    url: "https://zafaraieng.github.io",
    siteName: "Zafarullah — Research Portfolio",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zafarullah — Undergraduate AI Researcher",
    description:
      "Computer Vision · Conversational AI · Robotics & Embodied AI — exploring funded graduate research opportunities for Fall 2027.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
