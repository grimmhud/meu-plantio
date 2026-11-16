import test from "node:test";
import assert from "node:assert/strict";
import { emptyFarm, FarmSchema, applyFarmChange } from "../src/shared/farm";
import { AREA, PlanSchema, shortDate, dayLabel } from "../src/shared/planning";
import { planPathExample } from "../src/shared/plan-path-example";

test("Portuguese saved farms retain choices, months, reports and user-written details", () => {
  const at = "2026-11-15T12:00:00Z";
  const area = { name: "Horta da família", size: "20 m²", water: "Água de poço", soil: "Sem laudo", updatedAt: at };
  const original = {
    ...emptyFarm,
    currentCrop: "Alface",
    nextCycles: ["Cebola", "Feijão-vagem", "Cenoura"],
    nextCycleMonths: [11, 2, 4],
    area,
    report: { id: "observation", value: "moist", at, revision: 0, crop: "Alface" },
    records: [{ id: "record", areaId: AREA.id, action: "Reguei", crop: "Tomate", date: "2026-11-14", reportedAt: at }],
    examplePath: {
      ...planPathExample, revision: 2, currentCrop: "Alface", nextCrop: "Tomate",
      issues: planPathExample.issues.map((issue) => ({ ...issue, href: issue.id === "climate-window" ? "/planejar" : "/minha-area" })),
    },
  };
  const before = JSON.stringify(original);
  const farm = FarmSchema.parse(original);
  assert.equal(JSON.stringify(original), before);
  assert.equal(farm.currentCrop, "Lettuce");
  assert.deepEqual(farm.nextCycles, ["Onion", "Green bean", "Carrot"]);
  assert.deepEqual(farm.nextCycleMonths, [11, 2, 4]);
  assert.deepEqual(farm.area, area);
  assert.equal(farm.report?.crop, "Lettuce");
  assert.equal(farm.records[0].crop, "Tomato");
  assert.equal(farm.records[0].action, "Watered");
  assert.equal(farm.examplePath?.issues[0].href, "/plan");
  const edited = applyFarmChange(farm, { type: "next-cycles", crops: ["Tomato"], months: [12] });
  assert.equal(edited.records[0].id, "record");
  assert.deepEqual(FarmSchema.parse(edited), edited);
});

test("legacy plans retain the chosen day and translate app-generated pending checks", () => {
  const plan = PlanSchema.parse({
    version: 1, id: "saved", areaId: AREA.id, crop: "Cenoura", operation: "sow", date: "2026-11-16",
    savedAt: "2026-11-15T12:00:00Z", forecastId: "forecast", forecastFetchedAt: "2026-11-15T12:00:00Z",
    forecastExpiresAt: "2026-11-15T18:00:00Z", status: "intention",
    day: { date: "2026-11-16", code: 0, high: 25, low: 15, rainMm: 0, rainChance: 10, gustKmh: 5 },
    pending: ["Conferir o canteiro", "Conferir sementes ou mudas", "Conferir água disponível"],
  });
  assert.equal(plan.crop, "Carrot");
  assert.equal(plan.date, "2026-11-16");
  assert.deepEqual(plan.pending, ["Check the bed", "Check seeds or seedlings", "Check available water"]);
  assert.equal(dayLabel("2026-11-16", "2026-11-15"), "Tomorrow");
  assert.equal(shortDate("2026-11-15"), "Nov 15");
});

test("only exact opt-in example defaults are translated, preserving custom area text", () => {
  const farm = FarmSchema.parse({
    ...emptyFarm, exampleLoadedAt: "2026-11-15T12:00:00Z",
    area: { name: "Canteiro da casa", size: "24 m²", water: "Rega com mangueira — exemplo", soil: "Meu solo", updatedAt: "2026-11-15T12:00:00Z" },
  });
  assert.equal(farm.area?.name, "Home garden bed");
  assert.equal(farm.area?.water, "Watering with a hose — example");
  assert.equal(farm.area?.soil, "Meu solo");
});
