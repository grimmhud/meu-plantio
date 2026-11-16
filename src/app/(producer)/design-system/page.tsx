import type { Metadata } from "next";
import { DesignSystem } from "@/frontend/design-system/DesignSystem";

export const metadata: Metadata = {
  title: "Design system · Meu plantio",
  description:
    "Visual and interactive reference for Meu plantio styles and components.",
};

export default function DesignSystemPage() {
  return <DesignSystem />;
}
