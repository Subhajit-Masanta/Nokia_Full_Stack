import { getConnection, sql } from '../Config/db.js';

// Sample in-memory settings store (replace with DB or file persistence later)
let hx711Settings = {
  adcRawEnabled: false,
  autoTareEnabled: true,
  autoTareDelay: 5,       // in seconds
  autoTareDelta: 2.5      // grams
};

export const getHx711Settings = (req, res) => {
  res.json({
    success: true,
    data: hx711Settings
  });
};

export const cleanHx711 = (req, res) => {
  console.log("🧼 HX711 cleaned/reset");
  // Simulate cleaning logic (e.g., zero buffer, reset calibration)
  return res.json({
    success: true,
    message: 'HX711 reset successfully'
  });
};

export const toggleAdcRaw = (req, res) => {
  const { enabled } = req.body;
  hx711Settings.adcRawEnabled = Boolean(enabled);

  return res.json({
    success: true,
    message: `ADC raw output ${enabled ? 'enabled' : 'disabled'}`,
    data: { adcRawEnabled: hx711Settings.adcRawEnabled }
  });
};

export const updateAutoTare = (req, res) => {
  const { autoTareEnabled, autoTareDelay, autoTareDelta } = req.body;

  if (autoTareEnabled !== undefined) hx711Settings.autoTareEnabled = autoTareEnabled;
  if (autoTareDelay !== undefined) hx711Settings.autoTareDelay = autoTareDelay;
  if (autoTareDelta !== undefined) hx711Settings.autoTareDelta = autoTareDelta;

  return res.json({
    success: true,
    message: 'Auto-tare settings updated',
    data: {
      autoTareEnabled: hx711Settings.autoTareEnabled,
      autoTareDelay: hx711Settings.autoTareDelay,
      autoTareDelta: hx711Settings.autoTareDelta
    }
  });
};
