// Direction 1: MERIDIAN — Severe Minimal Wordmark
// A hairline vertical cut bisects the "I" in SPLICE, implying a junction without decoration.

export function MeridianWordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: "favicon" | "header" | "product" }) {
  const accentColor = "#00D4B4";
  const baseColor = accent ? "#E8EAF0" : "#E8EAF0";
  const cutColor = accent ? accentColor : "#E8EAF0";

  if (scale === "favicon") {
    // 16px: just the cut "I" mark
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="1" width="4" height="1.5" fill={baseColor} />
        <rect x="6" y="13.5" width="4" height="1.5" fill={baseColor} />
        <rect x="7.25" y="3" width="1.5" height="4" fill={baseColor} />
        <rect x="7.25" y="9" width="1.5" height="4" fill={baseColor} />
        <rect x="6.5" y="7.25" width="3" height="1.5" fill={cutColor} />
      </svg>
    );
  }

  if (scale === "product") {
    return (
      <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="21" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="700" letterSpacing="-0.04em" fill={baseColor}>
          SPLICE
        </text>
        {/* Hairline cut through the I */}
        <rect x="26.5" y="6" width="1" height="16" fill={baseColor} />
        <rect x="26" y="12.5" width="2" height="1" fill={cutColor} />
      </svg>
    );
  }

  // Header scale — full wordmark
  return (
    <svg width="340" height="52" viewBox="0 0 340 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* SPLICE — custom spaced letterforms */}
      {/* S */}
      <path d="M0 38 C0 38 0 44 8 44 C16 44 16 38 8 38 C0 38 0 32 8 32 C12 32 16 34 16 34" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* P */}
      <line x1="24" y1="44" x2="24" y2="28" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 28 L31 28 C35 28 36 32 36 34 C36 36 35 40 31 40 L24 40" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* L */}
      <line x1="44" y1="28" x2="44" y2="44" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="44" y1="44" x2="56" y2="44" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      {/* I — with splice cut */}
      <line x1="64" y1="28" x2="72" y2="28" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="64" y1="44" x2="72" y2="44" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="68" y1="28" x2="68" y2="35" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="68" y1="37.5" x2="68" y2="44" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      {/* The splice — a precise horizontal cut with accent */}
      <line x1="65" y1="36.25" x2="71" y2="36.25" stroke={cutColor} strokeWidth="1.5" strokeLinecap="square"/>
      {/* C */}
      <path d="M88 30 C85 27 78 27 78 36 C78 45 85 45 88 42" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* E */}
      <line x1="96" y1="28" x2="96" y2="44" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="96" y1="28" x2="108" y2="28" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="96" y1="36" x2="105" y2="36" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="96" y1="44" x2="108" y2="44" stroke={baseColor} strokeWidth="2.5" strokeLinecap="round"/>
      {/* LABS — lighter weight, wider tracking */}
      <text x="120" y="44" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="400" letterSpacing="0.18em" fill={accent ? accentColor : "hsl(210,10%,50%)"}>LABS</text>
    </svg>
  );
}

export function MeridianBW() {
  return <MeridianWordmark accent={false} scale="header" />;
}

export function MeridianAccent() {
  return <MeridianWordmark accent={true} scale="header" />;
}
