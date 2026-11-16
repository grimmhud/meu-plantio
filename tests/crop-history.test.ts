import test from "node:test";
import assert from "node:assert/strict";
import {groupCropHistory} from "../src/shared/crop-history";
import {applyFarmChange,emptyFarm,FarmSchema} from "../src/shared/farm";
import {addExampleHistory} from "../src/shared/example-farm";
test("crop history groups known demonstration events and keeps old real observations unassigned",()=>{
 const farm=addExampleHistory({...emptyFarm,observations:[{id:"real-old",value:"dry",at:"2026-11-14T15:00:00Z",revision:0}]},new Date("2026-11-15T15:00:00Z"));
 const groups=groupCropHistory(farm);
 assert.equal(groups.find(g=>g.crop===null)?.events[0].id,"real-old");
 for(const crop of ["Lettuce","Carrot","Tomato"]){const group=groups.find(g=>g.crop===crop)!;assert.ok(group.events.some(e=>e.record));assert.ok(group.events.some(e=>e.observation));assert.ok(group.events.every((e,i)=>i===0||group.events[i-1].date>=e.date));}
 assert.equal(groups.reduce((sum,g)=>sum+g.events.length,0),farm.records.length+farm.observations.length);
});
test("new observations retain the culture reported at the time after crop correction",()=>{
 let farm=applyFarmChange(emptyFarm,{type:"crop",crop:"Lettuce",at:"2026-11-15T12:00:00Z"});
 farm=applyFarmChange(farm,{type:"observe",value:"moist",id:"new-report",at:"2026-11-15T13:00:00Z"});
 assert.equal(farm.report?.crop,"Lettuce");
 farm=applyFarmChange(farm,{type:"crop",crop:"Tomato",at:"2026-11-15T14:00:00Z"});
 assert.equal(groupCropHistory(FarmSchema.parse(farm))[0].crop,"Lettuce");
});
