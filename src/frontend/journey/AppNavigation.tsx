import Link from "next/link";
import { CalendarDays, Home, Sprout } from "lucide-react";

export function AppNavigation({
  pathname,
  preview = false,
}: {
  pathname: string;
  preview?: boolean;
}) {
  return (
    <nav
      className={`bottom-nav${preview ? " bottom-nav-preview" : ""}`}
      aria-label={preview ? "Navigation example" : "Main navigation"}
    >
      <Link href="/app" aria-current={pathname === "/app" ? "page" : undefined}>
        <Home size={23} />
        <span>Home</span>
      </Link>
      <Link
        href="/my-plan"
        aria-current={pathname === "/my-plan" ? "page" : undefined}
      >
        <CalendarDays size={23} />
        <span>My plan</span>
      </Link>
      <Link
        href="/my-area"
        aria-current={pathname === "/my-area" ? "page" : undefined}
      >
        <Sprout size={23} />
        <span>My area</span>
      </Link>
    </nav>
  );
}
