import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import appLogo from '../utils/nokialogo.png';

const AppBarComponent = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // const headerStyle = {
  //   position: 'sticky',
  //   top: 0,
  //   zIndex: 1000,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: '12px 24px',
  //   background: 'linear-gradient(135deg, #102e63 0%, #001f47 100%)',
  //   color: 'white',
  //   boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  //   backdropFilter: 'blur(8px)',
  //   borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  // };

  const logo = {
    height: '44px',
    width: '120px',
    objectFit: 'contain',
    display: 'flex',
    alignItems: 'center',
  };

  const logoContainer = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const menuButton = {
    color: 'white',
    padding: '8px',
  };

  const title = {
    fontSize: '35px',
    fontWeight: 600,
    flexGrow: 1,
    textAlign: 'center',
    color: ' #ffffffcc',
    letterSpacing: '1px',
  };

  const time = {
    fontSize: '20px',
    fontWeight: 500,
    color: ' #ffffffcc',
    whiteSpace: 'nowrap',
    padding: '8px 15px',
  };

  return (
    <>
      <div style={logoContainer}>
        <IconButton 
          onClick={onMenuClick}
          style={menuButton}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <img src={appLogo} alt="App Logo" style={logo} />
      </div>
      
      <div style={title}>Waste Management Dashboard</div>
      <div style={time}> {formattedTime}</div>
    </>
  );
};

export default AppBarComponent;
