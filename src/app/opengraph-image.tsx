import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
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

function LeafGlyph({ size: s, color }: { size: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="-100 -105 200 115">
      <g transform="translate(0,4)" fill={color}>
        {BLADES.map((b) => (
          <path key={b.angle} d={BLADE_PATH} transform={`rotate(${b.angle}) scale(${b.scale})`} />
        ))}
      </g>
    </svg>
  );
}

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg,#1c0a3e 0%,#33116b 45%,#5d1abf 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: 480,
            background: "radial-gradient(circle,rgba(255,207,92,0.35) 0%,rgba(255,207,92,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -80,
            width: 420,
            height: 420,
            borderRadius: 420,
            background: "radial-gradient(circle,rgba(138,63,252,0.5) 0%,rgba(138,63,252,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(155deg,#a06dff 0%,#5d1abf 100%)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LeafGlyph size={38} color="#f6f2ff" />
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#e4d8ff", letterSpacing: 4 }}>
            WID PAI EXCHANGE
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.08,
            color: "#ffffff",
            maxWidth: 920,
          }}
        >
          Your safe & fast solution to all your foreign exchange needs.
        </div>

        <div style={{ display: "flex", marginTop: 34, fontSize: 26, color: "#c7b6f5" }}>
          Forex · BTC · USDT · ETH · Foreign Currencies — buy & sell at unbelievable rates.
        </div>
      </div>
    ),
    { ...size }
  );
}
