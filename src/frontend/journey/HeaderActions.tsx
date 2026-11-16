"use client";
import Link from "next/link";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useNotices } from "@/frontend/notifications/useNotices";

export function HeaderActions({
  count,
  active = false,
  onPreview,
}: {
  count: number;
  active?: boolean;
  onPreview?: () => void;
}) {
  const label = count ? `Notifications, ${count} to check` : "Notifications";
  const content = (
    <>
      <Bell size={23} aria-hidden="true" />
      {count > 0 && <span className="notice-indicator" aria-hidden="true" />}
    </>
  );
  return (
    <div className="header-actions">
      {onPreview ? (
        <button
          className="notices-trigger"
          aria-label={label}
          onClick={onPreview}
        >
          {content}
        </button>
      ) : (
        <Link
          className="notices-trigger"
          href="/notices"
          aria-label={label}
          aria-current={active ? "page" : undefined}
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export function AppHeaderActions() {
  const notices = useNotices();
  const pathname = usePathname();
  return (
    <HeaderActions count={notices.length} active={pathname === "/notices"} />
  );
}
