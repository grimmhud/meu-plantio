"use client";
import Link from "next/link";
import { cycleMonthLabel } from "@/shared/cycle-months";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Droplets,
  Leaf,
  Sprout,
  Sun,
} from "lucide-react";
import { useFarm } from "@/frontend/state/FarmProvider";
import {
  bedLabels,
  checkedToday,
  currentReport,
  type BedValue,
} from "@/shared/farm";
import { AREA, shortDate } from "@/shared/planning";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { Button } from "@/frontend/ui/Button";
import { Sheet } from "@/frontend/ui/Sheet";
import { ActivityArt, CropArt, SoilArt } from "@/frontend/ui/Illustration";
import { AppFrame } from "@/frontend/journey/AppFrame";
import {
  CallSheet,
  CurrentCropSheet,
  RecordSheet,
} from "@/frontend/journey/CommonSheets";
import { VoiceActions } from "@/frontend/audio/VoiceActions";
import { ForecastPreview } from "@/frontend/journey/ForecastPreview";

export default function HomeScreen() {
  const { farm, saved, now, ready, busy, changeFarm, message } = useFarm();
  const [panel, setPanel] = useState<
    "crop" | "record" | "water" | "call" | null
  >(null);
  const [observation, setObservation] = useState<BedValue | null>(null);
  const [error, setError] = useState("");
  const report = now ? currentReport(farm, now) : null;
  const checks = now ? checkedToday(farm, now) : [];
  const observed = !!report && report.value !== "unknown";
  const completed = (observed ? 1 : 0) + checks.length;
  const puddles = report?.value === "puddles";
  const daily = farm.needsReview
    ? "You reported new planting. Check the crop first. Your previous plan is still saved."
    : puddles
      ? "You saw puddles. Check whether water is still standing and ask your local adviser for an assessment. We are not recommending construction work or a watering dose."
      : report?.value === "dry"
        ? "You said the surface looks dry. Check the last watering and water in the soil before changing watering. Appearance does not determine the amount of water."
        : report?.value === "moist"
          ? "You said the bed looks moist. Check the last watering and watch for standing water after rain. Do not change watering based on appearance alone."
          : "Look at the bed and tell us how it looks. Then check the last watering and water in the soil. It’s okay if you don’t know. Ask for help before deciding on watering.";
  const latest = farm.records.at(-1);
  const nextCrop = farm.nextCycles[0];
  const cyclesNeedReview =
    farm.cyclesContextRevision !== null &&
    farm.cyclesContextRevision !== farm.revision;
  async function observe() {
    if (!observation) return;
    setError("");
    try {
      await changeFarm({
        type: "observe",
        value: observation,
        id: crypto.randomUUID(),
        at: new Date().toISOString(),
      });
      setObservation(null);
    } catch {
      setError("Could not save. Try again.");
    }
  }
  async function toggle(id: "watering" | "water") {
    setError("");
    try {
      await changeFarm({ type: "check", id, at: new Date().toISOString() });
    } catch {
      setError("Could not save. Try again.");
    }
  }
  return (
    <AppFrame>
      <section className="home-greeting">
        <div>
          <p>
            {now
              ? new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  timeZone: AREA.timezone,
                }).format(now)
              : "Your day, your garden bed"}
          </p>
          <h1>
            Today in
            <br />
            your garden<span>.</span>
          </h1>
        </div>
        <span className="sun-stamp">
          <Sun size={36} />
        </span>
      </section>
      <VoiceActions
        text={`${daily} To choose what to grow next in the same bed, open Plan next crops.`}
        onCall={() => setPanel("call")}
      />
      <Link href="/my-plan#next-crops" className="support-row">
        <span className="support-icon">
          <Sprout size={25} />
        </span>
        <span>
          <strong>Plan next crops</strong>
          <small>Choose with pictures and climate</small>
        </span>
        <ChevronRight size={21} />
      </Link>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}

      <section className="home-today" aria-labelledby="today-heading">
        <div className="section-title">
          <h2 id="today-heading">What to do today</h2>
          <span className="task-count">
            {farm.needsReview ? "Check" : `${completed} of 3`}
          </span>
        </div>
        <div className="today-card">
          <button className="today-crop" onClick={() => setPanel("crop")}>
            {farm.currentCrop ? (
              <CropArt crop={farm.currentCrop} />
            ) : (
              <span className="unknown-crop-art">
                <Sprout size={29} />
              </span>
            )}
            <span>
              {farm.currentCrop ?? "Which crop?"}
              <small>
                {farm.needsReview ? "Check crop" : "My garden bed"}
              </small>
            </span>
            <ChevronRight size={20} />
          </button>
          {farm.needsReview ? (
            <div className="review-block">
              <Sprout size={37} />
              <h3>Has the crop changed?</h3>
              <p>Let’s check before continuing.</p>
              <Button onClick={() => setPanel("crop")}>
                Check crop <ArrowRight size={20} />
              </Button>
            </div>
          ) : (
            <>
              <div className="daily-step">
                <span className={`daily-step-number ${observed ? "done" : ""}`}>
                  {observed ? <Check size={17} /> : "1"}
                </span>
                <div>
                  <h3>Look at the bed</h3>
                  <p>How does it look today?</p>
                </div>
              </div>
              <div
                className="bed-options"
                role="group"
                aria-label="How does the bed look?"
              >
                {(Object.entries(bedLabels) as [BedValue, string][]).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      disabled={!ready || busy}
                      aria-pressed={report?.value === value}
                      data-pending={
                        value === "unknown" && report?.value === value
                      }
                      onClick={() => {
                        setObservation(value);
                        setError("");
                      }}
                    >
                      <SoilArt value={value} />
                      <strong>{label}</strong>
                      {report?.value === value && value !== "unknown" && (
                        <span className="bed-selected">
                          <Check size={11} />
                        </span>
                      )}
                    </button>
                  ),
                )}
              </div>
              {report && (
                <p className="observation-note" role="status">
                  {report.value === "unknown"
                    ? "That’s okay. It still needs checking."
                    : `You reported: ${bedLabels[report.value].toLowerCase()}.`}
                </p>
              )}
              <div className="daily-step later-step">
                <span
                  className={`daily-step-number ${checks.includes("watering") ? "done" : ""}`}
                >
                  {checks.includes("watering") ? <Check size={17} /> : "2"}
                </span>
                <div>
                  <h3>
                    {puddles ? "Check the puddles" : "Check the last watering"}
                  </h3>
                  <p>
                    {puddles
                      ? "Is water still standing?"
                      : "See what you recorded."}
                  </p>
                  <div className="daily-controls">
                    {puddles ? (
                      <button onClick={() => setPanel("water")}>
                        How to check <ChevronRight size={16} />
                      </button>
                    ) : (
                      <Link href="/my-area#history">
                        View records <ChevronRight size={16} />
                      </Link>
                    )}
                    <button
                      className="check-task"
                      aria-pressed={checks.includes("watering")}
                      disabled={!ready || busy}
                      onClick={() => void toggle("watering")}
                    >
                      <span>
                        {checks.includes("watering") && <Check size={12} />}
                      </span>
                      {checks.includes("watering") ? "Checked" : "Already checked"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="daily-step later-step">
                <span
                  className={`daily-step-number ${checks.includes("water") ? "done" : ""}`}
                >
                  {checks.includes("water") ? <Check size={17} /> : "3"}
                </span>
                <div>
                  <h3>{puddles ? "Ask for help" : "Check the water"}</h3>
                  <p>
                    {puddles
                      ? "Ask for a bed assessment."
                      : "Before changing watering."}
                  </p>
                  <div className="daily-controls">
                    <button onClick={() => setPanel("water")}>
                      {puddles ? "View guidance" : "How to check"}{" "}
                      <ChevronRight size={16} />
                    </button>
                    <button
                      className="check-task"
                      aria-pressed={checks.includes("water")}
                      disabled={!ready || busy}
                      onClick={() => void toggle("water")}
                    >
                      <span>
                        {checks.includes("water") && <Check size={12} />}
                      </span>
                      {checks.includes("water") ? "Checked" : "Already checked"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <ListenButton
            text={daily}
            label="Listen to steps"
            className="listen-inline"
          />
          <div className="today-record">
            <button
              className="support-row"
              disabled={!ready}
              onClick={() => setPanel("record")}
            >
              <ActivityArt action="Planted" />
              <span>
                <strong>What I did today</strong>
                <small>Planted, watered or harvested</small>
              </span>
              <ChevronRight size={21} />
            </button>
            {latest && (
              <p className="latest-home-note">
                <Check size={15} /> {latest.action} · {latest.crop} ·{" "}
                {shortDate(latest.date)}
              </p>
            )}
          </div>
        </div>
        {error && !observation && (
          <p className="notice" role="status">
            {error}
          </p>
        )}
      </section>

      <ForecastPreview />

      <section className="next-cycle">
        <div className="section-title">
          <h2>Next cycle</h2>
          <Leaf size={18} />
        </div>
        <div className="next-cycle-card">
          <span className="eyebrow">THINK ABOUT WHAT COMES NEXT</span>
          <h3>
            {farm.needsReview
              ? "Let’s review the path"
              : nextCrop
                ? "Your saved crops"
                : "What comes next?"}
          </h3>
          <div className="cycle-strip">
            <div>
              {farm.currentCrop ? (
                <CropArt crop={farm.currentCrop} />
              ) : (
                <span className="future-art">
                  <Sprout size={36} />
                  <CircleHelp size={18} />
                </span>
              )}
              <strong>{farm.currentCrop ?? "Crop"}</strong>
              <small>
                {farm.needsReview
                  ? "Check"
                  : farm.currentCrop
                    ? "Now"
                    : "To check"}
              </small>
            </div>
            <ArrowRight size={23} />
            <div>
              {nextCrop ? (
                <CropArt crop={nextCrop} />
              ) : (
                <span className="future-art">
                  <Sprout size={37} />
                  <CircleHelp size={18} />
                </span>
              )}
              <strong>{nextCrop ?? "Next"}</strong>
              <small>
                {nextCrop
                  ? cyclesNeedReview
                    ? "Check"
                    : cycleMonthLabel(farm.nextCycleMonths[0])
                  : "Choose"}
              </small>
            </div>
          </div>
          <p className="next-cycle-note">
            {nextCrop
              ? farm.nextCycles
                  .map(
                    (crop, i) =>
                      `${crop} · ${cycleMonthLabel(farm.nextCycleMonths[i])}`,
                  )
                  .join("; ")
              : "Choose what to grow next in the same bed."}
          </p>
          <Link
            href="/my-plan#next-crops"
            className="button button-primary"
          >
            {nextCrop ? "Review crops" : "Plan next crops"}
            <ArrowRight size={20} />
          </Link>
          <ListenButton
            text={`Plan the next crops for the same bed. ${nextCrop ? `You saved: ${farm.nextCycles.map((crop, i) => `${crop}, ${cycleMonthLabel(farm.nextCycleMonths[i])}`).join("; then ")}. ${cyclesNeedReview ? "The context has changed. Check the sequence." : ""}` : "Choose using pictures."} In My plan, tap the crop’s badge to understand NASA climate history and the available forecast. Check the bed history, soil and water before planting too. Save rotation saves an intention on this device. Near planting time, prepare the task within your plan.`}
            label="Listen"
            className="listen-inline"
          />
        </div>
      </section>

      <section className="home-support">
        <div className="section-title">
          <h2>Your follow-up</h2>
        </div>
        <Link href="/my-plan" className="support-row">
          <span className="support-icon">
            <CalendarDays size={25} />
          </span>
          <span>
            <strong>My plan</strong>
            <small>
              {saved
                ? `${saved.crop} · ${shortDate(saved.date)}`
                : farm.nextCycles.length
                  ? "Saved crops and months"
                  : "Crops and tasks to choose"}
            </small>
          </span>
          <ChevronRight size={21} />
        </Link>
      </section>

      {panel === "crop" && <CurrentCropSheet onClose={() => setPanel(null)} />}
      {panel === "record" && <RecordSheet onClose={() => setPanel(null)} />}
      {panel === "call" && <CallSheet onClose={() => setPanel(null)} />}
      {panel === "water" && (
        <Sheet
          title={puddles ? "Standing water" : "Before watering"}
          onClose={() => setPanel(null)}
        >
          <div className="water-guide-art">
            <SoilArt value={puddles ? "puddles" : "moist"} />
            <Droplets size={34} />
          </div>
          <ol className="plain-steps">
            {(puddles
              ? [
                  "Check whether the puddles remain.",
                  "Ask for a bed assessment.",
                ]
              : [
                  "Check the last watering.",
                  "Check soil water using your area’s method.",
                  "If unsure, ask for guidance.",
                ]
            ).map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
          <ListenButton text={daily} />
          <p className="sheet-note">
            {puddles
              ? "Opening this screen does not confirm that you asked for help."
              : "Appearance and the forecast do not tell you how much to water."}
          </p>
          <Button variant="secondary" onClick={() => setPanel(null)}>
            Back
          </Button>
        </Sheet>
      )}
      {observation && (
        <Sheet title="Is this what you saw?" onClose={() => setObservation(null)}>
          <div className="large-crop">
            <SoilArt value={observation} />
            <h3>{bedLabels[observation]}</h3>
          </div>
          <ListenButton
            text={`You are reporting that the bed is ${observation === "unknown" ? "of an appearance you cannot describe" : bedLabels[observation].toLowerCase()}. This is an observation of appearance, not a water measurement. Confirm to save or go back to correct.`}
          />
          <Button onClick={() => void observe()} disabled={busy || !ready}>
            {busy ? "Saving…" : "Yes, save"}
            <Check size={20} />
          </Button>
          <Button variant="quiet" onClick={() => setObservation(null)}>
            Correct
          </Button>
          {error && (
            <p className="notice" role="status">
              {error}
            </p>
          )}
        </Sheet>
      )}
    </AppFrame>
  );
}
