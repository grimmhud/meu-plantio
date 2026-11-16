import type { Farm,FieldRecord } from "./farm";
import {exampleObservationCrop} from "./example-farm";
import {localDate} from "./planning";
export type HistoryEvent={id:string;date:string;at:string;record:FieldRecord|null;observation:Farm["observations"][number]|null;check?:Farm["checkHistory"][number]};
export type CropHistoryGroup={crop:FieldRecord["crop"]|null;events:HistoryEvent[]};
export function groupCropHistory(farm:Farm):CropHistoryGroup[]{
 const groups=new Map<string,CropHistoryGroup>();
 const add=(crop:FieldRecord["crop"]|null,event:HistoryEvent)=>{const key=crop??"unknown";if(!groups.has(key))groups.set(key,{crop,events:[]});groups.get(key)!.events.push(event);};
 for(const record of farm.records)add(record.crop,{id:record.id,date:record.date,at:record.reportedAt,record,observation:null});
 const observations=[...farm.observations];
 if(farm.report&&!observations.some(o=>o.id===farm.report!.id))observations.push(farm.report);
 for(const observation of observations)add(observation.crop??exampleObservationCrop(observation.id),{id:observation.id,date:localDate(new Date(observation.at)),at:observation.at,record:null,observation});
 for(const check of farm.checkHistory??[])if(check.ids.length)add(check.crop,{id:`${check.example?"example-checks":"checks"}-${check.date}-${check.reportId??"none"}-${check.crop??"unknown"}`,date:check.date,at:check.at,record:null,observation:null,check});
 for(const group of groups.values())group.events.sort((a,b)=>b.date.localeCompare(a.date)||b.at.localeCompare(a.at));
 return [...groups.values()].sort((a,b)=>a.crop===null?1:b.crop===null?-1:b.events[0].date.localeCompare(a.events[0].date));
}

export type HistoryDay={date:string;events:HistoryEvent[]};
export function groupHistoryDays(events:HistoryEvent[]):HistoryDay[]{
 const days=new Map<string,HistoryEvent[]>();
 for(const event of events){if(!days.has(event.date))days.set(event.date,[]);days.get(event.date)!.push(event);}
 return [...days.entries()].sort(([a],[b])=>b.localeCompare(a)).map(([date,items])=>({date,events:items.sort((a,b)=>b.at.localeCompare(a.at))}));
}
