const axios = require('axios');

 const fetchDashboardData = async () => {
    try {
        const TICKET_SERVICE_URL = process.env.TICKET_SERVICE_URL || 'http://localhost:3000/tickets';
        const res = await axios.get(TICKET_SERVICE_URL);
        const tickets = res.data.data;
        console.log(tickets);

        const today = new Date().setHours(0, 0, 0, 0);

        const KPIs = {
            totalTickets: tickets.length,
            openTickets: tickets.filter((t: any) => t.status === 'open').length,
            inProgressTickets: tickets.filter((t: any) => t.status === 'in_progress').length,
            resolvedTickets: tickets.filter((t: any) => t.status === 'resolved').length,
            resolutionRate: 0,
            ticketsOpenedToday: tickets.filter((t: any) => new Date(t.createdAt).setHours(0, 0, 0, 0) === today).length,
            ticketsResolvedToday: tickets.filter((t: any) => t.status === 'resolved' && new Date(t.createdAt).setHours(0, 0, 0, 0) === today).length,
            ticketsInProgressToday: tickets.filter((t: any) => t.status === 'in_progress' && new Date(t.createdAt).setHours(0, 0, 0, 0) === today).length,
            avgResponseTimeMinutes: 0
        };

        if (KPIs.totalTickets > 0) {
            KPIs.resolutionRate = Number((((KPIs.resolvedTickets / KPIs.totalTickets)) * 100).toFixed(1));
        }

        const last7Days: any = {}
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const _date = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
            last7Days[_date] = { date: _date, open: 0, resolved: 0, inProgress: 0 };
        }

        tickets.forEach((t: any) => {
            const createdDate = new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
            if (last7Days[createdDate]) {
                switch (t.status) {
                    case 'open':
                        last7Days[createdDate].open++;
                        break;
                    case 'resolved':
                        last7Days[createdDate].resolved++;
                        break;
                    case 'in_progress':
                        last7Days[createdDate].inProgress++;
                        break;
                }
            }
        });

        const table = tickets
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 12)
            .map((t: any) => ({
                id: "TKT-" + t._id.substring(0, 4).toUpperCase(),
                subject: t.title,
                status: t.status === 'open' ? 'Open' : t.status === 'in_progress' ? 'In Progress' : 'Resolved',
                agent: t.assignedAgent ? t.assignedAgent.name : "Unassigned",
                createdAt: new Date(t.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
                responseTime: t.responseTime ? `${t.responseTime} min` : "N/A",
            }));

        return {
            KPIs, charts: {
                ticketsByDay: Object.values(last7Days),
                avgResponseByAgent: [] // This can be implemented similarly by grouping tickets by agent and calculating average response time
        }, table };
        
    } catch (error: any) {
        console.error("Error communicating with Ticket Service:", error.message);
    
        throw new Error("Unable to fetch ticket data. Ticket Service might be down.");
    }
};

module.exports = fetchDashboardData;