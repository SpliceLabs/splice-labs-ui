// Direction 06: CROSS — Perpendicular Axis Mark
// A pure orthogonal intersection: one vertical rail, one horizontal rail.
// They cross at a precise point. The crossing is the mark.
// No node circle, no terminal dots — only the gap where they meet.
// In the accent version, the short segment above the crossing (the "splice point")
// takes the accent color. The mark is the simplest possible representation
// of two systems meeting: an axis.

interface CrossProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
}

export function CrossIcon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.083; // stroke weight ~4pt at 48
  // Cross center
  const cx = s * 0.5;
  const cy = s * 0.5;
  // Horizontal rail: full width
  // Vertical rail: from top to bottom
  // Gap at center: 1.5× stroke weight
  const gap = sw * 1.4;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal rail — left of center */}
      <line
        x1={s * 0.08}
        y1={cy}
        x2={cx - gap / 2}
        y2={cy}
        stroke={base}
        strokeWidth={sw}
        strokeLinecap="square"
      />
      {/* Horizontal rail — right of center */}
      <line
        x1={cx + gap / 2}
        y1={cy}
        x2={s * 0.92}
        y2={cy}
        stroke={base}
        strokeWidth={sw}
        strokeLinecap="square"
      />
      {/* Vertical rail — above center */}
      <line
        x1={cx}
        y1={s * 0.08}
        x2={cx}
        y2={cy - gap / 2}
        stroke={accent ? acc : base}
        strokeWidth={sw}
        strokeLinecap="square"
      />
      {/* Vertical rail — below center (thinner, secondary) */}
      <line
        x1={cx}
        y1={cy + gap / 2}
        x2={cx}
        y2={s * 0.92}
        stroke={base}
        strokeWidth={sw * 0.5}
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CrossWordmark({ accent = false, scale = "header" }: CrossProps) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const accentColor = accent ? acc : base;

  if (scale === "favicon") {
    return <CrossIcon accent={accent} size={16} />;
  }

  if (scale === "product") {
    return (
      <svg width="160" height="32" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Icon */}
        <CrossIcon accent={accent} size={22} />
        {/* SPLICE */}
        <text x="30" y="16" dominantBaseline="middle" className="font-display" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        <text x="30" y="27" dominantBaseline="middle" className="font-mono" fontSize="7" fontWeight="400" letterSpacing="0.18em" fill={accentColor}>LABS</text>
      </svg>
    );
  }

  // Header
  return (
    <svg width="400" height="72" viewBox="0 0 400 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <CrossIcon accent={accent} size={52} />
      <text x="66" y="40" dominantBaseline="middle" className="font-display" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
      <text x="67" y="60" dominantBaseline="middle" className="font-mono" fontSize="10" fontWeight="400" letterSpacing="0.22em" fill={accentColor}>LABS</text>
    </svg>
  );
}

export function CrossBW() {
  return <CrossWordmark accent={false} scale="header" />;
}

export function CrossAccent() {
  return <CrossWordmark accent={true} scale="header" />;
}
