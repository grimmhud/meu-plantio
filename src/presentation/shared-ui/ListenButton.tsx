"use client";

import { useNarration } from "./useNarration";

type ListenButtonProps = {
  text: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
};

/** Uses the same supplied text for every replay; never plays on mount. */
export function ListenButton({
  text,
  label = "Listen",
  className,
  iconOnly = false,
}: ListenButtonProps) {
  const { speak, stop, speaking, error } = useNarration();
  return (
    <div className="narration-control">
      <button
        type="button"
        className={className ?? "listen-button"}
        aria-pressed={speaking}
        aria-label={speaking ? "Stop audio" : label}
        title={speaking ? "Stop audio" : label}
        onClick={() => (speaking ? stop() : speak(text))}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {speaking ? (
            <path d="M8 6h3v12H8zM15 6h3v12h-3z" />
          ) : (
            <>
              <path d="m11 5-6 4H2v6h3l6 4V5Z" />
              <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
            </>
          )}
        </svg>
        {!iconOnly && <span>{speaking ? "Stop audio" : label}</span>}
      </button>
      {error && (
        <p className="audio-error" role="status">
          {error}
        </p>
      )}
    </div>
  );
}
