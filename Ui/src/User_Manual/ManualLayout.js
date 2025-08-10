import React from 'react';

export function ManualLayout({ title, sections, activeSection, onSectionChange, onBack, children }) {
  return (
    <div className="user-manual-layout">
      <aside className="manual-sidebar">
        <div className="manual-sidebar-title">
          {title}
        </div>
        <button className="back-button" onClick={onBack}>
          ← Back to Manual
        </button>
        <ul>
          {Object.entries(sections).map(([key, section]) => (
            <li
              key={key}
              onClick={() => onSectionChange(key)}
              className={activeSection === key ? 'active' : ''}
            >
              {section.title}
            </li>
          ))}
        </ul>
      </aside>
      <main className="manual-section-content">
        {children}
      </main>
    </div>
  );
}
