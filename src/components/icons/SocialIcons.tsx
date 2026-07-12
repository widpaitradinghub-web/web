type IconProps = {
  className?: string;
};

/** Hand-built to match lucide's 24x24 stroke style since lucide-react no longer ships brand marks. */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x={3} y={3} width={18} height={18} rx={5} />
      <circle cx={12} cy={12} r={4} />
      <circle cx={17.3} cy={6.7} r={1} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Official X (formerly Twitter) wordmark glyph. */
export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** TikTok note glyph, layered in the brand's signature cyan/magenta glitch offset. */
function NoteGlyph({ className, fill }: { className?: string; fill: string }) {
  return (
    <g className={className} fill={fill}>
      <circle cx={9.3} cy={17.2} r={3.3} />
      <rect x={10.9} y={3.2} width={2.1} height={14.2} rx={1.05} />
      <path
        d="M13 3.2c.3 3 2.6 5.35 5.6 5.62V11c-2.1-.1-4.05-.8-5.6-1.94"
        stroke={fill}
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <NoteGlyph fill="#25F4EE" className="translate-x-[-1px] translate-y-[1px]" />
      <NoteGlyph fill="#FE2C55" className="translate-x-[1px] translate-y-[-1px]" />
      <NoteGlyph fill="currentColor" className="" />
    </svg>
  );
}
