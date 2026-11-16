import type { Crop, WeatherKind } from "@/shared/planning";
import type { BedValue, FieldRecord } from "@/shared/farm";

export function SoilArt({ value }: { value: BedValue }) {
  return (
    <svg viewBox="0 0 100 86" fill="none" aria-hidden="true">
      {value === "unknown" ? (
        <>
          <circle cx="50" cy="42" r="28" fill="#e4e9d8" />
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fontSize="44"
            fontWeight="bold"
            fill="#7c9164"
            fontFamily="Arial"
          >
            ?
          </text>
        </>
      ) : (
        <>
          <ellipse cx="50" cy="74" rx="38" ry="6" fill="#dce1cd" />
          <path
            d="m13 44 38-17 38 18-38 21Z"
            fill={value === "dry" ? "#ccb58d" : "#b7a684"}
          />
          <path d="m13 44 38 21 38-20v17L51 82 13 61Z" fill="#9f8966" />
          {value === "puddles" ? (
            <>
              <ellipse cx="41" cy="49" rx="18" ry="7" fill="#94bbc3" />
              <ellipse cx="69" cy="44" rx="10" ry="4" fill="#b8d3d4" />
            </>
          ) : value === "dry" ? (
            <path
              d="m31 43 10 6-4 7m19-19-5 8 13 7m-13-7 10-3"
              stroke="#9e845c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path
                d="M28 48h9m20 6h12m-9-13h9"
                stroke="#87785b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M73 12s-9 11-9 16a9 9 0 0 0 18 0c0-5-9-16-9-16"
                fill="#91b8be"
              />
            </>
          )}
          <path
            d="M49 45V24"
            stroke="#527743"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M49 32C33 34 29 17 29 17c17-3 22 5 20 15m1-7c0-15 17-18 17-18s1 17-17 18"
            fill="#95b571"
          />
        </>
      )}
    </svg>
  );
}

export function ActivityArt({ action }: { action: FieldRecord["action"] }) {
  return (
    <svg viewBox="0 0 100 86" fill="none" aria-hidden="true">
      <ellipse cx="50" cy="73" rx="36" ry="7" fill="#dfe5cb" />
      {action === "Watered" ? (
        <>
          <path d="M27 40h38v28H27Z" fill="#91a97c" />
          <path d="m64 45 17-15 7 5-19 24" fill="#809b6d" />
          <path d="M27 43C5 20 39 10 41 40" stroke="#6f8b60" strokeWidth="6" />
          <path
            d="m84 43-4 7m10-1-4 7m-9-5-4 7"
            stroke="#8bb1c1"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : action === "Harvested" ? (
        <>
          <path d="m20 46 10 28h42l9-28Z" fill="#c6a57a" />
          <path d="M31 48c0-33 39-33 39 0" stroke="#a68b62" strokeWidth="5" />
          <circle cx="37" cy="43" r="12" fill="#b1c77d" />
          <circle cx="57" cy="44" r="14" fill="#86a65d" />
          <circle cx="67" cy="49" r="9" fill="#c37d5d" />
          <path d="M24 53h53" stroke="#dcc6a4" strokeWidth="4" />
        </>
      ) : (
        <>
          <path d="m17 61 34-14 33 15-34 15Z" fill="#ba9c71" />
          <path
            d="M50 56V26"
            stroke="#547447"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M49 40C27 42 23 18 23 18s28-5 26 22m3-10c-1-20 23-24 23-24s2 22-23 24"
            fill="#96b879"
          />
          <path
            d="M79 25v23m-7-8 7 8 7-8"
            stroke="#768968"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function CropArt({ crop = "Lettuce" }: { crop?: Crop | "Onion" | "Green bean" }) {
  return (
    <svg viewBox="0 0 100 86" fill="none" aria-hidden="true">
      <ellipse cx="50" cy="73" rx="36" ry="8" fill="#dfe5c9" />
      {crop === "Onion" ? (
        <><path d="M48 40 36 7m15 33L59 6m-9 35L48 3" stroke="#567845" strokeWidth="6" strokeLinecap="round"/><path d="M49 31C39 46 23 45 24 61c1 23 49 23 51 0C76 46 59 44 49 31Z" fill="#d8b788"/><path d="M49 38c-13 18-14 30-3 40m7-40c13 18 14 30 3 40" stroke="#ae895d" strokeWidth="2"/></>
      ) : crop === "Green bean" ? (
        <><path d="M31 18c14 9 28 3 38-8M38 20C17 38 19 63 40 77c-8-23-3-39 5-51M56 21c-9 16-6 36 14 49-5-22-2-34-8-46" stroke="#4c7c3e" strokeWidth="9" strokeLinecap="round"/><path d="m37 32-5 23m25-22 5 20" stroke="#97b467" strokeWidth="3" strokeLinecap="round"/></>
      ) : crop === "Lettuce" ? (
        <>
          <path
            d="M49 65C17 73 12 48 26 39c-4-19 14-27 25-15 16-17 34-5 29 11 19 14 3 38-22 33"
            fill="#a4c56a"
          />
          <path
            d="M51 66C29 65 21 45 38 37c-3-13 16-18 23-8 18-3 24 18 6 29"
            fill="#78a34e"
          />
          <path d="M51 67c-16-8-23-21-9-28 7-9 22-1 19 10" fill="#c2db8b" />
          <path
            d="M50 71V46m0 12-10-6m10 11 14-9"
            stroke="#4e763a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : crop === "Carrot" ? (
        <>
          <path d="m45 32 25 13-37 33c-3 2-5 0-4-3Z" fill="#e59b4b" />
          <path
            d="m48 45 11 5m-16 5 8 4"
            stroke="#b96b32"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M54 35c-15-19-9-27-4-25 9 4 10 16 10 20-1-25 13-29 16-22 3 9-8 22-11 25 16-14 25-8 20-1-4 6-15 8-23 6"
            fill="#6c984b"
          />
        </>
      ) : (
        <>
          <path
            d="M49 36C23 23 13 48 22 64c6 15 24 18 31 13 12 7 31-5 30-23 0-18-18-30-31-18"
            fill="#ce7254"
          />
          <path
            d="m51 38-17-8 12 1 4-14 5 14 14-6-10 13 9 7-16-4-12 5Z"
            fill="#587c42"
          />
          <path
            d="M31 48c-4 4-5 9-3 13"
            stroke="#edb199"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function WeatherArt({
  kind,
  small = false,
}: {
  kind: WeatherKind;
  small?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 92 76"
      fill="none"
      className={small ? "weather-art small" : "weather-art"}
      aria-hidden="true"
    >
      {(kind === "sun" || kind === "cloud") && (
        <>
          <circle cx={kind === "sun" ? 46 : 31} cy="32" r="16" fill="#e9be61" />
          <path
            d={
              kind === "sun"
                ? "M46 5v6m0 42v6M19 32h6m42 0h6M27 13l5 5m28 28 5 5M27 51l5-5m28-28 5-5"
                : "M31 7v5M8 31h5m1-17 4 4m26-4-4 4"
            }
            stroke="#d2a84e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {kind !== "sun" && kind !== "unknown" && (
        <path
          d="M24 48c-16 0-17-23-2-26 3-19 31-20 37-3 19-3 27 27 8 29Z"
          fill={kind === "storm" ? "#8a9f9a" : "#d4dfd8"}
          stroke={kind === "storm" ? "#4d6b61" : "#8ba99a"}
          strokeWidth="2.5"
        />
      )}
      {kind === "rain" && (
        <path
          d="m29 56-3 7m19-7-3 7m19-7-3 7"
          stroke="#6b9db0"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {kind === "storm" && (
        <>
          <path d="m48 47-9 14h10l-5 12 18-18H51l5-8" fill="#e7b858" />
          <path
            d="m25 56-3 7m46-7-3 7"
            stroke="#6b9db0"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "unknown" && (
        <>
          <circle cx="46" cy="35" r="24" fill="#e3e7dc" />
          <text
            x="46"
            y="45"
            textAnchor="middle"
            fontSize="32"
            fill="#63735c"
            fontFamily="sans-serif"
          >
            ?
          </text>
        </>
      )}
    </svg>
  );
}

export function GardenArt({ sow = false }: { sow?: boolean }) {
  return (
    <svg
      viewBox="0 0 280 155"
      fill="none"
      aria-hidden="true"
      className="garden-art"
    >
      <circle cx="222" cy="38" r="24" fill="#e9c86e" />
      <path
        d="M31 80c27-26 61-20 82-2 24-25 60-24 86-7 21-10 48-5 66 10"
        stroke="#dde6ce"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path d="m24 100 137-39 99 42-135 46Z" fill="#b89970" />
      <path d="m24 100 101 37 135-34v12l-135 39-101-41Z" fill="#8a7155" />
      <path
        d="m47 99 98-28m-67 39 100-30m-67 43 101-31m-67 42 91-28"
        stroke="#d7bf97"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {[
        { x: 76, y: 83 },
        { x: 115, y: 72 },
        { x: 114, y: 99 },
        { x: 153, y: 87 },
        { x: 151, y: 115 },
        { x: 191, y: 103 },
      ].map(({ x, y }, i) =>
        sow ? (
          <ellipse key={i} cx={x} cy={y + 5} rx="4" ry="2" fill="#665d37" />
        ) : (
          <g key={i} transform={`translate(${x},${y})`}>
            <path
              d="M0 7V-9"
              stroke="#527744"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M0 0c-15 0-17-13-17-13C-5-15 1-9 0 0Z" fill="#82a55b" />
            <path d="M1-3c-1-12 8-17 17-16C18-8 11-2 1-3Z" fill="#aec97b" />
          </g>
        ),
      )}
      <path
        d="M16 133h24m204-1h21"
        stroke="#d0d9ba"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
