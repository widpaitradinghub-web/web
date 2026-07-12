import type { CSSProperties } from "react";

type LeafProps = {
  className?: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
};

/**
 * Procedural 7-blade leaf glyph, built from one blade path repeated at
 * asymmetric angles/lengths so it reads as the WID PAI mark rather than a
 * traced raster — keeps it crisp at favicon and billboard sizes alike.
 */
const BLADES = [
  { angle: 0, scale: 1.18 },
  { angle: 24, scale: 1.0 },
  { angle: -24, scale: 1.0 },
  { angle: 48, scale: 0.78 },
  { angle: -48, scale: 0.78 },
  { angle: 72, scale: 0.52 },
  { angle: -72, scale: 0.52 },
];

const BLADE_PATH =
  "M0,4 C-9,-16 -11,-46 0,-100 C11,-46 9,-16 0,4 Z";

export function Leaf({ className, size = 48, color = "currentColor", style }: LeafProps) {
  return (
    <svg
      viewBox="-100 -105 200 115"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      fill={color}
    >
      <g transform="translate(0, 4)">
        {BLADES.map((b) => (
          <path
            key={b.angle}
            d={BLADE_PATH}
            transform={`rotate(${b.angle}) scale(${b.scale})`}
          />
        ))}
      </g>
    </svg>
  );
}
