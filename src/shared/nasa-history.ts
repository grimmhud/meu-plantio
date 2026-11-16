export type NasaHistoryData={days:Record<string,Record<string,number>>};
export function nasaDay(data:NasaHistoryData|null,date:string){
 const key=date.replaceAll("-","");
 const read=(name:string)=>{const value=data?.days[name]?.[key];return typeof value==="number"&&Number.isFinite(value)&&value!==-999?value:null;};
 const rain=read("PRECTOTCORR");return {temperature:read("T2M"),low:read("T2M_MIN"),high:read("T2M_MAX"),rain:rain!==null&&rain>=0?rain:null};
}
export function dailyContextHint(rain:number|null,observations:string[],watered:boolean){
 if(rain===null)return null;
 if(watered)return null; // A watering report already supplies relevant context; do not invent a problem.
 if(rain>0&&observations.includes("dry"))return {label:"Worth checking",explanation:"NASA indicates rainfall at the regional reference point, and you reported a dry bed. Check whether it rained locally, the ground cover and the report time. NASA dates use UTC and may not match the same 24 local hours. This does not diagnose soil, drainage, nutrition or crop suitability."};
 if(rain===0&&observations.some(v=>v==="moist"||v==="puddles"))return {label:"Understand the water",explanation:"There is no rainfall at the regional reference point on this date, and you reported moisture or puddles. This could be watering, water from previous days or a difference between the NASA point and your bed. Check what happened locally; this is not a diagnosis or proof of a problem."};
 return null;
}
