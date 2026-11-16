import Link from "next/link";
import { ChevronDown, FlaskConical, ThermometerSun } from "lucide-react";
import type { PathIssue } from "@/shared/plan-path-example";
import type { Crop } from "@/shared/planning";
import { shortDate } from "@/shared/planning";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { CropArt } from "@/frontend/ui/Illustration";
import { Button } from "@/frontend/ui/Button";
import styles from "./plan-path.module.css";

export type PlanPathStage = {
  crop: Crop;
  operation: string;
  date: string | null;
};

export function PlanPathDisplay({
  currentCrop,
  next,
  issues = [],
  example = false,
  onClearExample,
}: {
  currentCrop: Crop | null;
  next: PlanPathStage | null;
  issues?: readonly PathIssue[];
  example?: boolean;
  onClearExample?: () => void;
}) {
  return (
    <div className={styles.path}>
      {example && (
        <div className={styles.exampleLabel}>
          <span>Example · outside your plan</span>
          {onClearExample && (
            <Button
              variant="quiet"
              className={styles.exampleRemove}
              onClick={onClearExample}
            >
              Remove
            </Button>
          )}
        </div>
      )}
      <ol className={styles.timeline}>
        <li className={styles.stage}>
          <span className={`${styles.marker} ${styles.currentMarker}`} />
          <div className={styles.stageCard}>
            {currentCrop ? (
              <CropArt crop={currentCrop} />
            ) : (
              <span className={styles.unknownCrop} aria-hidden="true">?</span>
            )}
            <span className={styles.stageText}>
              <small>Now</small>
              <strong>{currentCrop ?? "Crop not provided"}</strong>
              <span>{currentCrop ? "Current crop" : "Needs checking"}</span>
            </span>
          </div>
        </li>
        {issues.length > 0 && (
          <li className={`${styles.stage} ${styles.issueStage}`}>
            <span className={`${styles.marker} ${styles.alertMarker}`} />
            <ul className={styles.issues} aria-label="Points to review">
              {issues.map((issue) => (
                <li key={issue.id}>
                  <details
                    className={`${styles.issue} ${issue.id === "climate-window" ? styles.climateIssue : styles.soilIssue}`}
                  >
                    <summary className={styles.issueSummary}>
                      <span className={styles.issueIcon} aria-hidden="true">
                        {issue.id === "climate-window" ? (
                          <ThermometerSun size={20} />
                        ) : (
                          <FlaskConical size={20} />
                        )}
                      </span>
                      <span className={styles.issueHeading}>
                        <strong>{issue.title}</strong>
                        <small>{issue.source}</small>
                      </span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <div className={styles.issueBody}>
                      <p>{issue.message}</p>
                      <p className={styles.issueLimit}>{issue.limit}</p>
                      <div className={styles.actions}>
                        <Link className="button button-quiet" href={issue.href}>
                          {issue.action}
                        </Link>
                        <ListenButton
                          text={`${issue.title}. ${issue.message} ${issue.limit} Next step: ${issue.action}.`}
                          label="Listen"
                          className="listen-inline"
                        />
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </li>
        )}
        <li className={styles.stage}>
          <span className={styles.marker} />
          <div className={styles.stageCard}>
            {next ? (
              <CropArt crop={next.crop} />
            ) : (
              <span className={styles.unknownCrop} aria-hidden="true">…</span>
            )}
            <span className={styles.stageText}>
              <small>Planned task</small>
              <strong>{next?.crop ?? "No task with a day"}</strong>
              <span>
                {next
                  ? `${next.operation}${next.date ? ` · ${shortDate(next.date)}` : "· date to be decided"}`
                  : "In planning, choose the task and day"}
              </span>
            </span>
          </div>
        </li>
      </ol>
    </div>
  );
}
