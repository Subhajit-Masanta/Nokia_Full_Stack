import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { API } from '../services/api.js';

const chartContainerStyle = {
  background: 'transparent',
  borderRadius: '0px',
  padding: '0px',
  boxShadow: 'none',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 500,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
};

export function Chart_7_days() {
  const [data, setData] = useState({ dates: [], quantities: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        setLoading(true);
        const response = await API.getWeeklyData();
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError('Failed to load weekly data');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch weekly data');
        console.error('Weekly data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
    const interval = setInterval(fetchWeeklyData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={chartContainerStyle}>
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Loading weekly data...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={chartContainerStyle}>
        <Alert variant="filled" severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div style={chartContainerStyle}>
      <LineChart
        xAxis={[{ 
          data: data.dates || [], 
          label: 'Date',
          scaleType: 'point',
          labelStyle: {
            fontSize: '14px',
            fontWeight: 'bold',
            fill: ' #333'
          }
        }]}
        yAxis={[{
          label: 'Weight (kg)',
          labelStyle: {
            fontSize: '15px',
            fontWeight: 'bold',
            fill: '#333'
          }
        }]}
        series={[{
          data: data.quantities || [],
          label: 'Weight (kg)',
          color: '#0060FF'
        }]}
        height={750}
        width={890}
        legend={{ hidden: true }}
        sx={{ 
          backgroundColor: 'transparent',
          '& .MuiChartsAxis-tickLabel': {
            fontSize: '13px !important',
            fontWeight: '600 !important',
            fill: '#333 !important'
          },
          '& .MuiChartsAxis-label': {
            fontSize: '14px !important',
            fontWeight: 'bold !important',
            fill: '#333 !important',
            transform: 'translateY(5px) !important'
          },
          '& .MuiChartsLegend-series text': {
            fontSize: '14px !important',
            fontWeight: '600 !important'
          }
        }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}

export function Chart_4_weeks() {
  const [data, setData] = useState({ weeks: [], quantities: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const barColors = [
    '#4F46E5',  // Modern Indigo
    '#10B981',  // Emerald Green
    '#F59E0B',  // Amber Orange
    '#EF4444'   // Modern Red
  ];

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
        const response = await API.getMonthlyData();
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError('Failed to load monthly data');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch monthly data');
        console.error('Monthly data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
    const interval = setInterval(fetchMonthlyData, 100000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={chartContainerStyle}>
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Loading monthly data...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={chartContainerStyle}>
        <Alert variant="outlined" severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div style={chartContainerStyle}>
      <BarChart
        xAxis={[{
          data: data.weeks || [],
          label: 'Weeks',
          scaleType: 'band',
          colorMap: {
            type: 'ordinal',
            values: data.weeks || [],
            colors: barColors,
          },
          labelStyle: {
            fontSize: '16px',
            fontWeight: 'bold',
            fill: '#333'
          }
        }]}
        yAxis={[{
          label: 'Weight (kg)',
          labelStyle: {
            marginTop: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            fill: '#333'
          }
        }]}
        series={[{
          data: data.quantities || [],
          label: 'Weight (kg)'
        }]}
        height={750}
        width={930}
        barLabel="value"
        legend={{ hidden: true }}
        sx={{
          '& .MuiChartsAxis-tickLabel': {
            fontSize: '15px !important',
            fontWeight: ' 610 !important',
            fill: '#333 !important'
          },
          '& .MuiChartsAxis-label': {
            fontSize: '15px !important',
            fontWeight: 'bold !important',
            fill: '#333 !important',
            transform: 'translateY(5px) !important'
          },
          '& .MuiChartsLegend-series text': {
            fontSize: '14px !important',
            fontWeight: '600 !important'
          },
          '& .MuiChartsLegend-root': {
            display: 'none !important'
          },
          '& .MuiChartsBarLabel-root': {
            fontSize: '16px !important',
            fontWeight: 'bold !important',
            fill: '#fff !important',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7) !important',
            fontFamily: 'Arial, sans-serif !important'
          }
        }}
      />
    </div>
  );
}


export default function Charts() {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'row !important',

        justifyContent: 'space-between',
        alignItems: 'stretch'
      }}
    > 
      {/* LEFT SIDE - Weekly Overview */}
      <Box sx={{ flex: '1 1 50%', maxWidth: '50%' }}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent sx={{ padding: '16px !important' }}>
            <Typography variant="h6" gutterBottom>
              Weekly Overview (Last 4 Weeks)
            </Typography>
            <Chart_4_weeks />
          </CardContent>
        </Card>
      </Box>
      
      {/* RIGHT SIDE - Daily Tracking */}
      <Box sx={{ flex: '1 1 50%', maxWidth: '50%' }}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent sx={{ padding: '16px !important' }}>
            <Typography variant="h6" gutterBottom>
              Daily Tracking (Last 7 Days)
            </Typography>
            <Chart_7_days />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

