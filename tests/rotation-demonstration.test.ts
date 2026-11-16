import test from "node:test";
import assert from "node:assert/strict";
import { applyFarmChange, emptyFarm, FarmSchema } from "../src/shared/farm";

test("opening, reopening and leaving the rotation scenario preserves real choices and reports", () => {
  let farm = applyFarmChange(emptyFarm, { type: "crop", crop: "Lettuce", at: "2026-11-15T12:00:00Z" });
  farm = applyFarmChange(farm, { type: "next-cycles", crops: ["Onion", "Green bean"], months: [11, 2] });
  farm = applyFarmChange(farm, { type: "observe", value: "unknown", id: "real-report", at: "2026-11-15T12:00:00Z" });
  const withExample = applyFarmChange(farm, { type: "load-path-example" });
  const reopened = FarmSchema.parse(JSON.parse(JSON.stringify(withExample)));
  assert.ok(reopened.examplePath);
  const backToPlan = applyFarmChange(reopened, { type: "clear-path-example" });
  assert.deepEqual(backToPlan, farm);
});
