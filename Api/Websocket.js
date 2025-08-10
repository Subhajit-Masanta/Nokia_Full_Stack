import { WebSocketServer } from 'ws';
import WebSocket from 'ws';
import { getConnection, sql } from './Config/db.js';

let wss;
const clients = new Set();

// identifying the mealtype function
function getMealTypeByTime(date = new Date()) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const totalMinutes = hour * 60 + minute;

  if (totalMinutes >= 420 && totalMinutes <= 540) return "Breakfast"; // 7:00–9:00
  if (totalMinutes >= 675 && totalMinutes <= 855) return "Lunch"; // 11:15–14:15
  if (totalMinutes >= 1000 && totalMinutes <= 1080) return "Snacks & Tea"; // 16:40–18:00
  if (totalMinutes >= 1140 && totalMinutes <= 1245) return "Dinner"; // 19:00–20:45
  if ((totalMinutes >= 1410 && totalMinutes <= 1439) || (totalMinutes >= 0 && totalMinutes < 30)) return "Midnight Snacks"; // 23:30–00:30
  if (totalMinutes >= 180 && totalMinutes <= 270) return "Supper"; // 3:00–4:30
  return "Unknown"; //if does not belong to any meal time
}

// Convert UTC time to IST
function convertToIST(utcDate = new Date()) {
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(utcDate.getTime() + istOffset);
}


async function storeSensorData(weight, mealType, date = new Date()) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('FOOD_CATEGORY', sql.NVarChar(50), mealType)
      .input('Quantity', sql.Int, weight)
      .input('WASTAGE_DATE', sql.DateTime, date)
      .input('CreatedAt', sql.DateTime, date)
      .query(`INSERT INTO Food_Waste_Management (FOOD_CATEGORY, Quantity, WASTAGE_DATE, CreatedAt) VALUES (@FOOD_CATEGORY, @Quantity, @WASTAGE_DATE, @CreatedAt)`);
    console.log(`Stored sensor data: ${weight}g for ${mealType}`);
  } catch (error) {
    console.error('Database storage error:', error);
  }
}

export const initWebSocket = (server) => {
  wss = new WebSocketServer({
    server,
    path: '/ws',
    clientTracking: false, // manually handle
    pingInterval: 30000, // Send ping every 30 seconds
    pingTimeout: 60000   // Wait 60 seconds for pong response
  });

  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');
       // Disable socket timeouts entirely
    ws._socket.setKeepAlive(true);
    ws._socket.setTimeout(0);
    //it is newly added

    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
    
    clients.add(ws);

    // identify the meal type
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data);
    if (message.type === 'sensor_data') {
      const now = new Date();
      const mealType = getMealTypeByTime(now);

      const increment = message.increment;
      const cumulativeWeight = message.cumulative_weight;

      // Apply 50g threshold - only process if increment >= 50g
      if (increment >= 50) {
        // Store increment in DB
        await storeSensorData(increment, mealType, now);

        // send the cumulative weight to client(react)
        const broadcastMsg = JSON.stringify({
          type: 'weight_update',
          weight: cumulativeWeight,
          mealType,
          timestamp: now.toISOString()
        });

        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastMsg);
          }
        });
        
        console.log(`Weight threshold met: ${increment}g stored for ${mealType} at ${now.toISOString()}`);
      } else {
        console.log(`Weight increment ${increment}g below 50g threshold - not stored`);
      }
        }
      } catch (error) {
        console.error('Message handling error:', error);
      }
    });

    // Handle close
    ws.on('close', () => {
      console.log('WebSocket closed');
      clients.delete(ws);
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });
};


