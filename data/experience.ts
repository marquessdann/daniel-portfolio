export type JourneyStep = {
  title: string;
  detail: string;
  status?: string;
};

export const journey: JourneyStep[] = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    detail: "Systems Analysis and Development",
    status: "In progress",
  },
  {
    title: "Backend Development",
    detail: "Python · Java · APIs",
  },
  {
    title: "AI Engineering",
    detail: "LLM APIs · RAG · Agents · MCP",
  },
];

export const terminalLines = [
  { command: "whoami", output: ["Daniel Marques"] },
  {
    command: "focus",
    output: ["Backend Development", "AI Engineering", "APIs", "Automation"],
  },
  { command: "status", output: ["Open to Junior Backend / AI roles"] },
];
