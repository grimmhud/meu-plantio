import { Sprout } from "lucide-react";
import type { CycleCrop } from "@/shared/farm";
import { CropArt } from "./Illustration";
import { cycleMonthLabel } from "@/shared/cycle-months";
import styles from "@/frontend/plan/plan-path.module.css";

/** Visual sequence only. Its labels describe candidates, never execution. */
export function RotationSequence({
  stages,
  nextCycles = false,
  months = [],
}: {
  stages: readonly (CycleCrop | "Cover crop to be decided")[];
  nextCycles?: boolean;
  months?: readonly (number | null)[];
}) {
  return (
    <ol
      className={styles.timeline}
      aria-label={
        nextCycles ? "Saved next crops" : "Sequence under consideration"
      }
    >
      {stages.map((stage, index) => (
        <li key={`${index}-${stage}`} className={styles.stage}>
          <span className={styles.marker} aria-hidden="true" />
          <div className={styles.stageCard}>
            {stage === "Cover crop to be decided" ? (
              <Sprout size={38} aria-hidden="true" />
            ) : (
              <CropArt crop={stage} />
            )}
            <span className={styles.stageText}>
              <small>
                {nextCycles
                  ? `Next cycle ${index + 1}`
                  : `Stage ${index + 1}`}
              </small>
              <strong>{stage}</strong>
              {nextCycles && <span>{cycleMonthLabel(months[index])}</span>}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
