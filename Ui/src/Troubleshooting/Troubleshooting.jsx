import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from '@mui/material';

export default function GeneralStatusPanel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      <h2 style={styles.title}>General Diagnostics</h2>
      <p style={styles.description}>Perform tare and check system signals and live stats here.</p>

      {/* Manual Tare */}
      <div style={styles.row(true)}>
        <div>
          <h4 style={styles.label}>Manual Tare</h4>
          <p style={styles.desc}>Reset baseline weight manually.</p>
        </div>
        <button style={styles.bigButton}>TARE NOW</button>
      </div>

      {/* IP Address */}
      <div style={styles.row(auth)}>
        <div>
          <h4 style={styles.label}>IP Address</h4>
          <p style={styles.desc}>Network IP for this Raspberry Pi node.</p>
        </div>
        <input disabled={!auth} value="192.168.1.40" style={styles.inputField} />
      </div>

      {/* Raw ADC */}
      <div style={styles.row(auth)}>
        <div>
          <h4 style={styles.label}>Raw ADC Value</h4>
          <p style={styles.desc}>Direct readout from HX711.</p>
        </div>
        <input disabled={!auth} value="834290" style={styles.inputField} />
      </div>

      {/* Weight */}
      <div style={styles.row(true)}>
        <div>
          <h4 style={styles.label}>Current Weight</h4>
          <p style={styles.desc}>Live processed reading from load cell.</p>
        </div>
        <input disabled value="3.27 kg" style={styles.inputField} />
      </div>

      {/* System Temperature */}
      <div style={{ ...styles.row(true), opacity: 1, pointerEvents: 'auto' }}>
        <div>
          <h4 style={styles.label}>System Temperature</h4>
          <p style={styles.desc}>Live core temp of RPi in °C.</p>
        </div>
        <input disabled value="52.6 °C" style={styles.inputField} />
      </div>

      {/* Memory Usage */}
      <div style={styles.row(true)}>
        <div>
          <h4 style={styles.label}>Memory Usage</h4>
          <p style={styles.desc}>Used / Total memory on Pi.</p>
        </div>
        <input disabled value="435MB / 1GB" style={styles.inputField} />
      </div>

      {/* Unlock Button */}
      {!auth && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLoginOpen(true)}
          style={{ marginTop: '20px' }}
        >
          🔓 Unlock Protected Fields
        </Button>
      )}

      {/* Auth Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Username" margin="dense"
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth type="password" label="Password" margin="dense"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#102e63',
    marginBottom: '12px'
  },
  description: {
    fontSize: '1rem',
    color: '#475569',
    marginBottom: '24px'
  },
  row: (enabled) => ({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: '15px',
    borderRadius: '10px',
    opacity: enabled ? 1 : 0.4,
    pointerEvents: enabled ? 'auto' : 'none',
    height: '100px',
    fontSize: '0.95rem'
  }),
  label: {
    margin: 0,
    fontSize: '1.05rem',
    color: '#0f172a'
  },
  desc: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#64748b'
  },
  inputField: {
    width: '150px',
    fontSize: '1rem',
    padding: '6px 10px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    background: '#ffffff',
    color: '#1e293b'
  },
  bigButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 600,
    backgroundColor: '#102e63',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    transition: 'background 0.3s ease',
  }
};
