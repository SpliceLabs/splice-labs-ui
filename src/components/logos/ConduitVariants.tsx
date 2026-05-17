// Conduit Variants — Three distinct interpretations of the cable cross-section / conduit concept

// ─── VARIANT A: RINGS (original refined) ───
// Two concentric ring pairs overlapping with center seam line.

export function ConduitVA_Icon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.055;
  const r = s * 0.32;
  const separation = r * 0.85;
  const lx = s * 0.5 - separation * 0.5;
  const rx = s * 0.5 + separation * 0.5;
  const cy = s * 0.5;
  const innerR = r * 0.52;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={lx} cy={cy} r={r} stroke={base} strokeWidth={sw} fill="none" />
      <circle cx={lx} cy={cy} r={innerR} stroke={base} strokeWidth={sw * 0.6} fill="none" />
      <circle cx={rx} cy={cy} r={r} stroke={base} strokeWidth={sw} fill="none" />
      <circle cx={rx} cy={cy} r={innerR} stroke={base} strokeWidth={sw * 0.6} fill="none" />
      {accent && (
        <path
          d={`M ${s * 0.5} ${cy - Math.sqrt(r * r - (separation * 0.5) * (separation * 0.5))}
              A ${r} ${r} 0 0 1 ${s * 0.5} ${cy + Math.sqrt(r * r - (separation * 0.5) * (separation * 0.5))}
              A ${r} ${r} 0 0 1 ${s * 0.5} ${cy - Math.sqrt(r * r - (separation * 0.5) * (separation * 0.5))}`}
          fill={acc} opacity="0.18"
        />
      )}
      <line x1={s * 0.5} y1={cy - r * 0.88} x2={s * 0.5} y2={cy + r * 0.88} stroke={accent ? acc : base} strokeWidth={sw * 0.5} strokeLinecap="square"/>
    </svg>
  );
}

export function ConduitVA_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const accentColor = accent ? "#00D4B4" : base;
  if (scale === "favicon") return <ConduitVA_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-3">
        <ConduitVA_Icon accent={accent} size={26} />
        <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="16" className="font-display" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
          <text x="0" y="25" className="font-mono" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <ConduitVA_Icon accent={accent} size={54} />
      <div className="flex flex-col">
        <svg width="240" height="44" viewBox="0 0 240 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="34" className="font-display" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        </svg>
        <svg width="240" height="16" viewBox="0 0 240 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="12" className="font-mono" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}


// ─── VARIANT B: VESICA ───
// Two simple circles (no inner rings) overlapping to form a vesica piscis.
// The vesica (almond shape) IS the splice zone. Simpler, bolder, more iconic.
// In accent, the vesica fills with accent color.

export function ConduitVB_Icon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.05;
  const r = s * 0.3;
  const sep = r * 0.7;
  const lx = s * 0.5 - sep * 0.5;
  const rx = s * 0.5 + sep * 0.5;
  const cy = s * 0.5;
  // Vesica intersection points
  const halfChord = Math.sqrt(r * r - (sep * 0.5) * (sep * 0.5));

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vesica fill */}
      {accent && (
        <path
          d={`M ${s * 0.5} ${cy - halfChord}
              A ${r} ${r} 0 0 1 ${s * 0.5} ${cy + halfChord}
              A ${r} ${r} 0 0 1 ${s * 0.5} ${cy - halfChord}`}
          fill={acc} opacity="0.22"
        />
      )}
      {/* Left circle */}
      <circle cx={lx} cy={cy} r={r} stroke={base} strokeWidth={sw} fill="none" />
      {/* Right circle */}
      <circle cx={rx} cy={cy} r={r} stroke={base} strokeWidth={sw} fill="none" />
      {/* Center dot */}
      <circle cx={s * 0.5} cy={cy} r={sw * 0.8} fill={accent ? acc : base}/>
    </svg>
  );
}

export function ConduitVB_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const accentColor = accent ? "#00D4B4" : base;
  if (scale === "favicon") return <ConduitVB_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-3">
        <ConduitVB_Icon accent={accent} size={26} />
        <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="16" className="font-display" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
          <text x="0" y="25" className="font-mono" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <ConduitVB_Icon accent={accent} size={54} />
      <div className="flex flex-col">
        <svg width="240" height="44" viewBox="0 0 240 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="34" className="font-display" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        </svg>
        <svg width="240" height="16" viewBox="0 0 240 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="12" className="font-mono" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}


// ─── VARIANT C: LINEAR SPLICE ───
// Side view instead of end-on: two parallel horizontal lines converge into one.
// The merge point has a short overlap zone. Like a fiber splice viewed from the side.
// Simpler, more diagrammatic, unique angle.

export function ConduitVC_Icon({ accent = false, size = 48 }: { accent?: boolean; size?: number }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const s = size;
  const sw = s * 0.055;
  const cy = s * 0.5;
  const gap = s * 0.14; // vertical gap between the two lines
  const mergeX = s * 0.55; // where they merge
  const overlapStart = s * 0.4; // overlap zone start

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Upper line — left to merge */}
      <line x1={s * 0.06} y1={cy - gap} x2={overlapStart} y2={cy - gap} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={overlapStart} y1={cy - gap} x2={mergeX} y2={cy} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      {/* Lower line — left to merge */}
      <line x1={s * 0.06} y1={cy + gap} x2={overlapStart} y2={cy + gap} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={overlapStart} y1={cy + gap} x2={mergeX} y2={cy} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      {/* Output line — merged */}
      <line x1={mergeX} y1={cy} x2={s * 0.94} y2={cy} stroke={base} strokeWidth={sw} strokeLinecap="square"/>
      {/* Splice point indicator */}
      <circle cx={mergeX} cy={cy} r={sw * 1.3} fill={accent ? acc : base}/>
      <circle cx={mergeX} cy={cy} r={sw * 0.5} fill="#0A1014"/>
      {/* Overlap zone highlight */}
      {accent && (
        <rect x={overlapStart} y={cy - gap - sw} width={mergeX - overlapStart} height={gap * 2 + sw * 2} fill={acc} opacity="0.08" rx="0"/>
      )}
    </svg>
  );
}

export function ConduitVC_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const accentColor = accent ? "#00D4B4" : base;
  if (scale === "favicon") return <ConduitVC_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-3">
        <ConduitVC_Icon accent={accent} size={26} />
        <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="16" className="font-display" fontSize="15" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
          <text x="0" y="25" className="font-mono" fontSize="7" letterSpacing="0.18em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <ConduitVC_Icon accent={accent} size={54} />
      <div className="flex flex-col">
        <svg width="240" height="44" viewBox="0 0 240 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="34" className="font-display" fontSize="42" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        </svg>
        <svg width="240" height="16" viewBox="0 0 240 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="12" className="font-mono" fontSize="10" letterSpacing="0.22em" fill={accentColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}
