import { get, set, setMany } from "idb-keyval";
import { storageKeys } from "@/shared/storage-scope";
import {
  ForecastSchema,
  PlanSchema,
  type Forecast,
  type SavedPlan,
} from "@/shared/planning";
export async function readPlan(demoMode = false): Promise<SavedPlan | null> {
  const result = PlanSchema.safeParse(await get(storageKeys(demoMode).plan));
  return result.success ? result.data : null;
}
export async function writePlan(plan: SavedPlan, demoMode = false) {
  const keys = storageKeys(demoMode);
  const valid = PlanSchema.parse(plan);
  const history = await readPlanHistory(demoMode);
  // Both keys commit in one IndexedDB transaction: an unsuccessful save must not
  // leave a phantom choice in the visible history.
  await setMany([
    [keys.history, [...history, valid]],
    [keys.plan, valid],
  ]);
}
export async function readForecast(demoMode = false): Promise<Forecast | null> {
  const result = ForecastSchema.safeParse(
    await get(storageKeys(demoMode).forecast),
  );
  return result.success ? result.data : null;
}
export async function writeForecast(forecast: Forecast, demoMode = false) {
  await set(storageKeys(demoMode).forecast, ForecastSchema.parse(forecast));
}
export async function readPlanHistory(demoMode = false): Promise<SavedPlan[]> {
  const stored = await get(storageKeys(demoMode).history);
  if (!Array.isArray(stored)) return [];
  return stored.flatMap((item) => {
    const parsed = PlanSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}

export async function seedDemoPlans(plans: SavedPlan[]): Promise<boolean> {
  if (!plans.length) return false;
  const keys = storageKeys(true);
  const marker = "agroloop:demo:plans-seeded:v1";
  const existing = await Promise.all([
    get(keys.plan),
    get(keys.history),
    get(marker),
  ]);
  if (existing.some((value) => value !== undefined)) return false;
  const valid = plans.map((plan) => PlanSchema.parse(plan));
  await setMany([
    [keys.history, valid],
    [keys.plan, valid[valid.length - 1]],
    [marker, true],
  ]);
  return true;
}
