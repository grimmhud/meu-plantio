import test from "node:test";
import assert from "node:assert/strict";
import {applyFarmChange,emptyFarm,buildRecord} from "../src/shared/farm";
import {groupCropHistory,groupHistoryDays} from "../src/shared/crop-history";
import {nasaDay,dailyContextHint} from "../src/shared/nasa-history";
test("one day combines watering, observation and checks without treating checks as execution",()=>{
 let farm=applyFarmChange(emptyFarm,{type:"crop",crop:"Lettuce",at:"2026-11-13T11:00:00Z"});
 farm=applyFarmChange(farm,{type:"observe",value:"dry",id:"obs",at:"2026-11-13T12:00:00Z"});
 farm=applyFarmChange(farm,{type:"check",id:"watering",at:"2026-11-13T12:10:00Z"});
 assert.equal(farm.records.length,0);
 farm=applyFarmChange(farm,{type:"record",record:buildRecord("Watered","Lettuce","2026-11-13",new Date("2026-11-13T15:00:00Z"))});
 const days=groupHistoryDays(groupCropHistory(farm)[0].events);
 assert.equal(days.length,1);assert.equal(days[0].events.length,3);
 farm=applyFarmChange(farm,{type:"crop",crop:"Tomato",at:"2026-11-14T12:00:00Z"});
 assert.equal(farm.checkHistory[0].crop,"Lettuce");
 assert.equal(groupCropHistory(farm)[0].crop,"Lettuce");
});
test("NASA day is matched exactly; missing remains missing and context is never diagnosis",()=>{
 const data={days:{T2M:{"20261113":22},PRECTOTCORR:{"20261113":0,"20261114":-999}}};
 assert.equal(nasaDay(data,"2026-11-13").rain,0);
 assert.equal(nasaDay(data,"2026-11-14").rain,null);
 assert.equal(nasaDay(data,"2025-11-13").temperature,null);
 assert.equal(dailyContextHint(null,["dry"],false),null);
 assert.equal(dailyContextHint(8,["dry"],true),null);
 assert.equal(dailyContextHint(8,["dry"],false)?.label,"Worth checking");
 assert.equal(dailyContextHint(0,["moist"],false)?.label,"Understand the water");
});
