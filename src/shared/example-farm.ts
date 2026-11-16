import type { Farm, FieldRecord } from "./farm";
import { AREA, localDate } from "./planning";

/** Explicit opt-in example data. It is never loaded by opening an ordinary page. */
export function addExampleHistory(farm: Farm, now: Date): Farm {
  if (farm.exampleHistoryVersion >= 2) return farm;
  const date = (daysAgo: number) => {
    const day = new Date(`${localDate(now)}T12:00:00Z`);
    day.setUTCDate(day.getUTCDate() - daysAgo);
    return day.toISOString().slice(0, 10);
  };
  const entries: [number, FieldRecord["action"], FieldRecord["crop"]][] = [
    [110, "Planted", "Carrot"],
    [95, "Watered", "Carrot"],
    [38, "Harvested", "Carrot"],
    [24, "Planted", "Lettuce"],
    [18, "Watered", "Lettuce"],
    [10, "Watered", "Lettuce"],
    [3, "Watered", "Lettuce"],
    [1, "Harvested", "Lettuce"],
  ];
  const records = entries.map(([ago, action, crop], i) => ({
    id: `example-v1-record-${i}`,
    areaId: AREA.id,
    action,
    crop,
    date: date(ago),
    reportedAt: `${date(ago)}T15:00:00.000Z`,
  }));
  // Sparse illustrative reports, not a recommended watering schedule.
  const extraEntries: [number, FieldRecord["action"], FieldRecord["crop"]][] = [
    [240,"Planted","Tomato"],
    ...[237,232,225,219,212,205,199,192,185,179,172,165,158,151].map(ago=>[ago,"Watered","Tomato"] as [number,FieldRecord["action"],FieldRecord["crop"]]),
    [170,"Harvested","Tomato"],[157,"Harvested","Tomato"],[145,"Harvested","Tomato"],
    ...[107,101,89,82,75,69,61,53,46].map(ago=>[ago,"Watered","Carrot"] as [number,FieldRecord["action"],FieldRecord["crop"]]),
    ...[22,20,16,13,8,6,4,2].map(ago=>[ago,"Watered","Lettuce"] as [number,FieldRecord["action"],FieldRecord["crop"]]),
  ];
  const extraRecords=extraEntries.map(([ago,action,crop],i)=>({id:`example-v2-record-${i}`,areaId:AREA.id,action,crop,date:date(ago),reportedAt:`${date(ago)}T15:00:00.000Z`}));
  const revision = farm.revision + 1;
  const observationEntries: [number, Farm["observations"][number]["value"]][]=[
    [236,"moist"],[220,"dry"],[203,"moist"],[180,"unknown"],[159,"puddles"],
    [108,"dry"],[97,"moist"],[80,"puddles"],[65,"moist"],[43,"unknown"],
    [23,"moist"],[17,"dry"],[12,"unknown"],[7,"puddles"],[4,"moist"],[2,"dry"],
  ];
  const extraObservations=observationEntries.map(([ago,value],i)=>({id:`example-v2-observation-${i}`,value,crop:exampleObservationCrop(`example-v2-observation-${i}`),at:`${date(ago)}T15:00:00.000Z`,revision}));
  return {
    ...farm,
    exampleLoadedAt: farm.exampleLoadedAt ?? now.toISOString(),
    exampleHistoryVersion: 2,
    revision,
    area: farm.area ?? {
      name: "Home garden bed",
      size: "24 m²",
      water: "Watering with a hose — example",
      soil: "No soil test provided — example",
      updatedAt: now.toISOString(),
    },
    currentCrop: farm.currentCrop ?? "Lettuce",
    cropCheckedAt: farm.cropCheckedAt ?? now.toISOString(),
    records: [
      ...farm.records,
      ...[...(farm.exampleLoadedAt?[]:records),...extraRecords].filter(
        (item) => !farm.records.some((existing) => existing.id === item.id),
      ),
    ].sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        a.reportedAt.localeCompare(b.reportedAt),
    ),
    observations: [
      ...farm.observations,
      ...extraObservations.filter(item=>!farm.observations.some(existing=>existing.id===item.id)),
      ...(!farm.exampleLoadedAt ? [{
        id: "example-v1-observation-1",
        crop: "Lettuce" as const,
        value: "dry" as const,
        at: `${date(9)}T15:00:00.000Z`,
        revision,
      },
      {
        id: "example-v1-observation-2",
        crop: "Lettuce" as const,
        value: "moist" as const,
        at: `${date(5)}T15:00:00.000Z`,
        revision,
      }] : []),
    ].filter((item,index,all)=>all.findIndex(other=>other.id===item.id)===index),
  };
}

/** Known authorship of our own fixtures only. Never infer a real report's crop from its date. */
export function exampleObservationCrop(id:string):FieldRecord["crop"]|null {
 if(id==="example-v1-observation-1"||id==="example-v1-observation-2")return "Lettuce";
 const match=/^example-v2-observation-(\d+)$/.exec(id);
 if(!match)return null;
 const index=Number(match[1]);
 return index<5?"Tomato":index<10?"Carrot":index<16?"Lettuce":null;
}
