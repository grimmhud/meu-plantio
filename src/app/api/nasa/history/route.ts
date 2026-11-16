import past from "../../../../../data/nasa/mogi-2021-2025.json";
import recent from "../../../../../data/nasa/mogi-history-2026.json";
export async function GET(){
 const parameters=["T2M","T2M_MIN","T2M_MAX","PRECTOTCORR"] as const;
 const days=Object.fromEntries(parameters.map(key=>[key,{...past.properties.parameter[key],...recent.properties.parameter[key]}]));
 return Response.json({days,source:"NASA POWER",timeStandard:"UTC",requestedPoint:{latitude:-23.52278,longitude:-46.18833},acquiredOn:"2026-11-15",requestedThrough:"2026-11-14"},{headers:{"Cache-Control":"no-store"}});
}
