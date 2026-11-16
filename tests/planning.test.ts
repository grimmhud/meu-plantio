import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AREA,
  DaySchema,
  ForecastSchema,
  describeDay,
  isFresh,
  localDate,
  weatherKind,
} from "../src/shared/planning";

test("São Paulo date preserves the previous day around midnight UTC", () => {
  assert.equal(localDate(new Date("2026-11-16T01:00:00Z")), "2026-11-15");
});
test("unknown conditions never become a sunny or admissible day", () => {
  assert.equal(weatherKind(null), "unknown");
  assert.equal(weatherKind(999), "unknown");
  assert.equal(weatherKind(71), "unknown"); // Snow must not be mislabeled as rain.
  const info = describeDay({
    date: "2026-11-15",
    code: null,
    high: null,
    low: null,
    rainMm: null,
    rainChance: null,
    gustKmh: null,
  });
  assert.equal(info.title, "Weather information is missing");
});
test("thunderstorm evidence asks for a check without calculating crop loss", () => {
  const info = describeDay({
    date: "2026-11-15",
    code: 95,
    high: 26,
    low: 17,
    rainMm: 5,
    rainChance: 90,
    gustKmh: 35,
  });
  assert.equal(info.kind, "storm");
  assert.match(info.pending.join(" "), /Check/);
  assert.doesNotMatch(JSON.stringify(info), /loss of \d|safe|guaranteed/);
});
test("six-hour expiry and local date change both invalidate the forecast", () => {
  const fetchedAt = "2026-11-15T12:00:00Z";
  const snapshot = ForecastSchema.parse({
    id: "test",
    areaId: AREA.id,
    source: "Open-Meteo",
    model: "best_match",
    timezone: AREA.timezone,
    fetchedAt,
    expiresAt: "2026-11-15T18:00:00Z",
    requestedPoint: { latitude: AREA.latitude, longitude: AREA.longitude },
    gridPoint: { latitude: -23.51, longitude: -46.23 },
    days: Array.from({ length: 7 }, (_, i) => ({
      date: `2026-11-${15 + i}`,
      code: 0,
      high: 26,
      low: 17,
      rainMm: 0,
      rainChance: 0,
      gustKmh: 10,
    })),
  });
  assert.equal(isFresh(snapshot, new Date("2026-11-15T17:59:00Z")), true);
  assert.equal(isFresh(snapshot, new Date("2026-11-15T18:00:00Z")), false);
  assert.equal(isFresh(snapshot, new Date("2026-11-15T11:00:00Z")), false);
  const lateSnapshot = {
    ...snapshot,
    fetchedAt: "2026-11-16T02:00:00Z", // 23:00 on November 15 in São Paulo.
    expiresAt: "2026-11-16T08:00:00Z",
  };
  assert.equal(isFresh(lateSnapshot, new Date("2026-11-16T03:01:00Z")), false);
});
test("missing rain stays absent, while invalid units/ranges are rejected", () => {
  const day = {
    date: "2026-11-15",
    code: 0,
    high: 26,
    low: 17,
    rainMm: null,
    rainChance: null,
    gustKmh: null,
  };
  assert.equal(DaySchema.parse(day).rainMm, null);
  assert.equal(DaySchema.safeParse({ ...day, rainChance: 101 }).success, false);
  assert.equal(DaySchema.safeParse({ ...day, rainMm: -1 }).success, false);
});
