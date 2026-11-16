import { addExampleHistory } from "./example-farm";
import { emptyFarm, FarmSchema, type Farm } from "./farm";
import {
  AREA,
  describeDay,
  isFresh,
  localDate,
  PlanSchema,
  type Forecast,
  type SavedPlan,
} from "./planning";

/** Fictional reports and intentions for preview deployments, never climate data. */
export function createDemoFarm(now: Date): Farm {
  const base = addExampleHistory(emptyFarm, now);
  const today = localDate(now);
  const month = Number(today.slice(5, 7));
  const report = {
    id: "example-preview-current-observation",
    crop: "Lettuce" as const,
    value: "moist" as const,
    at: now.toISOString(),
    revision: base.revision,
  };
  return FarmSchema.parse({
    ...base,
    nextCycles: ["Tomato", "Green bean", "Onion"],
    nextCycleMonths: [month, ((month + 2) % 12) + 1, ((month + 5) % 12) + 1],
    cyclesContextRevision: base.revision,
    area: {
      name: "Home garden bed · Demo",
      size: "24 m²",
      water: "Hose supplied by a covered tank — sample report",
      soil: "Raised bed with surface cover. No lab analysis available — sample report",
      updatedAt: now.toISOString(),
    },
    report,
    observations: [...base.observations, report],
    checks: { date: today, reportId: report.id, ids: ["watering"] },
    checkHistory: Array.from({ length: 10 }, (_, index) => {
      const day = new Date(`${today}T12:00:00Z`);
      day.setUTCDate(day.getUTCDate() - index - 1);
      const date = day.toISOString().slice(0, 10);
      return {
        example: true,
        date,
        crop: "Lettuce",
        reportId: null,
        ids: index % 2 ? ["watering"] : ["watering", "water"],
        at: `${date}T15:00:00.000Z`,
      };
    }),
  });
}

/** Example intentions refer to actual forecast snapshots, with their actual expiry. */
export function createDemoPlans(
  farm: Farm,
  forecast: Forecast | null,
  now: Date,
): SavedPlan[] {
  if (!forecast || !isFresh(forecast, now)) return [];
  return [0, 3, 2].map((dayIndex, index) => {
    const day = forecast.days[dayIndex];
    return PlanSchema.parse({
      version: 1,
      id: `example-preview-intention-${index}`,
      areaId: AREA.id,
      crop: "Tomato",
      operation: "transplant",
      date: day.date,
      savedAt: now.toISOString(),
      forecastId: forecast.id,
      forecastFetchedAt: forecast.fetchedAt,
      forecastExpiresAt: forecast.expiresAt,
      day,
      pending: describeDay(day).pending,
      status: "intention",
      // A changed-context example keeps the notification/review journey visible.
      contextRevision: Math.max(0, farm.revision - 1),
    });
  });
}
