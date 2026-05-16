// Junction Variants — Three distinct interpretations of the convergence/junction concept

// ─── VARIANT A: Y-MERGE (original concept refined) ───
// Two angled input rails converge at a circular node, single horizontal output.
// The classic "two become one" merge.

export function JunctionVA_Icon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const rail = "#E8EAF0";
  const node = accent ? "#00D4B4" : "#E8EAF0";
  const s = size;
  const cx = s * 0.42;
  const cy = s * 0.5;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1={s * 0.06} y1={s * 0.22} x2={cx - s * 0.05} y2={cy} stroke={rail} strokeWidth={s * 0.048} strokeLinecap="round"/>
      <line x1={s * 0.06} y1={s * 0.78} x2={cx - s * 0.05} y2={cy} stroke={rail} strokeWidth={s * 0.048} strokeLinecap="round"/>
      <line x1={cx + s * 0.05} y1={cy} x2={s * 0.94} y2={cy} stroke={rail} strokeWidth={s * 0.048} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={s * 0.09} fill={node} />
      <circle cx={cx} cy={cy} r={s * 0.04} fill="#0A1014" />
    </svg>
  );
}

export function JunctionVA_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const sub = accent ? "#00D4B4" : "hsl(210,10%,50%)";

  if (scale === "favicon") return <JunctionVA_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2">
        <JunctionVA_Icon accent={accent} size={24} />
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.03em" fill={base}>SPLICE</text>
          <text x="75" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.15em" fill={sub}>LABS</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <JunctionVA_Icon accent={accent} size={44} />
      <svg width="200" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="36" fontFamily="'Space Grotesk', sans-serif" fontSize="32" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        <text x="2" y="48" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.22em" fill={sub}>LABS</text>
      </svg>
    </div>
  );
}


// ─── VARIANT B: T-SPLIT ───
// A single vertical input from top drops into a horizontal rail that exits left and right.
// The node sits at the T-junction. Reads as "one becomes two" — distribution, not convergence.

export function JunctionVB_Icon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const rail = "#E8EAF0";
  const node = accent ? "#00D4B4" : "#E8EAF0";
  const s = size;
  const cx = s * 0.5;
  const cy = s * 0.55;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical input from top */}
      <line x1={cx} y1={s * 0.08} x2={cx} y2={cy - s * 0.06} stroke={rail} strokeWidth={s * 0.048} strokeLinecap="square"/>
      {/* Horizontal rail — left */}
      <line x1={s * 0.08} y1={cy} x2={cx - s * 0.06} y2={cy} stroke={rail} strokeWidth={s * 0.048} strokeLinecap="square"/>
      {/* Horizontal rail — right */}
      <line x1={cx + s * 0.06} y1={cy} x2={s * 0.92} y2={cy} stroke={rail} strokeWidth={s * 0.048} strokeLinecap="square"/>
      {/* Terminal dots */}
      <circle cx={s * 0.08} cy={cy} r={s * 0.025} fill={rail}/>
      <circle cx={s * 0.92} cy={cy} r={s * 0.025} fill={rail}/>
      {/* Node */}
      <circle cx={cx} cy={cy} r={s * 0.085} fill={node} />
      <circle cx={cx} cy={cy} r={s * 0.038} fill="#0A1014" />
    </svg>
  );
}

export function JunctionVB_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const sub = accent ? "#00D4B4" : "hsl(210,10%,50%)";

  if (scale === "favicon") return <JunctionVB_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2">
        <JunctionVB_Icon accent={accent} size={24} />
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.03em" fill={base}>SPLICE</text>
          <text x="75" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.15em" fill={sub}>LABS</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <JunctionVB_Icon accent={accent} size={44} />
      <svg width="200" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="36" fontFamily="'Space Grotesk', sans-serif" fontSize="32" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        <text x="2" y="48" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.22em" fill={sub}>LABS</text>
      </svg>
    </div>
  );
}


// ─── VARIANT C: TRIDENT ───
// Three equal-angle rails (120° apart) meeting at a single center node.
// Reads as a multi-protocol junction — three systems, one point.
// No hierarchy between arms. Pure convergence.

export function JunctionVC_Icon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const rail = "#E8EAF0";
  const node = accent ? "#00D4B4" : "#E8EAF0";
  const s = size;
  const cx = s * 0.5;
  const cy = s * 0.5;
  const armLen = s * 0.38;
  // Three arms at 90° (up), 210°, 330°
  const angles = [-90, 150, 30];
  const arms = angles.map(a => {
    const rad = (a * Math.PI) / 180;
    return { x: cx + armLen * Math.cos(rad), y: cy + armLen * Math.sin(rad) };
  });

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {arms.map((arm, i) => (
        <line key={i} x1={cx} y1={cy} x2={arm.x} y2={arm.y} stroke={rail} strokeWidth={s * 0.045} strokeLinecap="round"/>
      ))}
      <circle cx={cx} cy={cy} r={s * 0.1} fill={node} />
      <circle cx={cx} cy={cy} r={s * 0.045} fill="#0A1014" />
    </svg>
  );
}

export function JunctionVC_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const sub = accent ? "#00D4B4" : "hsl(210,10%,50%)";

  if (scale === "favicon") return <JunctionVC_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2">
        <JunctionVC_Icon accent={accent} size={24} />
        <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="16" fontWeight="700" letterSpacing="-0.03em" fill={base}>SPLICE</text>
          <text x="75" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.15em" fill={sub}>LABS</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <JunctionVC_Icon accent={accent} size={44} />
      <svg width="200" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="36" fontFamily="'Space Grotesk', sans-serif" fontSize="32" fontWeight="700" letterSpacing="-0.04em" fill={base}>SPLICE</text>
        <text x="2" y="48" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.22em" fill={sub}>LABS</text>
      </svg>
    </div>
  );
}
