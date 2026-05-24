export const CASE_STUDY_KIND = {
  FLAGSHIP: "flagship",
  SUPPORTING: "supporting",
} as const;

export const FLAGSHIP_CASE_STUDY_ID = {
  WHATSAPP_LEAD_INTAKE: "whatsapp-lead-intake",
  SUPPORT_HUMAN_HANDOFF: "support-human-handoff",
  AGENT_MEMORY: "agent-memory",
} as const;

export type CaseStudyKind = (typeof CASE_STUDY_KIND)[keyof typeof CASE_STUDY_KIND];
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
    audience: "Service businesses that receive high-intent inquiries through WhatsApp.",
    problem:
      "Inbound conversations were difficult to qualify consistently before a human reviewed them.",
    solution:
      "Built an n8n-led intake flow that captures structured context, evaluates lead fit, and keeps the conversation ready for human follow-up.",
    outcomes: ["More consistent first-response context for incoming opportunities.", "Clearer separation between qualified inquiries and low-fit messages.", "A reusable automation pattern for WhatsApp-driven service sales."],
    evidenceNote: "Public wording stays qualitative because private client and infrastructure data is not exposed.",
    stack: ["n8n", "WhatsApp workflows", "AI qualification", "Human review"],
  },
  {
    id: FLAGSHIP_CASE_STUDY_ID.SUPPORT_HUMAN_HANDOFF,
    kind: CASE_STUDY_KIND.FLAGSHIP,
    title: "Support triage with human handoff",
    audience: "Teams that need automation without losing control of sensitive customer support.",
    problem:
      "Support conversations needed faster triage while preserving a safe path to a person when automation should stop.",
    solution:
      "Designed an AI-assisted support workflow that classifies requests, prepares context, and routes cases to human handling when needed.",
    outcomes: ["Reduced ambiguity before a human takes ownership of a case.", "Safer automation boundaries for support conversations.", "A practical handoff pattern that can be reused across service operations."],
    evidenceNote: "The case study describes verified workflow capability without claiming unsupported SLA or volume metrics.",
    stack: ["n8n", "AI triage", "Human handoff", "Operational workflows"],
  },
  {
    id: FLAGSHIP_CASE_STUDY_ID.AGENT_MEMORY,
    kind: CASE_STUDY_KIND.FLAGSHIP,
    metadataLabel: "IA Aplicada",
    title: "Persistent memory for agents",
    audience: "AI-enabled operations that need continuity across sessions and tools.",
    problem:
      "Agent workflows can lose context between sessions, making repeated decisions and project continuity harder to trust.",
    solution:
      "Integrated persistent memory patterns so agents can retain project decisions, discoveries, and implementation context across work sessions.",
    outcomes: ["Better continuity for long-running AI-assisted work.", "A clearer audit trail of decisions, discoveries, and implementation notes.", "Reusable memory patterns for agentic engineering and operations workflows."],
    evidenceNote: "Claims are limited to observed architecture and workflow behavior, not broad autonomous-agent guarantees.",
    stack: ["Engram", "OpenClaw", "MCP", "Agent workflows"],
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
  const missingIds = REQUIRED_FLAGSHIP_IDS.filter((id) => !availableIds.has(id));

  return {
    isComplete: missingIds.length === 0,
    missingIds,
  };
}
