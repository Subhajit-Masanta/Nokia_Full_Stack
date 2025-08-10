import { getConnection, sql } from '../Config/db.js';

const executeQuery = async (query) => {
    try {
        const db = await getConnection();
        const result = await db.request().query(query);
        return result.recordset[0]; // Get first record from result
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

export const getComparision = async (req, res) => {
    try {
        // Get current time (assuming IST)
        const now = new Date();
        
        // Today's time window: 6:15 AM today to current time
        const todayCompanyStart = new Date();
        todayCompanyStart.setHours(6, 15, 0, 0);
        
        // If current time is before 6:15 AM, we're still in yesterday's company day
        let todayEnd;
        if (now.getHours() < 6 || (now.getHours() === 6 && now.getMinutes() < 15)) {
            // Before 6:15 AM - use yesterday's company day start to now
            todayCompanyStart.setDate(todayCompanyStart.getDate() - 1);
            todayEnd = new Date(now);
        } else {
            // After 6:15 AM - use today's company day start to now
            todayEnd = new Date(now);
        }
        
        // Yesterday's time window: same time range but 24 hours earlier
        const yesterdayCompanyStart = new Date(todayCompanyStart);
        yesterdayCompanyStart.setDate(yesterdayCompanyStart.getDate() - 1);
        
        const yesterdayEnd = new Date(todayEnd);
        yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);

        // Format dates for SQL (using IST timestamps directly)
        const formatDateSQL = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        // Today's query (from 6:15 AM today to current time)
        const todayQuery = `
            SELECT 
                SUM(Quantity) as total_quantity,
                COUNT(*) as waste_count
            FROM Food_Waste_Management
            WHERE WASTAGE_DATE >= '${formatDateSQL(todayCompanyStart)}' 
            AND WASTAGE_DATE <= '${formatDateSQL(todayEnd)}'
        `;

        // Yesterday's query (from 6:15 AM yesterday to same time yesterday)
        const yesterdayQuery = `
            SELECT 
                SUM(Quantity) as total_quantity,
                COUNT(*) as waste_count
            FROM Food_Waste_Management
            WHERE WASTAGE_DATE >= '${formatDateSQL(yesterdayCompanyStart)}' 
            AND WASTAGE_DATE <= '${formatDateSQL(yesterdayEnd)}'
        `;

        // Execute both queries in parallel
        const [todayData, yesterdayData] = await Promise.all([
            executeQuery(todayQuery),
            executeQuery(yesterdayQuery)
        ]);

        // Build response
        const response = {
            success: true,
            todayWeight: todayData?.total_quantity || 0,
            yesterdayWeight: yesterdayData?.total_quantity || 0,
            todayDate: todayCompanyStart.toISOString(),
            yesterdayDate: yesterdayCompanyStart.toISOString(),
            todayCount: todayData?.waste_count || 0,
            yesterdayCount: yesterdayData?.waste_count || 0,
            currentTime: now.toISOString(),
            todayEndTime: todayEnd.toISOString(),
            yesterdayEndTime: yesterdayEnd.toISOString()
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Comparison API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch comparison data',
            details: error.message
        });
    }
};
