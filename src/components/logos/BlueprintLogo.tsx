// Direction 4: BLUEPRINT — Diagrammatic / Blueprint System Mark
// A precise junction node: three controlled line segments meeting at a point,
// like a schematic trace diagram. Structured line weights. Technical drawing logic.

interface BlueprintProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
  iconOnly?: boolean;
}

export function BlueprintIcon({ accent = false, size = 40 }: { accent?: boolean; size?: number }) {
  const stroke = "#E8EAF0";
  const nodeStroke = accent ? "#00D4B4" : "#E8EAF0";
  const nodeFill = accent ? "#00D4B4" : "transparent";
  const sw = size * 0.05;
  const s = size;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal input rail */}
      <line x1={s * 0.08} y1={s * 0.5} x2={s * 0.38} y2={s * 0.5} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Junction: up-right arm */}
      <line x1={s * 0.38} y1={s * 0.5} x2={s * 0.62} y2={s * 0.22} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Junction: down-right arm */}
      <line x1={s * 0.38} y1={s * 0.5} x2={s * 0.62} y2={s * 0.78} stroke={stroke} strokeWidth={sw} strokeLinecap="square"/>
      {/* Terminal dots — right ends */}
      <circle cx={s * 0.62} cy={s * 0.22} r={sw * 1.2} fill={stroke}/>
      <circle cx={s * 0.62} cy={s * 0.78} r={sw * 1.2} fill={stroke}/>
      {/* Junction node */}
      <circle cx={s * 0.38} cy={s * 0.5} r={sw * 2.2} fill="hsl(210,14%,6%)" stroke={nodeStroke} strokeWidth={sw * 0.8}/>
      <circle cx={s * 0.38} cy={s * 0.5} r={sw * 0.9} fill={nodeFill === "transparent" ? stroke : nodeFill}/>
    </svg>
  );
}

export function BlueprintWordmark({ accent = false, scale = "header" }: BlueprintProps) {
  const base = "#E8EAF0";
  const subColor = accent ? "#00D4B4" : "hsl(210,10%,50%)";

  if (scale === "favicon") {
    return <BlueprintIcon accent={accent} size={16} />;
  }

  if (scale === "product") {
    return (
      <div className="flex items-center gap-2.5">
        <BlueprintIcon accent={accent} size={22} />
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" className="font-display" fontSize="15" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
          <text x="74" y="18" className="font-display" fontSize="10" fontWeight="400" letterSpacing="0.14em" fill={subColor}>LABS</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <BlueprintIcon accent={accent} size={48} />
      <div className="flex flex-col gap-0.5">
        <svg width="210" height="40" viewBox="0 0 210 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="30" className="font-display" fontSize="30" fontWeight="600" letterSpacing="0.06em" fill={base}>SPLICE</text>
        </svg>
        <svg width="210" height="16" viewBox="0 0 210 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="1" y="12" className="font-display" fontSize="11" fontWeight="400" letterSpacing="0.28em" fill={subColor}>LABS</text>
        </svg>
      </div>
    </div>
  );
}

export function BlueprintBW() {
  return <BlueprintWordmark accent={false} scale="header" />;
}

export function BlueprintAccent() {
  return <BlueprintWordmark accent={true} scale="header" />;
}
