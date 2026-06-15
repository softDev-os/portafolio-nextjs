export const CASE_STUDY_KIND = {
	FLAGSHIP: "flagship",
	SUPPORTING: "supporting",
} as const;

export const FLAGSHIP_CASE_STUDY_ID = {
	WHATSAPP_LEAD_INTAKE: "whatsapp-lead-intake",
	SUPPORT_HUMAN_HANDOFF: "support-human-handoff",
	AGENT_MEMORY: "agent-memory",
} as const;

export type CaseStudyKind =
	(typeof CASE_STUDY_KIND)[keyof typeof CASE_STUDY_KIND];
export type FlagshipCaseStudyId =
	(typeof FLAGSHIP_CASE_STUDY_ID)[keyof typeof FLAGSHIP_CASE_STUDY_ID];

export interface CaseStudy {
	id: FlagshipCaseStudyId;
	kind: CaseStudyKind;
	title: string;
	audience: string;
	problem: string;
	solution: string;
	outcomes: string[];
	evidenceNote: string;
	stack: string[];
	image: string;
	metadataLabel?: string;
}

export interface FlagshipCompletenessResult {
	isComplete: boolean;
	missingIds: FlagshipCaseStudyId[];
}

const REQUIRED_FLAGSHIP_IDS = [
	FLAGSHIP_CASE_STUDY_ID.WHATSAPP_LEAD_INTAKE,
	FLAGSHIP_CASE_STUDY_ID.SUPPORT_HUMAN_HANDOFF,
	FLAGSHIP_CASE_STUDY_ID.AGENT_MEMORY,
] as const satisfies readonly FlagshipCaseStudyId[];

export const caseStudies: CaseStudy[] = [
	{
		id: FLAGSHIP_CASE_STUDY_ID.WHATSAPP_LEAD_INTAKE,
		kind: CASE_STUDY_KIND.FLAGSHIP,
		metadataLabel: "Automatización",
		title: "WhatsApp lead intake and qualification",
		audience:
			"Empresas de servicios que reciben consultas de alta intención a través de WhatsApp.",
		problem:
			"Las conversaciones entrantes eran difíciles de calificar de manera consistente antes de que un humano las revisara.",
		solution:
			"Se construyó un flujo de intake liderado por n8n que captura contexto estructurado, evalúa la idoneidad del lead y deja la conversación lista para el seguimiento humano.",
		outcomes: [
			"Contexto de primera respuesta más consistente para oportunidades entrantes.",
			"Separación más clara entre consultas calificadas y mensajes de baja prioridad.",
			"Un patrón de automatización reutilizable para ventas de servicios vía WhatsApp.",
		],
		evidenceNote:
			"El texto público se mantiene cualitativo porque no se exponen datos privados del cliente ni de la infraestructura.",
		stack: ["n8n", "WhatsApp workflows", "AI qualification", "Human review"],
		image: "/assets/img/caso-1-whatsapp.png",
	},
	{
		id: FLAGSHIP_CASE_STUDY_ID.SUPPORT_HUMAN_HANDOFF,
		kind: CASE_STUDY_KIND.FLAGSHIP,
		metadataLabel: "Handoff humano",
		title: "Support triage with human handoff",
		audience:
			"Equipos que necesitan automatización sin perder el control del soporte sensible al cliente.",
		problem:
			"Las conversaciones de soporte necesitaban una clasificación más rápida, preservando una ruta segura hacia una persona cuando la automatización debía detenerse.",
		solution:
			"Se diseñó un workflow de soporte asistido por IA que clasifica solicitudes, prepara contexto y enruta casos a atención humana cuando es necesario.",
		outcomes: [
			"Menos ambigüedad antes de que un humano asuma un caso.",
			"Límites de automatización más seguros para conversaciones de soporte.",
			"Un patrón de handoff práctico y reutilizable en operaciones de servicio.",
		],
		evidenceNote:
			"El caso describe capacidad de workflow verificada sin reclamar métricas de SLA o volumen no respaldadas.",
		stack: ["n8n", "AI triage", "Human handoff", "Operational workflows"],
		image: "/assets/img/caso-2-soporte.png",
	},
	{
		id: FLAGSHIP_CASE_STUDY_ID.AGENT_MEMORY,
		kind: CASE_STUDY_KIND.FLAGSHIP,
		metadataLabel: "IA Aplicada",
		title: "Persistent memory for agents",
		audience:
			"Operaciones habilitadas con IA que necesitan continuidad entre sesiones y herramientas.",
		problem:
			"Los workflows de agente pueden perder contexto entre sesiones, dificultando la confianza en decisiones repetidas y la continuidad del proyecto.",
		solution:
			"Se integraron patrones de memoria persistente para que los agentes retengan decisiones, descubrimientos y contexto de implementación entre sesiones de trabajo.",
		outcomes: [
			"Mejor continuidad para trabajo asistido por IA de larga duración.",
			"Un rastro de auditoría más claro de decisiones, descubrimientos y notas de implementación.",
			"Patrones de memoria reutilizables para workflows de ingeniería y operaciones con agentes.",
		],
		evidenceNote:
			"Las afirmaciones se limitan al comportamiento observado de arquitectura y workflow, no a garantías amplias de agentes autónomos.",
		stack: ["Engram", "OpenClaw", "MCP", "Agent workflows"],
		image: "/assets/img/caso-3-memoria.png",
	},
];

export function getFlagshipCaseStudies(): CaseStudy[] {
	return REQUIRED_FLAGSHIP_IDS.flatMap((id) => {
		const caseStudy = caseStudies.find(
			(study) => study.id === id && study.kind === CASE_STUDY_KIND.FLAGSHIP,
		);

		return caseStudy ? [caseStudy] : [];
	});
}

export function checkFlagshipCompleteness(
	studies: readonly CaseStudy[] = caseStudies,
): FlagshipCompletenessResult {
	const availableIds = new Set(
		studies
			.filter((study) => study.kind === CASE_STUDY_KIND.FLAGSHIP)
			.map((study) => study.id),
	);
	const missingIds = REQUIRED_FLAGSHIP_IDS.filter(
		(id) => !availableIds.has(id),
	);

	return {
		isComplete: missingIds.length === 0,
		missingIds,
	};
}
