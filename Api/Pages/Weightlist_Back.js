import { getConnection, sql } from '../Config/db.js';

function getCompanyDayBounds(now = new Date()) {
  // Get current time in IST
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istNow = new Date(now.getTime() + istOffset);
  
  // Create 6:15 AM today in IST timezone (using UTC methods to avoid timezone confusion)
  const year = istNow.getUTCFullYear();
  const month = istNow.getUTCMonth();
  const date = istNow.getUTCDate();
  
  const todayAt615IST_ms = Date.UTC(year, month, date, 6, 15, 0, 0);
  const todayAt615IST = new Date(todayAt615IST_ms);
  
  let companyDayStartIST, companyDayEndIST;
  
  if (istNow >= todayAt615IST) {
    // Current IST time is after today's 6:15 AM - we're in today's company day
    companyDayStartIST = todayAt615IST;
    companyDayEndIST = new Date(todayAt615IST.getTime() + 24 * 60 * 60 * 1000); // Tomorrow 6:15 AM IST
  } else {
    // Current IST time is before today's 6:15 AM - we're in yesterday's company day
    companyDayEndIST = todayAt615IST;
    companyDayStartIST = new Date(todayAt615IST.getTime() - 24 * 60 * 60 * 1000); // Yesterday 6:15 AM IST
  }
  
  // Since database stores IST timestamps, use IST times directly (no UTC conversion)
  return { start: companyDayStartIST, end: companyDayEndIST }; 
}

export const getSessionWeights = async (req, res) => {
  try {
    const db = await getConnection();
    const now = new Date();
    const { start, end } = getCompanyDayBounds(now);

    // Get session data grouped by category
    const result = await db.request()
      .input('start', sql.DateTime, start)
      .input('end', sql.DateTime, end)
      .query(`
        SELECT 
          FOOD_CATEGORY,
          SUM(Quantity) AS total_quantity
        FROM Food_Waste_Management
        WHERE WASTAGE_DATE >= @start AND WASTAGE_DATE < @end
        GROUP BY FOOD_CATEGORY
      `);

    const sessionData = result.recordset.reduce((acc, row) => {
      const key = row.FOOD_CATEGORY
        .toLowerCase()
        .replace(/\s|&/g, '_')
        .replace(/_+/g, '_');
      acc[key] = row.total_quantity;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        breakfast: sessionData.breakfast || 0,
        lunch: sessionData.lunch || 0,
        snacks_tea: sessionData.snacks_tea || 0,
        dinner: sessionData.dinner || 0,
        midnight_snacks: sessionData.midnight_snacks || 0,
        supper: sessionData.supper || 0
      }
    });
  } catch (error) {
    console.error('Session weights error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session weights',
      details: error.message
    });
  }
};
