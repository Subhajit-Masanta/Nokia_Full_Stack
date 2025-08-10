import { getConnection, sql } from '../Config/db.js';

// Helper function to handle database operations
const executeQuery = async (query) => {
    try {
        const db = await getConnection();
        const result = await db.request().query(query);
        return result.recordset;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// Helper function to convert grams to kg
const convertGramsToKg = (grams) => parseFloat((grams / 1000).toFixed(2));

// Get weekly chart data (last 7 days)
export const getWeeklyChart = async (req, res) => {
    try {
        const recordset = await executeQuery(`
            SELECT 
                CAST(WASTAGE_DATE AS DATE) as date,
                SUM(Quantity) as total_quantity,
                COUNT(*) as waste_count
            FROM Food_Waste_Management
            WHERE WASTAGE_DATE >= DATEADD(day, -6, GETDATE())
            GROUP BY CAST(WASTAGE_DATE AS DATE)
            ORDER BY date
        `);

        const chartData = {
            dates: recordset.map(({ date }) => {
                const dateObj = new Date(date);
                const day = dateObj.getDate().toString().padStart(2, '0');
                const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                return `${day} ${month}`;
            }),
            quantities: recordset.map(({ total_quantity }) => convertGramsToKg(total_quantity)),
            counts: recordset.map(({ waste_count }) => waste_count)
        };

        return res.status(200).json({
            success: true,
            data: chartData
        });
    } catch (error) {
        console.error('Weekly chart error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch weekly data',
            details: error.message 
        });
    }
};

// Get monthly chart data (last 4 weeks)
export const getMonthlyChart = async (req, res) => {
    try {
        const recordset = await executeQuery(`
            SELECT TOP 4
                DATEADD(week, DATEDIFF(week, 0, WASTAGE_DATE), 0) as week_start,
                SUM(Quantity) as total_quantity,
                COUNT(*) as waste_count
            FROM Food_Waste_Management
            WHERE WASTAGE_DATE >= DATEADD(week, -3, GETDATE())
            GROUP BY DATEADD(week, DATEDIFF(week, 0, WASTAGE_DATE), 0)
            ORDER BY week_start DESC
        `);

        const chartData = {
            weeks: recordset.reverse().map((row, index) => {
                const weekStart = new Date(row.week_start);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                
                const startDay = weekStart.getDate().toString().padStart(2, '0');
                const startMonth = (weekStart.getMonth() + 1).toString().padStart(2, '0');
                const endDay = weekEnd.getDate().toString().padStart(2, '0');
                const endMonth = (weekEnd.getMonth() + 1).toString().padStart(2, '0');
                
                return `Week ${index + 1}`;
            }),
            quantities: recordset.reverse().map(({ total_quantity }) => convertGramsToKg(total_quantity)),
            counts: recordset.reverse().map(({ waste_count }) => waste_count)
        };

        return res.status(200).json({
            success: true,
            data: chartData
        });
    } catch (error) {
        console.error('Monthly chart error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch monthly data',
            details: error.message 
        });
    }
};