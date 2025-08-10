import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';

export default function LeftDrawer({ open, onClose, currentView, onViewChange }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon fontSize="large" />,
      description: 'The dashboard'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <AnalyticsIcon fontSize="large" />,
      description: 'Charts'
    },
    {
      id: 'manual',
      label: 'User Manual',
      icon: <MenuBookIcon fontSize="large" />,
      description: 'Educate Yourself , you dumb'
    },
    {
    id: 'troubleshooting',
    label: 'Troubleshooting',
    icon: <BuildIcon fontSize="large" />,
    description: 'Tare, recalibrate, configure etc.'
    }
  ];

  return (
    <Drawer
  anchor="left"
  open={open}
  onClose={onClose}
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
  PaperProps={{
    className: open ? 'animate-slide-in' : '',
  }}
  sx={{
    zIndex: 1201,
    '& .MuiDrawer-paper': {
      width: 280,
      backgroundColor: '#f8fafc',
      borderRight: '1px solid #e2e8f0',
      boxShadow: '4px 0 12px rgba(0,0,0,0.1)',
      paddingTop: '120px'
    }
  }}
>

      <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{
          px: 3,
          pb: 2,
        }}>
          <h2 style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '1.4rem',
            color: '#102e63',
            fontFamily: 'Arial, sans-serif'
          }}>
            Navigation
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: '#475569',
            marginTop: '4px',
            fontStyle: 'italic'
          }}>
            Select your view
          </p>
        </Box>

        <Divider />

        <List sx={{ flex: 1, px: 1, pt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
                selected={currentView === item.id}
                sx={{
                  borderRadius: '12px',
                  px: 2,
                  py: 1.5,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&.Mui-selected': {
                    backgroundColor: '#102e63',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1a3c7a',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    }
                  },
                  '&:hover': {
                    backgroundColor: '#e2e8ff',
                  }
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 'auto',
                  color: currentView === item.id ? 'white' : '#102e63',
                  fontSize: '2rem'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: currentView === item.id ? 'white' : '#1f2937'
                    }}>
                      {item.label}
                    </span>
                  }
                  secondary={
                    <span style={{
                      fontSize: '0.8rem',
                      color: currentView === item.id ? 'rgba(255,255,255,0.7)' : '#64748b',
                      fontStyle: 'italic'
                    }}>
                      {item.description}
                    </span>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{
          p: 2,
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#1f2937',
            fontWeight: 500
          }}>
            Nokia Waste Management
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#0f172a',
            fontWeight: 400
          }}>
            Dashboard v Dumb.99
          </div>
        </Box>
      </Box>
    </Drawer>
  );
}
