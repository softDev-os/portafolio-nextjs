interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateDisplay: string;
  image: string;
  summary: string;
  content: string[];
}

const articles: BlogArticle[] = [
  {
    slug: "automatizacion-whatsapp-n8n-calificacion-leads",
    title: "Automatización con n8n: cómo calificar leads por WhatsApp sin intervención humana",
    category: "Automatización",
    date: "2026-05-20",
    dateDisplay: "20/05/2026",
    image: "/assets/img/articulo-1.jpg",
    summary:
      "Diseñé un flujo de intake que captura contexto, evalúa ajuste y deja la conversación lista para seguimiento humano. Comparto la arquitectura, las decisiones de diseño y lo que aprendí.",
    content: [
      "Cuando un negocio de servicios recibe consultas por WhatsApp, el mayor cuello de botella no es responder: es calificar. Sin un criterio consistente, las oportunidades reales se mezclan con mensajes de baja intención y el equipo pierde tiempo evaluando una por una.",

      "La automatización no reemplaza el criterio humano; lo enfoca. En los flujos que diseñé con n8n, el bot hace tres cosas antes de que una persona vea la conversación: captura datos estructurados del lead, evalúa ajuste contra criterios predefinidos del negocio, y organiza el contexto — canal, necesidad, urgencia — en un formato que el equipo puede revisar en segundos.",

      "La arquitectura es simple por diseño. Un webhook de WhatsApp alimenta un workflow de n8n. El primer nodo extrae los campos relevantes del mensaje entrante. Un nodo de IA — liviano, con un prompt acotado al dominio del negocio — clasifica la intención y asigna un puntaje de ajuste. Si el puntaje supera el umbral, el caso avanza a una cola de revisión humana con todo el contexto empaquetado. Si no, se cierra con un mensaje de cortesía.",

      "La decisión más importante fue mantener el tono cualitativo, no métrico. Los resultados que puedo afirmar son acotados: contexto más consistente para el primer contacto, separación más clara entre consultas calificadas y mensajes de baja intención, y un patrón de automatización reusable para ventas de servicios por WhatsApp. No prometo tasas de conversión ni SLA: el valor está en la claridad operativa que gana el equipo.",

      "Si estás evaluando automatizar la primera línea de contacto de tu negocio, empezá por definir los criterios de calificación antes de tocar una herramienta. La tecnología es el último paso; el primero es saber qué hace que un lead valga una conversación.",
    ],
  },
  {
    slug: "memoria-persistente-agentes-ia-engram",
    title: "Memoria persistente para agentes de IA: por qué importa y cómo la implementé",
    category: "IA Aplicada",
    date: "2026-05-15",
    dateDisplay: "15/05/2026",
    image: "/assets/img/articulo-3.jpg",
    summary:
      "Los agentes de IA pierden contexto entre sesiones. Integré patrones de memoria persistente con Engram para que retengan decisiones, descubrimientos y notas de implementación. Comparto la arquitectura y los patrones reusables.",
    content: [
      "El mayor punto ciego del trabajo asistido por IA no es la calidad de las respuestas: es la continuidad. Un agente puede producir una recomendación de arquitectura sólida en una sesión, y en la siguiente — sin contexto de lo que ya se decidió — sugerir algo contradictorio. Esa fricción no es un defecto del modelo; es una limitación de la memoria.",

      "La memoria persistente resuelve esto guardando el contexto entre sesiones. No es un concepto nuevo — cualquier aplicación con base de datos lo hace — pero aplicarlo al flujo de trabajo de agentes de IA requiere patrones distintos. El agente no solo necesita recordar; necesita saber qué recordar, cuándo actualizarlo y cómo presentarlo en la sesión siguiente.",

      "En mi implementación usé Engram como backend de memoria. Cada sesión de trabajo — decisiones de arquitectura, bugs corregidos, patrones establecidos, convenciones del equipo — se guarda con un topic key estable que permite evolución sin sobrescritura destructiva. Cuando arranca una sesión nueva, el agente consume el contexto previo vía búsqueda semántica, no por carga completa. Esto mantiene el token budget bajo y la relevancia alta.",

      "El patrón que más valió la pena fue el resumen estructurado de cierre de sesión: Goal, Instructions, Discoveries, Accomplished, Next Steps, Relevant Files. Esas seis secciones le dan a la sesión siguiente un mapa claro de dónde estaba todo y qué falta. No es un log de chat; es un documento de traspaso.",

      "Para equipos que trabajan con agentes de IA en proyectos de ingeniería, la memoria persistente deja de ser un nice-to-have cuando el proyecto cruza las tres sesiones. La trazabilidad de decisiones — poder responder «¿por qué tomamos esta decisión de arquitectura hace dos sprints?» — es el verdadero retorno de inversión. No se trata de que el agente sea más inteligente; se trata de que no olvide lo que ya resolvió.",
    ],
  },
  {
    slug: "handoff-humano-automatizacion-cuando-como",
    title: "Handoff humano en automatización: cuándo y cómo pasar el control a una persona",
    category: "Automatización",
    date: "2026-05-10",
    dateDisplay: "10/05/2026",
    image: "/assets/img/articulo-2.jpg",
    summary:
      "Automatizar no significa eliminar al humano. Diseñé un flujo de soporte donde la IA clasifica y prepara contexto, pero el handoff a una persona ocurre cuando la automatización debe detenerse. Comparto los criterios de decisión y la arquitectura.",
    content: [
      "El error más común al diseñar automatización de soporte es asumir que el objetivo es eliminar la intervención humana. El objetivo real es reservar la atención humana para los casos que la necesitan, y automatizar todo lo demás con un límite claro y seguro.",

      "En el flujo que diseñé para triage de soporte, la IA clasifica la consulta entrante, prepara contexto — canal, historial relevante, categoría del problema — y decide si el caso puede resolverse automáticamente o debe derivarse a una persona. La decisión no es binaria; es un espectro informado por reglas de negocio explícitas y un umbral de confianza del clasificador.",

      "Los criterios de handoff que definí fueron tres: sensibilidad del caso (datos personales, impacto financiero), ambigüedad de la consulta (confianza del clasificador por debajo del umbral), y preferencia explícita del cliente (solicitud de hablar con una persona). Si alguno de estos criterios se activa, el flujo frena la automatización y deriva a un humano con todo el contexto empaquetado.",

      "La arquitectura es un patrón que se puede reusar en cualquier operación de servicio: intake → clasificación → decisión de handoff → derivación con contexto o resolución automática. Lo implementé con n8n para la orquestación y un modelo de clasificación liviano. El resultado práctico: menos ambigüedad antes de que un humano tome ownership del caso, y una frontera más segura para la automatización.",

      "Si estás automatizando soporte, definí los criterios de handoff primero. No los descubras por ensayo y error con clientes reales. La confianza en la automatización se construye cuando el equipo sabe exactamente en qué punto el sistema va a pedir ayuda, no cuando se enteran después de un error.",
    ],
  },
];

export default articles;
export type { BlogArticle };
