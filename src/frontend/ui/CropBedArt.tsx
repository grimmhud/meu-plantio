import { CropArt } from "./Illustration";
import type { Crop } from "@/shared/planning";

/** Decorative illustration, never a representation of measured growth or density. */
export function CropBedArt({ crop }: { crop: Crop | "Onion" | "Green bean" | null }) {
  return (
    <svg
      viewBox="0 0 320 190"
      fill="none"
      aria-hidden="true"
      style={{ width: "100%", maxWidth: 360 }}
    >
      <circle cx="264" cy="38" r="22" fill="#e9c86e" />
      <path
        d="M19 103Q85 38 159 78Q245 33 302 101"
        stroke="#dfe7cf"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <path d="m20 113 159-47 122 51-160 58Z" fill="#c1a079" />
      <path d="m20 113 121 49 160-45v15l-160 52-121-53Z" fill="#917556" />
      <path
        d="m48 113 127-38m-91 53 127-39m-90 54 127-40"
        stroke="#dfc59f"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {crop &&
        [
          [60, 65],
          [104, 52],
          [148, 39],
          [105, 91],
          [150, 77],
          [195, 63],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(.59)`}>
            <svg width="100" height="86">
              <CropArt crop={crop} />
            </svg>
          </g>
        ))}
      {!crop && (
        <text x="160" y="117" textAnchor="middle" fill="#5c553c" fontSize="34">
          ?
        </text>
      )}
    </svg>
  );
}
