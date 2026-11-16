"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { get, update } from "idb-keyval";
import { createDemoFarm, createDemoPlans } from "@/shared/demo-farm";
import { storageKeys } from "@/shared/storage-scope";
import {
  ForecastSchema,
  type Forecast,
  type SavedPlan,
} from "@/shared/planning";
import {
  applyFarmChange,
  emptyFarm,
  FarmSchema,
  needsPlanReview,
  type Farm,
  type FarmChange,
} from "@/shared/farm";
import { planPathExample } from "@/shared/plan-path-example";
import {
  readForecast,
  readPlan,
  readPlanHistory,
  writeForecast,
  writePlan,
  seedDemoPlans,
} from "@/frontend/storage/planning";

type Status = "loading" | "live" | "saved" | "error";
type FarmContextValue = {
  demoMode: boolean;
  farm: Farm;
  saved: SavedPlan | null;
  history: SavedPlan[];
  forecast: Forecast | null;
  state: Status;
  now: Date | null;
  ready: boolean;
  busy: boolean;
  message: string;
  setMessage: (value: string) => void;
  loadForecast: () => Promise<Forecast | null>;
  changeFarm: (change: FarmChange) => Promise<void>;
  saveIntention: (plan: SavedPlan) => Promise<void>;
  planNeedsReview: boolean;
};
const FarmContext = createContext<FarmContextValue | null>(null);
export function FarmProvider({
  children,
  demoMode = false,
}: {
  children: ReactNode;
  demoMode?: boolean;
}) {
  const farmKey = storageKeys(demoMode).farm;
  const [farm, setFarm] = useState<Farm>(emptyFarm);
  const [saved, setSaved] = useState<SavedPlan | null>(null);
  const [history, setHistory] = useState<SavedPlan[]>([]);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [state, setState] = useState<Status>("loading");
  const [now, setNow] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const requestId = useRef(0);
  const loadForecast = useCallback(async () => {
    const request = ++requestId.current;
    setState("loading");
    try {
      const response = await fetch("/api/forecast", {
        cache: "no-store",
        signal: AbortSignal.timeout(18_000),
      });
      if (!response.ok) throw new Error("unavailable");
      const result = ForecastSchema.parse(await response.json());
      if (request !== requestId.current) return null;
      setForecast(result);
      setState("live");
      setNow(new Date());
      try {
        await writeForecast(result, demoMode);
      } catch {
        /* Still available in memory. */
      }
      return result;
    } catch {
      if (request !== requestId.current) return null;
      let cached: Forecast | null = null;
      try {
        cached = await readForecast(demoMode);
      } catch {
        /* Network state remains visible. */
      }
      if (request !== requestId.current) return null;
      setForecast(cached);
      setState(cached ? "saved" : "error");
      setNow(new Date());
      return cached;
    }
  }, [demoMode]);
  useEffect(() => {
    let alive = true;
    const initialForecast = loadForecast();
    Promise.allSettled([
      get(farmKey),
      readPlan(demoMode),
      readPlanHistory(demoMode),
    ]).then(async (results) => {
      if (!alive) return;
      try {
        const [storedFarm, storedPlan, storedHistory] = results;
        let restoredFarm: Farm | null = null;
        if (storedFarm.status === "fulfilled") {
          let farmValue = storedFarm.value;
          if (demoMode && farmValue === undefined) {
            // Atomic first-open initialization; reopening preserves edits and deletions.
            await update<unknown>(farmKey, (previous) =>
              previous === undefined ? createDemoFarm(new Date()) : previous,
            );
            farmValue = await get(farmKey);
            if (!alive) return;
          }
          const parsed = FarmSchema.safeParse(farmValue);
          if (parsed.success) {
            const restored = parsed.data;
            const shouldRefreshExample =
              restored.examplePath &&
              restored.examplePath.revision < planPathExample.revision;
            const next = shouldRefreshExample
              ? { ...restored, examplePath: planPathExample }
              : restored;
            setFarm(next);
            restoredFarm = next;
            if (shouldRefreshExample) {
              void update<Farm>(farmKey, (previous) => {
                const current = FarmSchema.safeParse(previous);
                return current.success
                  ? { ...current.data, examplePath: planPathExample }
                  : (previous as Farm);
              }).catch(() => undefined);
            }
          }
        }
        if (storedPlan.status === "fulfilled") setSaved(storedPlan.value);
        if (storedHistory.status === "fulfilled")
          setHistory(storedHistory.value);
        if (results.some((result) => result.status === "rejected"))
          setMessage("We could not open all your records.");
        if (demoMode && restoredFarm) {
          const actualForecast = await initialForecast;
          if (!alive) return;
          const plans = createDemoPlans(
            restoredFarm,
            actualForecast,
            new Date(),
          );
          const seeded = await seedDemoPlans(plans);
          if (!alive) return;
          if (seeded) {
            setSaved(plans[plans.length - 1]);
            setHistory(plans);
          }
        }
      } catch {
        if (alive) setMessage("We could not open all your records.");
      } finally {
        if (alive) setReady(true);
      }
    });
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 60_000);
    return () => {
      alive = false;
      requestId.current++;
      clearInterval(timer);
    };
  }, [loadForecast, demoMode, farmKey]);

  const changeFarm = useCallback(
    async (change: FarmChange) => {
      if (!ready) throw new Error("Wait for the records to open.");
      setBusy(true);
      setMessage("");
      try {
        let next: Farm | null = null;
        await update<Farm>(farmKey, (previous) => {
          const parsed = FarmSchema.safeParse(previous);
          next = FarmSchema.parse(
            applyFarmChange(parsed.success ? parsed.data : emptyFarm, change),
          );
          return next;
        });
        if (next) setFarm(next);
      } finally {
        setBusy(false);
      }
    },
    [ready, farmKey],
  );
  const saveIntention = useCallback(
    async (plan: SavedPlan) => {
      if (!ready) throw new Error("Wait for the records to open.");
      await writePlan(plan, demoMode);
      setSaved(plan);
      setHistory((previous) => [...previous, plan]);
    },
    [ready, demoMode],
  );
  const planNeedsReview = now
    ? needsPlanReview(saved, farm, forecast, now)
    : false;
  return (
    <FarmContext.Provider
      value={{
        demoMode,
        farm,
        saved,
        history,
        forecast,
        state,
        now,
        ready,
        busy,
        message,
        setMessage,
        loadForecast,
        changeFarm,
        saveIntention,
        planNeedsReview,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}
export function useFarm() {
  const value = useContext(FarmContext);
  if (!value) throw new Error("FarmProvider missing");
  return value;
}
