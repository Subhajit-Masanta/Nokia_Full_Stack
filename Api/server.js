import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import { initWebSocket } from './Websocket.js'; // for websocket functionality

dotenv.config();

const app = express();
const PORT = /*process.env.PORT || */ 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use('/api', router);

// Health check
// Replace existing health check with:
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is healthy',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/weekly-chart',
      '/api/monthly-chart',
       '/api/comparision',
       './api/weights',
       './api/monthly-waste'
    ]
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
// });  

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
   console.log('🕸️ WebSocket available at ws://localhost:5000/ws');
});

// Initialize WebSocket
initWebSocket(server);

export default app;
