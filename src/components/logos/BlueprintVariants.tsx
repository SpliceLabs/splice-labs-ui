// Blueprint Variants — Three distinct interpretations of the schematic/blueprint concept

// ─── VARIANT A: FORK (original concept refined) ───
// Horizontal input rail → ringed node → two angled output arms with terminal dots.
// Classic schematic fork.

export function BlueprintVA_Icon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const stroke = "#E8EAF0";
  const nodeStroke = accent ? "#00D4B4" : "#E8EAF0";
  const nodeFill = accent ? "#00D4B4" : "transparent";
  const sw = size * 0.05;
  const s = size;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1={s * 0.08} y1={s * 0.5} x2={s * 0.38} y2={s * 0.5} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={s * 0.38} y1={s * 0.5} x2={s * 0.62} y2={s * 0.22} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={s * 0.38} y1={s * 0.5} x2={s * 0.62} y2={s * 0.78} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      <circle cx={s * 0.62} cy={s * 0.22} r={sw * 1.2} fill={stroke}/>
      <circle cx={s * 0.62} cy={s * 0.78} r={sw * 1.2} fill={stroke}/>
      <circle cx={s * 0.38} cy={s * 0.5} r={sw * 2.2} fill="hsl(210,14%,6%)" stroke={nodeStroke} strokeWidth={sw * 0.8}/>
      <circle cx={s * 0.38} cy={s * 0.5} r={sw * 0.9} fill={nodeFill === "transparent" ? stroke : nodeFill}/>
    </svg>
  );
}

export function BlueprintVA_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const sub = accent ? "#00D4B4" : "hsl(210,10%,50%)";
  if (scale === "favicon") return <BlueprintVA_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <BlueprintVA_Icon accent={accent} size={22} />
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
          <text x="74" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.14em" fill={sub}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <BlueprintVA_Icon accent={accent} size={48} />
      <div className="flex flex-col gap-0.5">
        <svg width="210" height="40" viewBox="0 0 210 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" fontFamily="'Space Grotesk', sans-serif" fontSize="30" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
        </svg>
        <svg width="210" height="16" viewBox="0 0 210 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="1" y="12" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.28em" fill={sub}>LABS</text>
        </svg>
      </div>
    </div>
  );
}


// ─── VARIANT B: CROSSHAIR ───
// Four rails (N/S/E/W) meeting at a ringed node — a schematic crosshair.
// Terminal dots at all four endpoints. The node is the junction of four systems.

export function BlueprintVB_Icon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const stroke = "#E8EAF0";
  const nodeStroke = accent ? "#00D4B4" : "#E8EAF0";
  const nodeFill = accent ? "#00D4B4" : "transparent";
  const sw = size * 0.045;
  const s = size;
  const cx = s * 0.5;
  const cy = s * 0.5;
  const nr = sw * 2.4;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Four rails */}
      <line x1={s * 0.08} y1={cy} x2={cx - nr - sw} y2={cy} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={cx + nr + sw} y1={cy} x2={s * 0.92} y2={cy} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={cx} y1={s * 0.08} x2={cx} y2={cy - nr - sw} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      <line x1={cx} y1={cy + nr + sw} x2={cx} y2={s * 0.92} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Terminal dots */}
      <circle cx={s * 0.08} cy={cy} r={sw * 1.1} fill={stroke}/>
      <circle cx={s * 0.92} cy={cy} r={sw * 1.1} fill={stroke}/>
      <circle cx={cx} cy={s * 0.08} r={sw * 1.1} fill={stroke}/>
      <circle cx={cx} cy={s * 0.92} r={sw * 1.1} fill={stroke}/>
      {/* Center node */}
      <circle cx={cx} cy={cy} r={nr} fill="hsl(210,14%,6%)" stroke={nodeStroke} strokeWidth={sw * 0.8}/>
      <circle cx={cx} cy={cy} r={sw * 0.9} fill={nodeFill === "transparent" ? stroke : nodeFill}/>
    </svg>
  );
}

export function BlueprintVB_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const sub = accent ? "#00D4B4" : "hsl(210,10%,50%)";
  if (scale === "favicon") return <BlueprintVB_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <BlueprintVB_Icon accent={accent} size={22} />
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
          <text x="74" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.14em" fill={sub}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <BlueprintVB_Icon accent={accent} size={48} />
      <div className="flex flex-col gap-0.5">
        <svg width="210" height="40" viewBox="0 0 210 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" fontFamily="'Space Grotesk', sans-serif" fontSize="30" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
        </svg>
        <svg width="210" height="16" viewBox="0 0 210 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="1" y="12" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.28em" fill={sub}>LABS</text>
        </svg>
      </div>
    </div>
  );
}


// ─── VARIANT C: CASCADE ───
// Two ringed nodes connected in series by a rail. Input → Node1 → Node2 → Output.
// A chain diagram — sequential processing, pipeline logic.

export function BlueprintVC_Icon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const stroke = "#E8EAF0";
  const nodeStroke = accent ? "#00D4B4" : "#E8EAF0";
  const nodeFill = accent ? "#00D4B4" : "transparent";
  const sw = size * 0.045;
  const s = size;
  const cy = s * 0.5;
  const n1x = s * 0.32;
  const n2x = s * 0.68;
  const nr = sw * 1.8;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Input rail */}
      <line x1={s * 0.06} y1={cy} x2={n1x - nr - sw * 0.5} y2={cy} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Connecting rail */}
      <line x1={n1x + nr + sw * 0.5} y1={cy} x2={n2x - nr - sw * 0.5} y2={cy} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Output rail */}
      <line x1={n2x + nr + sw * 0.5} y1={cy} x2={s * 0.94} y2={cy} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Terminal dots */}
      <circle cx={s * 0.06} cy={cy} r={sw * 1.1} fill={stroke}/>
      <circle cx={s * 0.94} cy={cy} r={sw * 1.1} fill={stroke}/>
      {/* Node 1 */}
      <circle cx={n1x} cy={cy} r={nr} fill="hsl(210,14%,6%)" stroke={nodeStroke} strokeWidth={sw * 0.7}/>
      <circle cx={n1x} cy={cy} r={sw * 0.7} fill={nodeFill === "transparent" ? stroke : nodeFill}/>
      {/* Node 2 */}
      <circle cx={n2x} cy={cy} r={nr} fill="hsl(210,14%,6%)" stroke={nodeStroke} strokeWidth={sw * 0.7}/>
      <circle cx={n2x} cy={cy} r={sw * 0.7} fill={nodeFill === "transparent" ? stroke : nodeFill}/>
    </svg>
  );
}

export function BlueprintVC_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const sub = accent ? "#00D4B4" : "hsl(210,10%,50%)";
  if (scale === "favicon") return <BlueprintVC_Icon accent={accent} size={16} />;
  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <BlueprintVC_Icon accent={accent} size={22} />
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="15" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
          <text x="74" y="18" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fontWeight="400" letterSpacing="0.14em" fill={sub}>LABS</text>
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <BlueprintVC_Icon accent={accent} size={48} />
      <div className="flex flex-col gap-0.5">
        <svg width="210" height="40" viewBox="0 0 210 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" fontFamily="'Space Grotesk', sans-serif" fontSize="30" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
        </svg>
        <svg width="210" height="16" viewBox="0 0 210 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="1" y="12" fontFamily="'Space Grotesk', sans-serif" fontSize="11" fontWeight="400" letterSpacing="0.28em" fill={sub}>LABS</text>
        </svg>
      </div>
    </div>
  );
}
