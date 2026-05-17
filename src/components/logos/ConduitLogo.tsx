// Direction 09: CONDUIT — Cable Cross-Section Mark
// A splice, viewed end-on: the cross-section of two conduits meeting.
// The mark shows two concentric ring pairs — one pair representing each conduit —
// overlapping at the splice point. The overlap zone is the brand.
// This is borrowed from industrial cable-splice diagrams and fiber-optic fusion schematics.
// Two tubular cross-sections joined at a central axis.
// In black and white: two pairs of concentric rings, overlapping, clean geometry.
// In accent: the overlapping lens-shaped intersection fills with accent color.
// At favicon: just the intersection lens — the join itself.

interface ConduitProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
}

export function ConduitIcon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.055; // stroke weight
  // Two circles overlapping: left center and right center
  const r = s * 0.32;
  const separation = r * 0.85; // how much they overlap
  const lx = s * 0.5 - separation * 0.5;
  const rx = s * 0.5 + separation * 0.5;
  const cy = s * 0.5;
  const innerR = r * 0.52;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left conduit outer ring */}
      <circle cx={lx} cy={cy} r={r} stroke={base} strokeWidth={sw} fill="none" />
      {/* Left conduit inner ring */}
      <circle cx={lx} cy={cy} r={innerR} stroke={base} strokeWidth={sw * 0.6} fill="none" />
      {/* Right conduit outer ring */}
      <circle cx={rx} cy={cy} r={r} stroke={base} strokeWidth={sw} fill="none" />
      {/* Right conduit inner ring */}
      <circle cx={rx} cy={cy} r={innerR} stroke={base} strokeWidth={sw * 0.6} fill="none" />
      {/* Intersection fill — the splice zone */}
      {accent && (
        <path
          d={`
            M ${s * 0.5} ${cy - Math.sqrt(r * r - (separation * 0.5) * (separation * 0.5))}
            A ${r} ${r} 0 0 1 ${s * 0.5} ${cy + Math.sqrt(r * r - (separation * 0.5) * (separation * 0.5))}
            A ${r} ${r} 0 0 1 ${s * 0.5} ${cy - Math.sqrt(r * r - (separation * 0.5) * (separation * 0.5))}
          `}
          fill={acc}
          opacity="0.18"
        />
      )}
      {/* Center seam line — the actual splice */}
      <line
        x1={s * 0.5}
        y1={cy - r * 0.88}
        x2={s * 0.5}
        y2={cy + r * 0.88}
        stroke={accent ? acc : base}
        strokeWidth={sw * 0.5}
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ConduitFavicon({ accent = false }: { accent?: boolean }) {
  return <ConduitIcon accent={accent} size={16} />;
}

export function ConduitWordmark({ accent = false, scale = "header" }: ConduitProps) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const accentColor = accent ? acc : base;

  if (scale === "favicon") {
    return <ConduitFavicon accent={accent} />;
  }

  if (scale === "product") {
    return (
      <svg width="170" height="32" viewBox="0 0 170 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ConduitIcon accent={accent} size={26} />
        <text x="34" y="16" dominantBaseline="middle" className="font-display" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        <text x="34" y="27" dominantBaseline="middle" className="font-mono" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
      </svg>
    );
  }

  // Header
  return (
    <svg width="400" height="72" viewBox="0 0 400 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ConduitIcon accent={accent} size={54} />
      <text x="68" y="40" dominantBaseline="middle" className="font-display" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
      <text x="68" y="60" dominantBaseline="middle" className="font-mono" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
    </svg>
  );
}

export function ConduitBW() {
  return <ConduitWordmark accent={false} scale="header" />;
}

export function ConduitAccent() {
  return <ConduitWordmark accent={true} scale="header" />;
}
