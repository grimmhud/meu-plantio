import test from "node:test";
import assert from "node:assert/strict";
import {cropClimate} from "../src/shared/crop-climate";
import {nasaCrops} from "../src/shared/nasa-crops";
test("climate badges distinguish missing data, complete thermal matches and caveats",()=>{
 const data={days:{T2M:{} as Record<string,number>}};
 for(let y=2021;y<=2025;y++)for(let d=1;d<=30;d++)data.days.T2M[`${y}11${String(d).padStart(2,"0")}`]=22;
 assert.equal(cropClimate(nasaCrops[0],null,11).state,"unknown");
 assert.equal(cropClimate(nasaCrops[0],data,null).state,"unknown");
 assert.equal(cropClimate(nasaCrops[0],data,11).state,"match");
 assert.equal(cropClimate(nasaCrops[3],data,11).state,"check");
 data.days.T2M["20211101"]=30;
 assert.equal(cropClimate(nasaCrops[0],data,11).state,"check");
 data.days.T2M["20211101"]=-999;
 assert.equal(cropClimate(nasaCrops[0],data,11).state,"unknown");
});

test("rain is accumulated and solar averaged only over complete same-month years",async()=>{
 const {historicalSupport}=await import("../src/shared/crop-climate");
 const data={days:{PRECTOTCORR:{} as Record<string,number>,ALLSKY_SFC_SW_DWN:{} as Record<string,number>}};
 for(let year=2021;year<=2025;year++)for(let day=1;day<=30;day++){const key=`${year}11${String(day).padStart(2,"0")}`;data.days.PRECTOTCORR[key]=2;data.days.ALLSKY_SFC_SW_DWN[key]=18;}
 assert.equal(historicalSupport(data,11,"PRECTOTCORR")?.minimum,60);
 assert.equal(historicalSupport(data,11,"ALLSKY_SFC_SW_DWN")?.maximum,18);
 data.days.ALLSKY_SFC_SW_DWN["20211101"]=-999;
 assert.equal(historicalSupport(data,11,"ALLSKY_SFC_SW_DWN"),null);
 assert.equal(historicalSupport(data,11,"PRECTOTCORR")?.samples.length,5);
});
