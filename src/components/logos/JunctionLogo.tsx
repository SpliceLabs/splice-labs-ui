// Direction 2: JUNCTION — Geometric Splice Icon
// Two parallel rails converge at a single node point, then exit as one rail.
// The junction point is the mark. Clean, balanced, conductive.

interface JunctionProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
  iconOnly?: boolean;
}

export function JunctionIcon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const rail = accent ? "#E8EAF0" : "#E8EAF0";
  const node = accent ? "#00D4B4" : "#E8EAF0";
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left rail — top */}
      <line x1={s * 0.1} y1={s * 0.28} x2={cx - s * 0.06} y2={cy} stroke={rail} strokeWidth={s * 0.045} strokeLinecap="round"/>
      {/* Left rail — bottom */}
      <line x1={s * 0.1} y1={s * 0.72} x2={cx - s * 0.06} y2={cy} stroke={rail} strokeWidth={s * 0.045} strokeLinecap="round"/>
      {/* Right rail — single exit */}
      <line x1={cx + s * 0.06} y1={cy} x2={s * 0.9} y2={cy} stroke={rail} strokeWidth={s * 0.045} strokeLinecap="round"/>
      {/* Junction node */}
      <circle cx={cx} cy={cy} r={s * 0.085} fill={node} />
      <circle cx={cx} cy={cy} r={s * 0.045} fill={accent ? "#0A1014" : "#0A1014"} />
    </svg>
  );
}

export function JunctionWordmark({ accent = false, scale = "header" }: JunctionProps) {
  const textColor = "#E8EAF0";
  const subColor = accent ? "#00D4B4" : "hsl(210,10%,50%)";
  const iconAccent = accent;

  if (scale === "favicon") {
    return <JunctionIcon accent={iconAccent} size={16} />;
  }

  if (scale === "product") {
    return (
      <div className="flex items-center gap-2">
        <JunctionIcon accent={iconAccent} size={24} />
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.03em" fill={textColor}>SPLICE</text>
          <text x="75" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.15em" fill={subColor}>LABS</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <JunctionIcon accent={iconAccent} size={44} />
      <svg width="200" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="36" fontFamily="'Space Grotesk', sans-serif" fontSize="32" fontWeight="700" letterSpacing="-0.04em" fill={textColor}>SPLICE</text>
        <text x="2" y="48" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.22em" fill={subColor}>LABS</text>
      </svg>
    </div>
  );
}

export function JunctionBW() {
  return <JunctionWordmark accent={false} scale="header" />;
}

export function JunctionAccent() {
  return <JunctionWordmark accent={true} scale="header" />;
}
