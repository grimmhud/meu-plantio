import test from "node:test";
import assert from "node:assert/strict";
import { createDemoFarm, createDemoPlans } from "../src/shared/demo-farm";
import { applyFarmChange, emptyFarm, FarmSchema, needsPlanReview } from "../src/shared/farm";
import { AREA, ForecastSchema, PlanSchema, type Forecast } from "../src/shared/planning";
import { isDemoEnvironment, storageKeys } from "../src/shared/storage-scope";
import { getNotices } from "../src/shared/notices";
import { groupCropHistory } from "../src/shared/crop-history";

const now = new Date("2026-11-15T14:00:00Z");
function forecast(): Forecast {
  return ForecastSchema.parse({
    id: "test-snapshot", areaId: AREA.id, timezone: AREA.timezone,
    source: "Open-Meteo", model: "best_match", requestedPoint: AREA, gridPoint: AREA,
    fetchedAt: "2026-11-15T13:30:00Z", expiresAt: "2026-11-15T19:30:00Z",
    days: Array.from({ length: 7 }, (_, i) => ({
      date: `2026-11-${15 + i}`, code: 0, high: 25, low: 17,
      rainMm: i, rainChance: 20, gustKmh: 10,
    })),
  });
}

test("only Vercel preview enables demo data; all storage keys stay isolated", () => {
  assert.equal(isDemoEnvironment("preview"), true);
  for (const environment of [undefined, "development", "production", ""]) {
    assert.equal(isDemoEnvironment(environment), false);
  }
  assert.equal(storageKeys(false).farm, "agroloop:farm:v1");
  const normalKeys = Object.values(storageKeys(false));
  for (const key of Object.values(storageKeys(true))) assert.ok(!normalKeys.includes(key));
});

test("an explicit demo flag can populate the requested primary demo site without changing other environments", () => {
  assert.equal(isDemoEnvironment("production", "true"), true);
  assert.equal(isDemoEnvironment("production", "false"), false);
  assert.equal(isDemoEnvironment("production"), false);
  assert.equal(isDemoEnvironment("development", "true"), true);
});

test("the preview contains eight months of records, observations, checks and rotation without mutating the empty farm", () => {
  const before = JSON.stringify(emptyFarm);
  const farm = createDemoFarm(now);
  assert.equal(JSON.stringify(emptyFarm), before);
  assert.equal(farm.currentCrop, "Lettuce");
  assert.deepEqual(farm.nextCycles, ["Tomato", "Green bean", "Onion"]);
  assert.deepEqual(farm.nextCycleMonths, [11, 2, 5]);
  assert.ok(farm.records.length >= 40);
  assert.equal(farm.observations.length, 19);
  assert.equal(farm.checkHistory.length, 10);
  assert.ok(farm.records.every(record => record.date <= "2026-11-15" && record.id.startsWith("example-")));
  assert.deepEqual(farm.checks.ids, ["watering"]);
  assert.equal(farm.report?.id, farm.checks.reportId);
  assert.ok(groupCropHistory(farm).flatMap(group => group.events).every(event => event.id.startsWith("example-")));
  assert.deepEqual(FarmSchema.parse(JSON.parse(JSON.stringify(farm))), farm);
  const edited = applyFarmChange(farm, { type: "next-cycles", crops: ["Carrot"], months: [6] });
  assert.deepEqual(FarmSchema.parse(edited).nextCycles, ["Carrot"]);
  const december = createDemoFarm(new Date("2026-12-31T14:00:00Z"));
  assert.deepEqual(december.nextCycleMonths, [12, 3, 6]);
});

test("example intentions use real supplied forecast values and create a visible review notification", () => {
  const farm = createDemoFarm(now);
  const actual = forecast();
  const before = JSON.stringify(actual);
  const plans = createDemoPlans(farm, actual, now);
  assert.equal(plans.length, 3);
  assert.equal(JSON.stringify(actual), before);
  for (const plan of plans) {
    assert.deepEqual(PlanSchema.parse(plan), plan);
    assert.deepEqual(plan.day, actual.days.find(day => day.date === plan.date));
    assert.equal(plan.forecastId, actual.id);
    assert.equal(plan.forecastExpiresAt, actual.expiresAt);
    assert.equal(plan.status, "intention");
  }
  const needsReview = needsPlanReview(plans[2], farm, actual, now);
  assert.equal(needsReview, true);
  assert.ok(getNotices({ forecast: actual, now, needsReview, farmNeedsReview: false, unavailable: false }).some(n => n.kind === "review"));
});

test("missing or stale forecasts never become invented demo weather or planned days", () => {
  const farm = createDemoFarm(now);
  assert.deepEqual(createDemoPlans(farm, null, now), []);
  assert.deepEqual(createDemoPlans(farm, forecast(), new Date("2026-11-15T20:00:00Z")), []);
  assert.deepEqual(createDemoPlans(farm, forecast(), new Date("2026-11-16T14:00:00Z")), []);
});
