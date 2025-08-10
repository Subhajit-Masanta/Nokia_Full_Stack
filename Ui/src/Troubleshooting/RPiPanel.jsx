import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel
} from '@mui/material';

export default function RPIPanel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sshEnabled, setSshEnabled] = useState(true);
  const [apiEnabled, setApiEnabled] = useState(false);

  const handleLogin = () => {
    if (username === 'kaka' && password === 'nokia') {
      setAuth(true);
      setLoginOpen(false);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={headerStyle}>Raspberry Pi Settings</h2>

      {!auth && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLoginOpen(true)}
          style={{ marginBottom: '20px' }}
        >
          🔓 Unlock Settings
        </Button>
      )}
      {/* System Temperature (Unprotected) */}
      <div style={{
        ...panelStyle(true),
        backgroundColor: '#e2f0ff',
        opacity: 1,           // always visible
        pointerEvents: 'auto',
        fontSize: fontSize    // consistent with rest
      }}>
        <div>
          <h4 style={labelStyle}>System Temperature</h4>
          <p style={descStyle}>Live core temperature of the Pi.</p>
        </div>
        <TextField
          size="small"
          value="52.4°C"
          disabled
          style={{ width: '100px' }}
        />
      </div>
      {/* Hostname Display */}
      <SettingBlock
        enabled={auth}
        title="Device Hostname"
        description="Rename your Raspberry Pi hostname."
        rightComponent={
          <TextField
            size="small"
            value="nokia-waste-node"
            disabled={!auth}
            style={{ width: '200px' }}
          />
        }
      />

      {/* Power Toggle */}
      <SettingBlock
        enabled={auth}
        title="Power Status"
        description="Enable/disable device via software-controlled relay."
        rightComponent={
          <FormControlLabel
            control={
              <Switch
                checked
                onChange={() => {}}
                disabled={!auth}
              />
            }
            label="On"
          />
        }
      />

      {/* SSH Access */}
      <SettingBlock
        enabled={auth}
        title="SSH Access"
        description="Enable remote SSH login for terminal access."
        rightComponent={
          <FormControlLabel
            control={
              <Switch
                checked={sshEnabled}
                onChange={() => setSshEnabled(!sshEnabled)}
                disabled={!auth}
              />
            }
            label={sshEnabled ? "Enabled" : "Disabled"}
          />
        }
      />

      {/* API Plugin */}
      <SettingBlock
        enabled={auth}
        title="API Plugin Enabled"
        description="Allow external API connections (Flask endpoints)."
        rightComponent={
          <FormControlLabel
            control={
              <Switch
                checked={apiEnabled}
                onChange={() => setApiEnabled(!apiEnabled)}
                disabled={!auth}
              />
            }
            label={apiEnabled ? "Enabled" : "Disabled"}
          />
        }
      />

      {/* Database Plugin */}
      <SettingBlock
        enabled={auth}
        title="Database Settings"
        description="Modify DB credentials, schema, or plugin modules."
        rightComponent={
          <Button variant="outlined" disabled={!auth}>Configure DB</Button>
        }
      />

      {/* Configuration Editor */}
      <SettingBlock
        enabled={auth}
        title="System Configuration"
        description="View/edit the system config file (config.json)."
        rightComponent={
          <Button variant="outlined" disabled={!auth}>Edit Config</Button>
        }
      />

      {/* Auth Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Authenticate</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// === Shared Component ===

const SettingBlock = ({ enabled, title, description, rightComponent }) => (
  <div style={panelStyle(enabled)}>
    <div>
      <h4 style={labelStyle}>{title}</h4>
      <p style={descStyle}>{description}</p>
    </div>
    {rightComponent}
  </div>
);

// === Styles ===

const fontSize = '0.95rem';
const blockHeight = '100px'; // Tweak this for individual setting row height

const panelStyle = (enabled) => ({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f1f5f9',
  padding: '15px',
  borderRadius: '10px',
  opacity: enabled ? 1 : 0.4,
  pointerEvents: enabled ? 'auto' : 'none',
  height: blockHeight,
  fontSize: fontSize
});

const headerStyle = {
  fontSize: '1.5rem',
  color: '#102e63',
  marginBottom: '10px'
};

const labelStyle = {
  margin: 0,
  fontSize: '1.05rem',
  color: '#0f172a'
};

const descStyle = {
  margin: 0,
  fontSize: fontSize,
  color: '#64748b'
};
