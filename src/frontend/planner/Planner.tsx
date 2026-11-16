"use client";
import { useEffect, useState } from "react";
import { useFarm } from "@/frontend/state/FarmProvider";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Droplets,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sprout,
  Thermometer,
} from "lucide-react";
import {
  AREA,
  dayLabel,
  describeDay,
  isFresh,
  localDate,
  operations,
  shortDate,
  weatherKind,
  weatherLabels,
  type Crop,
  type Operation,
  type SavedPlan,
} from "@/shared/planning";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { Button } from "@/frontend/ui/Button";
import { Sheet } from "@/frontend/ui/Sheet";
import { CropArt, WeatherArt } from "@/frontend/ui/Illustration";

type Panel = "crop" | "confirm" | "call" | null;
const number = (value: number | null, suffix = "") =>
  value === null ? "—" : `${Math.round(value)}${suffix}`;

export default function Planner({
  initialCrop,
  onDone,
}: {
  initialCrop?: Crop;
  onDone: () => void;
}) {
  const {
    forecast,
    state,
    message,
    setMessage,
    saved,
    now,
    farm,
    ready,
    loadForecast,
    saveIntention,
  } = useFarm();
  const [crop, setCrop] = useState<Crop>(initialCrop ?? "Lettuce");
  const [operation, setOperation] = useState<Operation>(
    initialCrop === "Carrot" ? "sow" : "transplant",
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [panel, setPanel] = useState<Panel>(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (saved && !initialCrop) {
      setCrop(saved.crop);
      setOperation(saved.operation);
      if (saved.date >= localDate()) setSelectedDate(saved.date);
    }
  }, [saved, initialCrop]);
  useEffect(() => {
    if (forecast)
      setSelectedDate((previous) =>
        forecast.days.some(
          (day) => day.date === previous && day.date >= localDate(),
        )
          ? previous
          : forecast.days[1].date,
      );
  }, [forecast]);

  const day = forecast?.days.find((item) => item.date === selectedDate);
  const current = forecast && now ? isFresh(forecast, now) : false;
  const canChoose =
    !!day &&
    !farm.needsReview &&
    current &&
    day.date >= localDate(now ?? new Date()) &&
    weatherKind(day.code) !== "unknown";
  const advice = day ? describeDay(day) : null;
  const brief =
    day && advice
      ? `${dayLabel(day.date)}, ${shortDate(day.date)}. ${operations[operation]}, ${crop}. ${advice.title}. ${advice.text} ${advice.action} ${day.high !== null ? `High of ${Math.round(day.high)} degrees.` : ""} ${day.rainChance !== null ? `Rain probability of ${Math.round(day.rainChance)} percent. This is not the probability of losing the crop.` : ""} Saving the day does not confirm planting. Check the bed, water and seeds or seedlings.`
      : "Let’s plan the next step. Choose the crop and one of the next seven days. Weather helps you choose, but we still need to check the bed. Tap Listen to hear each part.";
  async function confirm() {
    if (
      !day ||
      !forecast ||
      !isFresh(forecast) ||
      day.date < localDate() ||
      weatherKind(day.code) === "unknown" ||
      saving ||
      !ready ||
      farm.needsReview
    ) {
      setMessage("Check the weather before saving.");
      setPanel(null);
      return;
    }
    setSaving(true);
    const intention: SavedPlan = {
      version: 1,
      id: crypto.randomUUID(),
      areaId: AREA.id,
      crop,
      operation,
      date: day.date,
      savedAt: new Date().toISOString(),
      forecastId: forecast.id,
      forecastFetchedAt: forecast.fetchedAt,
      forecastExpiresAt: forecast.expiresAt,
      day,
      pending: [
        ...(advice?.pending ?? []),
        farm.currentCrop
          ? "Check the end of the current crop"
          : "Check the current crop",
      ],
      status: "intention",
      contextRevision: farm.revision,
    };
    try {
      await saveIntention(intention);
      setPanel(null);
      onDone();
    } catch {
      setMessage("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="planting-planner">
      {farm.needsReview && (
        <p className="notice">
          You recorded planting. Check the current crop in your plan first.
        </p>
      )}
      <section
        id="task"
        className="task-section"
        aria-labelledby="task-heading"
      >
        <div className="section-title">
          <h2 id="task-heading">
            <span className="step-number">1</span> What will you do?
          </h2>
        </div>
        <button
          className="crop-context"
          onClick={() => setPanel("crop")}
          aria-label={`Crop: ${crop}. Change`}
        >
          <span className="crop-thumb">
            <CropArt crop={crop} />
          </span>
          <span>
            <small>Crop for the task</small>
            <strong>{crop}</strong>
          </span>
          <span className="change-label">
            Change <ChevronDown size={16} />
          </span>
        </button>
        <div className="operation-options" role="group" aria-label="Task">
          <button
            aria-pressed={operation === "transplant"}
            disabled={crop === "Carrot"}
            onClick={() => setOperation("transplant")}
          >
            <span className="operation-drawing">
              <Sprout size={32} />
              <ArrowDown size={17} />
            </span>
            <span>Seedlings</span>
            {operation === "transplant" && <Check size={17} />}
          </button>
          <button
            aria-pressed={operation === "sow"}
            onClick={() => setOperation("sow")}
          >
            <span className="seed-drawing" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>↓</span>
            </span>
            <span>Sow seeds</span>
            {operation === "sow" && <Check size={17} />}
          </button>
        </div>
      </section>

      <section className="days-section" aria-labelledby="days-heading">
        <div className="section-title">
          <h2 id="days-heading">
            <span className="step-number">2</span> Which day?
          </h2>
          <button
            className="refresh-button"
            onClick={() => void loadForecast()}
            disabled={state === "loading"}
            aria-label="Update forecast"
          >
            <RefreshCw
              size={17}
              className={state === "loading" ? "spinning" : ""}
            />
            <span>Update</span>
          </button>
        </div>
        <p className="section-hint">Tap to see the weather.</p>
        {state === "loading" && !forecast ? (
          <div className="loading-card" role="status">
            <span className="loading-sun" />
            <p>Checking the weather…</p>
          </div>
        ) : null}
        {message && (
          <div className="notice" role="status">
            {message}
          </div>
        )}
        {state === "error" && !message && (
          <p className="notice" role="status">
            We cannot check the weather right now.
          </p>
        )}
        {state === "saved" && (
          <p className="notice" role="status">
            Could not update. View the saved forecast.
          </p>
        )}
        {forecast && !current && (
          <div className="notice expired" role="alert">
            <CalendarDays size={23} />
            <div>
              <strong>Needs updating</strong>
              <p>This forecast is out of date.</p>
            </div>
          </div>
        )}
        {forecast && (
          <div
            className="day-grid"
            role="group"
            aria-label="Next seven days"
          >
            {forecast.days.map((item) => (
              <button
                key={item.date}
                aria-label={`${dayLabel(item.date)}, ${shortDate(item.date)}, ${weatherLabels[weatherKind(item.code)]}`}
                aria-pressed={selectedDate === item.date}
                disabled={!!now && item.date < localDate(now)}
                className={`day-card ${selectedDate === item.date ? "selected" : ""}`}
                onClick={() => setSelectedDate(item.date)}
              >
                <span className="day-name">{dayLabel(item.date)}</span>
                <small>{shortDate(item.date)}</small>
                <WeatherArt kind={weatherKind(item.code)} small />
                <span className="day-condition">
                  {weatherLabels[weatherKind(item.code)]}
                </span>
                <strong className="day-temp">
                  {number(item.high, "°")}
                  <span>{number(item.low, "°")}</span>
                </strong>
                {selectedDate === item.date && (
                  <span className="day-check">
                    <Check size={13} />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        {forecast && (
          <p className="forecast-stamp">
            <span className={current ? "live-dot" : "old-dot"} />
            {state === "saved" ? "Saved forecast" : "Retrieved"} ·{" "}
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: AREA.timezone,
            }).format(new Date(forecast.fetchedAt))}{" "}
            <span>· {shortDate(localDate(new Date(forecast.fetchedAt)))}</span>
          </p>
        )}
        {state === "error" && (
          <Button variant="secondary" onClick={() => void loadForecast()}>
            <RefreshCw size={19} /> Try again
          </Button>
        )}
      </section>

      {day && advice && (
        <section
          className={`weather-card tone-${advice.kind}`}
          aria-labelledby="weather-heading"
        >
          <div className="weather-card-top">
            <div>
              <span className="eyebrow">
                {dayLabel(day.date)} · {shortDate(day.date)}
              </span>
              <h2 id="weather-heading">
                {current ? advice.title : "Weather to check"}
              </h2>
            </div>
            <WeatherArt kind={advice.kind} />
          </div>
          <p className="weather-main-copy">
            {current ? advice.text : "Update before choosing a day."}
          </p>
          <div className="weather-measures">
            <div>
              <Droplets size={19} />
              <strong>{number(day.rainChance, "%")}</strong>
              <span>chance of rain</span>
            </div>
            <div>
              <Thermometer size={19} />
              <strong>{number(day.high, "°")}</strong>
              <span>daily high</span>
            </div>
          </div>
          <div className="weather-card-footer">
            <ListenButton
              text={
                current
                  ? brief
                  : "The forecast is out of date. Update it before choosing a day."
              }
              label="Listen"
              className="listen-inline"
            />
            <details className="weather-details">
              <summary>
                Learn more <ChevronDown size={15} />
              </summary>
              <div>
                <p>
                  Forecast rain:{" "}
                  {day.rainMm === null
                    ? "no information"
                    : `${day.rainMm.toLocaleString("en-US")} mm`}
                  . High: {number(day.high, "°")}. Low:{" "}
                  {number(day.low, "°")}.
                </p>
                <p>Wind gusts: {number(day.gustKmh, " km/h")}.</p>
                <p>
                  This is a regional forecast. It does not measure water in your bed. Rain probability is not the probability of loss.
                </p>
                <p>
                  Check again before heading out. The day still depends on the bed, water and seedlings or seeds.
                </p>
              </div>
            </details>
          </div>
        </section>
      )}

      {day && (
        <section
          className="decision-section"
          aria-labelledby="decision-heading"
        >
          <div className="section-title">
            <h2 id="decision-heading">
              <span className="step-number">3</span> Save this day?
            </h2>
          </div>
          <div className="decision-preview">
            <span className="decision-crop">
              <CropArt crop={crop} />
            </span>
            <div>
              <strong>
                {operation === "sow" ? "Sow seeds" : "Bring seedlings"} · {crop}
              </strong>
              <span>
                {dayLabel(day.date)}, {shortDate(day.date)}
              </span>
            </div>
            <CalendarDays size={25} />
          </div>
          <Button
            disabled={!canChoose || saving || state === "loading" || !ready}
            onClick={() => {
              setMessage("");
              setPanel("confirm");
            }}
          >
            Save day <ArrowRight size={21} />
          </Button>
          <p className="quiet-caption">You can change it later.</p>
        </section>
      )}

      <section className="call-card">
        <span className="call-icon">
          <Phone size={26} />
        </span>
        <div>
          <h2>Want to talk?</h2>
          <p>About this crop and the weather.</p>
        </div>
        <button onClick={() => setPanel("call")} className="call-button">
          Call
        </button>
      </section>
      <details className="source-details">
        <summary>
          <ShieldCheck size={17} /> Data sources <ChevronDown size={16} />
        </summary>
        <div>
          <p>
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
              Open-Meteo
            </a>{" "}
            · 7-day forecast. Automatic model selection (best_match), São Paulo time.
          </p>
          <p>
            Mogi das Cruzes: municipal reference point. This is not your garden’s location.
          </p>
          {forecast && (
            <p>
              Retrieved:{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "short",
                timeStyle: "short",
                timeZone: AREA.timezone,
              }).format(new Date(forecast.fetchedAt))}
              . Update after 6 hours or when the day changes. The forecast may change.
            </p>
          )}
          <p>
            This step helps with the weather for the next task. The full rotation sequence still needs assessment.
          </p>
        </div>
      </details>
      {panel === "crop" && (
        <Sheet title="Which crop?" onClose={() => setPanel(null)}>
          <div className="crop-picker">
            {(["Lettuce", "Carrot", "Tomato"] as Crop[]).map((item) => (
              <button
                key={item}
                aria-pressed={crop === item}
                onClick={() => {
                  setCrop(item);
                  if (item === "Carrot") setOperation("sow");
                  setPanel(null);
                }}
              >
                <CropArt crop={item} />
                <strong>{item}</strong>
                {crop === item && <Check size={20} />}
              </button>
            ))}
          </div>
          <p className="sheet-note">
            Choose what you want to grow. Weather does not choose the crop for you.
          </p>
          <ListenButton
            text="Which crop do you want to plan? Lettuce, carrot or tomato. Choose a picture. This choice does not confirm that the crop suits your bed."
            label="Listen"
          />
        </Sheet>
      )}
      {panel === "confirm" && day && (
        <Sheet title="Is this the day?" onClose={() => setPanel(null)}>
          <div className="confirm-art">
            <CropArt crop={crop} />
            <ArrowRight />
            <WeatherArt kind={weatherKind(day.code)} />
          </div>
          <p className="confirm-title">
            {operation === "sow" ? "Sow seeds" : "Bring seedlings"} · {crop}
          </p>
          <p className="confirm-date">
            {dayLabel(day.date)}, {shortDate(day.date)}
          </p>
          <div className="confirmation-note">
            <CircleHelp size={22} />
            <span>The bed still needs checking.</span>
          </div>
          <ListenButton
            text={`${brief} Do you want to save this day? Tap Yes, save. To change it, tap Back.`}
            label="Listen"
          />
          <Button onClick={() => void confirm()} disabled={saving}>
            {saving ? "Saving…" : "Yes, save"}
            <Check size={22} />
          </Button>
          <Button variant="quiet" onClick={() => setPanel(null)}>
            <ArrowLeft size={18} /> Back
          </Button>
          <p className="quiet-caption">Saving does not record planting.</p>
          {message && (
            <p role="status" className="notice">
              {message}
            </p>
          )}
        </Sheet>
      )}
      {panel === "call" && (
        <Sheet title="Call" onClose={() => setPanel(null)}>
          <div className="phone-emblem">
            <Phone size={38} />
          </div>
          <h3 className="call-title">Not available yet</h3>
          <p className="sheet-note">
            For now, tap Listen to understand the weather.
          </p>
          <ListenButton
            text="Calling is not available yet. No call has been made. For now, you can listen to the guidance on this screen."
            label="Listen"
          />
          <Button variant="secondary" onClick={() => setPanel(null)}>
            Back
          </Button>
        </Sheet>
      )}
    </div>
  );
}
