"use client";
import Link from "next/link";
import { CalendarClock, ChevronDown, CloudLightning, Info } from "lucide-react";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { ActionGroup } from "@/frontend/ui/ActionGroup";
import type { Notice } from "@/shared/notices";

export function NoticeCard({
  notice,
  onPreview,
}: {
  notice: Notice;
  onPreview?: () => void;
}) {
  const Icon =
    notice.kind === "weather"
      ? CloudLightning
      : notice.kind === "review"
        ? CalendarClock
        : Info;
  return (
    <details className={`notice-card notice-card-${notice.kind}`}>
      <summary>
        <span className="notice-art">
          <Icon size={29} aria-hidden="true" />
        </span>
        <span className="notice-copy">
          <strong>{notice.title}</strong>
          <span>{notice.summary}</span>
        </span>
        <ChevronDown size={20} className="notice-chevron" aria-hidden="true" />
      </summary>
      <div className="notice-detail">
        <p>{notice.detail}</p>
        <p className="notice-reference">{notice.reference}</p>
        <ActionGroup>
          <ListenButton
            text={`${notice.title}. ${notice.summary} ${notice.detail} ${notice.reference}.`}
          />
          {onPreview ? (
            <button className="button button-secondary" onClick={onPreview}>
              {notice.action}
            </button>
          ) : (
            <Link className="button button-secondary" href={notice.href}>
              {notice.action}
            </Link>
          )}
        </ActionGroup>
      </div>
    </details>
  );
}
