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
      <svg viewBox={`0 0 ${w} ${h}`} className="case-diagram" aria-label="Flujo WhatsApp">
        {steps.map((label, i) => {
          const x = i * (stepW + arrowW);
          const y = (h - boxH) / 2;
          return (
            <g key={label}>
              <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} className="case-diagram__box" />
              <text x={x + stepW / 2} y={y + boxH / 2} textAnchor="middle" dominantBaseline="central" className="case-diagram__label">{label}</text>
              {i < steps.length - 1 && (
                <line x1={x + stepW + 6} y1={h / 2} x2={x + stepW + arrowW - 6} y2={h / 2} className="case-diagram__arrow" markerEnd={`url(#${markerId})`} />
              )}
            </g>
          );
        })}
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10" className="case-diagram__arrow-head" />
          </marker>
        </defs>
      </svg>
    );
  }

  if (caseIndex === 1) {
    const steps = ["Customer", "AI triage", "Classify", "Human handoff", "Resolve"];
    const stepW = (w - (steps.length - 1) * arrowW) / steps.length;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="case-diagram" aria-label="Flujo soporte">
        {steps.map((label, i) => {
          const x = i * (stepW + arrowW);
          const y = (h - boxH) / 2;
          const isHuman = i >= 3;
          return (
            <g key={label}>
              <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} className={isHuman ? "case-diagram__box case-diagram__box--human" : "case-diagram__box"} />
              <text x={x + stepW / 2} y={y + boxH / 2} textAnchor="middle" dominantBaseline="central" className="case-diagram__label">{label}</text>
              {i < steps.length - 1 && (
                <line x1={x + stepW + 6} y1={h / 2} x2={x + stepW + arrowW - 6} y2={h / 2} className="case-diagram__arrow" markerEnd={`url(#${markerId})`} />
              )}
            </g>
          );
        })}
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10" className="case-diagram__arrow-head" />
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
    <svg viewBox={`0 0 ${w} ${h}`} className="case-diagram" aria-label="Flujo memoria">
      {[0, 1, 2].map((i) => {
        const label = steps[i];
        const x = i * (stepW + arrowW);
        const y = storeRowY;
        const isMem = i === 2;
        return (
          <g key={label}>
            <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} className={isMem ? "case-diagram__box case-diagram__box--accent" : "case-diagram__box"} />
            <text x={x + stepW / 2} y={y + boxH / 2} textAnchor="middle" dominantBaseline="central" className={isMem ? "case-diagram__label case-diagram__label--bold" : "case-diagram__label"}>{label}</text>
            {i < 2 && (
              <line x1={x + stepW + 6} y1={y + boxH / 2} x2={x + stepW + arrowW - 6} y2={y + boxH / 2} className="case-diagram__arrow" markerEnd={`url(#${markerId})`} />
            )}
          </g>
        );
      })}
      {[3, 4].map((i) => {
        const label = steps[i];
        const x = (i - 1) * (stepW + arrowW);
        const y = retrieveRowY;
        return (
          <g key={label}>
            <rect x={x} y={y} width={stepW} height={boxH} rx={boxRx} className="case-diagram__box" />
            <text x={x + stepW / 2} y={y + boxH / 2} textAnchor="middle" dominantBaseline="central" className="case-diagram__label">{label}</text>
            {i < 4 && (
              <line x1={x + stepW + 6} y1={y + boxH / 2} x2={x + stepW + arrowW - 6} y2={y + boxH / 2} className="case-diagram__arrow" markerEnd={`url(#${markerId})`} />
            )}
          </g>
        );
      })}
      <line x1={midX} y1={storeRowY + boxH} x2={midX} y2={retrieveRowY} className="case-diagram__arrow case-diagram__arrow--vert" markerEnd={`url(#${markerId})`} />
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10" className="case-diagram__arrow-head" />
        </marker>
      </defs>
    </svg>
  );
}
