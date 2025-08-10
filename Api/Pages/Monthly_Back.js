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

// Get total waste for the current month
export const getCurrentMonthWaste = async (req, res) => {
    try {
        const recordset = await executeQuery(`
            SELECT 
                SUM(Quantity) as total_quantity,
                COUNT(*) as waste_count
            FROM Food_Waste_Management
            WHERE MONTH(WASTAGE_DATE) = MONTH(GETDATE())
              AND YEAR(WASTAGE_DATE) = YEAR(GETDATE())
        `);

        const totalQuantity = recordset[0]?.total_quantity || 0;
        const wasteCount = recordset[0]?.waste_count || 0;

        const data = {
            month: new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' }),
            total_quantity_kg: convertGramsToKg(totalQuantity),
            waste_count: wasteCount
        };

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Current month waste error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch current month waste data',
            details: error.message 
        });
    }
};
