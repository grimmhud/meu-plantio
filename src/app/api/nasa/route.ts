import solar from "../../../../data/nasa/mogi-solar-2021-2025.json";
import raw from "../../../../data/nasa/mogi-2021-2025.json";
export async function GET() {
 return Response.json({header:raw.header, point:raw.geometry, parameters:{...raw.parameters,...solar.parameters}, days:{...raw.properties.parameter,...solar.properties.parameter}}, {headers:{"Cache-Control":"no-store"}});
}
