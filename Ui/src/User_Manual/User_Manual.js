import React, { useState } from 'react';
import './components/Layout.css';
import './components/Banner.css';
import './components/Search.css';
import './components/Cards.css';
import './components/Footer.css';
import manualBG from '../utils/manual-bg.jpg';
import { HardwareManual } from './HardwareManual';
import { FrontendManual } from './FrontendManual';
import { BackendManual } from './BackendManual';
import { RepairManual } from './RepairManual';

export function UserManual() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search data structure containing all manual content
  const searchableContent = [
    {
      section: 'hardware',
      title: 'Hardware Setup',
      keywords: ['raspberry pi', 'sensors', 'actuators', 'wiring', 'power', 'connections', 'schematic', 'gpio', 'pins', 'circuit', 'electronics', 'hardware'],
      description: 'Follow the schematic to connect Raspberry Pi, sensors, and actuators properly.'
    },
    {
      section: 'frontend',
      title: 'Frontend Design',
      keywords: ['dashboard', 'ui', 'components', 'react', 'websocket', 'chart.js', 'css', 'design', 'interface', 'responsive', 'layout'],
      description: 'Learn how the dashboard and UI components are designed for intuitive interaction.'
    },
    {
      section: 'backend',
      title: 'Backend Design',
      keywords: ['server', 'api', 'database', 'data processing', 'storage', 'communication', 'logic', 'endpoints', 'flask', 'node.js'],
      description: 'Discover how the backend handles data processing, storage, and communication.'
    },
    {
      section: 'repair',
      title: 'Repair & Maintenance',
      keywords: ['troubleshooting', 'diagnostics', 'hx711', 'load cell', 'calibration', 'tare', 'temperature', 'memory', 'network', 'ssh', 'repair', 'maintenance', 'fix'],
      description: 'Regularly check connections and component health. Troubleshoot issues.'
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    
    const results = searchableContent.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.keywords.some(keyword => keyword.includes(query))
    );

    setSearchResults(results);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="user-manual">
      {selectedSection === null ? (
        <>
          <div
            className="manual-banner"
            style={{
              background: `url(${manualBG}) center/cover no-repeat`,
            }}
          >
            <div className="manual-banner-content">
              <h2>Instruction User Manual</h2>
              <p>Set up Your Product!</p>
              <div className="manual-search">
                <input 
                  type="text" 
                  placeholder="🔍 Search manuals..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
                <button onClick={handleSearch}>Search</button>
                {isSearching && (
                  <button className="clear-search" onClick={clearSearch}>✕</button>
                )}
              </div>
            </div>
          </div>

          {/* Search Results */}
          {isSearching && (
            <div className="search-results">
              <div className="search-results-header">
                <h3>Search Results for "{searchQuery}"</h3>
                <span className="results-count">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </span>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="search-results-grid">
                  {searchResults.map((result) => (
                    <div 
                      key={result.section}
                      className="search-result-card" 
                      onClick={() => {
                        setSelectedSection(result.section);
                        clearSearch();
                      }}
                    >
                      <span className="search-result-icon">
                        {result.section === 'hardware' && '⚙️'}
                        {result.section === 'frontend' && '🎨'}
                        {result.section === 'backend' && '💻'}
                        {result.section === 'repair' && '🔧'}
                      </span>
                      <h4>{result.title}</h4>
                      <p>{result.description}</p>
                      <div className="search-keywords">
                        {result.keywords.filter(keyword => 
                          keyword.includes(searchQuery.toLowerCase())
                        ).slice(0, 3).map((keyword, index) => (
                          <span key={index} className="keyword-tag">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>No results found for "{searchQuery}"</p>
                  <p>Try searching for: hardware, frontend, backend, repair, troubleshooting, or specific components like HX711, load cell, etc.</p>
                </div>
              )}
            </div>
          )}

          <div className="manual-content">
            <div className="manual-card" onClick={() => setSelectedSection('hardware')}>
              <span className="manual-icon">⚙️</span>
              <h3>Hardware Setup</h3>
              <p>
                Follow the schematic to connect Raspberry Pi, sensors, and actuators properly.
                Ensure secure wiring and stable power connections.
              </p>
            </div>

            <div className="manual-card" onClick={() => setSelectedSection('frontend')}>
              <span className="manual-icon">🎨</span>
              <h3>Frontend Design</h3>
              <p>
                Learn how the dashboard and UI components are designed for intuitive interaction.
                Explore layout, colors, and responsive behavior.
              </p>
            </div>

            <div className="manual-card" onClick={() => setSelectedSection('backend')}>
              <span className="manual-icon">💻</span>
              <h3>Backend Design</h3>
              <p>
                Discover how the backend handles data processing, storage, and communication between components.
                Includes server logic and API structure.
              </p>
            </div>

            <div className="manual-card" onClick={() => setSelectedSection('repair')}>
              <span className="manual-icon">🔧</span>
              <h3>Repair & Maintenance</h3>
              <p>
                Regularly check connections and component health.
                Follow instructions to troubleshoot issues or replace faulty parts.
              </p>
            </div>
          </div>

          <footer className="manual-footer">
            <p>© 2025 Nokia. All rights reserved.</p>
          </footer>
        </>
      ) : (
        <div className="manual-page-container">
          {selectedSection === 'hardware' ? (
            <HardwareManual onBack={() => setSelectedSection(null)} />
          ) : selectedSection === 'frontend' ? (
            <FrontendManual onBack={() => setSelectedSection(null)} />
          ) : selectedSection === 'backend' ? (
            <BackendManual onBack={() => setSelectedSection(null)} />
          ) : selectedSection === 'repair' ? (
            <RepairManual onBack={() => setSelectedSection(null)} />
          ) : null}
          
          <footer className="manual-footer dynamic-footer">
            <p>© 2025 Nokia. All rights reserved.</p>
          </footer>
        </div>
      )}
    </div>
  );
}
