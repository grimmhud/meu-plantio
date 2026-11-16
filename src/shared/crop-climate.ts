import { nasaCrops } from "./nasa-crops";
export type ClimateData = { days: Record<string, Record<string, number>> };
export function cropClimate(crop: (typeof nasaCrops)[number], data: ClimateData | null, month: number | null) {
 const unknown = {state:"unknown" as const,label:"No data",symbol:"?",minimum:null as number|null,maximum:null as number|null,cold:0,hot:0,inside:0,total:0,reason:"Choose a season or open the NASA data first. We have not assessed the climate for this cycle."};
 if (!data || !month || month < 1 || month > 12) return unknown;
 const years = [2021,2022,2023,2024,2025].map(year => {
  const count = new Date(Date.UTC(year,month,0)).getUTCDate();
  return Array.from({length:count},(_,i)=>data.days.T2M?.[`${year}${String(month).padStart(2,"0")}${String(i+1).padStart(2,"0")}`]);
 });
 if (years.some(days=>days.some(t=>typeof t!=="number" || !Number.isFinite(t) || t===-999))) return {...unknown,reason:"The NASA series has missing or invalid days for this season. We do not classify incomplete data."};
 const temperatures=years.flat() as number[];
 const inside=temperatures.filter(t=>t>=crop.low && t<=crop.high).length;
 const limited=crop.name==="Carrot"||crop.name==="Onion"||crop.name==="Tomato";
 const green=inside===temperatures.length&&!limited;
 return {state:green?"match" as const:"check" as const,cold:temperatures.filter(t=>t<crop.low).length,hot:temperatures.filter(t=>t>crop.high).length,inside,minimum:Math.min(...temperatures),maximum:Math.max(...temperatures),total:temperatures.length,label:green?"Within range":"Check",symbol:green?"✓":"!",reason:`${crop.name}. NASA POWER, Mogi das Cruzes, same season from 2021 to 2025: ${inside} of ${temperatures.length} days with an average temperature between ${crop.low} and ${crop.high} degrees. ${crop.note} This badge compares historical temperature only. It does not predict the weather or approve soil, water or rotation conditions.`};
}

/** Complete same-month yearly samples; rain totals and solar daily averages. */
export function historicalSupport(data:ClimateData|null,month:number|null,parameter:"PRECTOTCORR"|"ALLSKY_SFC_SW_DWN") {
 if(!data||!month||month<1||month>12)return null;
 const samples=[2021,2022,2023,2024,2025].map(year=>{
 const count=new Date(Date.UTC(year,month,0)).getUTCDate();
 const values=Array.from({length:count},(_,i)=>data.days[parameter]?.[`${year}${String(month).padStart(2,"0")}${String(i+1).padStart(2,"0")}`]);
 if(values.some(v=>typeof v!=="number"||!Number.isFinite(v)||v<0))return null;
 const sum=(values as number[]).reduce((a,b)=>a+b,0);
 return {year,value:parameter==="PRECTOTCORR"?sum:sum/count};
 });
 if(samples.some(s=>s===null))return null;
 const complete=samples as {year:number;value:number}[];
 return {samples:complete,minimum:Math.min(...complete.map(s=>s.value)),maximum:Math.max(...complete.map(s=>s.value))};
}
