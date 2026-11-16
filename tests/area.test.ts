import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FarmSchema,
  emptyFarm,
  applyFarmChange,
  buildRecord,
} from "../src/shared/farm";

test("old saved farms remain readable and retain their observation on crop correction", () => {
  const { area, observations, ...legacy } = emptyFarm;
  void area;
  void observations;
  const farm = FarmSchema.parse({
    ...legacy,
    report: {
      id: "old",
      value: "dry",
      at: "2026-11-15T12:00:00Z",
      revision: 0,
    },
  });
  assert.equal(farm.area, null);
  const changed = applyFarmChange(farm, {
    type: "crop",
    crop: "Carrot",
    at: "2026-11-15T13:00:00Z",
  });
  assert.equal(changed.observations[0].id, "old");
  assert.equal(changed.report, null);
});

test("record correction keeps identity and flags planting review without changing crop", () => {
  const farm = applyFarmChange(emptyFarm, {
    type: "crop",
    crop: "Lettuce",
    at: new Date().toISOString(),
  });
  const record = buildRecord("Watered", "Lettuce", "2026-01-01");
  const created = applyFarmChange(farm, { type: "record", record });
  const edited = applyFarmChange(created, {
    type: "edit-record",
    record: { ...record, action: "Planted", crop: "Carrot" },
  });
  assert.equal(edited.records.length, 1);
  assert.equal(edited.records[0].id, record.id);
  assert.equal(edited.currentCrop, "Lettuce");
  assert.equal(edited.needsReview, true);
  const deleted = applyFarmChange(edited, {
    type: "delete-record",
    id: record.id,
  });
  assert.equal(deleted.records.length, 0);
  assert.equal(deleted.currentCrop, "Lettuce");
  assert.equal(deleted.needsReview, true);
});

test("deleting active observation resets its checks; area deletion retains field history", () => {
  let farm = applyFarmChange(emptyFarm, {
    type: "observe",
    value: "moist",
    id: "one",
    at: new Date().toISOString(),
  });
  farm = applyFarmChange(farm, {
    type: "check",
    id: "water",
    at: new Date().toISOString(),
  });
  farm = applyFarmChange(farm, { type: "delete-observation", id: "one" });
  assert.equal(farm.report, null);
  assert.deepEqual(farm.checks.ids, []);
  assert.deepEqual(farm.observations, []);
  const record = buildRecord("Watered", "Lettuce", "2026-01-01");
  farm = applyFarmChange(farm, { type: "record", record });
  farm = applyFarmChange(farm, {
    type: "area",
    area: {
      name: "Canteiro 1",
      size: "20 m²",
      water: "",
      soil: "",
      updatedAt: new Date().toISOString(),
    },
  });
  farm = applyFarmChange(farm, { type: "area", area: null });
  assert.equal(farm.area, null);
  assert.equal(farm.records[0].id, record.id);
});
