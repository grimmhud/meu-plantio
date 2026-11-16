import test from "node:test";
import assert from "node:assert/strict";
import {estimatedWater} from "../src/shared/water-reference";
import {ForecastSchema} from "../src/shared/planning";
import type {Forecast} from "../src/shared/planning";
test("water estimates reject missing ETo and use crop-specific phase envelopes",()=>{
 assert.equal(estimatedWater("Lettuce",null),null);
 const forecast={days:Array.from({length:7},()=>({etoMm:4}))} as Forecast;
 assert.deepEqual(estimatedWater("Lettuce",forecast),{low:1.8,high:4});
 assert.deepEqual(estimatedWater("Onion",forecast),{low:2,high:4.2});
 forecast.days[0].etoMm=null;assert.equal(estimatedWater("Lettuce",forecast),null);
 delete forecast.days[0].etoMm;assert.equal(estimatedWater("Lettuce",forecast),null);
});
