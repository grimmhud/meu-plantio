import type { Farm } from "./farm";
import { cycleMonthLabel } from "./cycle-months";
import type { RotationStage, RotationPoint } from "./rotation-scenario";
import {
  cropClimate,
  historicalSupport,
  type ClimateData,
} from "./crop-climate";
import { nasaCrops } from "./nasa-crops";
import { isFresh, localDate, shortDate, type Forecast } from "./planning";

type PlanContext = Pick<
  Farm,
  "currentCrop" | "needsReview" | "nextCycles" | "nextCycleMonths"
>;
type Evidence = {
  climate?: ClimateData | null;
  forecast?: Forecast | null;
  now?: Date | null;
  loading?: boolean;
};
const nasaUrl = "https://power.larc.nasa.gov/";
const format = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 1 });
const historyLimit =
  "Regional history for Mogi das Cruzes, 2021–2025, UTC days. A municipal reference point, not a bed measurement or a forecast for a future month.";

function climatePoints(
  crop: (typeof nasaCrops)[number],
  month: number,
  evidence: Evidence,
): RotationPoint[] {
  const data = evidence.climate ?? null;
  const period = cycleMonthLabel(month);
  const thermal = cropClimate(crop, data, month);
  const rain = historicalSupport(data, month, "PRECTOTCORR");
  const solar = historicalSupport(data, month, "ALLSKY_SFC_SW_DWN");
  const pending = evidence.loading
    ? "Loading data for this season."
    : "Complete data is missing for this season. No comparison has been made.";
  const points: RotationPoint[] = [
    {
      kind: "temperature",
      title:
        thermal.state === "unknown"
          ? "Temperature to check"
          : thermal.cold && thermal.hot
            ? "Cold and heat this season"
            : thermal.hot
              ? "Heat this season"
              : thermal.cold
                ? "Cold this season"
                : "Temperature this season",
      source: "NASA POWER · 2021–2025",
      sourceUrl: nasaUrl,
      sourceDetail: `T2M: daily average air temperature at 2 meters. ${historyLimit} Reference range: ${crop.low}–${crop.high} °C. ${crop.note} Technical reference: ${crop.source}`,
      evidence: thermal.total
        ? `In ${period}, ${thermal.cold} of ${thermal.total} historical days were below ${crop.low} °C and ${thermal.hot} above ${crop.high} °C. Daily averages from ${format(thermal.minimum!)} to ${format(thermal.maximum!)} °C.`
        : pending,
      impact: thermal.total
        ? "Helps check when to start the crop. Does not estimate losses or approve the entire cycle."
        : "Missing data does not indicate heat, cold or an unsuitable crop.",
      action:
        "Check the variety and crop stage before keeping or changing the month.",
      check:
        "Near planting time, update the forecast and monitor the crop in the field.",
    },
    {
      kind: "rain",
      title: rain ? "Rain this season" : "Rainfall to check",
      source: "NASA POWER · 2021–2025",
      sourceUrl: nasaUrl,
      sourceDetail: `PRECTOTCORR: corrected precipitation. Totals for each complete month, compared across five years. ${historyLimit}`,
      evidence: rain
        ? `In ${period}, total monthly rainfall ranged from ${format(rain.minimum)} to ${format(rain.maximum)} mm between 2021 and 2025.`
        : pending,
      impact: rain
        ? "Historical variation helps prepare checks of water and access to the bed. It does not classify shortage or excess in your area."
        : "Without the complete series, we do not estimate rainfall for this season.",
      action:
        "Check the water source, access and local drainage before confirming planting.",
      check:
        "Observe the bed after rain and use an updated forecast only near the task date.",
    },
    {
      kind: "solar",
      title: solar ? "Sun this season" : "Solar radiation to check",
      source: "NASA POWER · SYN1DEG",
      sourceUrl: nasaUrl,
      sourceDetail: `ALLSKY_SFC_SW_DWN: surface solar radiation, MJ/m² per day. Range of monthly daily averages across five years. ${historyLimit}`,
      evidence: solar
        ? `In ${period}, monthly daily average radiation ranged from ${format(solar.minimum)} to ${format(solar.maximum)} MJ/m² per day between 2021 and 2025.`
        : pending,
      impact: solar
        ? "Provides an environmental reference to check the season and growing conditions. No ideal range has been validated for this variety."
        : "Without complete data, we do not assess radiation for this season.",
      action:
        "Check the variety’s requirements and whether the crop will grow outdoors or under cover.",
      check:
        "Monitor growth. Radiation is not hours of daylight or predicted yield.",
    },
  ];
  return points;
}

function operationPoint(forecast: Forecast, now: Date): RotationPoint {
  const gusts = forecast.days
    .map((day) => day.gustKmh)
    .filter(
      (value): value is number => value !== null && Number.isFinite(value),
    );
  const storms = forecast.days.filter((day) =>
    [95, 96, 99].includes(day.code ?? -1),
  );
  return {
    kind: "wind",
    title: storms.length
      ? "Check storms near the task date"
      : "Wind in the coming days",
    source: "Open-Meteo · next 7 days",
    sourceUrl: "https://open-meteo.com/",
    sourceDetail: `Regional forecast for the Mogi das Cruzes point. Retrieved on ${shortDate(localDate(new Date(forecast.fetchedAt)))}. Valid when checked on ${shortDate(localDate(now))}; this is not a NASA forecast or a forecast for later months.`,
    evidence: storms.length
      ? `Thunderstorms are indicated on ${storms.map((day) => shortDate(day.date)).join(", ")}.`
      : gusts.length
        ? `Forecast gusts between ${format(Math.min(...gusts))} and ${format(Math.max(...gusts))} km/h over the next seven days.`
        : "No gust values available in this forecast.",
    impact:
      "Helps review the date of an upcoming task. Does not automatically change the saved month or sequence.",
    action:
      "Check the weather, bed and working conditions before heading out.",
    check:
      "Update the forecast before the task; regional forecasts can change.",
  };
}

export function buildRotationStages(
  farm: PlanContext,
  evidence: Evidence = {},
): RotationStage[] {
  return [
    {
      id: "current",
      crop: farm.currentCrop,
      period: farm.needsReview
        ? "Crop to check"
        : farm.currentCrop
          ? "Reported current crop"
          : "Tell us what is planted",
      current: true,
    },
    ...farm.nextCycles.map((cropName, index) => {
      const month = farm.nextCycleMonths[index] ?? null;
      const crop = nasaCrops.find((candidate) => candidate.name === cropName)!;
      const points = month
        ? climatePoints(crop, month, evidence)
        : [
            {
              kind: "calendar" as const,
              title: "Choose the season",
              source: "Reported plan",
              sourceDetail:
                "The crop has been chosen, but no month has been entered to look up the same season in the environmental series.",
              evidence: `The month for ${cropName} has not been provided yet.`,
              impact:
                "A season is needed to look up the environmental context for this cycle.",
              action: "Choose the month in Edit rotation.",
              check: "Check the month and local conditions before planting.",
            },
          ];
      if (
        index === 0 &&
        month &&
        evidence.forecast &&
        evidence.now &&
        month === Number(localDate(evidence.now).slice(5, 7)) &&
        isFresh(evidence.forecast, evidence.now)
      )
        points.push(operationPoint(evidence.forecast, evidence.now));
      return {
        id: `cycle-${index}`,
        crop: cropName,
        period: cycleMonthLabel(month),
        points,
      };
    }),
  ];
}

export function rotationPlanSpeech(stages: readonly RotationStage[]): string {
  return stages
    .map(
      (stage) =>
        `${stage.current ? "In the bed" : "Next crop"}: ${stage.crop ?? "crop not provided"}. ${stage.period}.`,
    )
    .join(" ");
}
