"use client";
import { useFarm } from "@/frontend/state/FarmProvider";
import { getNotices } from "@/shared/notices";

export function useNotices() {
  const { forecast, now, planNeedsReview, farm, state, ready } = useFarm();
  return getNotices({
    forecast,
    now,
    needsReview: ready && planNeedsReview,
    farmNeedsReview: ready && farm.needsReview,
    unavailable: state === "error",
  });
}
