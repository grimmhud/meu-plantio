"use client";
import {useState,type ReactNode} from "react";
import {Earth,ArrowUpRight,CloudSun,BookOpen} from "lucide-react";
import {Sheet} from "./Sheet";
import {Button} from "./Button";
import styles from "./data-sources.module.css";
type Source={name:string;description:string;href?:string;image?:string};
export function DataSources({primary,secondary=[],children,narration}:{primary:Source;secondary?:Source[];children?:ReactNode;narration?:string}){
 const [open,setOpen]=useState(false);
 return <footer className={styles.root}><button type="button" className={styles.credit} aria-haspopup="dialog" aria-expanded={open} aria-label={`View data and sources for ${primary.name}`} onClick={()=>setOpen(true)}><span className={styles.earth}>{primary.image?<img src={primary.image} alt="" width={48} height={40}/>:<Earth size={28} strokeWidth={1.2}/>}</span><span className={styles.identity}><span className={styles.kicker}>DATA FROM</span><strong>{primary.name}</strong><span>{primary.description}</span></span><ArrowUpRight size={23} aria-hidden="true"/></button>{secondary.length>0&&<button type="button" className={styles.secondary} onClick={()=>setOpen(true)} aria-haspopup="dialog"><CloudSun size={18} aria-hidden="true"/><span>{secondary.map(s=>s.name).join(" · ")}</span><span aria-hidden="true">＋</span></button>}
 {open&&<Sheet title="Where the data comes from" narration={narration} onClose={()=>setOpen(false)}><div className={styles.primaryInfo}>{primary.image?<img src={primary.image} alt="" width={64} height={54}/>:<Earth size={30}/>}<span className={styles.kicker}>DATA FROM</span><h3>{primary.name}</h3><p>{primary.description}</p>{primary.href&&<a href={primary.href} target="_blank" rel="noreferrer">Explore the source <ArrowUpRight size={16}/></a>}</div>{secondary.map(s=><section className={styles.source} key={s.name}><CloudSun size={24}/><h3>{s.name}</h3><p>{s.description}</p>{s.href&&<a href={s.href} target="_blank" rel="noreferrer">Explore the source</a>}</section>)}{children&&<details className={styles.details}><summary><BookOpen size={20}/>Method and references</summary><div>{children}</div></details>}<Button variant="secondary" onClick={()=>setOpen(false)}>Back</Button></Sheet>}
 </footer>;
}
