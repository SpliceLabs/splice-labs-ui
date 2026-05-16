// Direction 07: INCISE — Full-Wordmark Diagonal Cut
// The entire word SPLICE is bisected by a single diagonal hairline.
// The two halves are offset: top-half shifts 2px right, bottom-half shifts 2px left.
// The cut itself is rendered as a 1px line at exactly 8° from horizontal,
// passing through the full width of the word at vertical midpoint.
// In black and white, the cut reads as a structural joint.
// In the accent version, the cut line takes the accent color —
// the splice runs through the entire name, not just one letter.
// No separate icon. At favicon scale, a compressed S-glyph with the diagonal cut.

interface InciseProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
}

export function InciseFavicon({ accent = false }: { accent?: boolean }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* S-form via horizontal bars, cut through by diagonal */}
      {/* Top block */}
      <rect x="2" y="2" width="12" height="3" fill={base} />
      {/* Upper-mid connector left */}
      <rect x="2" y="5" width="3" height="3" fill={base} />
      {/* Middle bar — split by cut */}
      <rect x="2" y="7.5" width="12" height="2" fill={base} />
      {/* Lower-mid connector right */}
      <rect x="11" y="9.5" width="3" height="2.5" fill={base} />
      {/* Bottom block */}
      <rect x="2" y="11" width="12" height="3" fill={base} />
      {/* Diagonal cut */}
      <line x1="1" y1="9.5" x2="15" y2="7" stroke={accent ? acc : base} strokeWidth="0.8" />
    </svg>
  );
}

export function InciseWordmark({ accent = false, scale = "header" }: InciseProps) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const accentColor = accent ? acc : base;
  const cutColor = accent ? acc : "rgba(232,234,240,0.35)";

  if (scale === "favicon") {
    return <InciseFavicon accent={accent} />;
  }

  if (scale === "product") {
    // At product scale: single clean wordmark, cut line visible
    const w = 160;
    const textY = 14;
    const cutY = 12; // vertical midpoint of text
    const dx = 1.5; // offset per half
    return (
      <svg width={w} height="28" viewBox={`0 0 ${w} 28`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clipping: top half — shift right */}
        <defs>
          <clipPath id="incise-top-p">
            <rect x="0" y="0" width={w} height={cutY} />
          </clipPath>
          <clipPath id="incise-bot-p">
            <rect x="0" y={cutY} width={w} height={28 - cutY} />
          </clipPath>
        </defs>
        <text x={dx} y={textY} fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.04em" fill={base} clipPath="url(#incise-top-p)">SPLICE</text>
        <text x={-dx} y={textY} fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.04em" fill={base} clipPath="url(#incise-bot-p)">SPLICE</text>
        {/* LABS */}
        <text x="0" y="26" fontFamily="'Space Mono', monospace" fontSize="6" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        {/* The cut line — diagonal at 6° */}
        <line x1="0" y1={cutY + 1.5} x2="110" y2={cutY - 1.5} stroke={cutColor} strokeWidth="0.75" />
      </svg>
    );
  }

  // Header scale
  const w = 420;
  const h = 80;
  const textY = 58;
  const cutY = 37; // mid-height of the large text
  const dx = 2.5;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="incise-top-h">
          <rect x="0" y="0" width={w} height={cutY} />
        </clipPath>
        <clipPath id="incise-bot-h">
          <rect x="0" y={cutY} width={w} height={h - cutY} />
        </clipPath>
      </defs>
      {/* Top half — shifted right */}
      <text x={dx} y={textY} fontFamily="'Space Grotesk', sans-serif" fontSize="52" fontWeight="700" letterSpacing="-0.045em" fill={base} clipPath="url(#incise-top-h)">SPLICE</text>
      {/* Bottom half — shifted left */}
      <text x={-dx} y={textY} fontFamily="'Space Grotesk', sans-serif" fontSize="52" fontWeight="700" letterSpacing="-0.045em" fill={base} clipPath="url(#incise-bot-h)">SPLICE</text>
      {/* The cut */}
      <line x1="0" y1={cutY + 3.5} x2="340" y2={cutY - 3.5} stroke={cutColor} strokeWidth="1" />
      {/* LABS */}
      <text x="2" y={h - 4} fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
    </svg>
  );
}

export function InciseBW() {
  return <InciseWordmark accent={false} scale="header" />;
}

export function InciseAccent() {
  return <InciseWordmark accent={true} scale="header" />;
}
