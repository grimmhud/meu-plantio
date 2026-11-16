"use client";
import { climateNextStep } from "@/shared/climate-next-step";
import { DataSources } from "@/frontend/ui/DataSources";
import { ClimateRange } from "./ClimateRange";

import { ClimateSupport } from "./ClimateSupport";
import { historicalSupport } from "@/shared/crop-climate";
import { useState } from "react";
import { Thermometer, CircleHelp, ClipboardCheck, Eye } from "lucide-react";
import { CropArt } from "@/frontend/ui/Illustration";
import { Sheet } from "@/frontend/ui/Sheet";
import { Button } from "@/frontend/ui/Button";
import { ActionGroup } from "@/frontend/ui/ActionGroup";
import { cropClimate, type ClimateData } from "@/shared/crop-climate";
import { isFresh, localDate, type Forecast } from "@/shared/planning";
import type { nasaCrops } from "@/shared/nasa-crops";
import styles from "./next-cycles.module.css";
export function CropClimateBadge({
  crop,
  data,
  month,
  forecast = null,
  inCard = false,
}: {
  crop: (typeof nasaCrops)[number];
  data: ClimateData | null;
  month: number | null;
  forecast?: Forecast | null;
  inCard?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const result = cropClimate(crop, data, month);
  const title =
    result.state === "unknown"
      ? !month
        ? "Choose the season"
        : "Missing data"
      : result.hot && result.cold
        ? "Cold and heat need attention"
        : result.hot
          ? "Heat needs attention"
          : result.cold
            ? "Cold needs attention"
            : result.state === "match"
              ? "Temperature within range"
              : "Check the variety";
  const summary =
    result.state === "unknown"
      ? !month
        ? "Choose a month to check the climate."
        : "Could not compare this season."
      : result.hot || result.cold
        ? "Some days fell outside the reference range."
        : result.state === "match"
          ? "The days checked fell within this range."
          : "The range depends on the variety or crop stage.";
  const minimum = result.minimum ?? crop.low;
  const maximum = result.maximum ?? crop.high;
  const number = (value: number) => value.toFixed(1);
  const rain = historicalSupport(data, month, "PRECTOTCORR");
  const solar = historicalSupport(data, month, "ALLSKY_SFC_SW_DWN");
  const supportSpeech = ` ${rain ? `Historical rainfall: from ${Math.round(rain.minimum)} to ${Math.round(rain.maximum)} millimeters for the month. Check water and drainage in the bed.` : "Rainfall data or season is missing."} Rainfall is regional context; it does not determine available water in the bed.`;
  const validForecast =
    forecast && month === Number(localDate().slice(5, 7)) && isFresh(forecast)
      ? forecast
      : null;
  const futureTemps =
    validForecast &&
    validForecast.days.every((d) => typeof d.meanTemp === "number")
      ? {
          low: Math.min(...validForecast.days.map((d) => d.meanTemp!)),
          high: Math.max(...validForecast.days.map((d) => d.meanTemp!)),
        }
      : null;
  const rainForecast =
    validForecast && validForecast.days.every((d) => d.rainMm !== null)
      ? validForecast.days.reduce((sum, d) => sum + d.rainMm!, 0)
      : null;
  const futureSpeech = ` ${futureTemps ? `Open-Meteo forecast for the next seven days, daily averages from ${number(futureTemps.low)} to ${number(futureTemps.high)} degrees.` : "No temperature forecast for this cycle yet."} ${rainForecast !== null ? `Forecast rainfall over seven days: ${Math.round(rainForecast)} millimeters. Do not compare this total directly with a historical month.` : "No rainfall forecast for this cycle yet."} Estimated water use is based on stage coefficients and reference evapotranspiration; it is not a watering dose.`;
  const nextStep = climateNextStep(validForecast);
  const spoken = `${nextStep.speech} ${crop.name}. ${title}. ${summary} ${result.reason}${supportSpeech}${futureSpeech}`;
  return (
    <div className={inCard ? styles.cardBadge : styles.badgeWrap}>
      <button
        type="button"
        className={
          inCard
            ? styles.cardDetailsButton
            : `${styles.badge} ${styles[result.state]}`
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={
          inCard
            ? `Analyze temperature for ${crop.name}`
            : `Historical temperature: ${result.label}. Understand ${crop.name}`
        }
        title={inCard ? "Analyze temperature" : undefined}
        onClick={() => setOpen(true)}
      >
        {inCard ? (
          <Thermometer size={24} aria-hidden="true" />
        ) : (
          <>
            <span aria-hidden="true">{result.symbol}</span> {result.label}
          </>
        )}
      </button>
      {open && (
        <Sheet
          title={crop.name}
          narration={spoken}
          onClose={() => setOpen(false)}
        >
          <div className={styles.climateVisual}>
            <div className={styles.climateArt}>
              <CropArt crop={crop.name} />
              {result.state === "unknown" ? (
                <CircleHelp size={48} />
              ) : result.hot || result.cold ? (
                <Thermometer size={48} />
              ) : (
                <ClipboardCheck size={48} />
              )}
            </div>
            <span className="eyebrow">TEMPERATURE</span>
            <h3>{title}</h3>
            <ClimateRange
              reference={{ low: crop.low, high: crop.high }}
              future={futureTemps}
              history={result.total ? { low: minimum, high: maximum } : null}
              unit="°C · daily averages"
            />
            <ClimateSupport
              data={data}
              month={month}
              forecast={validForecast}
              crop={crop.name}
            />
            <p className={styles.nextStep}>
              <Eye size={22} aria-hidden="true" />
              {nextStep.label}
            </p>
          </div>
          <ActionGroup>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Back
            </Button>
          </ActionGroup>
          <DataSources
            primary={{
              name: "NASA",
              image: "/brands/nasa.svg",
              description: "2021–2025 history · NASA POWER",
              href: "https://power.larc.nasa.gov/",
            }}
            secondary={[
              {
                name: "Forecast: Open-Meteo",
                description:
                  "Forecast for the next seven days at the reference point in Mogi das Cruzes. This is not a NASA forecast.",
                href: "https://open-meteo.com/",
              },
            ]}
            narration="The charts use NASA POWER environmental history from 2021 to 2025 for a reference point in Mogi das Cruzes. The next seven days’ forecast comes from Open-Meteo. Technical crop references help interpret these data; they do not prove results in your bed."
          >
            <p>{result.reason}</p>
            <p>
              {solar
                ? `Historical NASA radiation: ${solar.minimum.toFixed(1)}–${solar.maximum.toFixed(1)} MJ/m² per day, same season in 2021–2025. No validated ideal range for this variety.`
                : "Solar radiation: no complete data for this season."}
            </p>
            <p>
              Estimated water use: forecast ETo × Kc range for four stages, FAO table 7. Stage scenarios, not confidence intervals; no climate/local adjustment or soil water balance. This is not ideal rainfall, an irrigation dose or a promise. Rainfall: monthly total in each year; radiation: monthly daily average in each year. Ranges across 2021–2025 for the same season; incomplete years make the aspect unavailable. Source: NASA POWER, PRECTOTCORR and ALLSKY_SFC_SW_DWN, Mogi reference point, UTC days. Retrieved: November 15, 2026. Rainfall chart: range of monthly daily averages across years versus forecast daily minimum–maximum over 7 days; UTC history and local forecast, different grids. Does not infer irrigation or day length.
            </p>
            <a href="https://www.fao.org/4/S2022E/s2022e07.htm">
              Water reference · FAO
            </a>
            <p>
              Reference range: {crop.low}–{crop.high} °C. Daily average air temperature at 2 m, reference point in Mogi das Cruzes.{" "}
              {month ? `Month ${month}.` : "Season not defined."}
            </p>
            <a href={crop.source} target="_blank" rel="noreferrer">
              Crop reference
            </a>
          </DataSources>
        </Sheet>
      )}
    </div>
  );
}
