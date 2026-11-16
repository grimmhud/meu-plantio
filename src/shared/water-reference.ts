import type { CycleCrop } from "./farm";
import type { Forecast } from "./planning";
// FAO Irrigation Water Management, chapter 3, table 7. Four generic stages.
export const waterKc:Record<CycleCrop,readonly number[]>={Lettuce:[.45,.60,1,.90],Carrot:[.45,.75,1.05,.90],Tomato:[.45,.75,1.15,.80],Onion:[.50,.75,1.05,.85],"Green bean":[.35,.70,1.10,.90]};
export function estimatedWater(crop:CycleCrop,forecast:Forecast|null){
 if(!forecast||forecast.days.some(d=>typeof d.etoMm!=="number"||!Number.isFinite(d.etoMm)||d.etoMm<0))return null;
 const eto=forecast.days.reduce((sum,d)=>sum+d.etoMm!,0)/forecast.days.length;
 return {low:eto*Math.min(...waterKc[crop]),high:eto*Math.max(...waterKc[crop])};
}
