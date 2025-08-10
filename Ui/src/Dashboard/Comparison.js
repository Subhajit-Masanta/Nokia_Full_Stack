import React, { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp, FaBalanceScale } from "react-icons/fa";
import { API } from "../services/api";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

// Utility function to format dates
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Utility function to convert grams to kg (2 decimals)
const formatKg = (grams) => (grams / 1000).toFixed(2);

const cardStyle = {
  background: "linear-gradient(135deg, rgba(19, 70, 156, 0.08) 0%, rgba(18, 65, 145, 0.12) 50%, rgba(18, 65, 145, 0.16) 100%)",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(18, 65, 145, 0.25)",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(18, 65, 145, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  padding: "10px 10px",
  width: "100%",
  margin: "0 auto 00px auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "Inter, Segoe UI, Arial, sans-serif",
  fontSize: "16px",
  position: "relative",
  overflow: "hidden",
};

const weightCol = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "140px",
};

const dateLabel = {
  fontSize: "20px",
  color: " #1214191",
  fontWeight: 700,
  marginBottom: "4px",
};

const weightValue = {
  fontSize: "22px",
  fontWeight: 700,
  color: " #0f172a",
};

const centerCol = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "200px",
  gap: "2px",
};

const percentRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const upArrow = {
  color: " #dc2626",
  animation: "pulse-red 1.5s infinite",
  fontSize: "30px",
};

const downArrow = {
  color: " #059669",
  animation: "pulse-green 1.5s infinite",
  fontSize: "30px",
};

const neutralIcon = {
  color: " #64748b",
  fontSize: "30px",
};

const percentText = {
  fontWeight: 700,
  fontSize: "25px",
  marginRight: "2px",
  color: " #888",
};

const deltaText = {
  fontSize: "20px",
  fontWeight: 500,
  marginTop: "2px",
  color: " #475569",
};

const trendText = {
  fontSize: "20px",
  fontWeight: 600,
  letterSpacing: "0.2px",
};

const keyframes = `
@keyframes pulse-green {
  0% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.2) translateY(-5px); opacity: 0.7; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes pulse-red {
  0% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.2) translateY(-5px); opacity: 0.7; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10%); }
}
`;

export default function Comparison() {
  const [todayWeight, setTodayWeight] = useState(0);
  const [yesterdayWeight, setYesterdayWeight] = useState(0);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState({
    today: new Date(),
    yesterday: new Date(new Date().setDate(new Date().getDate() - 1))
  });

  // API
  useEffect(() => {
    let isMounted = true;
    const fetchWeightData = async () => {
      try {
        const response = await API.getComparision();
        const data = response.data;
        if (data.success && isMounted) {
          setTodayWeight(data.todayWeight || 0);
          setYesterdayWeight(data.yesterdayWeight || 0);
          setDates({
            today: new Date(data.todayDate),
            yesterday: new Date(data.yesterdayDate)
          });
          setError(null);
        } else {
          setError('Failed to load comparison data');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error || 'Failed to fetch comparison data');
          console.error('Comparision API error:', err);
        }
      }
    };

    fetchWeightData();

    const interval = setInterval(fetchWeightData, 6000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Calculate differences
  const weightDelta = todayWeight - yesterdayWeight;
  const percentDiff =
    yesterdayWeight === 0
      ? 0
      : ((weightDelta / yesterdayWeight) * 100).toFixed(2);

  // Determine trend
  let icon = <FaBalanceScale style={neutralIcon} />;
  let trendColor = "#888";
  let trendLabel = "No Change";
  let deltaSign = "";

  if (yesterdayWeight === 0 && todayWeight > 0) {
    icon = <FaArrowUp style={upArrow} />;
    trendColor = " #FF1744";
    trendLabel = "Increase";
    deltaSign = "+";
  } else if (percentDiff > 0) {
    icon = <FaArrowUp style={upArrow} />;
    trendColor = " #FF1744";
    trendLabel = "Increase";
    deltaSign = "+";
  } else if (percentDiff < 0) {
    icon = <FaArrowDown style={downArrow} />;
    trendColor = " #00C853";
    trendLabel = "Decrease";
    deltaSign = "";
  }

  return (
    <Box>
      <style>{keyframes}</style>
      <div style={cardStyle}>
        {error && (
          <Box mt={1}>
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          </Box>
        )}

        {/* Yesterday's Weight */}
        <div style={weightCol}>
          <span style={dateLabel}>Yesterday ({formatDate(dates.yesterday)})</span>
          <span style={weightValue}>{formatKg(yesterdayWeight)}kg</span>
        </div>

        {/* Center: Trend Indicator */}
        <div style={centerCol}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Today vs Yesterday
          </div>
          <div style={percentRow}>
            {icon}
            <span style={{ ...percentText, color: trendColor }}>
              {yesterdayWeight === 0
                ? (todayWeight > 0 ? "--" : "0%")
                : `${Math.abs(percentDiff)}%`}
            </span>
          </div>
          <div style={{ ...deltaText, color: trendColor }}>
            {deltaSign}{Math.abs(formatKg(weightDelta))}kg
          </div>
          <span style={{ ...trendText, color: trendColor }}>{trendLabel}</span>
        </div>

        {/* Today's Weight */}
        <div style={weightCol}>
          <span style={dateLabel}>Today ({formatDate(dates.today)})</span>
          <span style={weightValue}>{formatKg(todayWeight)}kg</span>
        </div>
      </div>
    </Box>
  );
}
