"use client";
import { CropClimateBadge } from "./CropClimateBadge";
import type { Forecast } from "@/shared/planning";
import type { ClimateData } from "@/shared/crop-climate";
import { useEffect, useState } from "react";
import { CropBedArt } from "@/frontend/ui/CropBedArt";
import { CropArt } from "@/frontend/ui/Illustration";
import { Button } from "@/frontend/ui/Button";
import { ActionGroup } from "@/frontend/ui/ActionGroup";
import { Sheet } from "@/frontend/ui/Sheet";
import { nasaCrops } from "@/shared/nasa-crops";
import { cycleMonthNames, cycleMonthLabel } from "@/shared/cycle-months";
import type { CycleCrop } from "@/shared/farm";
import styles from "./next-cycles.module.css";
export function NextCycles({
  currentCrop,
  crops,
  plannedMonths = [],
  onSave,
  onClose,
  needsReview = false,
  forecast = null,
}: {
  currentCrop: string | null;
  crops: CycleCrop[];
  plannedMonths?: (number | null)[];
  onSave: (crops: CycleCrop[], months: (number | null)[]) => Promise<void>;
  onClose: () => void;
  needsReview?: boolean;
  forecast?: Forecast | null;
}) {
  const [draft, setDraft] = useState<(CycleCrop | "")[]>([
    crops[0] ?? "",
    crops[1] ?? "",
    crops[2] ?? "",
  ]);
  const [climate, setClimate] = useState<ClimateData | null>(null);
  const [months, setMonths] = useState<(number | null)[]>([
    plannedMonths[0] ?? null,
    plannedMonths[1] ?? null,
    plannedMonths[2] ?? null,
  ]);

  useEffect(() => {
    let active = true;
    fetch("/api/nasa?series=2021-2025-v2", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((d) => {
        if (active) setClimate(d);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  const [choosing, setChoosing] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function save() {
    setSaving(true);
    setError("");
    try {
      await onSave(
        draft.filter((c): c is CycleCrop => c !== ""),
        months.filter((_, i) => draft[i] !== ""),
      );
      onClose();
    } catch {
      setError("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }
  const narration = `Next cycles for the same bed. Now: ${currentCrop ?? "crop not provided"}. ${draft.map((crop, i) => `Next cycle ${i + 1}: ${crop || "to be chosen"}, ${cycleMonthLabel(months[i])}.`).join(" ")} Tap Choose crop or Change to see the pictures. Tap the badge to view NASA climate history, the available forecast, its limits and the next check. The badge assesses temperature only; the selection mark only indicates your choice. The month is saved as your intention. It does not define a day, year or crop duration. Save rotation saves your intention on this device; it does not record planting. Check soil, water, history and dates before starting. ${needsReview ? "The bed details have changed. Check the sequence." : ""}`;
  return (
    <Sheet title="Plan rotation" narration={narration} onClose={onClose}>
      <ol className={styles.timeline}>
        <li className={styles.current}>
          <span className="eyebrow">NOW</span>
          <CropBedArt
            crop={
              nasaCrops.some((c) => c.name === currentCrop)
                ? (currentCrop as CycleCrop)
                : null
            }
          />
          <strong>{currentCrop ?? "Crop not provided"}</strong>
          <small>
            {currentCrop ? "Reported current crop" : "Check in My area"}
          </small>
        </li>
        {draft.map((crop, i) => (
          <li key={i}>
            <span className="eyebrow">NEXT CYCLE {i + 1}</span>
            <CropBedArt crop={crop || null} />
            <strong>{crop || "What comes next?"}</strong>
            <small>
              {crop ? "Crop intention" : "Not chosen yet"}
            </small>
            {(crop || choosing === i) && (
              <label className={styles.epoch}>
                Planned month
                <select
                  aria-label={`Month for cycle ${i + 1}`}
                  value={months[i] ?? ""}
                  onChange={(e) =>
                    setMonths(
                      months.map((m, j) =>
                        j === i ? Number(e.target.value) || null : m,
                      ),
                    )
                  }
                >
                  <option value="">Month to be decided</option>
                  {cycleMonthNames.map((m, j) => (
                    <option key={m} value={j + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <Button
              variant="secondary"
              disabled={i > 0 && !draft[i - 1]}
              aria-expanded={choosing === i}
              onClick={() => setChoosing(choosing === i ? null : i)}
            >
              {crop ? "Change" : "Choose crop"}
            </Button>
            {choosing === i && (
              <>
                <div
                  className={styles.choices}
                  role="group"
                  aria-label={`Crop for next cycle ${i + 1}`}
                >
                  {nasaCrops.map((c) => (
                    <div key={c.name} className={styles.choice}>
                      <button
                        type="button"
                        aria-pressed={crop === c.name}
                        onClick={() => {
                          const next = [...draft];
                          next[i] = c.name;
                          setDraft(next);
                          setChoosing(null);
                        }}
                      >
                        <CropArt crop={c.name} />
                        <span>
                          {crop === c.name && (
                            <span aria-hidden="true">✓ </span>
                          )}
                          {c.name}
                        </span>
                      </button>
                      <CropClimateBadge
                        crop={c}
                        data={climate}
                        month={months[i]}
                        forecast={i === 0 ? forecast : null}
                      />
                    </div>
                  ))}
                  <Button
                    variant="quiet"
                    onClick={() => {
                      setDraft(draft.map((c, j) => (j >= i ? "" : c)));
                      setMonths(months.map((m, j) => (j >= i ? null : m)));
                      setChoosing(null);
                    }}
                  >
                    Decide later
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
      {needsReview && (
        <p className="notice">
          The bed details have changed. Check the sequence before saving.
        </p>
      )}
      {error && <p role="alert">{error}</p>}
      <ActionGroup>
        <Button onClick={() => void save()} disabled={saving}>
          {saving ? "Saving…" : "Save rotation"}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Back
        </Button>
      </ActionGroup>
    </Sheet>
  );
}
