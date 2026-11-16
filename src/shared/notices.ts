import { isFresh, shortDate, weatherKind, type Forecast } from "./planning";

export type Notice = {
  id: string;
  kind: "weather" | "review" | "missing";
  title: string;
  summary: string;
  detail: string;
  reference: string;
  href: string;
  action: string;
};

// Current points to check, derived from the same context used by the screens.
// These are neither unread messages nor a record of completed field work.
export function getNotices({
  forecast,
  now,
  needsReview,
  farmNeedsReview,
  unavailable,
}: {
  forecast: Forecast | null;
  now: Date | null;
  needsReview: boolean;
  farmNeedsReview: boolean;
  unavailable: boolean;
}): Notice[] {
  const notices: Notice[] = [];
  if (farmNeedsReview || needsReview) {
    notices.push({
      id: "review",
      kind: "review",
      title: "Check your plan",
      summary: farmNeedsReview
        ? "The current crop needs checking."
        : "Your intention needs review.",
      detail:
        "The context used for your choice has changed or the forecast has expired. Check the crop and next step. Your choice has been preserved; this notice records no completed task.",
      reference: "Pending follow-up",
      href: "/my-plan",
      action: "View my plan",
    });
  }
  if (!now) return notices;
  if (forecast && isFresh(forecast, now)) {
    const storms = forecast.days.filter(
      (day) => weatherKind(day.code) === "storm",
    );
    if (storms.length)
      notices.push({
        id: "storm",
        kind: "weather",
        title: "Thunderstorms possible",
        summary: `Thunderstorms in the regional forecast: ${storms.map((day) => shortDate(day.date)).join(", ")}.`,
        detail:
          "The Mogi das Cruzes forecast does not confirm that a storm will reach your bed. Check the weather before heading out and compare days before choosing a task. This does not measure soil water.",
        reference: `Forecast · Open-Meteo · retrieved on ${new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }).format(new Date(forecast.fetchedAt))}`,
        href: "/app#weather",
        action: "View days",
      });
  } else if (forecast || unavailable) {
    notices.push({
      id: "forecast",
      kind: "missing",
      title: forecast ? "The forecast has expired" : "Forecast unavailable",
      summary: "We need to update the forecast before choosing a day.",
      detail:
        "There is no valid forecast to support your choice yet. Try updating it. Missing data does not indicate a problem in your bed.",
      reference: "Information pending",
      href: "/app#weather",
      action: "View forecast",
    });
  }
  return notices;
}
