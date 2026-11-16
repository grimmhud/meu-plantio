import test from "node:test";
import assert from "node:assert/strict";
import {applyFarmChange,emptyFarm,FarmSchema} from "../src/shared/farm";
test("older farms load empty cycles and selected intentions survive context correction",()=>{
 const {nextCycles,cyclesContextRevision,...old}=emptyFarm;
 assert.deepEqual(FarmSchema.parse(old).nextCycles,[]);
 const chosen=applyFarmChange(emptyFarm,{type:"next-cycles",crops:["Onion","Green bean"]});
 assert.equal(chosen.currentCrop,null);assert.equal(chosen.records.length,0);
 const corrected=applyFarmChange(chosen,{type:"crop",crop:"Lettuce",at:new Date().toISOString()});
 assert.deepEqual(corrected.nextCycles,["Onion","Green bean"]);
 assert.notEqual(corrected.cyclesContextRevision,corrected.revision);
 assert.deepEqual(applyFarmChange(corrected,{type:"next-cycles",crops:[]}).nextCycles,[]);
});

test("cycle months survive reopening and context changes without inventing months for older plans", () => {
  const { nextCycleMonths, ...olderFarm } = emptyFarm;
  assert.deepEqual(FarmSchema.parse(olderFarm).nextCycleMonths, []);
  const chosen = applyFarmChange(emptyFarm, { type: "next-cycles", crops: ["Onion", "Green bean"], months: [11, 2] });
  assert.deepEqual(FarmSchema.parse(JSON.parse(JSON.stringify(chosen))).nextCycleMonths, [11, 2]);
  const corrected = applyFarmChange(chosen, { type: "crop", crop: "Lettuce", at: new Date().toISOString() });
  assert.deepEqual(corrected.nextCycleMonths, [11, 2]);
  assert.notEqual(corrected.cyclesContextRevision, corrected.revision);
  assert.equal(chosen.currentCrop, null);
  assert.deepEqual(chosen.records, []);
  const partial = applyFarmChange(chosen, { type: "next-cycles", crops: ["Onion", "Tomato"], months: [null, 3] });
  assert.deepEqual(partial.nextCycleMonths, [null, 3]);
  assert.deepEqual(applyFarmChange(partial, { type: "next-cycles", crops: [] }).nextCycleMonths, []);
  assert.throws(() => applyFarmChange(chosen, { type: "next-cycles", crops: ["Onion"], months: [13] }));
});
