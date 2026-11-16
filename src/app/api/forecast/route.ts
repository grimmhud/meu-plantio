import { getForecast } from "@/backend/weather/openMeteo";
export async function GET() {
  try {
    return Response.json(await getForecast(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "We cannot retrieve the weather right now. Try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
