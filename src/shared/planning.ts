import { z } from "zod";
import { CropSchema } from "./crops";
import { readPendingLabel } from "./legacy-language";

export const AREA = {
  id: "mogi-reference",
  name: "My garden bed",
  municipality: "Mogi das Cruzes, SP",
  latitude: -23.52278,
  longitude: -46.18833,
  timezone: "America/Sao_Paulo",
} as const;
export const DaySchema = z.object({
  date: z.iso.date(),
  code: z.number().int().nullable(),
  high: z.number().min(-90).max(65).nullable(),
  low: z.number().min(-100).max(65).nullable(),
  rainMm: z.number().min(0).nullable(),
  meanTemp: z.number().min(-90).max(65).nullable().optional(),
  solarMj: z.number().min(0).nullable().optional(),
  etoMm: z.number().min(0).nullable().optional(),
  rainChance: z.number().min(0).max(100).nullable(),
  gustKmh: z.number().min(0).nullable(),
});
export const ForecastSchema = z.object({
  id: z.string(),
  areaId: z.literal(AREA.id),
  fetchedAt: z.iso.datetime(),
  expiresAt: z.iso.datetime(),
  timezone: z.literal(AREA.timezone),
  source: z.literal("Open-Meteo"),
  model: z.literal("best_match"),
  requestedPoint: z.object({ latitude: z.number(), longitude: z.number() }),
  gridPoint: z.object({ latitude: z.number(), longitude: z.number() }),
  days: z.array(DaySchema).length(7),
});
export type ForecastDay = z.infer<typeof DaySchema>;
export type Forecast = z.infer<typeof ForecastSchema>;
export type Operation = "transplant" | "sow";
export type Crop = "Lettuce" | "Carrot" | "Tomato";
export const PlanSchema = z.object({
  version: z.literal(1),
  id: z.string(),
  areaId: z.literal(AREA.id),
  crop: CropSchema,
  operation: z.enum(["transplant", "sow"]),
  date: z.iso.date(),
  savedAt: z.iso.datetime(),
  forecastId: z.string(),
  forecastFetchedAt: z.iso.datetime(),
  forecastExpiresAt: z.iso.datetime(),
  day: DaySchema,
  pending: z.array(z.string().transform(readPendingLabel)),
  status: z.literal("intention"),
  contextRevision: z.number().int().nonnegative().default(0),
});
export type SavedPlan = z.infer<typeof PlanSchema>;
export const operations: Record<Operation, string> = {
  transplant: "Transplant seedlings",
  sow: "Sow seeds",
};
export function localDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: AREA.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function dayLabel(date: string, today = localDate()) {
  if (date === today) return "Today";
  const tomorrow = new Date(`${today}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  if (date === tomorrow.toISOString().slice(0, 10)) return "Tomorrow";
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" })
    .format(new Date(`${date}T12:00:00Z`))
    .replace(".", "");
}
export function shortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
    .format(new Date(`${date}T12:00:00Z`))
    .replace(".", "");
}
export function isFresh(forecast: Forecast, now = new Date()) {
  return (
    now.getTime() >= Date.parse(forecast.fetchedAt) - 60_000 &&
    now.getTime() < Date.parse(forecast.expiresAt) &&
    forecast.days[0].date === localDate(now)
  );
}
export type WeatherKind = "sun" | "cloud" | "rain" | "storm" | "unknown";
export function weatherKind(code: number | null): WeatherKind {
  if (code === 0 || code === 1) return "sun";
  if (code === 2 || code === 3 || code === 45 || code === 48) return "cloud";
  if (code !== null && [95, 96, 99].includes(code)) return "storm";
  if (code !== null && [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return "rain";
  return "unknown";
}
export const weatherLabels: Record<WeatherKind, string> = {
  sun: "Sun",
  cloud: "Cloudy",
  rain: "Rain",
  storm: "Thunderstorms",
  unknown: "No information",
};
export function describeDay(day: ForecastDay) {
  const kind = weatherKind(day.code);
  if (kind === "storm")
    return {
      kind,
      title: "Thunderstorms possible",
      text: "Before planting, check the weather and the bed.",
      action: "Consider another day too.",
      pending: [
        "Check the bed",
        "Check seeds or seedlings",
        "Check the weather before heading out",
      ],
    };
  if (kind === "rain")
    return {
      kind,
      title: "Rain on the way",
      text: "Check for standing water in the bed.",
      action: "Compare days before choosing.",
      pending: [
        "Check the bed",
        "Check seeds or seedlings",
        "Check the weather before heading out",
      ],
    };
  if (kind === "unknown")
    return {
      kind,
      title: "Weather information is missing",
      text: "We cannot assess this day with the available forecast.",
      action: "Update the forecast or look at another day.",
      pending: ["Update forecast", "Check the bed"],
    };
  return {
    kind,
    title: kind === "sun" ? "Sun in the forecast" : "Clouds in the forecast",
    text: "Weather is one part of your choice. Check the bed too.",
    action: "This day still needs checking.",
    pending: [
      "Check the bed",
      "Check seeds or seedlings",
      "Check available water",
    ],
  };
}
