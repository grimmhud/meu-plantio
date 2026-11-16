import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyFarmChange,
  buildRecord,
  checkedToday,
  currentReport,
  emptyFarm,
  needsPlanReview,
} from "../src/shared/farm";
import { AREA, PlanSchema } from "../src/shared/planning";

const at = "2026-11-15T12:00:00Z";
test("an unknown observation remains pending and a new report resets checks", () => {
  let farm = applyFarmChange(emptyFarm, {
    type: "observe",
    value: "dry",
    id: "first",
    at,
  });
  farm = applyFarmChange(farm, { type: "check", id: "watering", at });
  assert.deepEqual(checkedToday(farm, new Date(at)), ["watering"]);
  farm = applyFarmChange(farm, {
    type: "observe",
    value: "unknown",
    id: "second",
    at,
  });
  assert.equal(currentReport(farm, new Date(at))?.value, "unknown");
  assert.deepEqual(checkedToday(farm, new Date(at)), []);
});
test("daily observations and checks do not carry into the next local day", () => {
  let farm = applyFarmChange(emptyFarm, {
    type: "observe",
    value: "moist",
    id: "first",
    at,
  });
  farm = applyFarmChange(farm, { type: "check", id: "water", at });
  const tomorrow = new Date("2026-11-16T12:00:00Z");
  assert.equal(currentReport(farm, tomorrow), null);
  assert.deepEqual(checkedToday(farm, tomorrow), []);
});
test("planting asks for review without silently changing the current crop", () => {
  const farm = applyFarmChange(emptyFarm, { type: "crop", crop: "Lettuce", at });
  const changed = applyFarmChange(farm, {
    type: "record",
    record: buildRecord("Planted", "Carrot", "2026-11-15", new Date(at)),
  });
  assert.equal(changed.currentCrop, "Lettuce");
  assert.equal(changed.needsReview, true);
  assert.equal(changed.revision, farm.revision + 1);
  assert.equal(changed.records[0].crop, "Carrot");
  const confirmed = applyFarmChange(changed, {
    type: "crop",
    crop: "Carrot",
    at,
  });
  assert.equal(confirmed.currentCrop, "Carrot");
  assert.equal(confirmed.needsReview, false);
});
test("watering and harvest records do not complete checks or close a crop", () => {
  let farm = applyFarmChange(emptyFarm, { type: "crop", crop: "Lettuce", at });
  for (const action of ["Watered", "Harvested"] as const)
    farm = applyFarmChange(farm, {
      type: "record",
      record: buildRecord(action, "Lettuce", "2026-11-15", new Date(at)),
    });
  assert.equal(farm.currentCrop, "Lettuce");
  assert.equal(farm.needsReview, false);
  assert.deepEqual(checkedToday(farm, new Date(at)), []);
  assert.equal(farm.records.length, 2);
});
test("future field events are rejected", () => {
  assert.throws(
    () => buildRecord("Watered", "Lettuce", "2026-11-16", new Date(at)),
    /still in the future/,
  );
});
test("a context correction preserves a choice and flags it for review", () => {
  const plan = PlanSchema.parse({
    version: 1,
    id: "intention",
    areaId: AREA.id,
    crop: "Tomato",
    operation: "transplant",
    date: "2026-11-16",
    savedAt: at,
    forecastId: "snapshot",
    forecastFetchedAt: at,
    forecastExpiresAt: "2026-11-15T18:00:00Z",
    day: {
      date: "2026-11-16",
      code: 0,
      high: 26,
      low: 17,
      rainMm: 0,
      rainChance: 0,
      gustKmh: 10,
    },
    pending: [],
    status: "intention",
  });
  assert.equal(plan.contextRevision, 0); // Older choices migrate without losing their date.
  assert.equal(needsPlanReview(plan, emptyFarm, null, new Date(at)), false);
  const farm = applyFarmChange(emptyFarm, { type: "crop", crop: "Lettuce", at });
  assert.equal(needsPlanReview(plan, farm, null, new Date(at)), true);
  assert.equal(plan.date, "2026-11-16");
});
