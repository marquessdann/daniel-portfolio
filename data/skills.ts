export const heroWords = [
  "Python",
  "Java",
  "FastAPI",
  "Spring Boot",
  "RAG Pipelines",
  "AI Agents",
  "MCP",
];

export type TechCloudIcon = {
  label: string;
  badge?: string; // short text monogram (e.g. "Py", "Pg") — rendered in a small badge, no external assets
  custom?: "java" | "fastapi" | "spring" | "git" | "docker" | "claude" | "vscode" | "rest" | "rag" | "agents" | "mcp" | "tool" | "sql";
  brand: string; // hex color shown on hover; icon is neutral gray at rest
  top: number; // % from top
  left: number; // % from left
  size: number; // px
};

export const techCloudIcons: TechCloudIcon[] = [
  { label: "Python", badge: "Py", top: 10, left: 8, size: 34, brand: "#4B8BBE" },
  { label: "Java", custom: "java", top: 6, left: 44, size: 30, brand: "#F58219" },
  { label: "FastAPI", custom: "fastapi", top: 16, left: 76, size: 30, brand: "#05998B" },
  { label: "Spring Boot", custom: "spring", top: 32, left: 92, size: 28, brand: "#6DB33F" },
  { label: "PostgreSQL", badge: "Pg", top: 46, left: 5, size: 32, brand: "#4E8CC2" },
  { label: "Supabase", badge: "Sb", top: 62, left: 18, size: 28, brand: "#3ECF8E" },
  { label: "Git", custom: "git", top: 80, left: 6, size: 28, brand: "#F05033" },
  { label: "GitHub", badge: "Gh", top: 88, left: 38, size: 30, brand: "#E6E6E6" },
  { label: "Docker", custom: "docker", top: 70, left: 58, size: 30, brand: "#2496ED" },
  { label: "LLM APIs", badge: "AI", top: 22, left: 30, size: 30, brand: "#10A37F" },
  { label: "Claude", custom: "claude", top: 40, left: 52, size: 36, brand: "#DA7756" },
  { label: "VS Code", custom: "vscode", top: 12, left: 60, size: 28, brand: "#3B93D4" },
  { label: "REST API", custom: "rest", top: 56, left: 82, size: 26, brand: "#6E9BFF" },
  { label: "RAG", custom: "rag", top: 68, left: 33, size: 26, brand: "#A78BFA" },
  { label: "AI Agents", custom: "agents", top: 82, left: 70, size: 28, brand: "#8B5CF6" },
  { label: "MCP", custom: "mcp", top: 48, left: 88, size: 26, brand: "#3D7BFF" },
  { label: "Tool Calling", custom: "tool", top: 4, left: 85, size: 24, brand: "#F5A623" },
  { label: "SQL", custom: "sql", top: 92, left: 56, size: 24, brand: "#4E8CC2" },
];

export const heroOrbitNear = ["Python", "Java", "FastAPI", "LLM"];
export const heroOrbitFar = ["RAG", "Agents", "MCP", "PostgreSQL", "API"];
