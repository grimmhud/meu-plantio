export const nasaCrops = [
 {name:"Lettuce", low:20, high:25, family:"Asteraceae", note:"Check the heat-adapted variety and available water.", source:"https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1009227/1/DOC142.pdf"},
 {name:"Carrot", low:18, high:25, family:"Apiaceae", note:"Range for heat-adapted varieties; check the variety, soil structure and root quality.", source:"https://www.scielo.br/j/hb/a/hYGqBV4fgrLPdFG9C96bz7r/?lang=pt"},
 {name:"Tomato", low:20, high:24, family:"Solanaceae", note:"Range for fruit ripening, not the entire cycle. Check the variety, stages and management.", source:"https://www.scielo.br/j/hb/a/scGWDzR4NyHvS7fQZhm57rq/?lang=pt"},
 {name:"Onion", low:20, high:25, family:"Amaryllidaceae", note:"Range for leaf growth. Bulb formation requires checking the variety and day length; these have not been assessed.", source:"https://www.embrapa.br/web/hortalicas/cebola/clima"},
 {name:"Green bean", low:18, high:30, family:"Fabaceae", note:"Check temperature extremes, variety, support and available water.", source:"https://www.scielo.br/j/hb/a/PNr9mMTM5sb5ptk5zXqwSkt/?lang=pt"},
] as const;
export const NASA_OPTIONS_KEY = "agroloop:available-crops:v1";
