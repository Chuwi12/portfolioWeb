import type { Net } from './types';

/** Las redes de la placa: solo entran tecnologías que usa al menos un proyecto o un puesto. */
export const NETS: readonly Net[] = [
  // Lenguajes
  { id: 'rust', label: 'Rust', group: 'languages' },
  { id: 'go', label: 'Go', group: 'languages' },
  { id: 'typescript', label: 'TypeScript', group: 'languages' },
  { id: 'javascript', label: 'JavaScript', group: 'languages' },
  { id: 'python', label: 'Python', group: 'languages' },
  { id: 'java', label: 'Java', group: 'languages' },
  { id: 'kotlin', label: 'Kotlin', group: 'languages' },
  { id: 'apex', label: 'Apex', group: 'languages' },
  // IA
  { id: 'ollama', label: 'Ollama', group: 'ai' },
  { id: 'langchainjs', label: 'LangChain.js', group: 'ai' },
  { id: 'pgvector', label: 'pgvector', group: 'ai' },
  { id: 'rag', label: 'RAG', group: 'ai' },
  { id: 'pytorch', label: 'PyTorch', group: 'ai' },
  // Frontend
  { id: 'react', label: 'React', group: 'frontend' },
  { id: 'angular', label: 'Angular', group: 'frontend' },
  { id: 'vite', label: 'Vite', group: 'frontend' },
  { id: 'astro', label: 'Astro', group: 'frontend' },
  { id: 'tailwindcss', label: 'Tailwind CSS', group: 'frontend' },
  { id: 'android', label: 'Android', group: 'frontend' },
  // Backend y datos
  { id: 'axum', label: 'axum', group: 'backend' },
  { id: 'sqlx', label: 'sqlx', group: 'backend' },
  { id: 'fastapi', label: 'FastAPI', group: 'backend' },
  { id: 'nodejs', label: 'Node.js', group: 'backend' },
  { id: 'postgresql', label: 'PostgreSQL', group: 'backend' },
  { id: 'sqlite', label: 'SQLite', group: 'backend' },
  { id: 'mysql', label: 'MySQL', group: 'backend' },
  { id: 'redis', label: 'Redis', group: 'backend' },
  { id: 'zod', label: 'Zod', group: 'backend' },
  { id: 'clerk', label: 'Clerk', group: 'backend' },
  { id: 'salesforce', label: 'Salesforce', group: 'backend' },
  // Infraestructura
  { id: 'docker', label: 'Docker', group: 'infra' },
  { id: 'aws', label: 'AWS', group: 'infra' },
  { id: 'vercel', label: 'Vercel', group: 'infra' },
];
