"use client";
import {useState} from "react";
import {CircleAlert} from "lucide-react";
import {Sheet} from "./Sheet";
import {Button} from "./Button";
import styles from "./explain-button.module.css";
export function ExplainButton({title,text}:{title:string;text:string}){
 const [open,setOpen]=useState(false);
 return <><button type="button" className={styles.trigger} aria-label={`Understand ${title}`} aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}><CircleAlert size={19} aria-hidden="true"/></button>{open&&<Sheet title={title} narration={text} onClose={()=>setOpen(false)}><p className={styles.text}>{text}</p><Button variant="secondary" onClick={()=>setOpen(false)}>Got it</Button></Sheet>}</>;
}
