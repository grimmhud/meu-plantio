"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFarm } from "@/frontend/state/FarmProvider";
import { operations, shortDate } from "@/shared/planning";
import { VoiceActions } from "@/frontend/audio/VoiceActions";
import { CallSheet } from "@/frontend/journey/CommonSheets";
import { CropArt } from "@/frontend/ui/Illustration";
import { AppFrame } from "@/frontend/journey/AppFrame";
import { Button } from "@/frontend/ui/Button";
import { RotationPlan } from "./RotationPlan";
import Planner from "@/frontend/planner/Planner";
import { Sheet } from "@/frontend/ui/Sheet";
import {
  buildRotationStages,
  rotationPlanSpeech,
} from "@/shared/rotation-predictions";
import type { Crop } from "@/shared/planning";

export default function MyPlanScreen() {
  const { farm, saved, history, planNeedsReview, message } = useFarm();
  const [panel, setPanel] = useState<"operation" | "call" | null>(null);
  const [operationCrop, setOperationCrop] = useState<Crop | undefined>(
    undefined,
  );
  const summary = `${farm.currentCrop ? `You reported ${farm.currentCrop} as the current crop.` : "The current crop is missing."} ${farm.needsReview ? "You recorded new planting. Check the crop." : ""} ${saved ? `The next saved day is ${shortDate(saved.date)}, for ${operations[saved.operation]}, ${saved.crop}. ${planNeedsReview ? "This choice needs checking." : "Check conditions before planting."}` : "The planting day will be chosen near the time of the task."} Activities are in the bed history, in My area.`;
  return (
    <AppFrame>
      <section className="plan-heading">
        <span className="eyebrow">MY GARDEN BED</span>
        <h1>
          My plan<span>.</span>
        </h1>
        <p>What comes now and next.</p>
      </section>
      <VoiceActions
        text={`${rotationPlanSpeech(buildRotationStages(farm))} ${summary}`}
        onCall={() => setPanel("call")}
      />
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}

      <RotationPlan
        onPrepare={(crop) => {
          setOperationCrop(crop);
          setPanel("operation");
        }}
      />

      <>
        {saved && (
          <details id="task" className="record-history">
            <summary>
              Saved day · {saved.crop} · {shortDate(saved.date)}{" "}
              <ChevronDown size={17} />
            </summary>
            <p>
              {operations[saved.operation]} · {shortDate(saved.date)}. Saved intention, not completed planting.
            </p>
            <p>
              {planNeedsReview
                ? "The context or weather has changed. Check before starting."
                : "Check the bed, water and seedlings or seeds before starting."}
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setOperationCrop(undefined);
                setPanel("operation");
              }}
            >
              Review day
            </Button>
          </details>
        )}

        {history.length > 0 && (
          <details className="record-history decisions-history">
            <summary>
              Days I saved <ChevronDown size={17} />
            </summary>
            <ol>
              {[...history].reverse().map((plan, index) => (
                <li key={`${plan.id}-${index}`}>
                  <CropArt crop={plan.crop} />
                  <div>
                    <strong>
                      {plan.crop} · {shortDate(plan.date)}
                    </strong>
                    <span>{operations[plan.operation]}</span>
                    <small>
                      {plan.id === saved?.id
                        ? "Current choice"
                        : "Previous choice"}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          </details>
        )}
      </>

      {panel === "call" && <CallSheet onClose={() => setPanel(null)} />}
      {panel === "operation" && (
        <Sheet title="Prepare planting" onClose={() => setPanel(null)}>
          <Planner initialCrop={operationCrop} onDone={() => setPanel(null)} />
        </Sheet>
      )}
    </AppFrame>
  );
}
