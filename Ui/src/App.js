import React, { useState } from "react";
import "./App.css";
import AppBar from "./Main_bar/Appbar";
import Leftcard from "./Dashboard/Leftcard";
import Rightcard from "./Dashboard/Rightcard";
import Comparison from "./Dashboard/Comparison";
import WeightList from "./Dashboard/Weightlist";
import Scrolltext from "./Dashboard/Scrolltext";
import LeftDrawer from "./Main_bar/NavBar";
import { Chart_7_days, Chart_4_weeks, default as Charts } from "./Analytics/Charts";
import Trouble from "./Troubleshooting/Trouble";
import { UserManual } from './User_Manual/User_Manual';


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const renderMainContent = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <>
            <div className="main-top-row">
              <div className="live_data">
                <Leftcard />
              </div>
              <div className="people">
                <Rightcard />
              </div>
            </div>
            <Comparison />
            <WeightList />
            <Scrolltext />
          </>
        );
      case 'analytics':
        return (
          <div className="analytics-view">
            <div className="analytics-charts">
              <div className="chart-container">
                <h3>Weekly Overview (Last 4 Weeks)</h3>
                <Chart_4_weeks />
              </div>
              <div className="chart-container">
                <h3>Daily Tracking (Last 7 Days)</h3>
                <Chart_7_days />
              </div>
            </div>
          </div>
        );
      case 'troubleshooting':
        return <Trouble />;

      case 'manual':
        return <UserManual />;
    }
  };

  return (
    <div className="App">
      <div className="header">
        <AppBar onMenuClick={() => setDrawerOpen(!drawerOpen)} />
      </div>

      <div className={`main-container ${drawerOpen ? 'drawer-open' : ''}`}>
        <div className={`main ${currentView === 'manual' ? 'user-manual-view' : ''}`}>
          {currentView === 'manual' ? (
            <div className="user-manual-container">
              {renderMainContent()}
            </div>
          ) : (
            renderMainContent()
          )}
        </div>
      </div>

      <LeftDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setDrawerOpen(false);
        }}
      />
    </div>
  );
}

export default App;
