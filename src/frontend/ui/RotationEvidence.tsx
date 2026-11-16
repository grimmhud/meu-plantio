import {
  CloudRain,
  History,
  Satellite,
  Sprout,
  Sun,
  Thermometer,
} from "lucide-react";
import { ListenButton } from "@/frontend/audio/ListenButton";
import styles from "./rotation-evidence.module.css";

type Props = {
  id: string;
  kind: "climate" | "history" | "soil";
  title: string;
  source: string;
  intro: string;
  input: string;
  sources: string;
  limit: string;
  message: string;
  action: string;
  followUp: string;
  narration: string;
};

/** Apresentação apenas: os exemplos não consultam fontes nem alteram o plano. */
export function RotationEvidence(props: Props) {
  const Icon =
    props.kind === "climate"
      ? Satellite
      : props.kind === "history"
        ? History
        : Sprout;
  return (
    <section
      id={props.id}
      className={`${styles.card} ${props.kind === "climate" ? styles.climate : ""}`}
      aria-labelledby={`${props.id}-title`}
    >
      <span className={styles.source}>
        <Icon size={24} aria-hidden="true" />
        {props.source}
      </span>
      <h2 id={`${props.id}-title`}>{props.title}</h2>
      <p>{props.intro}</p>
      {props.kind === "climate" && (
        <div className={styles.weather}>
          <span>
            <CloudRain aria-hidden="true" />
            Rain
          </span>
          <span>
            <Thermometer aria-hidden="true" />
            Heat and cold
          </span>
          <span>
            <Sun aria-hidden="true" />
            Sun
          </span>
        </div>
      )}
      <div className={styles.answer}>
        <span className="eyebrow">EXAMPLE EXPLANATION</span>
        <p>{props.message}</p>
        <strong>Next step</strong>
        <p>{props.action}</p>
      </div>
      <ListenButton
        label={`Listen to ${props.kind}`}
        text={props.narration}
      />
      <details className={styles.details}>
        <summary>Data used in the example</summary>
        <p>{props.input}</p>
        <strong>Sources for analysis</strong>
        <p>{props.sources}</p>
        <strong>What still needs checking</strong>
        <p>{props.limit}</p>
        <strong>How to follow up</strong>
        <p>{props.followUp}</p>
      </details>
    </section>
  );
}
