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

export default function HX711Panel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adcRaw, setAdcRaw] = useState(false);
  const [autoTare, setAutoTare] = useState(false);
  const [tareDelay, setTareDelay] = useState('3000');
  const [tareDelta, setTareDelta] = useState('200');

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
      <h2 style={{ fontSize: '1.5rem', color: '#102e63' }}>HX711 Settings</h2>

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

      {/* Clean HX711 */}
      <SettingBlock
        enabled={auth}
        title="Clean HX711"
        description="Reset and clear HX711 data buffer and noise offset."
        rightComponent={<Button variant="outlined" color="warning" disabled={!auth}>Clean</Button>}
      />

      {/* Toggle ADC Raw */}
      <SettingBlock
        enabled={auth}
        title="Toggle ADC Raw"
        description="Display the unprocessed ADC output for debugging."
        rightComponent={
          <FormControlLabel
            control={
              <Switch
                checked={adcRaw}
                onChange={() => setAdcRaw(!adcRaw)}
                color="primary"
                disabled={!auth}
              />
            }
            label={adcRaw ? "Enabled" : "Disabled"}
          />
        }
      />

      {/* Gain Factor */}
      <SettingBlock
        enabled={auth}
        title="Gain Factor"
        description="Amplifier gain applied to ADC (e.g. 32/64/128)."
        rightComponent={<TextField size="small" value="128" disabled={!auth} style={{ width: '100px' }} />}
      />

      {/* Stabilization Delay */}
      <SettingBlock
        enabled={auth}
        title="Stabilization Delay"
        description="Pause after tare or reset (in ms)."
        rightComponent={
          <TextField
            size="small"
            value="500"
            disabled={!auth}
            style={{ width: '100px' }}
            InputProps={{ endAdornment: <span style={{ marginLeft: '4px' }}>ms</span> }}
          />
        }
      />

      {/* Auto-Tare Config Block */}
      <div style={groupHeaderStyle}>Auto-Tare Configuration</div>
      <div style={panelStyle(auth, true)}>
        <FormControlLabel
          control={
            <Switch
              checked={autoTare}
              onChange={() => setAutoTare(!autoTare)}
              color="primary"
              disabled={!auth}
            />
          }
          label="Enable Auto-Tare"
          style={{ marginBottom: '12px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <div>
            <span style={labelStyle}>Auto-Tare Delay</span>
            <p style={descStyle}>Minimum time before auto-tare is triggered (ms).</p>
            <TextField
              size="small"
              value={tareDelay}
              disabled={!auth}
              onChange={(e) => setTareDelay(e.target.value)}
              style={{ width: '120px', marginTop: '4px' }}
              InputProps={{ endAdornment: <span style={{ marginLeft: '4px' }}>ms</span> }}
            />
          </div>

          <div>
            <span style={labelStyle}>Auto-Tare Δ Threshold</span>
            <p style={descStyle}>Trigger auto-tare when deviation falls below (g).</p>
            <TextField
              size="small"
              value={tareDelta}
              disabled={!auth}
              onChange={(e) => setTareDelta(e.target.value)}
              style={{ width: '120px', marginTop: '4px' }}
              InputProps={{ endAdornment: <span style={{ marginLeft: '4px' }}>g</span> }}
            />
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <SettingBlock
        enabled={auth}
        title="Apply Settings"
        description="Send updated HX711 config to the backend."
        rightComponent={<Button variant="contained" color="success" disabled={!auth}>Apply</Button>}
      />

      {/* Auth Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Authenticate</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
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
const panelStyle = (enabled, allowAutoHeight = false) => ({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: '#f1f5f9',
  padding: '15px',
  borderRadius: '10px',
  opacity: enabled ? 1 : 0.4,
  pointerEvents: enabled ? 'auto' : 'none',
  fontSize: '14px',
  height: allowAutoHeight ? 'auto' : '110px',
  gap: '8px'
});

const labelStyle = {
  margin: 0,
  fontSize: '1rem',
  color: '#0f172a'
};

const descStyle = {
  margin: 0,
  fontSize: '0.9rem',
  color: '#64748b'
};

const groupHeaderStyle = {
  marginTop: '30px',
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#1e3a8a',
  borderBottom: '1px solid #cbd5e1',
  paddingBottom: '6px'
};
