import type { Faq } from './types';

/** Literal de docs/copy-home.md §7. Se muestra en HTML y como FAQPage en JSON-LD. */
export const FAQ: readonly Faq[] = [
  {
    q: { es: '¿Qué puesto buscas?', en: 'What role are you looking for?' },
    a: {
      es: 'Full stack o AI engineer. Mi base es el backend en Go y Rust; también hago frontend con React y Angular, y aplicaciones con LLM.',
      en: 'Full stack or AI engineer. My base is the backend in Go and Rust; I also build frontends with React and Angular, and LLM applications.',
    },
  },
  {
    q: { es: '¿Qué haces con IA, en concreto?', en: 'What do you do with AI, specifically?' },
    a: {
      es: 'Aplicaciones con modelos locales (Ollama): tool calling, RAG híbrido, memoria con embeddings en pgvector y un verificador que descarta cifras inventadas. En el TFG entrenamos un modelo propio con PyTorch.',
      en: 'Applications on local models (Ollama): tool calling, hybrid RAG, memory with embeddings in pgvector and a verifier that drops made-up figures. For my final-year project we trained our own model with PyTorch.',
    },
  },
  {
    q: {
      es: '¿Puedo ver el código de los proyectos privados?',
      en: 'Can I see the code of the private projects?',
    },
    a: {
      es: 'Sí, bajo petición. Escríbeme y te lo enseño.',
      en: 'Yes, on request. Email me and I will show you.',
    },
  },
  {
    q: {
      es: '¿Qué experiencia profesional tienes?',
      en: 'What professional experience do you have?',
    },
    a: {
      es: 'Dos prácticas como desarrollador (VASS y CRC) y una estancia Erasmus como técnico de redes, además de dos años construyendo producto completo.',
      en: 'Two developer internships (VASS and CRC) and an Erasmus placement as a network technician, plus two years building complete products.',
    },
  },
  {
    q: { es: '¿Qué nivel de inglés tienes?', en: 'How good is your English?' },
    a: {
      es: 'B2. Trabajé en inglés con clientes internacionales durante el Erasmus.',
      en: 'B2. I worked in English with international clients during my Erasmus placement.',
    },
  },
  {
    q: { es: '¿Dónde estás?', en: 'Where are you based?' },
    a: { es: 'En Madrid.', en: 'Madrid, Spain.' },
  },
];
