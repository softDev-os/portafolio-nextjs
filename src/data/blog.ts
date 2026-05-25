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
      "Armé un flujo de intake que captura contexto, evalúa ajuste y deja la conversación lista para que una persona haga el seguimiento. Cuento la arquitectura, qué decisiones tomé y qué aprendí.",
    content: [
      "Si tienes un negocio de servicios y recibes consultas por WhatsApp, el verdadero cuello de botella no es responder. Es calificar.",

      "Sin un criterio parejo, las oportunidades reales se mezclan con mensajes sin intención de compra, y el equipo pierde tiempo revisando cada consulta a mano. Lo que hice fue poner orden a eso con n8n.",

      "El bot no reemplaza a nadie. Hace tres cosas antes de que una persona toque la conversación: captura datos del lead de forma estructurada, evalúa si encaja con los criterios del negocio, y empaqueta el contexto (canal, necesidad, urgencia) para que el equipo lo revise en segundos.",

      "La arquitectura es simple a propósito. Un webhook de WhatsApp dispara un workflow. El primer nodo extrae los campos del mensaje. Uno de IA, liviano y con un prompt acotado al dominio, clasifica la intención y asigna un puntaje. Si pasa el umbral, el caso va a una cola de revisión con todo listo. Si no, se cierra con cortesía.",

      "Algo que aprendí: manten el tono cualitativo. No prometo tasas de conversión ni SLA. Lo que sí mejoró fue la consistencia del contexto en el primer contacto, la separación entre leads calificados y mensajes sueltos, y la reutilización del patrón para otros servicios por WhatsApp.",

      "Si estás pensando en automatizar la primera línea de tu negocio, empieza por definir los criterios de calificación. La herramienta va después. Primero define qué hace que un lead valga la pena.",
    ],
  },
  {
    slug: "memoria-persistente-agentes-ia-engram",
    title: "Memoria persistente para agentes de IA: por qué importa y cómo la armé",
    category: "IA Aplicada",
    date: "2026-05-15",
    dateDisplay: "15/05/2026",
    image: "/assets/img/articulo-3.jpg",
    summary:
      "Un agente de IA sin memoria es como un dev que arranca cada día sin leer el historial del repo. Integré Engram para que los agentes retengan decisiones, bugs corregidos y contexto entre sesiones.",
    content: [
      "El problema más molesto del trabajo con agentes de IA no es que respondan mal. Es que no recuerdan lo que ya resolvieron.",

      "Puedes tener una sesión donde el agente te da una recomendación de arquitectura impecable, y en la siguiente, sin contexto, te sugiere algo que la contradice. Eso no es culpa del modelo. Es falta de memoria.",

      "La memoria persistente guarda ese contexto entre sesiones. Suena obvio —cualquier app con base de datos lo hace—, pero aplicado a agentes de IA cambia la forma de trabajar. El agente no solo tiene que recordar; tiene que saber qué recordar, cuándo actualizarlo y cómo presentarlo cuando vuelvas.",

      "Yo usé Engram como backend. Cada sesión guarda decisiones de arquitectura, bugs corregidos, patrones y convenciones del equipo con un topic key estable. Eso permite evolución sin machacar lo anterior. Cuando arranca una sesión nueva, el agente consume el contexto por búsqueda semántica, no por carga completa. Así mantienes bajo el uso de tokens y alta la relevancia.",

      "Lo que más me sirvió fue un patrón de cierre con seis campos: Goal, Instructions, Discoveries, Accomplished, Next Steps, Relevant Files. No es un log de chat aburrido. Es un documento de traspaso que le dice a la sesión siguiente exactamente dónde estabas parado.",

      "Para equipos que trabajan con agentes en proyectos de ingeniería, la memoria deja de ser un lujo cuando el proyecto pasa las tres sesiones. La trazabilidad real —poder responder «¿por qué decidimos esto hace dos sprints?»— vale más que cualquier benchmark.",
    ],
  },
  {
    slug: "handoff-humano-automatizacion-cuando-como",
    title: "Handoff humano en automatización: cuándo y cómo pasar el control",
    category: "Automatización",
    date: "2026-05-10",
    dateDisplay: "10/05/2026",
    image: "/assets/img/articulo-2.jpg",
    summary:
      "Automatizar no es eliminar personas. Diseñé un flujo donde la IA clasifica y prepara contexto, pero frena y deriva a un humano cuando corresponde. Te cuento los criterios y cómo lo armé.",
    content: [
      "El error más común cuando automatizas soporte es pensar que el objetivo es sacar al humano del todo. El objetivo real es reservar la atención humana para los casos que la necesitan.",

      "En el flujo que diseñé, la IA clasifica la consulta entrante y prepara contexto: canal, historial, categoría. Después decide si se puede resolver sola o si hay que derivar a una persona. No es un sí o no binario. Es una decisión basada en reglas claras y un umbral de confianza del clasificador.",

      "Definí tres criterios de handoff: sensibilidad del caso (datos personales, impacto financiero), ambigüedad de la consulta (confianza baja del modelo), y pedido explícito del cliente de hablar con alguien. Si se activa cualquiera, el flujo frena y deriva con todo el contexto ya preparado.",

      "El patrón es simple y reusable: intake → clasificación → decisión → handoff con contexto o resolución automática. Lo implementé con n8n para la orquestación y un modelo liviano para clasificar. El resultado: menos incertidumbre antes de que alguien tome el caso, y un límite más claro de hasta dónde llega la máquina.",

      "Si estás automatizando soporte, define los criterios de handoff primero. No los improvises con clientes reales. La confianza en el sistema se construye cuando tu equipo sabe exactamente en qué momento la máquina va a pedir ayuda. No después de un error.",
    ],
  },
];

export default articles;
export type { BlogArticle };
