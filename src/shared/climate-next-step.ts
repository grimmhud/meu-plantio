import {isFresh,weatherKind,type Forecast} from "./planning";
export function climateNextStep(forecast:Forecast|null,now=new Date()){
 if(!forecast||!isFresh(forecast,now))return {label:"Check the forecast",speech:"Before deciding, check an updated forecast. NASA historical data does not predict the weather for the coming days."};
 if(forecast.days.some(d=>weatherKind(d.code)==="storm"))return {label:"Check the task date",speech:"The regional forecast indicates thunderstorms in the next seven days. Check the daily forecast and bed conditions before starting. This does not confirm damage in your area."};
 if(forecast.days.some(d=>d.rainMm===null))return {label:"Check rainfall data",speech:"Rainfall values are missing from the forecast. Missing information does not mean a dry day."};
 if(forecast.days.some(d=>d.rainMm===0))return {label:"Check available water",speech:"At least one day in the next seven days has no rain forecast. Check the water available at your bed. This does not determine watering needs or amounts."};
 return {label:"Observe the bed",speech:"Rain is forecast in the next seven days. Observe the bed before starting. The forecast does not tell us how much water will be available in the soil."};
}
