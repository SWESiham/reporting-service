import React, { useState } from 'react';
import type { TicketRow, TicketStatus } from '../types/dashboard';

interface Props { tickets: TicketRow[] }

const STATUSES: (TicketStatus | "All")[] = ["All", "Open", "In Progress", "Resolved"];
const statusStyle: Record<TicketStatus, React.CSSProperties> = {
  Open:        { color: "#3b82f6", background: "rgba(59,130,246,0.12)",  border: "1px solid rgba(59,130,246,0.3)"  },
  "In Progress":{ color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" },
  Resolved:    { color: "#22c55e", background: "rgba(34,197,94,0.12)",   border: "1px solid rgba(34,197,94,0.3)"  },
};


export const TicketTable: React.FC<Props> = ({ tickets }) => {

    const [filter, setFilter] = useState<TicketStatus | 'All'>('All');
    const [search, setSearch] = useState("");
    
    const filterTickets = tickets.filter(t =>
        (filter === "All" || t.status === filter) &&
        (
            t.subject.toLowerCase().includes(search.toLowerCase())||
            t.agent.toLowerCase().includes(search.toLowerCase())||
            t.id.toLowerCase().includes(search.toLowerCase())
        ));


    return (
        <div style={{
      background: "#12161f",
      border: "1px solid #1e2535",
      borderRadius: 12,
      padding: "20px 22px",
        }}>
            
            <div
                style=
                {{
                    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12
                }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", margin: 0 }}>
                    Recent Tickets ({filterTickets.length})
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

                    <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search tickets…"
                        style=
                        {{
                        background: "#0d1117", border: "1px solid #1e2535", borderRadius: 8,
                        color: "#f1f5f9", fontSize: 12, padding: "6px 12px", outline: "none", width: 180,
                        }}
                    />

                    <div style={{ display: "flex", gap: 4 }}>
                        {STATUSES.map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                                style=
                                {{
                                    fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6, cursor: "pointer",
                                    border: filter === s ? "1px solid #3b82f6" : "1px solid #1e2535",
                                    background: filter === s ? "rgba(59,130,246,0.15)" : "transparent",
                                    color: filter === s ? "#3b82f6" : "#475569",
                                    transition: "all 0.15s",
                                }}
                            >{s}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1e2535" }}>
                            {["ID", "Subject", "Status", "Agent", "Created", "Response Time"].map(h => (
                                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#475569", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {filterTickets.map((t, i) => (
                                <tr key={t.id} style={{
                                    borderBottom: "1px solid #1e2535",
                                    background: i % 2 === 0 ? "#1e2535" : "transparent"
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.05)")}
                                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)")}
                                >
                                
                                <td style={{ padding: "10px 12px", color: "#64748b", fontFamily: "monospace", whiteSpace: "nowrap" }}>{t.id}</td>
                                <td style={{ padding: "10px 12px", color: "#cbd5e1", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.subject}</td>
                                <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                                    <p style={{ ...statusStyle[t.status], borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>{t.status}</p>
                                </td>
                                <td style={{ padding: "10px 12px", color: "#94a3b8", whiteSpace: "nowrap" }}>{t.agent}</td>
                                <td style={{ padding: "10px 12px", color: "#475569", fontFamily: "monospace", fontSize: 12, whiteSpace: "nowrap" }}>{t.createdAt}</td>
                                <td style={{ padding: "10px 12px", color: "#22c55e", fontFamily: "monospace", fontSize: 12, whiteSpace: "nowrap" }}>{t.responseTime}</td>
                                </tr>
                            ))}
                            {filterTickets.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#475569" }}>No tickets match your filter.</td>
                            </tr>
                            )}
                        </tbody> 
                </table>
            </div>
        </div>
    );
}