export default function CaseDiagram({ caseIndex }: { caseIndex: number }) {
  const w = 680;
  const h = 110;
  const boxH = 44;
  const boxRx = 10;
  const arrowW = 30;
  const markerId = `arrow-${caseIndex}`;

  if (caseIndex === 0) {
    const steps = ["WhatsApp", "Bot intake", "AI qualify", "Human review"];
    const stepW = (w - (steps.length - 1) * arrowW) / steps.length;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="case-diagram" aria-label="Flujo WhatsApp: cliente → bot → IA → humano">
        {steps.map((label, i) => {
          const x = i * (stepW + arrowW);
          const y = (h - boxH) / 2;
          return (
            <g key={label}>
              <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} fill="var(--principal-color)" opacity="0.15" />
              <text x={x + stepW / 2} y={y + boxH / 2 + 1} textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="12" fontWeight="600">{label}</text>
              {i < steps.length - 1 && (
                <line x1={x + stepW + 6} y1={h / 2} x2={x + stepW + arrowW - 6} y2={h / 2} stroke="var(--principal-color)" strokeWidth="2" markerEnd={`url(#${markerId})`} opacity="0.6" />
              )}
            </g>
          );
        })}
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10" fill="var(--principal-color)" opacity="0.6" />
          </marker>
        </defs>
      </svg>
    );
  }

  if (caseIndex === 1) {
    const steps = ["Customer", "AI triage", "Classify", "Human handoff", "Resolve"];
    const stepW = (w - (steps.length - 1) * arrowW) / steps.length;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="case-diagram" aria-label="Flujo soporte: cliente → triage → clasificar → handoff humano → resolver">
        {steps.map((label, i) => {
          const x = i * (stepW + arrowW);
          const y = (h - boxH) / 2;
          const isHuman = i >= 3;
          return (
            <g key={label}>
              <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} fill={isHuman ? "var(--color-border-reviews)" : "var(--principal-color)"} opacity={isHuman ? 0.25 : 0.15} />
              <text x={x + stepW / 2} y={y + boxH / 2 + 1} textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="12" fontWeight="600">{label}</text>
              {i < steps.length - 1 && (
                <line x1={x + stepW + 6} y1={h / 2} x2={x + stepW + arrowW - 6} y2={h / 2} stroke="var(--principal-color)" strokeWidth="2" markerEnd={`url(#${markerId})`} opacity="0.6" />
              )}
            </g>
          );
        })}
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10" fill="var(--principal-color)" opacity="0.6" />
          </marker>
        </defs>
      </svg>
    );
  }

  const steps = ["Session A", "Store", "Engram", "Retrieve", "Session B"];
  const stepW = (w - (steps.length - 1) * arrowW) / steps.length;
  const storeRowY = (h - boxH * 2 - 10) / 2;
  const retrieveRowY = storeRowY + boxH + 10;
  const midX = 2 * (stepW + arrowW) + stepW / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="case-diagram" aria-label="Flujo memoria persistente: sesión → guardar → Engram → recuperar → sesión">
      {/* Top row: Session A → Store → Engram */}
      {[0, 1, 2].map((i) => {
        const label = steps[i];
        const x = i * (stepW + arrowW);
        const y = storeRowY;
        const isMem = i === 2;
        return (
          <g key={label}>
            <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} fill={isMem ? "rgba(247,185,53,0.25)" : "var(--principal-color)"} opacity={isMem ? 1 : 0.15} />
            <text x={x + stepW / 2} y={y + boxH / 2 + 1} textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="12" fontWeight={isMem ? 700 : 600}>{label}</text>
            {i < 2 && (
              <line x1={x + stepW + 6} y1={y + boxH / 2} x2={x + stepW + arrowW - 6} y2={y + boxH / 2} stroke="var(--principal-color)" strokeWidth="2" markerEnd={`url(#${markerId})`} opacity="0.6" />
            )}
          </g>
        );
      })}
      {/* Bottom row: Retrieve → Session B */}
      {[3, 4].map((i) => {
        const label = steps[i];
        const x = (i - 1) * (stepW + arrowW);
        const y = retrieveRowY;
        return (
          <g key={label}>
            <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} fill="var(--principal-color)" opacity="0.15" />
            <text x={x + stepW / 2} y={y + boxH / 2 + 1} textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="12" fontWeight="600">{label}</text>
            {i < 4 && (
              <line x1={x + stepW + 6} y1={y + boxH / 2} x2={x + stepW + arrowW - 6} y2={y + boxH / 2} stroke="var(--principal-color)" strokeWidth="2" markerEnd={`url(#${markerId})`} opacity="0.6" />
            )}
          </g>
        );
      })}
      <line x1={midX} y1={storeRowY + boxH} x2={midX} y2={retrieveRowY} stroke="var(--principal-color)" strokeWidth="2" markerEnd={`url(#${markerId})`} opacity="0.5" />
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10" fill="var(--principal-color)" opacity="0.6" />
        </marker>
      </defs>
    </svg>
  );
}
