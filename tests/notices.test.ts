import { test } from "node:test";
import assert from "node:assert/strict";
import { getNotices } from "../src/shared/notices";
import { AREA, type Forecast } from "../src/shared/planning";

const forecast: Forecast = {
  id: "test",
  areaId: AREA.id,
  source: "Open-Meteo",
  model: "best_match",
  timezone: AREA.timezone,
  fetchedAt: "2026-11-15T12:00:00Z",
  expiresAt: "2026-11-15T18:00:00Z",
  requestedPoint: { latitude: AREA.latitude, longitude: AREA.longitude },
  gridPoint: { latitude: -23.51, longitude: -46.23 },
  days: Array.from({ length: 7 }, (_, i) => ({
    date: `2026-11-${15 + i}`,
    code: i < 2 ? 95 : 0,
    high: 26,
    low: 17,
    rainMm: null,
    rainChance: null,
    gustKmh: null,
  })),
};
const context = {
  forecast,
  now: new Date("2026-11-15T13:00:00Z"),
  needsReview: false,
  farmNeedsReview: false,
  unavailable: false,
};

test("expired storms become a data pending notice, never a current weather warning", () => {
  assert.deepEqual(
    getNotices(context).map((item) => item.id),
    ["storm"],
  );
  assert.deepEqual(
    getNotices({ ...context, now: new Date(forecast.expiresAt) }).map(
      (item) => item.id,
    ),
    ["forecast"],
  );
});
test("a valid forecast without storms has no invented alerts; missing data stays explicit", () => {
  assert.deepEqual(
    getNotices({
      ...context,
      forecast: {
        ...forecast,
        days: forecast.days.map((day) => ({ ...day, code: 0 })),
      },
    }),
    [],
  );
  assert.deepEqual(getNotices({ ...context, forecast: null }), []);
  assert.deepEqual(
    getNotices({ ...context, forecast: null, unavailable: true }).map(
      (item) => item.id,
    ),
    ["forecast"],
  );
});
test("review persists independently of weather and does not mutate context or create duplicate reviews", () => {
  const input = { ...context, needsReview: true, farmNeedsReview: true };
  const before = JSON.stringify(input);
  assert.deepEqual(
    getNotices(input).map((item) => item.id),
    ["review", "storm"],
  );
  assert.equal(JSON.stringify(input), before);
});
