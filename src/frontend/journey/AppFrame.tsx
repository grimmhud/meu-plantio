"use client";
import { Brand } from "@/frontend/ui/Brand";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Leaf } from "lucide-react";
import { AppNavigation } from "./AppNavigation";
import { AppHeaderActions } from "./HeaderActions";
import { useFarm } from "@/frontend/state/FarmProvider";
import { DemoNotice } from "@/frontend/ui/DemoNotice";

export function BottomNav() {
  const pathname = usePathname();
  return <AppNavigation pathname={pathname} />;
}

export function AppFrame({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  const { demoMode } = useFarm();
  return (
    <div className="app-shell journey-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="brand-header">
        <Brand />
        <AppHeaderActions />
      </header>
      <main id="main">
        {demoMode && <DemoNotice />}
        {children}
        {!compact && (
          <footer className="page-footer">
            <Leaf size={15} /> Your next crop, step by step.
          </footer>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
