import React, { useState } from 'react';
import HX711Panel from './HX711Panel';
import LoadCellPanel from './LoadCellPanel';
import RPiPanel from './RPiPanel';
import GeneralStatusPanel from './GeneralStatusPanel'; // ✅ Moved here


export default function TroubleShooting() {
  const [activeSection, setActiveSection] = useState('manual');

  const renderContent = () => {
    switch (activeSection) {
      case 'manual':
        return <GeneralStatusPanel />;
      case 'hx':
        return <HX711Panel />;
      case 'loadcell':
        return <LoadCellPanel />;
      case 'rpi':
        return <RPiPanel />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Menu */}
      <div style={styles.sidebar}>
        <h2 style={{ ...styles.welcome, fontSize: '1.3rem' }}>
          Welcome to the Troubleshooting Panel
        </h2>
        <p style={styles.instructions}>
          Please choose the component that's causing issues:
        </p>
        {['manual', 'hx', 'loadcell', 'rpi'].map(section => (
          <button
            key={section}
            style={{
              ...styles.navButton,
              backgroundColor: activeSection === section ? '#102e63' : '#f1f5f9',
              color: activeSection === section ? 'white' : '#102e63'
            }}
            onClick={() => setActiveSection(section)}
          >
            {section === 'manual' ? 'General' :
              section === 'hx' ? 'HX711' :
              section === 'loadcell' ? 'Load Cell' :
              'RPi Settings'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}



const styles = {
  container: {
    display: 'flex',
    marginTop: '16px',
    padding: '10px',
    gap: '16px'
  },
  sidebar: {
    width: '250px',
    minWidth: '220px',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    height: 'fit-content',
    position: 'sticky',
    top: '100px'
  },
  welcome: {
    fontWeight: 'bold',
    color: '#102e63',
    marginBottom: '6px'
  },
  instructions: {
    fontSize: '1rem',
    color: '#475569',
    marginBottom: '16px',
    lineHeight: 1.4
  },
  navButton: {
    padding: '12px 18px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease'
  },
  content: {
    flex: 1,
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    minHeight: '400px'
  }
};
