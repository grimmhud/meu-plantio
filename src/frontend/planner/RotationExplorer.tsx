"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, History } from "lucide-react";
import { CallSheet } from "@/frontend/journey/CommonSheets";
import { useFarm } from "@/frontend/state/FarmProvider";
import { VoiceActions } from "@/frontend/audio/VoiceActions";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { ActionGroup } from "@/frontend/ui/ActionGroup";
import { Button } from "@/frontend/ui/Button";
import { RotationSequence } from "@/frontend/ui/RotationSequence";
import { Sheet } from "@/frontend/ui/Sheet";
import { RotationEvidence } from "@/frontend/ui/RotationEvidence";
import { rotationQuestions, questionNarration } from "./rotation-mock";
import styles from "./rotation-explorer.module.css";

const paths = [
  {
    title: "Continue with vegetables",
    stages: ["Lettuce", "Carrot", "Tomato"] as const,
    note: "Alternate commercial crops. Check the history and conditions for each stage.",
  },
  {
    title: "Consider a cover crop",
    stages: ["Lettuce", "Cover crop to be decided", "Tomato"] as const,
    note: "Consider a cover crop stage. Species, duration and management goal still need assessment.",
  },
];

export function RotationExplorer() {
  const { farm } = useFarm();
  const [selected, setSelected] = useState(0);
  const [panel, setPanel] = useState<"call" | "review" | null>(null);
  const path = paths[selected];
  const spoken = `Let’s explore two rotation paths. This is an illustrative example, without an analysis calculated for your bed. ${path.title}. ${path.stages.join(", then ")}. ${rotationQuestions.map((question) => questionNarration(question, selected)).join(" ")} No path has been saved in your plan.`;

  return (
    <section id="rotation" aria-labelledby="rotation-title">
      <header className={styles.heading}>
        <span className="eyebrow">NEXT CYCLES</span>
        <h2 id="rotation-title">What to grow next?</h2>
        <p>Explore two paths, one step at a time.</p>
      </header>
      <VoiceActions text={spoken} onCall={() => setPanel("call")} />
      <p className={styles.example}>
        Illustrative example · no integrated analysis
      </p>

      <section className={styles.context} aria-label="Your context">
        <History size={23} aria-hidden="true" />
        <div>
          <strong>Your crop: {farm.currentCrop ?? "not provided"}</strong>
          <p>
            The examples below start with lettuce. They do not represent your history or change your plan.
          </p>
        </div>
      </section>

      <section aria-labelledby="paths-title">
        <h2 id="paths-title">Which path would you like to understand?</h2>
        <div
          className={styles.options}
          role="group"
          aria-label="Illustrative paths"
        >
          {paths.map((item, index) => (
            <Button
              key={item.title}
              variant={selected === index ? "primary" : "secondary"}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {selected === index && <Check size={20} aria-hidden="true" />}
              {item.title}
            </Button>
          ))}
        </div>
        <article className={styles.card} aria-labelledby="selected-path-title">
          <span className="eyebrow">PATH {selected + 1} · TO BE ASSESSED</span>
          <h3 id="selected-path-title">{path.title}</h3>
          <RotationSequence stages={path.stages} />
          <p>{path.note}</p>
        </article>
      </section>

      {rotationQuestions.map((question) => (
        <RotationEvidence
          key={question.id}
          {...question}
          id={`pergunta-${question.id}`}
          kind={question.id}
          {...question.examples[selected]}
          narration={questionNarration(question, selected)}
        />
      ))}
      <Link href="/my-area" className="button button-secondary">
        Check my area <ArrowRight size={19} />
      </Link>

      <ActionGroup>
        <Button onClick={() => setPanel("review")}>
          Check this path <ArrowRight size={20} />
        </Button>
        <a href="#task" className="button button-quiet">
          View the coming days’ weather
        </a>
      </ActionGroup>
      {panel === "call" && <CallSheet onClose={() => setPanel(null)} />}
      {panel === "review" && (
        <Sheet title="Before choosing" onClose={() => setPanel(null)}>
          <h3 className="confirm-title">{path.title}</h3>
          <RotationSequence stages={path.stages} />
          <p className="sheet-note">
            This path still needs assessment of history, soil and seasons. It has not been saved in My plan.
          </p>
          <ListenButton
            text={`${path.title}. This is an example. History, soil and seasons still need checking. No choice has been saved in your plan.`}
          />
          <ActionGroup>
            <Link href="/my-area" className="button button-primary">
              Check my area
            </Link>
            <Button variant="secondary" onClick={() => setPanel(null)}>
              Back to paths
            </Button>
            <Link href="/my-plan" className="button button-quiet">
              View my current plan
            </Link>
          </ActionGroup>
        </Sheet>
      )}
    </section>
  );
}
