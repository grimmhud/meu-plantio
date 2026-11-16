import type { Metadata } from "next";
import "@/presentation/shared-ui/tokens.css";
import "@/presentation/styles/globals.css";

export const metadata: Metadata = {
  title: "Meu plantio · In every farmer’s hands",
  description: "Accessible crop rotation planning for small vegetable growers. Explore voice, NASA POWER climate data and the IAGORA vision for less waste.",
  icons: { icon: "/brands/meu-plantio.svg" },
};

export default function PresentationLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
