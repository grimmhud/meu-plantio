import { z } from "zod";
import { CropSchema } from "./crops";
import { readActionLabel, readCropLabel, readLegacyExampleArea } from "./legacy-language";
import { addExampleHistory } from "./example-farm";
import { PlanPathExampleSchema, planPathExample } from "./plan-path-example";
import {
  AREA,
  isFresh,
  localDate,
  type Forecast,
  type SavedPlan,
} from "./planning";

export { CropSchema } from "./crops";
export const BedValueSchema = z.enum(["dry", "moist", "puddles", "unknown"]);
export type BedValue = z.infer<typeof BedValueSchema>;
export const bedLabels: Record<BedValue, string> = {
  dry: "Dry",
  moist: "Moist",
  puddles: "Puddles",
  unknown: "I don’t know",
};
export const FieldRecordSchema = z.object({
  id: z.string(),
  areaId: z.literal(AREA.id),
  action: z.preprocess(readActionLabel, z.enum(["Planted", "Watered", "Harvested"])),
  crop: CropSchema,
  date: z.iso.date(),
  reportedAt: z.iso.datetime(),
});
export type FieldRecord = z.infer<typeof FieldRecordSchema>;
export const AreaDetailsSchema = z.object({
  name: z.string().trim().min(1).max(60),
  size: z.string().trim().max(40),
  water: z.string().trim().max(300),
  soil: z.string().trim().max(300),
  updatedAt: z.iso.datetime(),
});
export type AreaDetails = z.infer<typeof AreaDetailsSchema>;
const ObservationSchema = z.object({
  crop: CropSchema.nullable().optional(),
  id: z.string(),
  value: BedValueSchema,
  at: z.iso.datetime(),
  revision: z.number().int().nonnegative(),
});
export const CycleCropSchema = z.preprocess(readCropLabel, z.enum(["Lettuce", "Carrot", "Tomato", "Onion", "Green bean"]));
export const NextCyclesSchema = z.array(CycleCropSchema).max(3);
export const CycleMonthsSchema = z.array(z.number().int().min(1).max(12).nullable()).max(3);
export type CycleCrop = z.infer<typeof CycleCropSchema>;
export const FarmSchema = z.preprocess(readLegacyExampleArea, z.object({
  version: z.literal(1),
  revision: z.number().int().nonnegative(),
  nextCycles: NextCyclesSchema.default([]),
  nextCycleMonths: CycleMonthsSchema.default([]),
  cyclesContextRevision: z.number().int().nonnegative().nullable().default(null),
  currentCrop: CropSchema.nullable(),
  cropCheckedAt: z.iso.datetime().nullable(),
  needsReview: z.boolean(),
  report: z
    .object({
      crop: CropSchema.nullable().optional(),
      id: z.string(),
      value: BedValueSchema,
      at: z.iso.datetime(),
      revision: z.number().int().nonnegative(),
    })
    .nullable(),
  checks: z.object({
    date: z.string(),
    reportId: z.string().nullable(),
    ids: z.array(z.enum(["watering", "water"])),
  }),
  checkHistory: z.array(z.object({date:z.iso.date(),crop:CropSchema.nullable(),reportId:z.string().nullable(),ids:z.array(z.enum(["watering","water"])),at:z.iso.datetime(),example:z.boolean().optional()})).default([]),
  records: z.array(FieldRecordSchema),
  area: AreaDetailsSchema.nullable().default(null),
  observations: z.array(ObservationSchema).default([]),
  exampleLoadedAt: z.iso.datetime().nullable().default(null),
  exampleHistoryVersion: z.number().int().nonnegative().default(0),
  examplePath: PlanPathExampleSchema.nullable().default(null),
}));
export type Farm = z.infer<typeof FarmSchema>;
export const emptyFarm: Farm = {
  version: 1,
  revision: 0,
  nextCycles: [],
  nextCycleMonths: [],
  cyclesContextRevision: null,
  currentCrop: null,
  cropCheckedAt: null,
  needsReview: false,
  report: null,
  checks: { date: "", reportId: null, ids: [] },
  checkHistory: [],
  records: [],
  area: null,
  observations: [],
  exampleLoadedAt: null,
  exampleHistoryVersion: 0,
  examplePath: null,
};
export type FarmChange =
  | { type: "next-cycles"; crops: CycleCrop[]; months?: (number | null)[] }
  | { type: "crop"; crop: Farm["currentCrop"]; at: string }
  | { type: "observe"; value: BedValue; id: string; at: string }
  | { type: "check"; id: "watering" | "water"; at: string }
  | { type: "record"; record: FieldRecord }
  | { type: "area"; area: AreaDetails | null }
  | { type: "edit-record"; record: FieldRecord }
  | { type: "delete-record"; id: string }
  | { type: "delete-observation"; id: string }
  | { type: "load-example"; at: string }
  | { type: "load-path-example" }
  | { type: "clear-path-example" };

export function applyFarmChange(farm: Farm, change: FarmChange): Farm {
  if (change.type === "next-cycles") {
    const crops = NextCyclesSchema.parse(change.crops);
    const months = CycleMonthsSchema.parse(change.months ?? []);
    return {
      ...farm,
      nextCycles: crops,
      nextCycleMonths: crops.map((_, i) => months[i] ?? null),
      cyclesContextRevision: farm.revision,
    };
  }
  if (change.type === "load-example")
    return addExampleHistory(farm, new Date(change.at));
  if (change.type === "load-path-example")
    return { ...farm, examplePath: planPathExample };
  if (change.type === "clear-path-example")
    return { ...farm, examplePath: null };
  // Preserve the last observation from installations predating observation history.
  if (
    farm.report &&
    !farm.observations.some((item) => item.id === farm.report?.id)
  ) {
    farm = { ...farm, observations: [...farm.observations, farm.report] };
  }
  if (change.type === "area") {
    const area = change.area ? AreaDetailsSchema.parse(change.area) : null;
    const changed = ["size", "water", "soil"].some(
      (key) =>
        (farm.area?.[key as keyof AreaDetails] ?? "") !==
        (area?.[key as keyof AreaDetails] ?? ""),
    );
    return { ...farm, area, revision: farm.revision + (changed ? 1 : 0) };
  }
  if (change.type === "delete-observation")
    return {
      ...farm,
      observations: farm.observations.filter((item) => item.id !== change.id),
      report: farm.report?.id === change.id ? null : farm.report,
      checks: farm.report?.id === change.id ? emptyFarm.checks : farm.checks,
    };
  if (change.type === "edit-record" || change.type === "delete-record") {
    const id = change.type === "edit-record" ? change.record.id : change.id;
    const previous = farm.records.find((item) => item.id === id);
    if (!previous) throw new Error("Record not found.");
    const record =
      change.type === "edit-record"
        ? FieldRecordSchema.parse(change.record)
        : null;
    if (record && record.date > localDate(new Date()))
      throw new Error("Check the date. It is still in the future.");
    const affectsCrop =
      previous.action === "Planted" || record?.action === "Planted";
    return {
      ...farm,
      records: record
        ? farm.records.map((item) => (item.id === id ? record : item))
        : farm.records.filter((item) => item.id !== id),
      revision: farm.revision + (affectsCrop ? 1 : 0),
      needsReview: farm.needsReview || affectsCrop,
      report: affectsCrop ? null : farm.report,
      checks: affectsCrop ? emptyFarm.checks : farm.checks,
    };
  }
  if (change.type === "crop") {
    if (farm.currentCrop === change.crop && !farm.needsReview) return farm;
    return {
      ...farm,
      currentCrop: change.crop,
      cropCheckedAt: change.at,
      revision: farm.revision + 1,
      needsReview: false,
      report: null,
      checks: emptyFarm.checks,
    };
  }
  if (change.type === "observe") {
    if (farm.needsReview) return farm;
    return {
      ...farm,
      report: {
        crop: farm.currentCrop,
        id: change.id,
        value: change.value,
        at: change.at,
        revision: farm.revision,
      },
      observations: [
        ...farm.observations,
        {
          crop: farm.currentCrop,
          id: change.id,
          value: change.value,
          at: change.at,
          revision: farm.revision,
        },
      ],
      checks: {
        date: localDate(new Date(change.at)),
        reportId: change.id,
        ids: [],
      },
    };
  }
  if (change.type === "check") {
    if (farm.needsReview) return farm;
    const date = localDate(new Date(change.at));
    const previous = farm.checks.date === date ? farm.checks.ids : [];
    const ids=previous.includes(change.id)?previous.filter(id=>id!==change.id):[...previous,change.id];
    const reportId=farm.report?.id??null;
    const crop=farm.report?.crop??farm.currentCrop;
    const snapshot={date,crop,reportId,ids,at:change.at};
    return {...farm,checks:{date,reportId,ids},checkHistory:[...farm.checkHistory.filter(item=>!(item.date===date&&item.reportId===reportId&&item.crop===crop)),snapshot]};
  }
  const records = [...farm.records, FieldRecordSchema.parse(change.record)];
  if (change.record.action === "Planted")
    return {
      ...farm,
      records,
      revision: farm.revision + 1,
      needsReview: true,
      report: null,
      checks: emptyFarm.checks,
    };
  return { ...farm, records };
}

export function currentReport(farm: Farm, now: Date) {
  return farm.report &&
    !farm.needsReview &&
    farm.report.revision === farm.revision &&
    localDate(new Date(farm.report.at)) === localDate(now)
    ? farm.report
    : null;
}
export function checkedToday(farm: Farm, now: Date) {
  return farm.checks.date === localDate(now) && !farm.needsReview
    ? farm.checks.ids
    : [];
}
export function needsPlanReview(
  plan: SavedPlan | null,
  farm: Farm,
  forecast: Forecast | null,
  now: Date,
) {
  if (!plan) return false;
  return (
    farm.needsReview ||
    plan.contextRevision !== farm.revision ||
    plan.date < localDate(now) ||
    Date.parse(plan.forecastExpiresAt) <= now.getTime() ||
    (!!forecast && (!isFresh(forecast, now) || plan.forecastId !== forecast.id))
  );
}
export function buildRecord(
  action: FieldRecord["action"],
  crop: FieldRecord["crop"],
  date: string,
  now = new Date(),
): FieldRecord {
  const record = FieldRecordSchema.parse({
    id: crypto.randomUUID(),
    areaId: AREA.id,
    action,
    crop,
    date,
    reportedAt: now.toISOString(),
  });
  if (date > localDate(now))
    throw new Error("Check the date. It is still in the future.");
  return record;
}
