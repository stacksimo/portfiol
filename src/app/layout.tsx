import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { StoreProvider } from "@/lib/store";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400", "500"], variable: "--font-display" });
const ui = Inter({ subsets: ["latin"], variable: "--font-ui" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "stacksimo os — a portfolio that works like a product",
  description:
    "Stacksimo builds websites, landing pages and SaaS products. Explore the work inside an interactive studio: live previews, case studies, and a project planner.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${ui.variable} ${mono.variable}`}>
        <StoreProvider>
          <Shell />
        </StoreProvider>
        {children}
      </body>
    </html>
  );
}
