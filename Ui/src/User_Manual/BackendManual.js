import React, { useState } from 'react';
import { ManualLayout } from './ManualLayout';

const backendSections = {
  overview: {
    title: 'Overview',
    content: (
      <div>
        <h4>Tech Stack</h4>
        <ul>
          <li><strong>Node.js + Express 5.1.0</strong> with ES modules</li>
          <li><strong>Microsoft SQL Server</strong> with connection pooling, stored procedures, optimized schema.</li>
          <li><strong>WebSocket (ws 8.18.2)</strong> for real-time communication, live sensor data</li>
          <li><strong>Python scripts</strong> for hardware control(HX711, RPi GPIO, serial comms)</li>
        </ul>

        <h4>Core Features</h4>
        <ul>
          <li><strong>Real-time Data:</strong> Live sensor streaming via WebSocket</li>
          <li><strong>Analytics Processing:</strong> Weekly/monthly trend calculations</li>
          <li><strong>Hardware Integration:</strong> HX711, Load Cell, RPi monitoring</li>
          <li><strong>MSSQL Storage:</strong> Optimized schema with stored procedures, SQL Server with indexing & partitioning</li>
        </ul>

        <h4>Server Configuration</h4>
        <ul>
          <li>Runs on port 5000 with CORS enabled</li>
          <li>Environment-based configuration via .env</li>
          <li>Structured logging and error handling</li>
          <li>High-throughput API (~1500 req/sec)</li>
        </ul>
      </div>
    ),
  },
  architecture: {
    title: 'Project Structure',
    content: (
      <div>
        <h4>Directory Organization</h4>
        <ul>
          <li><strong>Config/:</strong> Database connection and pooling configuration</li>
          <li><strong>Controllers/:</strong> Request handlers for different hardware components</li>
          <li><strong>Pages/:</strong> Analytics processors for data aggregation</li>
          <li><strong>routes/:</strong> API endpoint definitions and routing</li>
          <li><strong>services/:</strong> Business logic and external integrations</li>
        </ul>

        <h4>Key Files and Their Purpose</h4>
        <ul>
          <li><strong>db.js:</strong> Database connection configuration</li>
          <li><strong>hx711.controller.js:</strong> HX711 sensor control and calibration</li>
          <li><strong>loadcell.controller.js:</strong> Load cell management and diagnostics</li>
          <li><strong>rpi.controller.js:</strong> Raspberry Pi system control</li>
          <li><strong>Chart_Back.js:</strong> Chart data aggregation and processing</li>
          <li><strong>Comparision_Back.js:</strong> Comparative analytics calculations</li>
          <li><strong>websocket.service.js:</strong> Real-time communication handling</li>
        </ul>

        <h4>Architecture Layers</h4>
        <ul>
          <li><strong>Routes:</strong> API endpoint definitions and HTTP method handling</li>
          <li><strong>Controllers:</strong> Request processing and response coordination</li>
          <li><strong>Services:</strong> Core business logic and external integrations</li>
          <li><strong>Pages:</strong> Specialized analytics and data processing modules</li>
          <li><strong>Config:</strong> Database connections and environment settings</li>
        </ul>
      </div>
    ),
  },
  endpoints: {
    title: 'API Endpoints',
    content: (
      <div>
        <h4>Response Format</h4>
        <p>All endpoints return standardized JSON responses with success status, data payload, timestamp, and descriptive messages.</p>

        <h4>Analytics Endpoints</h4>
        <ul>
          <li><strong>GET /api/weekly-chart:</strong> Returns 7-day waste trend analysis with daily totals and percentage changes</li>
          <li><strong>GET /api/monthly-chart:</strong> Provides 4-week comparison data with monthly projections</li>
          <li><strong>GET /api/comparision:</strong> Calculates waste reduction metrics and environmental impact</li>
          <li><strong>GET /api/monthly-waste:</strong> Monthly statistics with forecasting and goal tracking</li>
        </ul>
        
        <h4>Real-time Data Endpoints</h4>
        <ul>
          <li><strong>GET /api/weights:</strong> Live weight measurements with session metadata and calibration status</li>
          <li><strong>GET /api/weights/session/:id:</strong> Session-specific weight data with timeline</li>
          <li><strong>POST /api/weights/calibrate:</strong> Initiates sensor calibration sequence with reference weights</li>
        </ul>
        
        <h4>System Health Monitoring</h4>
        <ul>
          <li><strong>GET /api/health:</strong> System health check with server status and database connectivity</li>
          <li><strong>GET /api/health/detailed:</strong> Detailed system diagnostics and performance metrics</li>
        </ul>

        <h4>Hardware Integration</h4>
        <ul>
          <li><strong>GET /api/hx711/status:</strong> HX711 amplifier status with calibration data and diagnostics</li>
          <li><strong>POST /api/hx711/calibrate:</strong> HX711 calibration process with reference weight values</li>
          <li><strong>GET /api/loadcell/diagnostics:</strong> Load cell health check with sensitivity analysis</li>
          <li><strong>GET /api/rpi/status:</strong> Raspberry Pi system information and resource utilization</li>
          <li><strong>POST /api/rpi/restart:</strong> Controlled system restart with authentication</li>
        </ul>

        <h4>Rate Limiting Implementation</h4>
        <ul>
          <li>Standard endpoints: 100 requests per minute per IP address</li>
          <li>Real-time data: 1000 requests per minute for WebSocket connections</li>
          <li>Authentication endpoints: 5 attempts per 15 minutes for security</li>
          <li>Analytics endpoints: 10 requests per minute for heavy operations</li>
        </ul>
      </div>
    ),
  },
  database: {
    title: 'Database Overview',
    content: (
      <div>
        <h4>Database Technology</h4>
        <ul>
          <li>Microsoft SQL Server with connection pooling</li>
          <li>Environment-based configuration management</li>
          <li>SSL encryption and security protocols</li>
        </ul>

        <h4>Data Storage Categories</h4>
        <ul>
          <li><strong>Waste Measurements:</strong> Primary data collection from sensors</li>
          <li><strong>Session Management:</strong> User interaction tracking</li>
          <li><strong>Hardware Monitoring:</strong> System status and diagnostics</li>
          <li><strong>Analytics Processing:</strong> Calculated trends and comparisons</li>
        </ul>

        <h4>Performance Features</h4>
        <ul>
          <li>Optimized queries for real-time data retrieval</li>
          <li>Stored procedures for complex analytics</li>
          <li>Indexing strategies for fast data access</li>
        </ul>
      </div>
    ),
  },
  websocket: {
    title: 'WebSocket Implementation',
    content: (
      <div>
        <h4>WebSocket Server Configuration</h4>
        <ul>
          <li>WebSocket server setup using ws library (8.18.2) with 16MB max payload</li>
          <li>Connection management with unique client ID generation</li>
          <li>Path-based WebSocket endpoint at /ws for client connections</li>
          <li>Client registry mapping for connection tracking and management</li>
        </ul>

        <h4>Real-time Data Channels</h4>
        <ul>
          <li><strong>weight-data:</strong> Live weight measurements streaming with 10-50ms update intervals</li>
          <li><strong>system-status:</strong> Hardware health monitoring updates every 5 seconds</li>
          <li><strong>analytics-updates:</strong> Live trend calculations triggered by significant data changes</li>
          <li><strong>calibration:</strong> Sensor calibration process updates with progress tracking</li>
        </ul>

        <h4>Message Protocol Structure</h4>
        <ul>
          <li>Standardized message format with type, channel, timestamp, and data fields</li>
          <li>Weight data messages include weight value, unit, sensor ID, session ID, and calibration status</li>
          <li>System status messages contain hardware health and performance metrics</li>
          <li>Error messages with detailed error information and recovery suggestions</li>
        </ul>

        <h4>Connection Management Features</h4>
        <ul>
          <li>Automatic reconnection logic with exponential backoff strategy</li>
          <li>30-second heartbeat mechanism with ping/pong timeout detection</li>
          <li>Dynamic channel subscription and unsubscription management</li>
          <li>Message queuing system with 1000 message buffer for offline clients</li>
          <li>Graceful connection cleanup and resource management</li>
        </ul>
      </div>
    ),
  },
  frontendIntegration: {
    title: 'Frontend Integration',
    content: (
      <div>
        <h4>Data Transmission Architecture</h4>
        <ul>
          <li><strong>Dual Channel Communication:</strong> HTTP REST API for request-response operations, WebSocket for real-time data streaming</li>
          <li><strong>Message Broadcasting:</strong> Backend broadcasts sensor data to all connected frontend clients simultaneously</li>
          <li><strong>Data Serialization:</strong> JSON format with standardized message structure for consistent frontend parsing</li>
          <li><strong>Compression:</strong> WebSocket messages compressed using gzip to optimize bandwidth usage</li>
        </ul>

        <h4>Real-time Data Streaming</h4>
        <ul>
          <li><strong>Weight Data Stream:</strong> Continuous sensor readings sent to frontend dashboard components at 20Hz frequency</li>
          <li><strong>System Health Updates:</strong> Hardware status pushed to troubleshooting panels every 5 seconds</li>
          <li><strong>Session Events:</strong> Start/stop/calibration events broadcast to all connected clients for synchronization</li>
          <li><strong>Alert Notifications:</strong> Critical system alerts pushed immediately to frontend notification system</li>
        </ul>

        <h4>API Response Formatting</h4>
        <ul>
          <li><strong>Standardized Structure:</strong> All API responses include success status, data payload, timestamp, and message fields</li>
          <li><strong>Chart Data Processing:</strong> Analytics endpoints format data specifically for Chart.js consumption with labels and datasets</li>
          <li><strong>Error Handling:</strong> Detailed error responses with error codes, descriptions, and suggested actions</li>
          <li><strong>Pagination Support:</strong> Large datasets paginated with metadata for frontend table components</li>
        </ul>

        <h4>Frontend State Synchronization</h4>
        <ul>
          <li><strong>Initial Data Load:</strong> Frontend fetches current state via HTTP API on component mount</li>
          <li><strong>Incremental Updates:</strong> WebSocket provides delta updates to maintain frontend state consistency</li>
          <li><strong>Conflict Resolution:</strong> Backend timestamp-based conflict resolution for concurrent updates</li>
          <li><strong>Cache Invalidation:</strong> Backend sends cache invalidation signals for stale frontend data</li>
        </ul>

        <h4>Performance Optimization</h4>
        <ul>
          <li><strong>Data Throttling:</strong> Backend throttles high-frequency sensor data to prevent frontend overwhelm</li>
          <li><strong>Selective Broadcasting:</strong> Clients subscribe to specific data channels to reduce unnecessary traffic</li>
          <li><strong>Batch Operations:</strong> Multiple database operations batched before sending updates to frontend</li>
          <li><strong>Connection Pooling:</strong> WebSocket connection pooling for efficient resource management</li>
        </ul>

        <h4>Error Recovery & Resilience</h4>
        <ul>
          <li><strong>Connection Monitoring:</strong> Backend tracks frontend connection health and automatically retries failed transmissions</li>
          <li><strong>Message Queuing:</strong> Offline message queuing ensures data delivery when frontend reconnects</li>
          <li><strong>Graceful Degradation:</strong> Backend provides HTTP polling fallback when WebSocket connections fail</li>
          <li><strong>Data Validation:</strong> All outgoing data validated and sanitized before transmission to frontend</li>
        </ul>

        <h4>Security & Authentication</h4>
        <ul>
          <li><strong>Token Validation:</strong> All frontend requests validated using JWT tokens with expiration handling</li>
          <li><strong>Secure WebSocket:</strong> WebSocket connections authenticated during handshake process</li>
          <li><strong>Data Encryption:</strong> Sensitive data encrypted before transmission using AES-256 encryption</li>
          <li><strong>Rate Limiting:</strong> Per-client rate limiting prevents frontend abuse and ensures fair resource allocation</li>
        </ul>
      </div>
    ),
  },
};

export function BackendManual({ onBack }) {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <ManualLayout
      title="Backend Design"
      sections={backendSections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      <h2>{backendSections[activeSection].title}</h2>
      {backendSections[activeSection].content}
    </ManualLayout>
  );
}