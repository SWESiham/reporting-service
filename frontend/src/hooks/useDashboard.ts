/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import type { DashboardData } from "../types/dashboard";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const useDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/dashboard`);
            if (!res.ok) throw new Error(`Error fetching dashboard data: ${res.statusText}`);
            const result = await res.json();
            console.log("Backend Response: ", result.data); 

            setData(result.data);
            setLastUpdated(new Date());
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Unknown error";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchData();
        const refresh = setInterval(fetchData, 30000);
        return () => clearInterval(refresh);
    }, []);

    return { data, loading, error, lastUpdated, refresh:fetchData };
} 