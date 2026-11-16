import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./journey.css";
import { FarmProvider } from "@/frontend/state/FarmProvider";
import { isDemoEnvironment } from "@/shared/storage-scope";
export const metadata: Metadata = {
  title: "Meu plantio · My garden",
  description:
    "Your next crop, step by step. Check the coming days to plan your next task.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Meu plantio",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/brands/meu-plantio.svg",
    apple: "/brands/meu-plantio-192.png",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#224d38",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <body>
        <FarmProvider
          demoMode={isDemoEnvironment(
            process.env.VERCEL_ENV,
            process.env.DEMO_MODE,
          )}
        >
          {children}
        </FarmProvider>
      </body>
    </html>
  );
}
