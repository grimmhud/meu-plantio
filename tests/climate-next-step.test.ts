import test from "node:test";
import assert from "node:assert/strict";
import {climateNextStep} from "../src/shared/climate-next-step";
import {AREA,type Forecast} from "../src/shared/planning";
const now=new Date("2026-11-15T13:00:00Z");
function forecast():Forecast{return {id:"test",areaId:AREA.id,source:"Open-Meteo",model:"best_match",timezone:AREA.timezone,fetchedAt:"2026-11-15T12:00:00Z",expiresAt:"2026-11-15T18:00:00Z",requestedPoint:AREA,gridPoint:AREA,days:Array.from({length:7},(_,i)=>({date:`2026-11-${15+i}`,code:0,high:26,low:17,rainMm:2,rainChance:null,gustKmh:null}))};}
test("next step separates missing, dry, rainy and expired forecasts without instructing irrigation",()=>{
 const f=forecast();assert.equal(climateNextStep(f,now).label,"Observe the bed");
 f.days[0].rainMm=0;assert.equal(climateNextStep(f,now).label,"Check available water");
 f.days[1].rainMm=null;assert.equal(climateNextStep(f,now).label,"Check rainfall data");
 f.days[0].code=95;assert.equal(climateNextStep(f,now).label,"Check the task date");
 f.expiresAt="2026-11-15T12:30:00Z";assert.equal(climateNextStep(f,now).label,"Check the forecast");
 assert.equal(climateNextStep(null,now).label,"Check the forecast");
});
