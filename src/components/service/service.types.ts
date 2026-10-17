export type IssueType =
  | "System performance"
  | "Inverter or battery"
  | "Monitoring and app"
  | "Physical damage"
  | "Other";

export type TicketStatus = {
  reference: string;
  status: string;
  issue: string;
  updated: string;
  nextStep: string;
  progress: number;
  events: { title: string; detail: string; date: string; complete: boolean }[];
};

export type IssueReport = {
  name: string;
  email: string;
  site: string;
  issue: IssueType;
  description: string;
};
