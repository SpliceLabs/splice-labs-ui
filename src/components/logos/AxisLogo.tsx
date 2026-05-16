// Direction 5: AXIS — Controlled Asymmetric Wildcard
// "SPLICE" is set in compressed ultra-weight caps.
// "LABS" is set perpendicular (rotated 90°) along the left edge of SPLICE,
// creating a T-junction — the splice motif as typographic structure.
// Bold but infrastructural. No decoration. The asymmetry is the mark.

interface AxisProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
}

export function AxisFavicon({ accent = false }: { accent?: boolean }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* S — bold compressed */}
      <rect x="2" y="2" width="12" height="2.5" fill={base}/>
      <rect x="2" y="6.75" width="12" height="2.5" fill={accent ? acc : base}/>
      <rect x="2" y="11.5" width="12" height="2.5" fill={base}/>
      <rect x="2" y="2" width="2.5" height="4.75" fill={base}/>
      <rect x="11.5" y="6.75" width="2.5" height="4.75" fill={base}/>
    </svg>
  );
}

export function AxisWordmark({ accent = false, scale = "header" }: AxisProps) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const accentColor = accent ? acc : base;

  if (scale === "favicon") {
    return <AxisFavicon accent={accent} />;
  }

  if (scale === "product") {
    return (
      <svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* LABS vertical along left edge */}
        <text
          x="-2"
          y="20"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="7"
          fontWeight="400"
          letterSpacing="0.14em"
          fill={accentColor}
          transform="rotate(-90, 0, 20) translate(-16, 0)"
        >LABS</text>
        <line x1="10" y1="4" x2="10" y2="28" stroke={accentColor} strokeWidth="1" strokeLinecap="square"/>
        {/* SPLICE */}
        <text x="14" y="24" fontFamily="'Space Grotesk', sans-serif" fontSize="22" fontWeight="700" letterSpacing="-0.05em" fill={base}>SPLICE</text>
      </svg>
    );
  }

  // Header — full asymmetric mark
  return (
    <svg width="420" height="72" viewBox="0 0 420 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical divider */}
      <line x1="18" y1="8" x2="18" y2="64" stroke={accentColor} strokeWidth="1.5" strokeLinecap="square"/>
      {/* LABS — vertical, reading bottom-to-top, left of divider */}
      <text
        x="14"
        y="60"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="11"
        fontWeight="400"
        letterSpacing="0.22em"
        fill={accentColor}
        writingMode="vertical-rl"
        textAnchor="end"
        transform="scale(-1,1) translate(-28, 0)"
      >LABS</text>
      {/* SPLICE — bold, compressed */}
      <text x="30" y="60" fontFamily="'Space Grotesk', sans-serif" fontSize="52" fontWeight="700" letterSpacing="-0.05em" fill={base}>SPLICE</text>
    </svg>
  );
}

export function AxisBW() {
  return <AxisWordmark accent={false} scale="header" />;
}

export function AxisAccent() {
  return <AxisWordmark accent={true} scale="header" />;
}
