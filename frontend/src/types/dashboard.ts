export interface KPIs {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  avgResponseTimeMinutes: number;
  resolutionRate: number;
  ticketsOpenedToday: number;
  ticketsResolvedToday: number;
}

export interface DailyTicket {
  date: string;
  open: number;
  resolved: number;
  inProgress: number;
}

export interface AgentResponse {
  agent: string;
  avgMinutes: number;
}

export interface ChartData {
  ticketsByDay: DailyTicket[];
  avgResponseByAgent: AgentResponse[];
}

export type TicketStatus = "Open" | "In Progress" | "Resolved";

export interface TicketRow {
  id: string;
  subject: string;
  status: TicketStatus;
  agent: string;
  createdAt: string;
  responseTime: string;
}

export interface DashboardData {
  KPIs: KPIs;
  charts: ChartData;
  table: TicketRow[];
}