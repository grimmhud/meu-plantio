"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const NARRATION_EVENT = "agroloop:narration-start";
let currentOwner: string | null = null;

/** Small, browser-owned speech adapter. Call speak only after a user action. */
export function useNarration() {
  const owner = useId();
  const [available, setAvailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generation = useRef(0);
  const alive = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Retain the utterance: some browser engines lose callbacks otherwise.
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const stop = useCallback(() => {
    generation.current += 1;
    clearTimer();
    if (typeof window !== "undefined" && currentOwner === owner) {
      currentOwner = null;
      window.speechSynthesis?.cancel();
    }
    utteranceRef.current = null;
    if (alive.current) setSpeaking(false);
  }, [clearTimer, owner]);

  useEffect(() => {
    alive.current = true;
    setAvailable(
      "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    );
    const onOtherNarration = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== owner) stop();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    window.addEventListener(NARRATION_EVENT, onOtherNarration);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      alive.current = false;
      stop();
      window.removeEventListener(NARRATION_EVENT, onOtherNarration);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [owner, stop]);

  const speak = useCallback(
    (text: string) => {
      stop();
      setError(null);
      if (
        !("speechSynthesis" in window) ||
        !("SpeechSynthesisUtterance" in window)
      ) {
        setError("Audio unavailable in this browser.");
        return;
      }
      const content = text.trim();
      if (!content) return;
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const voice =
        voices.find((v) => /^en[-_]US$/i.test(v.lang) && v.localService) ??
        voices.find((v) => /^en[-_]US$/i.test(v.lang)) ??
        voices.find((v) => /^en(?:[-_]|$)/i.test(v.lang));
      // Queue short chunks to avoid long-utterance stalls on some mobile engines.
      const words = content.split(/\s+/);
      const chunks: string[] = [];
      for (const word of words) {
        const last = chunks.length - 1;
        if (last >= 0 && chunks[last].length + word.length < 220)
          chunks[last] += ` ${word}`;
        else chunks.push(word);
      }
      window.dispatchEvent(new CustomEvent(NARRATION_EVENT, { detail: owner }));
      currentOwner = owner;
      const activeGeneration = generation.current;
      const isCurrent = () =>
        alive.current &&
        generation.current === activeGeneration &&
        currentOwner === owner;
      const fail = () => {
        if (!isCurrent()) return;
        stop();
        setError("Could not play audio. Try again.");
      };
      let index = 0;
      const next = () => {
        if (!isCurrent()) return;
        if (index >= chunks.length) {
          clearTimer();
          currentOwner = null;
          utteranceRef.current = null;
          setSpeaking(false);
          return;
        }
        const utterance = new SpeechSynthesisUtterance(chunks[index++]);
        utteranceRef.current = utterance;
        utterance.lang = "en-US";
        if (voice) utterance.voice = voice;
        utterance.rate = 0.9;
        utterance.onstart = () => {
          if (!isCurrent()) return;
          clearTimer();
          setSpeaking(true);
        };
        utterance.onend = () => {
          if (!isCurrent()) return;
          clearTimer();
          next();
        };
        utterance.onerror = (event) => {
          if (!isCurrent()) return;
          if (event.error === "canceled" || event.error === "interrupted")
            stop();
          else fail();
        };
        clearTimer();
        timer.current = setTimeout(fail, 12_000);
        try {
          synth.resume();
          synth.speak(utterance);
        } catch {
          fail();
        }
      };
      setSpeaking(true);
      next();
    },
    [clearTimer, owner, stop],
  );

  return { speak, stop, speaking, available, error };
}
