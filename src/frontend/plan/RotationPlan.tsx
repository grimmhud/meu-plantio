"use client";
import { useEffect, useState } from "react";
import { useFarm } from "@/frontend/state/FarmProvider";
import { Button } from "@/frontend/ui/Button";
import { CurrentCropSheet } from "@/frontend/journey/CommonSheets";
import { NextCycles } from "@/frontend/area/NextCycles";
import { CropClimateBadge } from "@/frontend/area/CropClimateBadge";
import { nasaCrops } from "@/shared/nasa-crops";
import type { ClimateData } from "@/shared/crop-climate";
import { buildRotationStages } from "@/shared/rotation-predictions";
import { localDate, type Crop } from "@/shared/planning";
import { RotationTimeline, RotationHeading } from "./RotationTimeline";
import styles from "./plan-path.module.css";

export function RotationPlan({
  onPrepare,
}: {
  onPrepare: (crop: Crop) => void;
}) {
  const { farm, forecast, ready, busy, changeFarm, now } = useFarm();
  const [panel, setPanel] = useState<"crop" | "cycles" | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loadingClimate, setLoadingClimate] = useState(true);
  const [climate, setClimate] = useState<ClimateData | null>(null);
  const needsReview =
    farm.cyclesContextRevision !== null &&
    farm.cyclesContextRevision !== farm.revision;
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
      .catch(() => {
        if (active) setClimate(null);
      })
      .finally(() => {
        if (active) setLoadingClimate(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const realStages = buildRotationStages(farm, {
    climate,
    forecast,
    now,
    loading: loadingClimate,
  });
  return (
    <section id="next-crops" className="path-section">
      <RotationHeading
        disabled={!ready || busy}
        hasCycles={farm.nextCycles.length > 0}
        onEdit={() => {
          setFeedback("");
          setPanel("cycles");
        }}
      />
      {!ready ? (
        <p role="status">Opening your rotation…</p>
      ) : (
        <>
          {(farm.needsReview || needsReview) && (
            <p className="notice" role="status">
              The bed has changed. Check your rotation; your choices have been preserved.
            </p>
          )}
          <RotationTimeline
            stages={realStages}
            renderCardAction={(stage, index) => {
              if (stage.current) return null;
              const crop = nasaCrops.find((c) => c.name === stage.crop)!;
              return (
                <CropClimateBadge
                  inCard
                  crop={crop}
                  data={climate}
                  month={farm.nextCycleMonths[index - 1] ?? null}
                  forecast={index === 1 ? forecast : null}
                />
              );
            }}
            renderActions={(stage, index) => {
              if (stage.current)
                return (
                  <Button
                    variant="quiet"
                    className={styles.stageButton}
                    onClick={() => setPanel("crop")}
                  >
                    {farm.needsReview
                      ? "Check crop"
                      : farm.currentCrop
                        ? "Change crop"
                        : "Set current crop"}
                  </Button>
                );
              const crop = nasaCrops.find((c) => c.name === stage.crop)!;
              const month = farm.nextCycleMonths[index - 1] ?? null;
              const canPrepare =
                index === 1 &&
                month === Number(localDate().slice(5, 7)) &&
                ["Lettuce", "Carrot", "Tomato"].includes(crop.name);
              return (
                <>
                  {canPrepare && (
                    <Button
                      variant="secondary"
                      onClick={() => onPrepare(crop.name as Crop)}
                    >
                      Prepare planting
                    </Button>
                  )}
                </>
              );
            }}
          />
          <>
            {!farm.nextCycles.length && (
              <p>What to grow next in the same bed?</p>
            )}
            <p className="quiet-caption">
              Crops and months are intentions. Check soil, water and history before planting.
            </p>
          </>
        </>
      )}
      {feedback && (
        <p className="notice" role="status">
          {feedback}
        </p>
      )}
      {panel === "crop" && <CurrentCropSheet onClose={() => setPanel(null)} />}
      {panel === "cycles" && (
        <NextCycles
          currentCrop={farm.currentCrop}
          crops={farm.nextCycles}
          plannedMonths={farm.nextCycleMonths}
          forecast={forecast}
          needsReview={needsReview}
          onSave={async (crops, months) => {
            await changeFarm({ type: "next-cycles", crops, months });
            setFeedback("Rotation saved on this device.");
          }}
          onClose={() => setPanel(null)}
        />
      )}
    </section>
  );
}
