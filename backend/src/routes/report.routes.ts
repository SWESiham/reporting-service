const express = require('express');
const DashboardData = require('../services/report.service');
const router = express.Router();



router.get("/", async (req:any, res:any) => {
    try {
        const dashboardData = await DashboardData();
        res.status(200).json({
            data: dashboardData,
            message: "Dashboard data fetched successfully"
        });
    } catch (error: any) {
        res.status(500).json({
            error: "Failed to fetch dashboard data"
        });
    }
});

module.exports = router;