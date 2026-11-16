import type { ReactNode } from "react";
import {
  CalendarDays,
  ChevronDown,
  Droplets,
  FlaskConical,
  History,
  CloudRain,
  ThermometerSun,
  Pencil,
  Sun,
  Wind,
} from "lucide-react";
import type { RotationStage, RotationPoint } from "@/shared/rotation-scenario";
import { CropArt } from "@/frontend/ui/Illustration";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { Button } from "@/frontend/ui/Button";
import styles from "./plan-path.module.css";

const icons = {
  temperature: ThermometerSun,
  rain: CloudRain,
  water: Droplets,
  soil: FlaskConical,
  history: History,
  calendar: CalendarDays,
  solar: Sun,
  wind: Wind,
};

export function RotationHeading({
  onEdit,
  disabled = false,
  hasCycles = true,
}: {
  onEdit: () => void;
  disabled?: boolean;
  hasCycles?: boolean;
}) {
  return (
    <div className="section-title">
      <h2>Your rotation</h2>
      <Button
        variant="secondary"
        className={styles.headingAction}
        disabled={disabled}
        onClick={onEdit}
        aria-label={hasCycles ? "Edit rotation" : "Plan rotation"}
      >
        <Pencil size={17} aria-hidden="true" />{" "}
        {hasCycles ? "Edit" : "Plan"}
      </Button>
    </div>
  );
}

const sourceLabels = {
  temperature: "Temperature",
  rain: "Rain",
  water: "Water",
  soil: "Soil",
  history: "Succession",
  calendar: "Calendar",
  solar: "Solar radiation",
  wind: "Forecast",
};

function PredictionPoint({ point }: { point: RotationPoint }) {
  const Icon = icons[point.kind];
  const climate = ["temperature", "rain", "water", "solar", "wind"].includes(
    point.kind,
  );
  return (
    <details
      className={`${styles.issue} ${climate ? styles.climateIssue : styles.soilIssue}`}
    >
      <summary className={styles.issueSummary}>
        <span className={styles.issueIcon}>
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className={styles.issueHeading}>
          <strong>{point.title}</strong>
          <small>{sourceLabels[point.kind]}</small>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <div className={styles.issueBody}>
        <p>{point.evidence}</p>
        <p>
          <strong>In the plan:</strong> {point.impact}
        </p>
        <p>
          <strong>Next step:</strong> {point.action}
        </p>
        <p>
          <strong>How to check:</strong> {point.check}
        </p>
        <ListenButton
          label="Listen to explanation"
          className="listen-inline"
          text={`${point.title}. ${point.evidence} ${point.impact} Next step: ${point.action} How to check: ${point.check} Source: ${point.source}. ${point.sourceDetail}`}
        />
        <p className={styles.issueLimit}>
          {point.sourceUrl ? (
            <a href={point.sourceUrl} target="_blank" rel="noreferrer">
              {point.source}
            </a>
          ) : point.source}
        </p>
        <p className={styles.issueLimit}>{point.sourceDetail}</p>
      </div>
    </details>
  );
}

/** One timeline using the producer's crops, months and contextual points. */
export function RotationTimeline({
  stages,
  renderActions,
  renderCardAction,
}: {
  stages: readonly RotationStage[];
  renderCardAction?: (stage: RotationStage, index: number) => ReactNode;
  renderActions?: (stage: RotationStage, index: number) => ReactNode;
}) {
  return (
    <ol className={styles.timeline} aria-label="My bed’s rotation">
      {stages.map((stage, index) => (
        <li key={stage.id} className={styles.stage}>
          <span
            className={`${styles.marker} ${stage.current ? styles.currentMarker : ""}`}
            aria-hidden="true"
          />
          <div className={styles.stageCard} data-rotation-card={stage.id}>
            {stage.crop ? (
              <CropArt crop={stage.crop} />
            ) : (
              <span className={styles.unknownCrop} aria-hidden="true">
                ?
              </span>
            )}
            <span className={styles.stageText}>
              <small>
                {stage.current ? "In the bed" : `Next crop ${index}`}
              </small>
              <strong>{stage.crop ?? "Crop not provided"}</strong>
              <span>{stage.period}</span>
            </span>
            {renderCardAction?.(stage, index)}
          </div>
          {stage.points?.length ? (
            <div className={styles.stageSupport}>
              <ul
                className={styles.issues}
                aria-label={`Points for ${stage.crop}`}
              >
                {stage.points.map((point) => (
                  <li key={point.title}>
                    <PredictionPoint point={point} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {renderActions && (
            <div className={styles.stageSupport}>
              {renderActions(stage, index)}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
