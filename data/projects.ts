export type ArchitectureNode = {
  id: string;
  label: string;
};

export type ProjectStack = {
  name: string;
  highlights: string[];
};

export type Project = {
  index: string;
  name: string;
  category: string;
  description: string;
  proof?: string;
  stack: ProjectStack[];
  architecture: ArchitectureNode[];
  github?: string;
  demo?: string;
  status: "shipped" | "in-progress" | "planned";
  image?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "CompanyMind AI",
    category: "Enterprise AI / RAG",
    description:
      "Employees ask HR or IT the same policy questions over and over because the answers are buried across scattered internal documents. CompanyMind AI answers those questions directly from the company's own knowledge base — every response is grounded in retrieved, permissioned documents, and the model is never called when nothing relevant is found, instead of letting it guess. The backend is a working RAG pipeline (FastAPI + Supabase/pgvector for vector search, OpenAI for embeddings and chat) with real OpenAI tool calling wired into the same functions exposed to MCP, not just described as a diagram.",
    proof: "11/11 tests passing · CI running on every push · tool calling implemented, not just documented",
    stack: [
      { name: "Python", highlights: ["CLIENT", "FASTAPI", "SERVICE"] },
      { name: "FastAPI", highlights: ["CLIENT", "FASTAPI", "SERVICE"] },
      { name: "Supabase", highlights: ["VECTOR SEARCH", "DATABASE"] },
      { name: "RAG", highlights: ["QUERY", "EMBEDDING", "VECTOR SEARCH", "CONTEXT"] },
      { name: "Embeddings", highlights: ["EMBEDDING", "VECTOR SEARCH"] },
      { name: "Tool Calling", highlights: ["LLM", "DATABASE"] },
      { name: "MCP", highlights: ["LLM", "SERVICE"] },
      { name: "CI/CD", highlights: [] },
    ],
    architecture: [
      { id: "USER", label: "USER" },
      { id: "FASTAPI", label: "FASTAPI" },
      { id: "RAG", label: "RAG" },
      { id: "VECTOR SEARCH", label: "VECTOR SEARCH" },
      { id: "DATABASE", label: "DATABASE" },
      { id: "LLM", label: "LLM" },
    ],
    github: "https://github.com/marquessdann/companymind",
    status: "in-progress",
  },
  {
    index: "02",
    name: "SecureAuth API",
    category: "Java + Spring Boot Backend",
    description:
      "A production-style authentication and persistence service in Java: stateless JWT auth, role-based access control and a documented, versioned REST API sitting on top of PostgreSQL — containerized end to end and shippable with a single command.",
    stack: [
      { name: "Java", highlights: ["CLIENT", "API"] },
      { name: "Spring Boot", highlights: ["API", "JWT AUTH", "SERVICE"] },
      { name: "JWT", highlights: ["JWT AUTH"] },
      { name: "REST API", highlights: ["CLIENT", "API"] },
      { name: "PostgreSQL", highlights: ["SERVICE", "DATABASE"] },
      { name: "Swagger", highlights: ["API"] },
      { name: "Docker", highlights: ["DATABASE", "SERVICE"] },
    ],
    architecture: [
      { id: "CLIENT", label: "CLIENT" },
      { id: "API", label: "API" },
      { id: "JWT AUTH", label: "JWT AUTH" },
      { id: "SERVICE", label: "SERVICE" },
      { id: "DATABASE", label: "DATABASE" },
    ],
    github: undefined,
    status: "in-progress",
  },
  {
    index: "03",
    name: "Agent Workflow Engine",
    category: "AI Automation / Agent System",
    description:
      "A backend-driven agent that plans multi-step tasks and calls real tools — internal APIs, third-party services, a database — to complete them. Every tool call, retry and result is logged, so an automated workflow stays inspectable instead of a black box.",
    stack: [
      { name: "Python", highlights: ["TRIGGER", "AGENT"] },
      { name: "AI Agents", highlights: ["AGENT", "PLANNER"] },
      { name: "Tool Calling", highlights: ["PLANNER", "TOOLS"] },
      { name: "MCP", highlights: ["TOOLS", "EXTERNAL API"] },
      { name: "AI Automation", highlights: ["AGENT", "WORKFLOW LOG"] },
    ],
    architecture: [
      { id: "TRIGGER", label: "TRIGGER" },
      { id: "AGENT", label: "AGENT" },
      { id: "PLANNER", label: "PLANNER" },
      { id: "TOOLS", label: "TOOLS" },
      { id: "EXTERNAL API", label: "EXTERNAL API" },
      { id: "WORKFLOW LOG", label: "WORKFLOW LOG" },
    ],
    github: undefined,
    status: "planned",
  },
];
