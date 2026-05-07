import './App.css'

import { useDashboard } from "./hooks/useDashboard";
import { TicketTable } from "./components/TicketTable";
import { AgentResponseChart, TicketsByDayChart } from './components/charts';
import { KPI } from './components/KPI';

function App() {
  const { data, loading, lastUpdated, refresh } = useDashboard();
  console.log("DATAAAAA", data?.KPIs);
  return (
    
    <div style=
      {{
        minHeight: "100vh",
        background: "#080c14",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', sans-serif",
        padding: "0 0 60px",
      }}>
            


      <nav style={{
        background: "#0d1117",
        borderBottom: "1px solid #1e2535",
        padding: "0 32px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em" }}>CUSTOMER SUPPORT ANALYTICS</div>
          </div>
        </div>
                
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {lastUpdated && (
            <span style={{ fontSize: 11, color: "#475569" }}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={refresh}
            disabled={loading}
            style={{
              fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 8,
              border: "1px solid #1e2535", background: loading ? "#1e2535" : "transparent",
              color: loading ? "#475569" : "#3b82f6", cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.15s",
            }}
          >
            {loading ? "Refreshing…" : "⟳ Refresh"}
          </button>
        </div>
      </nav>
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 32px 0" }}>
        <div style={{ marginBottom: 28, animation: "fadeUp 0.4s ease" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Analytics Dashboard
          </h1>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16, marginBottom: 24,
          animation: "fadeUp 0.5s ease 0.1s both",
        }}>
           
          {
            
            data && data.KPIs ? (

              <>
                <KPI title="Total Tickets" value={data.KPIs.totalTickets} color='#3b82f6' subtitle="Total number of tickets" />
                <KPI title="Open Tickets" value={data.KPIs.openTickets} color='#f59e0b' subtitle="Tickets currently open" />
                <KPI title="InProgress Tickets" value={data.KPIs.inProgressTickets} color='#8b5cf6' subtitle="Tickets in progress" />
                <KPI title="Resolved Tickets" value={data.KPIs.resolvedTickets} color='#10b981' subtitle="Tickets resolved" />
                <KPI title="Resolution Rate" value={`${data.KPIs.resolutionRate}%`} color='#ef4444' subtitle="Percentage of tickets resolved" />
                <KPI title="Average Resolution Time" value={`${data.KPIs.avgResponseTimeMinutes} min`} color='#06b6d4' subtitle="Average time to resolve tickets" />
              </>
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <KPI key={i} title="" value="" color=''/>
              ))
            )
          }
            
            

        </div>

        <div style={{ marginBottom: 24, animation: "fadeUp 0.5s ease 0.2s both" }}>
          {data ? (
            <TicketsByDayChart chartData={data.charts} />
          ) : null}
        </div>
          


        <div style={{
          display: "grid", gridTemplateColumns: "1fr",
          gap: 24, marginBottom: 24,
          animation: "fadeUp 0.5s ease 0.3s both",
        }}>
          {data ? (
            <AgentResponseChart chartData={data.charts} />
          ) : null}
        </div>

          
        <div style={{ animation: "fadeUp 0.5s ease 0.4s both" }}>
          {data ? (
            
            <TicketTable tickets={data.table} />
          ):null}
        </div>
      </main> 
    </div>
    
  );
}


export default App
