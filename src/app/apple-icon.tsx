import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BLADES = [
  { angle: 0, scale: 1.18 },
  { angle: 24, scale: 1.0 },
  { angle: -24, scale: 1.0 },
  { angle: 48, scale: 0.78 },
  { angle: -48, scale: 0.78 },
  { angle: 72, scale: 0.52 },
  { angle: -72, scale: 0.52 },
];
const BLADE_PATH = "M0,4 C-9,-16 -11,-46 0,-100 C11,-46 9,-16 0,4 Z";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(155deg,#5d1abf 0%,#33116b 100%)",
        }}
      >
        <svg width="108" height="108" viewBox="-100 -105 200 115">
          <g transform="translate(0,4)" fill="#f6f2ff">
            {BLADES.map((b) => (
              <path key={b.angle} d={BLADE_PATH} transform={`rotate(${b.angle}) scale(${b.scale})`} />
            ))}
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
