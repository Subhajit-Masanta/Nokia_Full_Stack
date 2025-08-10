import React, { useState, useEffect } from "react";
import { Alert } from '@mui/material';
import { API } from '../services/api.js'
import './Weightlist.css';

// Professional color palette
// Professional Nokia-themed color palette
const sessionStyles = {
  breakfast: {
    bg: 'linear-gradient(135deg, rgba(18, 65, 145, 0.85) 0%, rgba(30, 64, 175, 0.9) 100%)', // Nokia blue primary
    border: '#124191'
  },
  lunch: {
    bg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.85) 0%, rgba(194, 65, 12, 0.9) 100%)', // Warm orange (Nokia complement)
    border: '#C2410C'
  },
  snacks_tea: {
    bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.85) 0%, rgba(8, 145, 178, 0.9) 100%)', // Cyan (Nokia secondary)
    border: '#0891B2'
  },
  dinner: {
    bg: 'linear-gradient(135deg, rgba(79, 70, 229, 0.85) 0%, rgba(67, 56, 202, 0.9) 100%)', // Deep indigo (Nokia variant)
    border: '#4338CA'
  },
  midnight_snacks: {
    bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.85) 0%, rgba(147, 51, 234, 0.9) 100%)', // Purple (Nokia accent)
    border: '#9333EA'
  },
  supper: {
    bg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.85) 0%, rgba(21, 128, 61, 0.9) 100%)', // Green (Nokia success)
    border: '#15803D'
  }
};


const formatKg = (grams) => (grams / 1000).toFixed(2);

const sessionLabels = {
  breakfast: "Breakfast (7:15–9:00)",
  lunch: "Lunch (11:30–14:50)",
  snacks_tea: "Snacks & Tea (16:50–18:00)",
  dinner: "Dinner (19:15–21:00)",
  midnight_snacks: "Midnight Snacks (23:30–00:30)",
  supper: "Supper (3:15–4:15)"
};

// Session time windows in 24-hour format [startHour, startMinute, endHour, endMinute]
const sessionTimes = {
  breakfast: [7, 15, 9, 0],
  lunch: [11, 30, 14, 50],
  snacks_tea: [16, 50, 18, 0],
  dinner: [19, 15, 21, 0],
  midnight_snacks: [23, 30, 0, 30], // crosses midnight
  supper: [3, 15, 4, 15]
};

// Utility to check if now is within session window
function isSessionLive([startH, startM, endH, endM], now = new Date()) {
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
  
  // Create session start and end times within the company day (treating as IST)
  const sessionStartIST_ms = Date.UTC(companyDayStartIST.getUTCFullYear(), companyDayStartIST.getUTCMonth(), companyDayStartIST.getUTCDate(), startH, startM, 0, 0);
  const sessionEndIST_ms = Date.UTC(companyDayStartIST.getUTCFullYear(), companyDayStartIST.getUTCMonth(), companyDayStartIST.getUTCDate(), endH, endM, 0, 0);
  
  let sessionStartIST = new Date(sessionStartIST_ms);
  let sessionEndIST = new Date(sessionEndIST_ms);
  
  // Handle sessions that cross midnight (like midnight_snacks and supper)
  if (sessionEndIST <= sessionStartIST) {
    sessionEndIST = new Date(sessionEndIST.getTime() + 24 * 60 * 60 * 1000);
  }
  
  // Check if session times are within the company day bounds
  if (sessionStartIST < companyDayStartIST) {
    sessionStartIST = new Date(sessionStartIST.getTime() + 24 * 60 * 60 * 1000);
    sessionEndIST = new Date(sessionEndIST.getTime() + 24 * 60 * 60 * 1000);
  }
  
  if (sessionEndIST > companyDayEndIST) {
    return false; // Session extends beyond company day
  }
  
  return istNow >= sessionStartIST && istNow <= sessionEndIST;
}

export default function Weightlist() {
  const [sessions, setSessions] = useState({});
  const [error, setError] = useState(null);
  const now = new Date();

  useEffect(() => {
    let isMounted = true; // Track component mount status to avoid state updates after unmount
    
    const fetchSessionWeights = async () => {
      try {
        const response = await API.getSessionWeights();
        if (response.data.success && isMounted) {
          setSessions(response.data.data);
          setError(null);
        } else if (isMounted) {
          setError('Failed to load session data');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error || 'Failed to fetch session weights');
          console.error('Session weights error:', err);
        }
      }
    };

    fetchSessionWeights(); //Initial fetch

  
    const interval = setInterval(fetchSessionWeights, 2000); // Refresh every 2 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="weightlist-grid">
      {error ? (
        <div className="weightlist-error" style={{ gridColumn: '1 / -1' }}>
          <Alert severity="error">{error}</Alert>
        </div>
      ) : null}

      {Object.entries(sessionLabels).map(([key, label]) => {
        const style = sessionStyles[key];
        const live = isSessionLive(sessionTimes[key], now);
        const value = sessions[key] || 0;

        return (
          <div
            key={key}
            className={`weightlist-card ${live ? 'is-live' : ''}`}
            style={{
              background: style.bg,
              borderLeft: `6px solid ${style.border}`
            }}
          >
            <div className="weightlist-header">
              <span className="weightlist-label">{label}</span>
              {live && (
                <span className="weightlist-live" style={{ background: style.border }}>
                  Live
                </span>
              )}
            </div>
            <div className="weightlist-value">
              {formatKg(value)}<span className="weightlist-unit">Kg</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}