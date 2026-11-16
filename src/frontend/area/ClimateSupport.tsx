import {CloudRain,Sun} from "lucide-react";
import {historicalSupport,type ClimateData} from "@/shared/crop-climate";
import {isFresh,localDate,type Forecast} from "@/shared/planning";
import { estimatedWater } from "@/shared/water-reference";
import type {CycleCrop} from "@/shared/farm";
import { ClimateRange } from "./ClimateRange";
import styles from "./next-cycles.module.css";
export function ClimateSupport({data,month,solar=false,forecast=null,crop}:{data:ClimateData|null;month:number|null;solar?:boolean;forecast?:Forecast|null;crop:CycleCrop}){
 const history=historicalSupport(data,month,solar?"ALLSKY_SFC_SW_DWN":"PRECTOTCORR");
 const current=forecast&&month===Number(localDate().slice(5,7))&&isFresh(forecast)?forecast:null;
 const values=current?.days.map(d=>solar?d.solarMj:d.rainMm);
 const future=values&&values.every(v=>typeof v==="number"&&Number.isFinite(v))?{low:Math.min(...values as number[]),high:Math.max(...values as number[])}:null;
 const reference=solar?null:estimatedWater(crop,current);
 const daily=history?.samples.map(s=>s.value/(solar?1:new Date(Date.UTC(s.year,month!,0)).getUTCDate()));
 const historic=daily?{low:Math.min(...daily),high:Math.max(...daily)}:null;
 return <section className={styles.supportRow}><header>{solar?<Sun size={30}/>:<CloudRain size={30}/>}<h3>{solar?"Sun":"Water and rain"}</h3></header><ClimateRange reference={reference} future={future} history={historic} unit={solar?"MJ/m² per day":"mm per day"} referenceLabel={solar?"Crop reference":"Estimated water use"} explanations={solar?{reference:"There is no validated solar radiation range for this variety yet. The question mark does not mean a lack of sunlight.",future:"Lowest and highest daily solar energy forecast for the next seven days. Does not represent hours of daylight.",history:"Variation in monthly daily averages of solar energy across the five NASA years. Does not represent hours of daylight or a forecast."}:{reference:`Estimated water that ${crop} may use per day, calculated using forecast weather and coefficients for growth stages. The marks show this range. This is not an amount to water or an ideal rainfall range.`,future:"Lowest and highest daily rainfall forecast for the next seven days, from Open-Meteo. For example: zero means a day with no rain forecast. This is not the weekly total. A dot means equal values; a dotted line means missing data.",history:"For 2021 to 2025, we calculated average daily rainfall for this month in each year. The range shows the lowest and highest of these averages, not the driest and wettest days. This is NASA regional history, not a forecast or a bed measurement."}}/></section>;
}
