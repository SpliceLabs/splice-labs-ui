// Cross Variants — Three distinct interpretations of perpendicular intersection

// ─── VARIANT A: GAP CROSS (original refined) ───
// Perpendicular rails with gap at center. Upper arm accented, lower arm tapered.

export function CrossVA_Icon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.083;
  const cx = s * 0.5;
  const cy = s * 0.5;
  const gap = sw * 1.4;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1={s * 0.08} y1={cy} x2={cx - gap / 2} y2={cy} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={cx + gap / 2} y1={cy} x2={s * 0.92} y2={cy} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={cx} y1={s * 0.08} x2={cx} y2={cy - gap / 2} stroke={accent ? acc : base} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={cx} y1={cy + gap / 2} x2={cx} y2={s * 0.92} stroke={base} strokeWidth={sw * 0.5} strokeLinecap="square"/>
    </svg>
  );
}

export function CrossVA_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const accentColor = accent ? "#00D4B4" : base;
  if (scale === "favicon") return <CrossVA_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <CrossVA_Icon accent={accent} size={22} />
        <svg width="130" height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="16" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
          <text x="0" y="24" fontFamily="'Space Mono', monospace" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <CrossVA_Icon accent={accent} size={52} />
      <div className="flex flex-col">
        <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="32" fontFamily="'Space Grotesk', sans-serif" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        </svg>
        <svg width="220" height="16" viewBox="0 0 220 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="12" fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}


// ─── VARIANT B: OFFSET CROSS ───
// The four arms don't perfectly align — each is shifted by a few pixels from center,
// creating a "near miss" at the intersection. The splice is the misalignment itself.
// No gap — arms overlap but are offset.

export function CrossVB_Icon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.07;
  const cx = s * 0.5;
  const cy = s * 0.5;
  const offset = s * 0.04; // the misalignment

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal — shifted up slightly */}
      <line x1={s * 0.08} y1={cy - offset} x2={s * 0.92} y2={cy - offset} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      {/* Vertical — shifted right slightly */}
      <line x1={cx + offset} y1={s * 0.08} x2={cx + offset} y2={s * 0.92} stroke={accent ? acc : base} strokeWidth={sw} strokeLinecap="square"/>
      {/* Small accent square at the center overlap zone */}
      {accent && (
        <rect x={cx + offset - sw * 0.3} y={cy - offset - sw * 0.3} width={sw * 0.6} height={sw * 0.6} fill={acc}/>
      )}
    </svg>
  );
}

export function CrossVB_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const accentColor = accent ? "#00D4B4" : base;
  if (scale === "favicon") return <CrossVB_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <CrossVB_Icon accent={accent} size={22} />
        <svg width="130" height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="16" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
          <text x="0" y="24" fontFamily="'Space Mono', monospace" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <CrossVB_Icon accent={accent} size={52} />
      <div className="flex flex-col">
        <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="32" fontFamily="'Space Grotesk', sans-serif" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        </svg>
        <svg width="220" height="16" viewBox="0 0 220 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="12" fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}


// ─── VARIANT C: NOTCHED ───
// A solid plus/cross with a square notch removed from the exact center.
// The absence at the intersection IS the splice — material removed, not added.
// Heavier, more monumental feel.

export function CrossVC_Icon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const armW = s * 0.16; // arm width
  const notch = s * 0.1; // notch size
  const cx = s * 0.5;
  const cy = s * 0.5;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal bar */}
      <rect x={s * 0.08} y={cy - armW / 2} width={s * 0.84} height={armW} fill={base}/>
      {/* Vertical bar */}
      <rect x={cx - armW / 2} y={s * 0.08} width={armW} height={s * 0.84} fill={base}/>
      {/* Center notch — cut out */}
      <rect x={cx - notch / 2} y={cy - notch / 2} width={notch} height={notch} fill="#0A1014"/>
      {/* Accent border on notch */}
      {accent && (
        <rect x={cx - notch / 2} y={cy - notch / 2} width={notch} height={notch} fill="none" stroke={acc} strokeWidth={s * 0.02}/>
      )}
    </svg>
  );
}

export function CrossVC_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const accentColor = accent ? "#00D4B4" : base;
  if (scale === "favicon") return <CrossVC_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <CrossVC_Icon accent={accent} size={22} />
        <svg width="130" height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="16" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
          <text x="0" y="24" fontFamily="'Space Mono', monospace" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <CrossVC_Icon accent={accent} size={52} />
      <div className="flex flex-col">
        <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="32" fontFamily="'Space Grotesk', sans-serif" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        </svg>
        <svg width="220" height="16" viewBox="0 0 220 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="12" fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}
