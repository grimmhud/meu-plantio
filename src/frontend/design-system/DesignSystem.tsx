"use client";

import { NasaSuggestions } from "@/frontend/planner/NasaSuggestions";
import { NextCycles } from "@/frontend/area/NextCycles";
import {
  RotationTimeline,
  RotationHeading,
} from "@/frontend/plan/RotationTimeline";
import type { ClimateData } from "@/shared/crop-climate";
import { buildRotationStages } from "@/shared/rotation-predictions";
import { cycleMonthLabel } from "@/shared/cycle-months";
import { CropClimateBadge } from "@/frontend/area/CropClimateBadge";
import { nasaCrops } from "@/shared/nasa-crops";
import { DataSources } from "@/frontend/ui/DataSources";
import { ExplainButton } from "@/frontend/ui/ExplainButton";
import { DemoNotice } from "@/frontend/ui/DemoNotice";
import { CropHistory } from "@/frontend/area/CropHistory";
import { emptyFarm } from "@/shared/farm";
import { addExampleHistory } from "@/shared/example-farm";
import Link from "next/link";
import { Brand, BrandWordmark } from "@/frontend/ui/Brand";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Check, CircleHelp, Leaf } from "lucide-react";
import { Button } from "@/frontend/ui/Button";
import { ActionGroup } from "@/frontend/ui/ActionGroup";
import { HeaderActions } from "@/frontend/journey/HeaderActions";
import { NoticeCard } from "@/frontend/notifications/NoticeCard";
import { AppNavigation } from "@/frontend/journey/AppNavigation";
import { CropBedArt } from "@/frontend/ui/CropBedArt";
import { RotationEvidence } from "@/frontend/ui/RotationEvidence";
import {
  rotationQuestions,
  questionNarration,
} from "@/frontend/planner/rotation-mock";
import { RotationSequence } from "@/frontend/ui/RotationSequence";
import { Sheet } from "@/frontend/ui/Sheet";
import {
  ActivityArt,
  CropArt,
  GardenArt,
  SoilArt,
  WeatherArt,
} from "@/frontend/ui/Illustration";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { VoiceActions } from "@/frontend/audio/VoiceActions";
import { CallSheet } from "@/frontend/journey/CommonSheets";
import { bedLabels, type BedValue } from "@/shared/farm";
import { weatherLabels, type Crop, type WeatherKind } from "@/shared/planning";
import styles from "./design-system.module.css";

const sections = [
  ["brand", "Brand"],
  ["principles", "Principles"],
  ["colors", "Colors"],
  ["typography", "Typography"],
  ["dimensions", "Dimensions"],
  ["buttons", "Buttons and audio"],
  ["illustrations", "Illustrations"],
  ["sequence", "Crop sequence"],
  ["path", "My path"],
  ["evidence", "Climate, history and soil"],
  ["interaction", "Selection and confirmation"],
  ["states", "States"],
  ["usage", "How to use"],
] as const;
const colors = [
  ["page", "Background"],
  ["surface", "Surface"],
  ["ink", "Text"],
  ["muted", "Secondary text"],
  ["brand", "Primary action"],
  ["brand-dark", "Action on hover"],
  ["brand-soft", "Secondary action"],
  ["lime", "Highlight"],
  ["border", "Border"],
  ["weather", "Weather background"],
  ["weather-border", "Weather border"],
  ["weather-ink", "Weather text"],
] as const;
const beds: BedValue[] = ["dry", "moist", "puddles", "unknown"];
const crops: Crop[] = ["Lettuce", "Carrot", "Tomato"];
const weather: WeatherKind[] = ["sun", "cloud", "rain", "storm", "unknown"];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

export function DesignSystem() {
  // Playground state belongs only to this catalog. It never writes to FarmProvider or storage.
  const [selection, setSelection] = useState<BedValue | null>(null);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [callOpen, setCallOpen] = useState(false);
  function reset() {
    setSelection(null);
    setFeedback("");
  }

  return (
    <div className={styles.catalog}>
      <a className={styles.skip} href="#content">
        Skip to content
      </a>
      <header className={styles.header}>
        <Brand />
        <Link href="/app" className={styles.back}>
          <ArrowLeft size={18} aria-hidden="true" /> Open app
        </Link>
      </header>
      <div className={styles.layout}>
        <nav className={styles.nav} aria-label="Design system sections">
          <p>DESIGN SYSTEM</p>
          {sections.map(([id, label], index) => (
            <a href={`#${id}`} key={id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
        <main id="content" className={styles.main}>
          <Section id="brand" title="meu plantio · the l becomes a tree">
            <BrandWordmark />
            <p>
              The l in plantio gains a leafy crown, with its stem forming the trunk. The other letters keep the same font and baseline.
            </p>
            <p>
              A lowercase wordmark, using the green and typography tokens. The app symbol combines a sprout with the layers of a garden bed.
            </p>
            <img
              src="/brands/meu-plantio.svg"
              width={80}
              height={80}
              alt="Meu plantio symbol: a sprout over a garden bed"
            />
            <p>
              A standalone symbol, used beside the name and as the installation icon. The leaf represents the crop; the bed represents the area being monitored.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
              }}
            >
              {[24, 40, 64].map((size) => (
                <img
                  key={size}
                  src="/brands/meu-plantio.svg"
                  width={size}
                  height={size}
                  alt={`Symbol at ${size} pixels`}
                />
              ))}
            </div>
          </Section>
          <CropClimateBadge crop={nasaCrops[0]} data={null} month={null} />
          <section>
            <h2>Source credits</h2>
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
                  description: "Example forecast attribution.",
                  href: "https://open-meteo.com/",
                },
              ]}
            >
              <p>
                Isolated example. Sources are configured by the screen; no lookup or bed changes are made.
              </p>
            </DataSources>
          </section>
          <section>
            <h2>Tap for an explanation</h2>
            <ExplainButton
              title="Estimated water use"
              text="Estimated water use by the crop. This is not an amount to water."
            />
          </section>
          <CropHistory
            farm={addExampleHistory(
              emptyFarm,
              new Date("2026-11-15T15:00:00Z"),
            )}
            onEdit={() => {}}
            onRemove={() => {}}
          />
          <CyclesDemo />
          <NasaSuggestions catalog />
          <div className={styles.hero}>
            <div>
              <p className={styles.kicker}>MEU PLANTIO · LIVING REFERENCE</p>
              <h1>
                One way
                <br />
                to care for the interface<span className="heading-dot">.</span>
              </h1>
              <p>
                Colors, illustrations and components to keep every screen in the same family.
              </p>
            </div>
            <div className={styles.heroArt}>
              <GardenArt />
            </div>
          </div>

          <Section
            id="principles"
            title="Simple to use. Consistent to build."
          >
            <div className={styles.rules}>
              <article>
                <span>01</span>
                <h3>Show and tell</h3>
                <p>
                  Illustrations with short labels. Tap for audio, with text available.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>One decision at a time</h3>
                <p>
                  One question per block, a clear action and a way to go back or correct.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Confirm clearly</h3>
                <p>
                  Color, icon and word together. Separate intention, report and observed result.
                </p>
              </article>
            </div>
            <p className={styles.note}>
              Home V1 is the visual reference. Readability and comprehension still need validation with farmers.
            </p>
          </Section>

          <Section id="colors" title="Colors with a purpose">
            <p>
              Samples use the app’s tokens directly. When a token changes, the sample follows.
            </p>
            <div className={styles.palette}>
              {colors.map(([token, label]) => (
                <figure className={styles.swatch} key={token}>
                  <div style={{ backgroundColor: `var(--color-${token})` }} />
                  <figcaption>
                    <strong>{label}</strong>
                    <code>--color-{token}</code>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className={styles.note}>
              Deep green for actions; ochre for weather information. Color alone never indicates selection, a pending item or confirmation.
            </p>
          </Section>

          <Section id="typography" title="Text that is easy to read">
            <div className={styles.typeSamples}>
              <div>
                <code>--font-display</code>
                <p className={styles.displaySample}>Your next crop</p>
                <span>Trebuchet MS · headings and highlights</span>
              </div>
              <div>
                <code>--font-body</code>
                <p className={styles.bodySample}>
                  Check the bed before choosing a day.
                </p>
                <span>Arial · guidance text at 16–17 px</span>
              </div>
            </div>
            <p className={styles.note}>
              System fonts, with no required download. Technical details go in Learn more or Data sources.
            </p>
          </Section>

          <Section id="dimensions" title="Room to tap and breathe">
            <div className={styles.twoColumns}>
              <div className={styles.panel}>
                <h3>Spacing</h3>
                <div className={styles.spacing}>
                  {[1, 2, 3, 4, 5, 6, 8].map((step) => (
                    <div key={step}>
                      <code>--space-{step}</code>
                      <span style={{ width: `var(--space-${step})` }} />
                      <small>{step * 4} px</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.panel}>
                <h3>Shape and touch</h3>
                <div className={styles.radii}>
                  {[
                    ["sm", "12"],
                    ["button", "16"],
                    ["card", "22"],
                  ].map(([token, value]) => (
                    <div
                      key={token}
                      style={{ borderRadius: `var(--radius-${token})` }}
                    >
                      <code>--radius-{token}</code>
                      <span>{value} px</span>
                    </div>
                  ))}
                </div>
                <p>
                  Primary actions: at least 56 px. Icons: 48 px. Help: 44 px.
                </p>
              </div>
            </div>
            <p className={styles.note}>
              App screens: maximum width of 480 px, without horizontal scrolling. This catalog uses more desktop space to compare examples.
            </p>
          </Section>

          <Section id="buttons" title="One main action, few words">
            <div className={styles.panel}>
              <h3>Spaced actions · ActionGroup</h3>
              <ActionGroup>
                <Button
                  onClick={() =>
                    setFeedback("Example record, without saving.")
                  }
                >
                  Record activity
                </Button>
                <Button
                  variant="quiet"
                  onClick={() => setFeedback("Example access to the plan.")}
                >
                  View my plan
                </Button>
              </ActionGroup>
              <p>12 px between actions; details and deletion stay collapsed.</p>
              <h3>Navigation · My area</h3>
              <p>
                My area is in the bottom bar. The header does not repeat the bed name banner.
              </p>
              <AppNavigation pathname="/my-area" preview />
              <h3>Notification bell · HeaderActions</h3>
              <p>The bell has no caption. A dot appears when there are notifications to check; the accessible name includes their count.</p>
              <HeaderActions count={0} onPreview={() => setFeedback("Example with no notifications.")} />
              <HeaderActions
                count={1}
                onPreview={() =>
                  setFeedback(
                    "Example access to the notice list, without changing your follow-up.",
                  )
                }
              />
              <h3>List item · NoticeCard</h3>
              <NoticeCard
                notice={{
                  id: "catalog-review",
                  kind: "review",
                  title: "Check your plan",
                  summary: "Example pending follow-up item.",
                  detail:
                    "Check the context before continuing. Opening the notice does not complete the task.",
                  reference: "Isolated example · no data from your area",
                  href: "/my-plan",
                  action: "View my plan",
                }}
                onPreview={() =>
                  setFeedback(
                    "Example access to the plan, without navigating or saving.",
                  )
                }
              />
            </div>
            <p>
              Real components: Button, ListenButton and VoiceActions. Try the controls; examples do not change your plan.
            </p>
            <div className={styles.twoColumns}>
              <div className={styles.panel}>
                <h3>Action hierarchy</h3>
                <div className={styles.stack}>
                  <Button onClick={() => setOpen(true)}>Confirm</Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      reset();
                      setFeedback(
                        "Example reset. Choose an appearance below.",
                      );
                    }}
                  >
                    Change
                  </Button>
                  <Button variant="quiet" onClick={reset}>
                    Back
                  </Button>
                  <Button disabled>Save day</Button>
                </div>
                <p className={styles.note}>
                  Primary · secondary · quiet · disabled. Visible focus when navigating with Tab.
                </p>
              </div>
              <div className={styles.panel}>
                <h3>Listen or request a conversation</h3>
                <p>
                  In Notifications, use this same pair just after the title, followed by the list. Compact AppFrame omits the area banner and signature footer.
                </p>
                <VoiceActions
                  text="This summary explains what to monitor in the garden. Calling is not available yet."
                  onCall={() => setCallOpen(true)}
                />
                <p className={styles.note}>
                  Listen reads the summary. Call opens the actual calling status; it does not start a call.
                </p>
              </div>
              <div className={styles.panel}>
                <h3>Listen, stop and try again</h3>
                <div className={styles.stack}>
                  <ListenButton text="In Meu plantio, each block has one question. Use pictures, short words and audio. Confirm your choice and keep a way to go back." />
                  <ListenButton
                    className="listen-inline"
                    label="Listen to explanation"
                    text="This is the inline audio button. Playback starts only when you tap. Tap again to stop."
                  />
                </div>
                <p className={styles.note}>
                  Browser speech synthesis, without autoplay. Errors appear next to the control. Audio is not guaranteed to work offline.
                </p>
                <button
                  className="icon-button help-button"
                  aria-label="Help with examples"
                  onClick={() => {
                    setFeedback(
                      "The controls on this page let you check the interface. No report or plan is saved.",
                    );
                  }}
                >
                  <CircleHelp size={24} aria-hidden="true" />
                </button>
              </div>
            </div>
            <p role="status" className={styles.feedback}>
              {feedback}
            </p>
          </Section>
          {callOpen && <CallSheet onClose={() => setCallOpen(false)} />}

          <Section id="illustrations" title="Pictures that go with words">
            <p>
              Illustration.tsx · shared vectors, decorative for screen readers. The label communicates the meaning.
            </p>
            <h3 className={styles.subheading}>Crops · CropArt</h3>
            <div className={styles.artGrid}>
              {crops.map((crop) => (
                <figure key={crop}>
                  <CropArt crop={crop} />
                  <figcaption>{crop}</figcaption>
                </figure>
              ))}
            </div>
            <h3 className={styles.subheading}>Weather · WeatherArt</h3>
            <div className={styles.artGrid}>
              {weather.map((kind) => (
                <figure key={kind}>
                  <WeatherArt kind={kind} />
                  <figcaption>{weatherLabels[kind]}</figcaption>
                </figure>
              ))}
            </div>
            <h3 className={styles.subheading}>
              Activity reports · ActivityArt
            </h3>
            <div className={styles.artGrid}>
              {(["Planted", "Watered", "Harvested"] as const).map((action) => (
                <figure key={action}>
                  <ActivityArt action={action} />
                  <figcaption>{action}</figcaption>
                </figure>
              ))}
            </div>
            <h3 className={styles.subheading}>
              Crop in the bed · CropBedArt
            </h3>
            <div className={styles.gardens}>
              {crops.map((crop) => (
                <figure key={crop}>
                  <CropBedArt crop={crop} />
                  <figcaption>{crop}</figcaption>
                </figure>
              ))}
              <figure>
                <CropBedArt crop={null} />
                <figcaption>Unknown crop</figcaption>
              </figure>
            </div>
            <p>
              Illustration of the reported crop, without representing quantity, growth or health.
            </p>
            <h3 className={styles.subheading}>Garden bed · GardenArt</h3>
            <div className={styles.gardens}>
              <figure>
                <GardenArt />
                <figcaption>With plants</figcaption>
              </figure>
              <figure>
                <GardenArt sow />
                <figcaption>Sowing</figcaption>
              </figure>
            </div>
          </Section>

          <Section id="sequence" title="Crop sequence under consideration">
            <p>
              Isolated example, without a saved choice. Numbered stages show order; dates, execution and suitability are not assumed.
            </p>
            <RotationSequence stages={["Lettuce", "Carrot", "Tomato"]} />
            <RotationSequence
              stages={["Lettuce", "Cover crop to be decided", "Tomato"]}
            />
          </Section>

          <Section id="path" title="Rotation and points for the coming months">
            <p>
              Real My plan component: the thermometer button sits inside the crop card and opens the existing climate panel. Point subtitles show only the topic; named sources and details appear at the end of the expanded explanation. Isolated data, without saving.
            </p>
            <RotationSourcesDemo />
          </Section>

          <Section
            id="evidence"
            title="Three questions to explore a rotation"
          >
            <p>
              RotationEvidence: the same illustrative data, text and audio as the screen. Examples are isolated from the bed, without saving choices. Details connect input, source, explanation and follow-up.
            </p>
            {rotationQuestions.map((question) => (
              <RotationEvidence
                key={question.id}
                {...question}
                id={`catalogo-${question.id}`}
                kind={question.id}
                {...question.examples[0]}
                narration={questionNarration(question, 0)}
              />
            ))}
          </Section>

          <Section id="interaction" title="Choose, check, confirm">
            <p>
              Interactive example using the app’s selection styles and Sheet panel. No bed data is changed.
            </p>
            <div className={styles.phonePreview}>
              <h3>How does the bed look?</h3>
              <div
                className="bed-options"
                role="group"
                aria-label="Bed appearance, example"
              >
                {beds.map((value) => (
                  <button
                    key={value}
                    aria-pressed={selection === value}
                    data-pending={
                      selection === value && value === "unknown"
                        ? "true"
                        : undefined
                    }
                    onClick={() => {
                      setSelection(value);
                      setFeedback("");
                    }}
                  >
                    <SoilArt value={value} />
                    <strong>{bedLabels[value]}</strong>
                    {selection === value && value !== "unknown" ? (
                      <span className="bed-selected">
                        <Check aria-hidden="true" />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
              <p className={styles.selection} aria-live="polite">
                {selection
                  ? selection === "unknown"
                    ? "I don’t know: the observation stays pending."
                    : `Example choice: ${bedLabels[selection]}. Check before confirming.`
                  : "Tap an appearance to try it out."}
              </p>
              <Button disabled={!selection} onClick={() => setOpen(true)}>
                Check choice
              </Button>
            </div>
            <p className={styles.note}>
              Reported appearance does not measure moisture or define a watering dose. I don’t know keeps the item pending, without a completion mark.
            </p>
          </Section>

          <Section id="states" title="Show what we know — and what is missing">
            <h3>Preview demonstration</h3>
            <DemoNotice />
            <p>
              Display samples, without current weather conditions or agronomic results.
            </p>
            <div className={styles.twoColumns}>
              <div className={styles.panel}>
                <h3>Missing information</h3>
                <p>Current crop not provided yet.</p>
                <p className={styles.note}>
                  Ask for the information; do not assume lettuce or invent history.
                </p>
              </div>
              <div className={styles.panel}>
                <h3>Pending items and review</h3>
                <div className="notice">
                  <strong>Check the forecast</strong>
                  <p>
                    The forecast has expired. Update it before choosing another day.
                  </p>
                </div>
                <p className={styles.note}>
                  Preserve the previous intention and indicate what needs review.
                </p>
              </div>
              <div className={styles.panel}>
                <h3>Failure or unavailability</h3>
                <div className="notice">
                  <strong>Calling unavailable</strong>
                  <p>No call has been made.</p>
                </div>
                <p className={styles.note}>
                  Only confirm external actions after they have happened.
                </p>
              </div>
              <div className={styles.panel}>
                <h3>Explicit confirmation</h3>
                <p>
                  <Check size={20} aria-hidden="true" /> Reported check.
                </p>
                <p className={styles.note}>
                  Already checked does not record watering. An intention does not record planting. Benefits require measurement.
                </p>
              </div>
            </div>
          </Section>

          <Section id="usage" title="Before creating a screen">
            <ol className={styles.checklist}>
              <li>
                Consult this page, docs/design-system.md, docs/content.md and the relevant product definition section.
              </li>
              <li>
                Reuse tokens.css, Button, Sheet, ListenButton and the illustrations. Use AppFrame, BottomNav and CommonSheets in the app context.
              </li>
              <li>
                Keep crop, forecast and plan data in FarmProvider. This catalog’s examples are isolated and do not persist.
              </li>
              <li>
                When creating or changing a shared pattern, update the component, this catalog and the documentation in the same change.
              </li>
              <li>
                Check mobile, keyboard, focus, contrast, text and pending states before finishing.
              </li>
            </ol>
            <div className={styles.routes}>
              <Link href="/app">
                Home <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/my-plan">
                Plan rotation <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/my-plan">
                My plan <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </Section>
          <footer className={styles.footer}>
            <Leaf size={18} aria-hidden="true" /> Meu plantio · shared design system
          </footer>
        </main>
      </div>
      {open ? (
        <Sheet title="Check example" onClose={() => setOpen(false)}>
          <div className="record-confirm">
            {selection ? (
              <SoilArt value={selection} />
            ) : (
              <CropArt crop="Lettuce" />
            )}
          </div>
          <h3 className="confirm-title">
            {selection ? bedLabels[selection] : "Visual confirmation"}
          </h3>
          <p className="sheet-note">
            {selection === "unknown"
              ? "I don’t know keeps the observation pending. This example does not save reports."
              : "This panel demonstrates confirmation. No data from your bed will be changed."}
          </p>
          <ListenButton
            text={
              selection === "unknown"
                ? "You chose I don’t know. The observation stays pending. This example does not save data."
                : "Check the picture and choice before confirming. This is a design system sample and does not change your bed."
            }
          />
          <Button
            onClick={() => {
              setOpen(false);
              setFeedback(
                selection === "unknown"
                  ? "Example checked. The observation stays pending."
                  : "Example confirmed. No bed data was changed.",
              );
            }}
          >
            Confirm example
          </Button>
          <Button variant="quiet" onClick={() => setOpen(false)}>
            Back
          </Button>
        </Sheet>
      ) : null}
    </div>
  );
}

function CyclesDemo() {
  const [months, setMonths] = useState<(number | null)[]>([11, 2]);
  const [open, setOpen] = useState(false);
  const [crops, setCrops] = useState<import("@/shared/farm").CycleCrop[]>([
    "Onion",
    "Green bean",
  ]);
  return (
    <>
      <RotationHeading
        onEdit={() => setOpen(true)}
        hasCycles={crops.length > 0}
      />
      <RotationTimeline
        stages={[
          {
            id: "current",
            crop: "Lettuce",
            period: "Reported current crop",
            current: true,
          },
          ...crops.map((crop, i) => ({
            id: `next-${i}`,
            crop,
            period: cycleMonthLabel(months[i]),
          })),
        ]}
      />
      <p>
        Isolated example: saving updates only this card, without persistence. The current crop appears in the illustrated bed when opening the editor.
      </p>
      {open && (
        <NextCycles
          currentCrop="Lettuce"
          crops={crops}
          plannedMonths={months}
          onSave={async (next, nextMonths) => {
            setCrops(next);
            setMonths(nextMonths);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function RotationSourcesDemo() {
  const [climate, setClimate] = useState<ClimateData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch("/api/nasa?series=2021-2025-v2", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((data) => {
        if (active) setClimate(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const farm = {
    currentCrop: "Lettuce" as const,
    needsReview: false,
    nextCycles: [
      "Tomato",
      "Green bean",
      "Onion",
    ] as import("@/shared/farm").CycleCrop[],
    nextCycleMonths: [12, 3, 8],
  };
  return (
    <RotationTimeline
      stages={buildRotationStages(farm, { climate, loading })}
      renderCardAction={(stage, index) => {
        if (stage.current) return null;
        const crop = nasaCrops.find((c) => c.name === stage.crop)!;
        return (
          <CropClimateBadge
            inCard
            crop={crop}
            data={climate}
            month={farm.nextCycleMonths[index - 1]}
          />
        );
      }}
    />
  );
}
