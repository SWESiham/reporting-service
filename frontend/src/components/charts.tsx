import React from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Legend,
} from "recharts";

import type{ ChartData } from '../types/dashboard';
interface Props { chartData: ChartData; }
export const TicketsByDayChart:
    React.FC<Props> = ({ chartData }) => {
        return (
            <div
            style=
            {{
                background: "#12161f",
                border: "1px solid #1e2535",
                borderRadius: 12,
                padding: "20px 22px",
            }}>
            <p
                style=
                    {{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#64748b",
                        marginBottom: 20,
                    }}
                >
                Ticket Volume — Last 7 Days
            </p>
            <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={chartData.ticketsByDay} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                   <defs>
          <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradInProgress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2535" />
        <XAxis dataKey="date" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8", paddingTop: 8 }} />
        <Area type="monotone" dataKey="open"       stroke="#3b82f6" fill="url(#gradOpen)"       strokeWidth={2} name="Open" />
        <Area type="monotone" dataKey="inProgress" stroke="#f59e0b" fill="url(#gradInProgress)" strokeWidth={2} name="In Progress" />
        <Area type="monotone" dataKey="resolved"   stroke="#22c55e" fill="url(#gradResolved)"   strokeWidth={2} name="Resolved" />
      </AreaChart>
                </ResponsiveContainer>
                </div>

      )
        
        
    };

export const AgentResponseChart: React.FC<Props> = ({ chartData }) => (
    <div
            style=
            {{
                background: "#12161f",
                border: "1px solid #1e2535",
                borderRadius: 12,
                padding: "20px 22px",
            }}>
            <p
                style=
                    {{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#64748b",
                        marginBottom: 20,
                    }}
                >
                Avg Response Time by Agent
        </p>
        <ResponsiveContainer width="100%" height={250}>
                    <BarChart
        data={chartData.avgResponseByAgent}
        layout="vertical"
        margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
            >
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e2535" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="agent" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
        <Bar dataKey="avgMinutes" name="Avg Min" fill="#a855f7" radius={[0, 4, 4, 0]}
          style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.4))" }} />
            </BarChart>
            
        </ResponsiveContainer>
    </div>
)


