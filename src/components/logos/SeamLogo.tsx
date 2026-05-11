// Direction 3: SEAM — Typographic Splice Intervention
// The "E" in SPLICE is bisected: the middle bar is detached and offset slightly,
// creating a deliberate splice within the letterform itself.
// No icon. The cut IS the mark.

interface SeamProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
}

export function SeamWordmark({ accent = false, scale = "header" }: SeamProps) {
  const base = "#E8EAF0";
  const cutFill = accent ? "#00D4B4" : "#E8EAF0";
  const subColor = accent ? "#00D4B4" : "hsl(210,10%,50%)";

  if (scale === "favicon") {
    // Reduced to the E-splice as a minimal 16px mark
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="2" y1="2" x2="2" y2="14" stroke={base} strokeWidth="2" strokeLinecap="square"/>
        <line x1="2" y1="2" x2="12" y2="2" stroke={base} strokeWidth="2" strokeLinecap="square"/>
        {/* Middle bar — offset upward (splice cut) */}
        <line x1="2" y1="7.5" x2="9" y2="7.5" stroke={cutFill} strokeWidth="2" strokeLinecap="square"/>
        <line x1="2" y1="14" x2="12" y2="14" stroke={base} strokeWidth="2" strokeLinecap="square"/>
      </svg>
    );
  }

  if (scale === "product") {
    return (
      <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* S */}
        <text x="0" y="21" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLIC</text>
        {/* Custom E: vertical bar + top bar + bottom bar + offset middle */}
        <rect x="88" y="5" width="2" height="16" fill={base}/>
        <rect x="88" y="5" width="12" height="2" fill={base}/>
        {/* Middle bar — 1.5px higher than true center, creating the splice offset */}
        <rect x="88" y="12" width="9" height="2" fill={cutFill}/>
        <rect x="88" y="19" width="12" height="2" fill={base}/>
        {/* LABS */}
        <text x="106" y="21" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.16em" fill={subColor}>LABS</text>
      </svg>
    );
  }

  // Header — full wordmark with custom E
  return (
    <svg width="380" height="56" viewBox="0 0 380 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* SPLC — set in Space Grotesk via text node for SPLIC portion */}
      <text x="0" y="44" fontFamily="'Space Grotesk', sans-serif" fontSize="40" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLIC</text>
      {/* Custom E at approx x=176 based on SPLIC width */}
      {/* Vertical stroke */}
      <rect x="176" y="6" width="3.5" height="38" fill={base}/>
      {/* Top bar */}
      <rect x="176" y="6" width="30" height="3.5" fill={base}/>
      {/* Middle bar — spliced: shifted up 3px from true center, shorter */}
      <rect x="176" y="22.5" width="23" height="3.5" fill={cutFill}/>
      {/* Bottom bar */}
      <rect x="176" y="40.5" width="30" height="3.5" fill={base}/>
      {/* LABS */}
      <text x="215" y="44" fontFamily="'Space Grotesk', sans-serif" fontSize="40" fontWeight="700" letterSpacing="-0.04em" fill={base}>  </text>
      <text x="212" y="53" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="400" letterSpacing="0.22em" fill={subColor}>LABS</text>
    </svg>
  );
}

export function SeamBW() {
  return <SeamWordmark accent={false} scale="header" />;
}

export function SeamAccent() {
  return <SeamWordmark accent={true} scale="header" />;
}
