import type { IssueType, TicketStatus } from "./service.types";

export const issueTypes: IssueType[] = [
  "System performance",
  "Inverter or battery",
  "Monitoring and app",
  "Physical damage",
  "Other",
];

export const issueHints: Record<IssueType, string> = {
  "System performance": "When did the output change? Include any error messages or unusual readings.",
  "Inverter or battery": "Share any warning lights or codes shown on the equipment.",
  "Monitoring and app": "Tell us which device or screen is affected and when it last worked.",
  "Physical damage": "Describe what you can see from a safe distance. Do not touch damaged equipment.",
  Other: "Tell us what happened and when you first noticed it.",
};

export const sampleTicket: TicketStatus = {
  reference: "SL-2048",
  status: "Under review",
  issue: "System performance",
  updated: "Today · 10:42 AM",
  nextStep: "A Solara support specialist is reviewing your system details. We’ll share the next update here.",
  progress: 1,
  events: [
    { title: "Request received", detail: "Your report is in our support queue.", date: "Today · 9:14 AM", complete: true },
    { title: "Under review", detail: "System details are being checked.", date: "Today · 10:42 AM", complete: true },
    { title: "Next step confirmed", detail: "We’ll update you when the review is complete.", date: "In progress", complete: false },
    { title: "Resolved", detail: "We’ll record the resolution here.", date: "Upcoming", complete: false },
  ],
};

export const issueExamples: Record<string, TicketStatus> = {
  [sampleTicket.reference]: sampleTicket,
};
