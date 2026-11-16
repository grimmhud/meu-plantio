import { Phone } from "lucide-react";
import { ListenButton } from "./ListenButton";
import { Button } from "@/frontend/ui/Button";

type VoiceActionsProps = {
  text: string;
  onCall: () => void;
};

/** Paired voice access: a working spoken summary and a contextual call entry. */
export function VoiceActions({ text, onCall }: VoiceActionsProps) {
  return (
    <div className="voice-actions">
      <ListenButton label="Listen" text={text} className="voice-action-listen" />
      <Button
        variant="secondary"
        className="voice-action-call"
        onClick={onCall}
      >
        <Phone size={22} aria-hidden="true" /> Call
      </Button>
    </div>
  );
}
