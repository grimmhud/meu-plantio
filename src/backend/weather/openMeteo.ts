import "server-only";
import { z } from "zod";
import { unstable_cache } from "next/cache";
import {
  AREA,
  ForecastSchema,
  localDate,
  type Forecast,
} from "@/shared/planning";

const values = z.array(z.number().finite().nullable()).length(7);
const ResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.literal(AREA.timezone),
  daily: z.object({
    time: z.array(z.iso.date()).length(7),
    weather_code: values,
    temperature_2m_max: values,
    temperature_2m_min: values,
    precipitation_sum: values,
    temperature_2m_mean: values,
    shortwave_radiation_sum: values,
    et0_fao_evapotranspiration: values,
    precipitation_probability_max: values,
    wind_gusts_10m_max: values,
  }),
});
const getForecastForDate = unstable_cache(
  async (_requestedDate: string): Promise<Forecast> => {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.search = new URLSearchParams({
      latitude: String(AREA.latitude),
      longitude: String(AREA.longitude),
      timezone: AREA.timezone,
      forecast_days: "7",
      models: "best_match",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max,temperature_2m_mean,shortwave_radiation_sum,et0_fao_evapotranspiration",
    }).toString();
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error("Forecast provider unavailable");
    const raw = ResponseSchema.parse(await response.json());
    const fetchedAt = new Date();
    if (raw.daily.time[0] !== localDate(fetchedAt))
      throw new Error("Forecast dates are not current");
    const days = raw.daily.time.map((date, i) => ({
      date,
      code: raw.daily.weather_code[i],
      high: raw.daily.temperature_2m_max[i],
      low: raw.daily.temperature_2m_min[i],
      rainMm: raw.daily.precipitation_sum[i],
      meanTemp: raw.daily.temperature_2m_mean[i],
      solarMj: raw.daily.shortwave_radiation_sum[i],
      etoMm: raw.daily.et0_fao_evapotranspiration[i],
      rainChance: raw.daily.precipitation_probability_max[i],
      gustKmh: raw.daily.wind_gusts_10m_max[i],
    }));
    for (let i = 0; i < days.length; i++) {
      const expected = new Date(`${days[0].date}T12:00:00Z`);
      expected.setUTCDate(expected.getUTCDate() + i);
      if (days[i].date !== expected.toISOString().slice(0, 10))
        throw new Error("Non-contiguous forecast");
      if (
        days[i].low !== null &&
        days[i].high !== null &&
        days[i].low! > days[i].high!
      )
        throw new Error("Invalid temperature range");
    }
    return ForecastSchema.parse({
      id: crypto.randomUUID(),
      areaId: AREA.id,
      fetchedAt: fetchedAt.toISOString(),
      expiresAt: new Date(
        fetchedAt.getTime() + 6 * 60 * 60 * 1000,
      ).toISOString(),
      timezone: AREA.timezone,
      source: "Open-Meteo",
      model: "best_match",
      requestedPoint: { latitude: AREA.latitude, longitude: AREA.longitude },
      gridPoint: { latitude: raw.latitude, longitude: raw.longitude },
      days,
    });
  },
  ["mogi-seven-day-forecast-v2"],
  { revalidate: 900 },
);

export function getForecast() {
  return getForecastForDate(localDate());
}
