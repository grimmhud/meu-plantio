"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import { AppFrame } from "@/frontend/journey/AppFrame";
import { CallSheet } from "@/frontend/journey/CommonSheets";
import { useFarm } from "@/frontend/state/FarmProvider";
import { VoiceActions } from "@/frontend/audio/VoiceActions";
import { useNotices } from "./useNotices";
import { NoticeCard } from "./NoticeCard";

export default function NotificationsScreen() {
  const notices = useNotices();
  const { state, ready } = useFarm();
  const [calling, setCalling] = useState(false);
  const loading = state === "loading" || !ready;
  const summary = loading
    ? "We are checking your notifications."
    : notices.length
      ? `You have ${notices.length} ${notices.length === 1 ? "notification to check" : "notifications to check"}. ${notices.map((item) => `${item.title}. ${item.summary}`).join(" ")}`
      : "No notifications for now. Keep monitoring the weather and your bed. This is not an assessment of crop health.";
  return (
    <AppFrame compact>
      <div className="plan-heading notices-heading">
        <h1>
          Notifications<span className="heading-dot">.</span>
        </h1>
      </div>
      <VoiceActions text={summary} onCall={() => setCalling(true)} />
      <section
        className="notices-list"
        aria-label="Notification list"
        aria-busy={loading}
      >
        {loading ? (
          <p role="status" className="notices-empty">
            Checking your notifications…
          </p>
        ) : notices.length ? (
          <ul>
            {notices.map((notice) => (
              <li key={notice.id}>
                <NoticeCard notice={notice} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="notices-empty">
            <Bell size={48} aria-hidden="true" />
            <h2>No notifications for now</h2>
          </div>
        )}
      </section>
      {calling && <CallSheet onClose={() => setCalling(false)} />}
    </AppFrame>
  );
}
