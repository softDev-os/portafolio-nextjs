export const CAPABILITY_GROUP = {
  AI_AUTOMATION: 'ai-automation',
  SOFTWARE_ARCHITECTURE: 'software-architecture',
  OPERATIONS_WORKFLOWS: 'operations-workflows',
  IMPLEMENTATION_DELIVERY: 'implementation-delivery',
} as const

export type CapabilityGroupId = (typeof CAPABILITY_GROUP)[keyof typeof CAPABILITY_GROUP]

export interface CapabilityGroup {
  id: CapabilityGroupId
  title: string
  evidence: string[]
  tools: string[]
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: CAPABILITY_GROUP.AI_AUTOMATION,
    title: 'Automatización con IA',
    evidence: [
      'Diseño de asistentes para intake, calificación y soporte con handoff humano.',
      'Uso de memoria persistente para mantener contexto operativo entre interacciones.',
    ],
    tools: ['Agentes IA', 'WhatsApp workflows', 'Memoria persistente'],
  },
  {
    id: CAPABILITY_GROUP.SOFTWARE_ARCHITECTURE,
    title: 'Arquitectura de software',
    evidence: [
      'Definición de flujos, límites y contratos antes de implementar automatizaciones.',
      'Priorización de trazabilidad, rollback y mantenimiento sobre promesas infladas.',
    ],
    tools: ['Next.js', 'TypeScript', 'Arquitectura modular'],
  },
  {
    id: CAPABILITY_GROUP.OPERATIONS_WORKFLOWS,
    title: 'Workflows operativos',
    evidence: [
      'Conversión de procesos comerciales y soporte repetible en flujos auditables.',
      'Alineación entre automatización, seguimiento humano y canales de contacto reales.',
    ],
    tools: ['n8n', 'CRM ligero', 'Integraciones API'],
  },
  {
    id: CAPABILITY_GROUP.IMPLEMENTATION_DELIVERY,
    title: 'Entrega técnica',
    evidence: [
      'Construcción de interfaces y contenido estático orientado a prueba antes de la conversación comercial.',
      'Entrega con validación de calidad mediante lint y build cuando el proyecto lo permite.',
    ],
    tools: ['React', 'CSS', 'Vercel'],
  },
]
