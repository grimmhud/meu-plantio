import type { CycleCrop } from "./farm";

export type RotationPoint = {
  kind:
    | "temperature"
    | "rain"
    | "water"
    | "soil"
    | "history"
    | "calendar"
    | "solar"
    | "wind";
  title: string;
  source: string;
  sourceUrl?: string;
  sourceDetail: string;
  evidence: string;
  impact: string;
  action: string;
  check: string;
};
export type RotationStage = {
  id: string;
  crop: CycleCrop | null;
  period: string;
  current?: boolean;
  points?: readonly RotationPoint[];
};
