import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyFarmChange,
  emptyFarm,
  FarmSchema,
  buildRecord,
} from "../src/shared/farm";

test("example history is opt-in, idempotent and preserves existing field records", () => {
  const now = new Date("2026-11-15T14:00:00Z");
  const real = buildRecord("Watered", "Tomato", "2026-11-14", now);
  const original = {
    ...emptyFarm,
    currentCrop: "Tomato" as const,
    records: [real],
  };
  const change = { type: "load-example" as const, at: now.toISOString() };
  const farm = FarmSchema.parse(applyFarmChange(original, change));
  assert.equal(original.exampleLoadedAt, null);
  assert.equal(farm.currentCrop, "Tomato");
  assert.ok(farm.records.length >= 40);
  assert.deepEqual(
    farm.records.find((item) => item.id === real.id),
    real,
  );
  assert.equal(farm.observations.length, 18);
  assert.equal(farm.exampleHistoryVersion, 2);
  assert.equal(farm.report, null);
  assert.ok(farm.records.every((item) => item.date <= "2026-11-15"));
  assert.deepEqual(applyFarmChange(farm, change), farm);
  assert.deepEqual(FarmSchema.parse(JSON.parse(JSON.stringify(farm))), farm);
});

test("expanding the old demonstration preserves edits, deletions and confirmed cycles",()=>{
 const now=new Date("2026-11-15T14:00:00Z");
 const old={...emptyFarm,exampleLoadedAt:"2026-11-14T14:00:00.000Z",nextCycles:["Onion" as const],records:[{id:"example-v1-record-0",areaId:"mogi-reference" as const,action:"Planted" as const,crop:"Tomato" as const,date:"2026-11-01",reportedAt:"2026-11-01T15:00:00.000Z"}]};
 const upgraded=applyFarmChange(old,{type:"load-example",at:now.toISOString()});
 assert.deepEqual(upgraded.records.find(r=>r.id==="example-v1-record-0"),old.records[0]);
 assert.equal(upgraded.records.some(r=>r.id==="example-v1-record-1"),false);
 assert.deepEqual(upgraded.nextCycles,["Onion"]);
 assert.equal(upgraded.exampleLoadedAt,old.exampleLoadedAt);
 assert.equal(new Set(upgraded.records.map(r=>r.id)).size,upgraded.records.length);
});
