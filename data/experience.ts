export type JourneyStep = {
  title: string;
  detail: string;
  status?: string;
};

export const journey: JourneyStep[] = [
  {
    title: "Systems Analysis & Development",
    detail: "PUC-PR · expected 2027",
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
