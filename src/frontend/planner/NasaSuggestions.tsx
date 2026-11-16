"use client";
import {useEffect,useState} from "react";
import {nasaCrops,NASA_OPTIONS_KEY} from "@/shared/nasa-crops";
export function NasaSuggestions({catalog=false}:{catalog?:boolean;optionsOnly?:boolean}){
 const [available,setAvailable]=useState<string[]>(nasaCrops.map(c=>c.name));const [error,setError]=useState("");
 useEffect(()=>{if(catalog)return;try{const raw=localStorage.getItem(NASA_OPTIONS_KEY);if(raw){const data=JSON.parse(raw);if(Array.isArray(data))setAvailable(data.filter(n=>nasaCrops.some(c=>c.name===n)));}}catch{setError("Could not read the options.");}},[catalog]);
 function toggle(name:string){const next=available.includes(name)?available.filter(n=>n!==name):[...available,name];setAvailable(next);if(!catalog)try{localStorage.setItem(NASA_OPTIONS_KEY,JSON.stringify(next));}catch{setError("Could not save the options.");}}
 return <div role="group" aria-label="What I usually grow" style={{display:"grid",gap:8}}>{nasaCrops.map(c=><label key={c.name} style={{display:"flex",alignItems:"center",gap:14,minHeight:56,padding:"8px 12px",borderBottom:"1px solid var(--color-border)",cursor:"pointer"}}><input type="checkbox" checked={available.includes(c.name)} onChange={()=>toggle(c.name)} style={{width:24,height:24,accentColor:"var(--color-brand)"}}/><span>{c.name}</span></label>)}{error&&<p role="alert">{error}</p>}</div>;
}
