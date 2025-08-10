import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Odometer from 'react-odometerjs';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import "odometer/themes/odometer-theme-default.css";
import "./Leftcard.css";
import waste from "../utils/ohyeah.gif";
import { API } from "../services/api";

function Leftcard() {
  const [monthlyWeight, setMonthlyWeight] = useState(0);
  const [todayWeight, setTodayWeight] = useState(0);
  const [liveWeight, setLiveWeight] = useState(0);
  const [isConnected, setIsConnected] = useState(false); // WebSocket connection status
  const [error, setError] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const wsRef = useRef(null);

  window.odometerOptions = {
    animation: 'slide',
    duration: 2000
  };

  useEffect(() => {
    let isMounted = true;
    const fetchMonthlyWaste = async () => {
      try {
        const res = await API.getMonthlyWaste();
        const data = res.data;
        if (isMounted) {
          if (data.success && data.data && typeof data.data.total_quantity_kg === 'number') {
            setMonthlyWeight(data.data.total_quantity_kg * 1000); // Convert kg to grams for consistent formatting
            setError(null);
          } else {
            setError('Failed to load monthly waste data');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch monthly waste data');
        }
      }
    };

    const fetchTodayWaste = async () => {
      try {
        const res = await API.getDailyWaste();
        const data = res.data;
        if (isMounted) {
          if (data.success && typeof data.todayWeight === 'number') {
            setTodayWeight(data.todayWeight / 1000); // Convert grams to kg for display
            setError(null);
          } else {
            setError('Failed to load today waste data');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch today waste data');
        }
      }
    };

    fetchMonthlyWaste();
    fetchTodayWaste();
    const interval = setInterval(() => {
      fetchMonthlyWaste();
      fetchTodayWaste();
    }, 2500);

    const connectWebSocket = () => {
      wsRef.current = new WebSocket('ws://localhost:5000/ws');
      wsRef.current.onopen = () => setIsConnected(true);
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'weight_update') {
            setLiveWeight(data.weight);
            
            // Add new entry to recent entries (max 5)
            const newEntry = {
              id: Date.now(),
              weight: data.weight,
              timestamp: new Date().toLocaleTimeString()
            };
            
            setRecentEntries(prev => {
              const updated = [...prev, newEntry];
              return updated.slice(-5); // Keep only last 5 entries
            });
          }
        } catch {}
      };
      wsRef.current.onclose = () => {
        setIsConnected(false);
        setTimeout(connectWebSocket, 5000);
      };
      wsRef.current.onerror = () => setIsConnected(false);
    };

    
    connectWebSocket();

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const formatWeight = (weight) => weight >= 1000
    ? `${(weight / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} kg`
    : `${weight.toLocaleString(undefined, { maximumFractionDigits: 0 })}g`;

  return (
    <Card className="left-card">
      <CardContent className="card-content">
        <Box mb={1}>
          {error && (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          )}
        </Box>
        <div className="leftcard-grid">
          {/* Monthly Section */}
          <div className="monthly-side">
            <div className="monthly-title">
              MONTHLY TOTAL
            </div>
            <img src={waste} alt="Bin" style={{ width: "180px", height: "150px" }} />
            <div className="monthly-value">
              {formatWeight(monthlyWeight)}
            </div>
            <div className="monthly-label">
              This Month's Waste
            </div>
          </div>

          <Divider orientation="vertical" flexItem className="divider" />

          {/* Today Section */}
          <div className="today-side">
            <div className="today-title">
              TODAY'S TOTAL
            </div>
            <img src={waste} alt="Bin" style={{ width: "180px", height: "150px" }} />
            <div className="today-value">
              {todayWeight.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg
            </div>
            <div className="today-label">
              Today's Waste
            </div>
          </div>

          <Divider orientation="vertical" flexItem className="divider" />

          {/* Live Section */}
          <div className="live-side" style={{ position: "relative" }}>
            <div className="live-title">
              LIVE WEIGHT TODAY
            </div>
            <div className={`live-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              <div className="live-dot"></div>
              <span className="live-text">LIVE</span>
            </div>
            <div className="odometer-row" style={{ position: "relative" }}>
              <Odometer
                value={liveWeight/1000}
                format="(,ddd).ddd"
                className="odometer"
              />
            </div>
            <div className="live-unit">
              kg
            </div>
            <div className="live-label">
              REAL TIME WEIGHT
            </div>
          </div>
          
          {/* Recent Entries Section */}
          <div className="recent-entries-side">
            <div className="recent-title">
              RECENT ENTRIES
            </div>
            <div className="entries-list">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="entry-item">
                  <div className="entry-weight">
                    {(entry.weight ).toFixed(3)} g
                  </div>
                  <div className="entry-time">
                    {entry.timestamp}
                  </div>
                </div>
              ))}
              {recentEntries.length === 0 && (
                <div className="no-entries">
                  No recent entries
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Leftcard;