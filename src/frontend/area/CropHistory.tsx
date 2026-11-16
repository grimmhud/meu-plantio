"use client";
import {useEffect,useState} from "react";
import {ChevronRight,CalendarDays,CloudRain,Thermometer,ClipboardCheck} from "lucide-react";
import {CropArt,ActivityArt,SoilArt} from "@/frontend/ui/Illustration";
import {Button} from "@/frontend/ui/Button";
import {ActionGroup} from "@/frontend/ui/ActionGroup";
import {Sheet} from "@/frontend/ui/Sheet";
import {ExplainButton} from "@/frontend/ui/ExplainButton";
import {DataSources} from "@/frontend/ui/DataSources";
import {groupCropHistory,groupHistoryDays,type HistoryEvent} from "@/shared/crop-history";
import {nasaDay,dailyContextHint,type NasaHistoryData} from "@/shared/nasa-history";
import {bedLabels,type Farm,type FieldRecord,type FarmChange} from "@/shared/farm";
import {shortDate} from "@/shared/planning";
import styles from "./area.module.css";
function label(item:HistoryEvent){return item.record?item.record.action:item.check?item.check.ids.map(id=>id==="watering"?"Checked watering":"Checked water").join("and"):bedLabels[item.observation!.value];}
export function CropHistory({farm,onEdit,onRemove}:{farm:Farm;onEdit:(record:FieldRecord)=>void;onRemove:(change:FarmChange)=>void}){
 const [selected,setSelected]=useState<string|null>(null);
 const [nasa,setNasa]=useState<NasaHistoryData|null>(null);const [status,setStatus]=useState<"idle"|"loading"|"ready"|"error">("idle");
 useEffect(()=>{if(selected===null||nasa)return;let active=true;setStatus("loading");fetch("/api/nasa/history",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{if(active){setNasa(data);setStatus("ready");}}).catch(()=>{if(active)setStatus("error");});return ()=>{active=false;};},[selected]);
 const groups=groupCropHistory(farm);const group=groups.find(g=>(g.crop??"unknown")===selected);
 const days=groupHistoryDays(group?.events??[]);
 const number=(n:number)=>n.toFixed(1);
 const narration=group?`${group.crop??"No crop provided"}. ${days.length} days recorded. ${days.map(day=>{const weather=nasaDay(nasa,day.date);return `${shortDate(day.date)}. ${day.events.map(label).join(". ")}. ${weather.temperature!==null?`NASA regional average temperature of ${number(weather.temperature)} degrees.`:"No NASA temperature on this date."} ${weather.rain!==null?`Regional precipitation of ${number(weather.rain)} millimeters.`:"No NASA precipitation on this date."} ${day.events.some(e=>e.id.startsWith("example-"))?"Includes example reports, not field data.":""}`;}).join(" ")} NASA data is regional and uses UTC days; it does not measure your bed or prove nutrition, moisture or a crop problem.`:"No records yet.";
 return <><section id="history" className={styles.card}><h2>Bed history</h2><div className={styles.cropHistoryList}>{groups.map(g=><button type="button" key={g.crop??"unknown"} className={styles.cropHistoryButton} aria-haspopup="dialog" onClick={()=>setSelected(g.crop??"unknown")}><span className={styles.cropHistoryArt}>{g.crop?<CropArt crop={g.crop}/>:<SoilArt value="unknown"/>}</span><span><strong>{g.crop??"No crop provided"}</strong><small>{groupHistoryDays(g.events).length} {groupHistoryDays(g.events).length===1?"day recorded":"days recorded"}</small></span><ChevronRight size={22} aria-hidden="true"/></button>)}</div>{groups.length===0&&<p>No records yet.</p>}</section>
 {selected!==null&&<Sheet title={group?.crop??"No crop provided"} onClose={()=>setSelected(null)} narration={narration}>
 {group?.crop&&<div className={styles.historyCropHero}><CropArt crop={group.crop}/></div>}
 {status==="loading"&&<p className={styles.meta} role="status">Loading NASA context…</p>}{status==="error"&&<p className={styles.meta} role="status">NASA context unavailable. Your records are still here.</p>}
 <ul className={styles.history}>{days.map(day=>{
 const weather=nasaDay(nasa,day.date);const hint=dailyContextHint(weather.rain,day.events.flatMap(e=>e.observation?[e.observation.value]:[]),day.events.some(e=>e.record?.action==="Watered"));
 const labels=[...new Set(day.events.map(label))];
 return <li key={day.date}><details className={styles.event}><summary className={styles.daySummary}><span className={styles.dayDate}><CalendarDays size={19} aria-hidden="true"/><strong>{shortDate(day.date)}</strong>{day.events.some(e=>e.id.startsWith("example-"))&&<small>· example</small>}</span><span className={styles.dayFacts}>{labels.map(text=>{const event=day.events.find(e=>label(e)===text)!;return <span key={text}>{event.record?<ActivityArt action={event.record.action}/>:event.observation?<SoilArt value={event.observation.value}/>:<ClipboardCheck size={22}/>}<span>{text}</span></span>;})}</span><span className={styles.dayNasa}><span>Regional NASA data</span>{weather.temperature!==null&&<span><Thermometer size={16}/>{number(weather.temperature)}°</span>}{weather.rain!==null&&<span><CloudRain size={16}/>{number(weather.rain)} mm</span>}{weather.temperature===null&&weather.rain===null&&<span>No data</span>}</span></summary>
 {hint&&<div className={styles.dayHint}><span>{hint.label}</span><ExplainButton title={hint.label} text={hint.explanation}/></div>}
 <div className={styles.eventDetail}>{day.events.map(item=><div key={item.id} className={styles.dailyEntry}><strong>{label(item)}</strong><p className={styles.meta}>{item.id.startsWith("example-")?"Example report.":"Reported by you."}{item.observation?"Reported appearance, without measurement.":""}{item.check?"Reported check; does not record watering.":""}</p>{!item.check&&<ActionGroup>{item.record&&<Button variant="secondary" onClick={()=>onEdit(item.record!)}>Correct</Button>}<Button variant="quiet" onClick={()=>onRemove(item.record?{type:"delete-record",id:item.id}:{type:"delete-observation",id:item.id})}>Delete record</Button></ActionGroup>}</div>)}</div></details></li>;
 })}</ul>
 {!group&&<p>No records yet.</p>}<Button variant="secondary" onClick={()=>setSelected(null)}>Back</Button><DataSources primary={{name:"NASA",image:"/brands/nasa.svg",description:"Climate on recorded dates · NASA POWER",href:"https://power.larc.nasa.gov/"}} narration="NASA provides the regional reference for temperature and precipitation on each date. It does not measure your bed. Activities and observations come from your reports or demonstration examples."><p>NASA POWER series for 2021–2025 and January to November 2026, retrieved on November 15, 2026. Last valid day in this lookup: November 13, 2026. T2M in °C and PRECTOTCORR in mm/day. Requested point −23.52278, −46.18833. Reanalysis/model variables on a regional grid, not bed sensors.</p><p>Records use local dates; NASA uses UTC days. They are linked by the written date, not the same 24-hour boundaries. Missing values do not become zero or data from another year. Demonstration reports remain fictional even when linked to real NASA data.</p><p>A moist appearance does not measure nutrition. A difference between regional precipitation and a report only raises questions about local rain, watering, cover and timing. It does not diagnose drainage, nutrients, disease or crop suitability.</p></DataSources></Sheet>}
 </>;
}
