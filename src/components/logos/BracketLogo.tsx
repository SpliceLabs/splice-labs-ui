// Direction 10: BRACKET — Structural Containment Mark
// Two half-brackets flanking a deliberate gap.
// The gap is the splice — the space between two systems being joined.
// This is borrowed from code and circuit notation: [  ] contains. The mark
// extends both bracket arms but leaves the center open — the "join" is implied,
// not drawn. In the wordmark, SPLICE sits inside the bracket, and the brackets
// themselves are the icon.
// In black and white: pure right-angle stroke geometry.
// In the accent version: only the inner bracket tips — the points closest to the
// gap — take the accent color, focusing the eye on the splice point.
// At favicon: a single open-bracket left [ form, using accent for the inner tip.

interface BracketProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
}

export function BracketFavicon({ accent = false }: { accent?: boolean }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const sw = 1.8;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left bracket */}
      <line x1="4" y1="2.5" x2="4" y2="13.5" stroke={base} strokeWidth={sw} strokeLinecap="square" />
      <line x1="4" y1="2.5" x2="7" y2="2.5" stroke={base} strokeWidth={sw} strokeLinecap="square" />
      <line x1="4" y1="13.5" x2="7" y2="13.5" stroke={base} strokeWidth={sw} strokeLinecap="square" />
      {/* Right bracket */}
      <line x1="12" y1="2.5" x2="12" y2="13.5" stroke={base} strokeWidth={sw} strokeLinecap="square" />
      <line x1="9" y1="2.5" x2="12" y2="2.5" stroke={base} strokeWidth={sw} strokeLinecap="square" />
      <line x1="9" y1="13.5" x2="12" y2="13.5" stroke={base} strokeWidth={sw} strokeLinecap="square" />
      {/* Center gap accent — tiny horizontal lines at the opening */}
      <line x1="7" y1="8" x2="9" y2="8" stroke={accent ? acc : base} strokeWidth={sw * 0.7} strokeLinecap="square" />
    </svg>
  );
}

export function BracketWordmark({ accent = false, scale = "header" }: BracketProps) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const accentColor = accent ? acc : base;
  const sw = scale === "header" ? 3.5 : scale === "product" ? 2 : 1.5;
  const armLen = scale === "header" ? 16 : scale === "product" ? 9 : 5;

  if (scale === "favicon") {
    return <BracketFavicon accent={accent} />;
  }

  if (scale === "product") {
    const h = 32;
    const top = 4, bot = 28;
    const lx = 4, rx = 156;
    return (
      <svg width="160" height={h} viewBox={`0 0 160 ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left bracket */}
        <line x1={lx} y1={top} x2={lx} y2={bot} stroke={base} strokeWidth={sw} strokeLinecap="square" />
        <line x1={lx} y1={top} x2={lx + armLen} y2={top} stroke={base} strokeWidth={sw} strokeLinecap="square" />
        <line x1={lx} y1={bot} x2={lx + armLen} y2={bot} stroke={base} strokeWidth={sw} strokeLinecap="square" />
        {/* Right bracket */}
        <line x1={rx} y1={top} x2={rx} y2={bot} stroke={base} strokeWidth={sw} strokeLinecap="square" />
        <line x1={rx - armLen} y1={top} x2={rx} y2={top} stroke={base} strokeWidth={sw} strokeLinecap="square" />
        <line x1={rx - armLen} y1={bot} x2={rx} y2={bot} stroke={base} strokeWidth={sw} strokeLinecap="square" />
        {/* Inner tips — accent */}
        <line x1={lx + armLen - 2} y1={top} x2={lx + armLen} y2={top} stroke={accentColor} strokeWidth={sw} strokeLinecap="square" />
        <line x1={lx + armLen - 2} y1={bot} x2={lx + armLen} y2={bot} stroke={accentColor} strokeWidth={sw} strokeLinecap="square" />
        <line x1={rx - armLen} y1={top} x2={rx - armLen + 2} y2={top} stroke={accentColor} strokeWidth={sw} strokeLinecap="square" />
        <line x1={rx - armLen} y1={bot} x2={rx - armLen + 2} y2={bot} stroke={accentColor} strokeWidth={sw} strokeLinecap="square" />
        {/* SPLICE wordmark */}
        <text x="20" y="20" dominantBaseline="middle" className="font-display" fontSize="13" fontWeight="700" letterSpacing="-0.03em" fill={base}>SPLICE</text>
        <text x="20" y="29" dominantBaseline="middle" className="font-mono" fontSize="5.5" letterSpacing="0.2em" fill={accentColor} opacity="0.7">LABS</text>
      </svg>
    );
  }

  // Header
  const h = 80;
  const top = 8, bot = 72;
  const lx = 4, rx = 408;
  const swH = 3.5;
  const armH = 20;
  return (
    <svg width="420" height={h} viewBox={`0 0 420 ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left bracket */}
      <line x1={lx} y1={top} x2={lx} y2={bot} stroke={base} strokeWidth={swH} strokeLinecap="square" />
      <line x1={lx} y1={top} x2={lx + armH} y2={top} stroke={base} strokeWidth={swH} strokeLinecap="square" />
      <line x1={lx} y1={bot} x2={lx + armH} y2={bot} stroke={base} strokeWidth={swH} strokeLinecap="square" />
      {/* Right bracket */}
      <line x1={rx} y1={top} x2={rx} y2={bot} stroke={base} strokeWidth={swH} strokeLinecap="square" />
      <line x1={rx - armH} y1={top} x2={rx} y2={top} stroke={base} strokeWidth={swH} strokeLinecap="square" />
      <line x1={rx - armH} y1={bot} x2={rx} y2={bot} stroke={base} strokeWidth={swH} strokeLinecap="square" />
      {/* Inner tips — accent (last 5px of each arm) */}
      <line x1={lx + armH - 5} y1={top} x2={lx + armH} y2={top} stroke={accentColor} strokeWidth={swH} strokeLinecap="square" />
      <line x1={lx + armH - 5} y1={bot} x2={lx + armH} y2={bot} stroke={accentColor} strokeWidth={swH} strokeLinecap="square" />
      <line x1={rx - armH} y1={top} x2={rx - armH + 5} y2={top} stroke={accentColor} strokeWidth={swH} strokeLinecap="square" />
      <line x1={rx - armH} y1={bot} x2={rx - armH + 5} y2={bot} stroke={accentColor} strokeWidth={swH} strokeLinecap="square" />
      {/* SPLICE */}
      <text x="32" y="50" dominantBaseline="middle" className="font-display" fontSize="44" fontWeight="700" letterSpacing="-0.045em" fill={base}>SPLICE</text>
      {/* LABS */}
      <text x="32" y="69" dominantBaseline="middle" className="font-mono" fontSize="10" letterSpacing="0.22em" fill={accentColor} opacity="0.7">LABS</text>
    </svg>
  );
}

export function BracketBW() {
  return <BracketWordmark accent={false} scale="header" />;
}

export function BracketAccent() {
  return <BracketWordmark accent={true} scale="header" />;
}
