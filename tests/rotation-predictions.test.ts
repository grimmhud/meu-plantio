import test from "node:test";
import assert from "node:assert/strict";
import { buildRotationStages } from "../src/shared/rotation-predictions";
import { emptyFarm, applyFarmChange, type Farm } from "../src/shared/farm";
import { AREA, type Forecast } from "../src/shared/planning";
import type { ClimateData } from "../src/shared/crop-climate";

function climateMonth(month: number): ClimateData {
  const days: ClimateData["days"] = {
    T2M: {},
    PRECTOTCORR: {},
    ALLSKY_SFC_SW_DWN: {},
  };
  for (let year = 2021; year <= 2025; year++) {
    const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
    for (let day = 1; day <= count; day++) {
      const key = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
      days.T2M[key] = day === 1 ? 19 : day === count ? 25 : 22;
      days.PRECTOTCORR[key] = year - 2020;
      days.ALLSKY_SFC_SW_DWN[key] = year - 2011;
    }
  }
  return { days };
}

test("environmental points use actual crops and months and preserve local choices", () => {
  const farm: Farm = {
    ...emptyFarm,
    currentCrop: "Lettuce",
    nextCycles: ["Tomato"],
    nextCycleMonths: [12],
  };
  const before = JSON.stringify(farm);
  const evidence = { climate: climateMonth(12) };
  const stages = buildRotationStages(farm, evidence);
  assert.deepEqual(
    stages.map((s) => s.crop),
    ["Lettuce", "Tomato"],
  );
  assert.equal(stages[1].period, "December");
  assert.equal(JSON.stringify(farm), before);
  assert.deepEqual(
    buildRotationStages(
      applyFarmChange(farm, { type: "load-path-example" }),
      evidence,
    ),
    stages,
  );
  const points = stages[1].points!;
  assert.deepEqual(
    points.map((p) => p.kind),
    ["temperature", "rain", "solar"],
  );
  assert.ok(
    points.every(
      (p) =>
        p.source.startsWith("NASA POWER") &&
        p.sourceUrl === "https://power.larc.nasa.gov/",
    ),
  );
  assert.match(points[0].evidence, /5 of 155 historical days/);
  assert.match(points[0].evidence, /5 above 24/);
  assert.match(points[1].evidence, /31 to 155 mm/);
  assert.match(points[2].evidence, /10 to 14 MJ/);
});

test("missing months and incomplete variables never become a prediction, zero or another source", () => {
  assert.deepEqual(
    buildRotationStages(emptyFarm).map((s) => s.crop),
    [null],
  );
  const withoutMonth = buildRotationStages({
    ...emptyFarm,
    nextCycles: ["Tomato"],
  });
  assert.equal(withoutMonth[1].period, "Month to be decided");
  assert.equal(withoutMonth[1].points?.[0].title, "Choose the season");
  const climate = climateMonth(12);
  delete climate.days.PRECTOTCORR["20231202"];
  delete climate.days.ALLSKY_SFC_SW_DWN["20241202"];
  const stages = buildRotationStages(
    { ...emptyFarm, nextCycles: ["Tomato"], nextCycleMonths: [12] },
    { climate },
  );
  assert.equal(stages[1].points![1].title, "Rainfall to check");
  assert.match(stages[1].points![1].evidence, /Complete data is missing/);
  assert.equal(stages[1].points![2].title, "Solar radiation to check");
  assert.ok(
    stages[1].points!.every((p) => !/[Ss]oilGrids|MapBiomas/.test(p.source)),
  );
});

test("Open-Meteo appears only for the first cycle, current month and valid seven-day forecast", () => {
  const forecast: Forecast = {
    id: "test",
    areaId: AREA.id,
    source: "Open-Meteo",
    model: "best_match",
    timezone: AREA.timezone,
    fetchedAt: "2026-11-15T12:00:00Z",
    expiresAt: "2026-11-15T18:00:00Z",
    requestedPoint: AREA,
    gridPoint: AREA,
    days: Array.from({ length: 7 }, (_, i) => ({
      date: `2026-11-${15 + i}`,
      code: i === 0 ? 95 : 0,
      low: 17,
      high: 26,
      rainMm: 2,
      rainChance: 50,
      gustKmh: 30,
    })),
  };
  const farm: Farm = {
    ...emptyFarm,
    nextCycles: ["Tomato", "Carrot"],
    nextCycleMonths: [11, 11],
  };
  const active = buildRotationStages(farm, {
    forecast,
    now: new Date("2026-11-15T13:00:00Z"),
  });
  assert.equal(
    active[1].points!.filter((p) => p.source.startsWith("Open-Meteo")).length,
    1,
  );
  assert.equal(
    active[2].points!.filter((p) => p.source.startsWith("Open-Meteo")).length,
    0,
  );
  const old = buildRotationStages(farm, {
    forecast,
    now: new Date(forecast.expiresAt),
  });
  assert.ok(
    old.every(
      (stage) => !stage.points?.some((p) => p.source.startsWith("Open-Meteo")),
    ),
  );
  const future = buildRotationStages(
    { ...farm, nextCycleMonths: [5, 11] },
    { forecast, now: new Date("2026-11-15T13:00:00Z") },
  );
  assert.ok(!future[1].points!.some((p) => p.source.startsWith("Open-Meteo")));
});
