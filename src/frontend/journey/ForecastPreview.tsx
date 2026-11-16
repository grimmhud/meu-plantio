"use client";
import Link from "next/link";
import { ChevronDown, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useFarm } from "@/frontend/state/FarmProvider";
import {
  AREA,
  dayLabel,
  describeDay,
  isFresh,
  localDate,
  shortDate,
  weatherKind,
  weatherLabels,
} from "@/shared/planning";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { WeatherArt } from "@/frontend/ui/Illustration";
import { CallSheet } from "./CommonSheets";
export function ForecastPreview({
  showPlanLink = true,
}: {
  showPlanLink?: boolean;
}) {
  const { forecast, state, now, loadForecast } = useFarm();
  const [calling, setCalling] = useState(false);
  const current = forecast && now && isFresh(forecast, now);
  const today = forecast?.days.find(
    (day) => day.date === localDate(now ?? new Date()),
  );
  const upcoming = current ? forecast.days.slice(0, 3) : [];
  const subject =
    upcoming.find((day) => weatherKind(day.code) === "storm") ?? today;
  const kind = current && subject ? weatherKind(subject.code) : "unknown";
  const title =
    state === "loading" && !forecast
      ? "Checking the weather…"
      : !current
        ? "Weather to check"
        : kind === "storm"
          ? "Thunderstorms possible"
          : kind === "rain"
            ? "Rain in the coming days"
            : subject
              ? describeDay(subject).title
              : "Weather to check";
  const audio = current
    ? `${title}. ${upcoming.map((day) => `${dayLabel(day.date)}: ${weatherLabels[weatherKind(day.code)]}. ${day.high !== null ? `High of ${Math.round(day.high)} degrees.` : ""}`).join(" ")} The forecast is regional. Check the bed before deciding on watering or planting.`
    : "We do not have an updated forecast. Tap Update. You can still observe the bed and check your records.";
  return (
    <section id="weather" className="home-weather">
      <div className="section-title">
        <h2>What is the weather like?</h2>
        <span className="mini-label">7 days</span>
      </div>
      <div className="weather-card">
        <div className="weather-card-top">
          <div>
            <span className="eyebrow">CHECK BEFORE HEADING OUT</span>
            <h3>{title}</h3>
          </div>
          <WeatherArt kind={kind} />
        </div>
        <p className="weather-main-copy">
          {current
            ? "Check the weather and the bed."
            : "Update before choosing a day."}
        </p>
        {state === "saved" && (
          <p className="small-status">Could not update. Saved forecast.</p>
        )}
        <ListenButton text={audio} label="Listen" className="listen-inline" />
        <details className="home-forecast-details">
          <summary>
            View days <ChevronDown size={17} />
          </summary>
          {forecast && (
            <>
              <div className="home-weather-days">
                {forecast.days.map((day) => (
                  <div key={day.date}>
                    <strong>{dayLabel(day.date)}</strong>
                    <WeatherArt kind={weatherKind(day.code)} small />
                    <span>
                      {day.high === null ? "—" : `${Math.round(day.high)}°`}
                    </span>
                    <small>{shortDate(day.date)}</small>
                  </div>
                ))}
              </div>
              <p className="small-status">
                {shortDate(localDate(new Date(forecast.fetchedAt)))} ·{" "}
                {new Intl.DateTimeFormat("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: AREA.timezone,
                }).format(new Date(forecast.fetchedAt))}
              </p>
            </>
          )}
          <button
            className="refresh-button"
            onClick={() => void loadForecast()}
            disabled={state === "loading"}
          >
            <RefreshCw size={17} /> Update
          </button>
        </details>
        <div className="home-weather-actions">
          {showPlanLink && <Link href="/my-plan">My plan</Link>}
          <button onClick={() => setCalling(true)}>
            <Phone size={17} /> Call
          </button>
        </div>
      </div>
      <details className="source-details">
        <summary>
          <ShieldCheck size={17} /> Data sources <ChevronDown size={16} />
        </summary>
        <div>
          <p>
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
              Open-Meteo
            </a>
            , best_match model selection. Municipal reference for Mogi, São Paulo time. This is not a measurement in your garden.
          </p>
          <p>
            Check again after 6 hours or when the day changes. The forecast may change. Forecast rain does not determine a watering dose.
          </p>
        </div>
      </details>
      {calling && <CallSheet onClose={() => setCalling(false)} />}
    </section>
  );
}
