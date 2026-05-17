// Terminal Variants — Three distinct interpretations of the CLI/operator register

// ─── VARIANT A: PROMPT (original refined) ───
// › splice_ [cursor] — classic shell prompt with trailing cursor block.

export function TerminalVA_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const cur = accent ? acc : base;

  if (scale === "favicon") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="9" height="10" fill={cur} />
      </svg>
    );
  }
  if (scale === "product") {
    return (
      <svg width="180" height="28" viewBox="0 0 180 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="18" className="font-mono" fontSize="13" fontWeight="400" fill={base} opacity="0.35">›</text>
        <text x="10" y="18" className="font-mono" fontSize="13" fontWeight="400" letterSpacing="-0.01em" fill={base}>splice</text>
        <text x="74" y="18" className="font-mono" fontSize="13" fontWeight="400" fill={cur}>_</text>
        <rect x="82" y="6" width="8" height="13" fill={cur} />
        <text x="10" y="26" className="font-mono" fontSize="6" letterSpacing="0.14em" fill={base} opacity="0.4">labs</text>
      </svg>
    );
  }

  return (
    <svg width="440" height="72" viewBox="0 0 440 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="52" className="font-mono" fontSize="42" fontWeight="400" fill={base} opacity="0.25">›</text>
      <text x="28" y="52" className="font-mono" fontSize="42" fontWeight="400" letterSpacing="-0.01em" fill={base}>splice</text>
      <text x="242" y="52" className="font-mono" fontSize="42" fontWeight="700" fill={cur}>_</text>
      <rect x="264" y="14" width="26" height="40" fill={cur} />
      <text x="30" y="66" className="font-mono" fontSize="10" letterSpacing="0.18em" fill={base} opacity="0.4">labs</text>
    </svg>
  );
}


// ─── VARIANT B: PIPE ───
// splice|labs — the pipe operator IS the splice. Two system names joined by a pipe.
// No cursor, no prompt. Pure operator syntax. The pipe is the junction.

export function TerminalVB_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const pipe = accent ? acc : base;

  if (scale === "favicon") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Vertical pipe bar */}
        <rect x="7" y="2" width="2" height="12" fill={pipe} />
        {/* Dots either side */}
        <rect x="3" y="7" width="2" height="2" fill={base} opacity="0.5"/>
        <rect x="11" y="7" width="2" height="2" fill={base} opacity="0.5"/>
      </svg>
    );
  }
  if (scale === "product") {
    return (
      <svg width="160" height="24" viewBox="0 0 160 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="17" className="font-mono" fontSize="14" fontWeight="400" fill={base}>splice</text>
        <text x="66" y="17" className="font-mono" fontSize="14" fontWeight="700" fill={pipe}>|</text>
        <text x="76" y="17" className="font-mono" fontSize="14" fontWeight="400" fill={base} opacity="0.5">labs</text>
      </svg>
    );
  }

  return (
    <svg width="460" height="60" viewBox="0 0 460 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="46" className="font-mono" fontSize="42" fontWeight="400" fill={base}>splice</text>
      <text x="216" y="46" className="font-mono" fontSize="42" fontWeight="700" fill={pipe}>|</text>
      <text x="240" y="46" className="font-mono" fontSize="42" fontWeight="400" fill={base} opacity="0.45">labs</text>
    </svg>
  );
}


// ─── VARIANT C: PATH ───
// /splice/labs — filesystem path notation. The slashes ARE the splice.
// Reads as a route, an address, a location in a system hierarchy.
// In accent, slashes take the accent color.

export function TerminalVC_Wordmark({ accent = false, scale = "header" }: { accent?: boolean; scale?: string }) {
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const slash = accent ? acc : base;
  const dim = accent ? 0.5 : 0.35;

  if (scale === "favicon") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Forward slash */}
        <line x1="10" y1="2" x2="6" y2="14" stroke={slash} strokeWidth="2.5" strokeLinecap="square"/>
      </svg>
    );
  }
  if (scale === "product") {
    return (
      <svg width="170" height="24" viewBox="0 0 170 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="17" className="font-mono" fontSize="14" fontWeight="400" fill={slash} opacity={dim}>/</text>
        <text x="10" y="17" className="font-mono" fontSize="14" fontWeight="400" fill={base}>splice</text>
        <text x="76" y="17" className="font-mono" fontSize="14" fontWeight="400" fill={slash}>/</text>
        <text x="86" y="17" className="font-mono" fontSize="14" fontWeight="400" fill={base} opacity="0.5">labs</text>
      </svg>
    );
  }

  return (
    <svg width="520" height="60" viewBox="0 0 520 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="46" className="font-mono" fontSize="42" fontWeight="400" fill={slash} opacity={dim}>/</text>
      <text x="24" y="46" className="font-mono" fontSize="42" fontWeight="400" fill={base}>splice</text>
      <text x="240" y="46" className="font-mono" fontSize="42" fontWeight="400" fill={slash}>/</text>
      <text x="266" y="46" className="font-mono" fontSize="42" fontWeight="400" fill={base} opacity="0.45">labs</text>
    </svg>
  );
}
