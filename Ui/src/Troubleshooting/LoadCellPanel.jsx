import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

export default function LoadCellPanel() {
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: '#102e63', mb: 1 }}>
        Load Cell Settings
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
        Configure calibration, tolerance, and behavior of load cells.
      </Typography>

      {!auth && (
        <Button
          variant="contained"
          onClick={() => setLoginOpen(true)}
          sx={{ mb: 3 }}
        >
          🔓 Unlock Settings
        </Button>
      )}

      {/* Calibration Factor */}
      <SettingBlock
        title="Calibration Factor"
        desc="Set scaling factor to convert ADC to grams."
        control={
          <TextField
            size="small"
            value="2280.3"
            disabled={!auth}
            sx={{ width: '150px' }}
          />
        }
        enabled={auth}
      />

      {/* Reference Weight */}
      <SettingBlock
        title="Reference Weight"
        desc="Known mass used during calibration."
        control={
          <TextField
            size="small"
            value="1000"
            disabled={!auth}
            sx={{ width: '150px' }}
            InputProps={{
              endAdornment: <span style={{ marginLeft: '4px' }}>g</span>
            }}
          />
        }
        enabled={auth}
      />

      {/* Sampling Speed */}
      <SettingBlock
        title="Sampling Speed"
        desc="Number of readings averaged per cycle."
        control={
          <TextField
            select
            size="small"
            value="10"
            disabled={!auth}
            sx={{ width: '120px' }}
          >
            {[1, 5, 10, 20, 50].map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
        }
        enabled={auth}
      />

      {/* Error Tolerance */}
      <SettingBlock
        title="Error Tolerance"
        desc="Max allowed deviation in %."
        control={
          <TextField
            size="small"
            value="5"
            disabled={!auth}
            sx={{ width: '80px' }}
            InputProps={{
              endAdornment: <span style={{ marginLeft: '4px' }}>%</span>
            }}
          />
        }
        enabled={auth}
      />

      {/* Reset Calibration */}
      <SettingBlock
        title="Reset Calibration"
        desc="Wipe and revert all calibration data."
        control={
          <Button variant="outlined" color="error" disabled={!auth}>
            Reset
          </Button>
        }
        enabled={auth}
      />

      {/* Apply Configuration */}
      <SettingBlock
        title="Apply Configuration"
        desc="Send updated load cell parameters to backend."
        control={
          <Button variant="contained" color="success" disabled={!auth}>
            Apply
          </Button>
        }
        enabled={auth}
      />

      {/* Auth Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Admin Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// === Shared Setting Block Component ===
function SettingBlock({ title, desc, control, enabled }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: '10px',
        p: 2,
        mt: 2,
        opacity: enabled ? 1 : 0.4,
        pointerEvents: enabled ? 'auto' : 'none'
      }}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ color: '#0f172a' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          {desc}
        </Typography>
      </Box>
      {control}
    </Box>
  );
}
