import React, { useState } from 'react';
import { ManualLayout } from './ManualLayout';

const hardwareSections = {
  introduction: {
    title: 'Introduction',
    content: (
      <div>
        <h4>System Purpose and Vision</h4>
        <p>
          The Dynamic Waste Management System represents a cutting-edge approach to environmental monitoring and sustainability management 
          in commercial and institutional settings. This advanced IoT solution is specifically engineered to monitor and track food waste 
          patterns in real-time, providing organizations with actionable insights to reduce waste, optimize resources, and improve 
          operational efficiency.
        </p>
        
        <h4>Technology Foundation</h4>
        <p>
          Built around the robust Raspberry Pi 4 platform, this intelligent system seamlessly integrates precision load cell technology 
          with modern computing power to deliver accurate weight measurements and comprehensive analytics. The system leverages industrial-grade 
          components including high-precision 50kg load cells, professional-grade HX711 ADC modules, and enterprise-level wireless connectivity 
          for reliable, uninterrupted data transmission.
        </p>
        
        <h4>Operational Intelligence</h4>
        <p>
          The system operates continuously across six predefined meal sessions - breakfast (7:15-9:00), lunch (11:30-14:50), 
          snacks & tea (16:50-18:00), dinner (19:15-21:00), midnight snacks (23:30-00:30), and supper (3:15-4:15) - providing 
          detailed insights into consumption patterns and waste generation trends. This session-based approach enables precise 
          tracking of waste patterns throughout the operational day.
        </p>
        
        <h4>Key Technological Features</h4>
        <ul>
          <li><strong>Real-time Weight Monitoring:</strong> Continuous measurement with sub-gram precision for accurate waste quantification</li>
          <li><strong>Automatic Session Detection:</strong> Intelligent time-based categorization of waste data across meal periods</li>
          <li><strong>Web-based Dashboard Interface:</strong> Responsive design accessible from any device with comprehensive data visualization</li>
          <li><strong>Advanced Troubleshooting Tools:</strong> Built-in diagnostic capabilities for proactive maintenance and issue resolution</li>
          <li><strong>Multi-user Access Control:</strong> Tiered security system with public monitoring and administrative configuration access</li>
          <li><strong>Data Analytics Engine:</strong> Historical trend analysis, comparative reporting, and predictive insights</li>
        </ul>
        
        <h4>Design Philosophy</h4>
        <p>
          The modular architecture ensures easy maintenance, scalability for various deployment scenarios, and future-proof expandability. 
          The system is designed with sustainability principles at its core, promoting waste reduction through data-driven decision making 
          while maintaining operational simplicity for end users.
        </p>
        
        <h4>Deployment Versatility</h4>
        <p>
          Suitable for diverse environments including corporate cafeterias, educational institutions, healthcare facilities, hospitality 
          venues, and industrial food service operations. The system adapts to varying operational schedules and can be customized for 
          specific organizational requirements while maintaining standardized reporting and analytics capabilities.
        </p>
      </div>
    ),
  },
  overview: {
    title: 'System Overview',
    content: (
      <div>
        <p>The waste management system architecture consists of four main layers:</p>
        <ul>
          <li><strong>Weight Detection Layer:</strong> 4x 50kg load cells arranged in Wheatstone bridge configuration for precise measurements</li>
          <li><strong>Signal Processing Layer:</strong> HX711 24-bit ADC module with programmable gain amplifier for noise-free data conversion</li>
          <li><strong>Data Processing Layer:</strong> Raspberry Pi 4 with dedicated GPIO interfaces running real-time data collection and analysis</li>
          <li><strong>User Interface Layer:</strong> Wi-Fi-enabled web dashboard with responsive design for mobile and desktop access</li>
        </ul>
        <p>The system supports multi-session tracking with automatic time-based session detection and provides comprehensive analytics through REST API endpoints.</p>
      </div>
    ),
  },
  components: {
    title: 'Hardware Components',
    content: (
      <div>
        <h4>Core Components:</h4>
        <ul>
          <li><strong>Raspberry Pi 4 (4GB RAM):</strong> Main processing unit with ARM Cortex-A72 quad-core processor</li>
          <li><strong>50kg Load Cells (x4):</strong> Aluminum alloy strain gauge sensors with IP65 protection rating</li>
          <li><strong>HX711 ADC Module:</strong> 24-bit precision analog-to-digital converter with internal oscillator</li>
          <li><strong>Wi-Fi Touch Display (7-inch):</strong> Capacitive touchscreen with 1024x600 resolution</li>
        </ul>
        <h4>Supporting Hardware:</h4>
        <ul>
          <li><strong>Power Supply (5V 3A):</strong> Switching adapter with overcurrent protection</li>
          <li><strong>MicroSD Card (32GB Class 10):</strong> High-speed storage for OS and data logging</li>
          <li><strong>Jumper Wires (Male-Female):</strong> 20cm length for secure GPIO connections</li>
          <li><strong>Ethernet Cable:</strong> Cat5e/6 for reliable network connectivity</li>
          <li><strong>Mounting Hardware:</strong> Stainless steel bolts and brackets for load cell installation</li>
        </ul>
      </div>
    ),
  },
  circuit: {
    title: 'Circuit Diagram & Wiring Specifications',
    content: (
      <div>
        <h4>Load Cell Wiring Configuration</h4>
        <p><strong>Standard Load Cell Color Coding:</strong></p>
        <ul>
          <li><strong>Red Wire (E+):</strong> Excitation voltage positive (5V supply)</li>
          <li><strong>Black Wire (E−):</strong> Excitation voltage negative (Ground)</li>
          <li><strong>White Wire (A+):</strong> Signal positive output</li>
          <li><strong>Green Wire (A−):</strong> Signal negative output</li>
        </ul>
        
        <h4>HX711 to Raspberry Pi GPIO Connections</h4>
        <ul>
          <li><strong>VCC (HX711) → Pin 2 (5V):</strong> Power supply for HX711 module</li>
          <li><strong>GND (HX711) → Pin 6 (GND):</strong> Common ground reference</li>
          <li><strong>DT (HX711) → Pin 29 (GPIO5):</strong> Data transmission line</li>
          <li><strong>SCK (HX711) → Pin 31 (GPIO6):</strong> Serial clock signal</li>
        </ul>
        
        <h4>Wheatstone Bridge Configuration</h4>
        <p>The four load cells are connected in a full Wheatstone bridge arrangement:</p>
        <ul>
          <li><strong>Corner 1 & 3:</strong> Diagonal load cells connected to A+ terminals</li>
          <li><strong>Corner 2 & 4:</strong> Diagonal load cells connected to A− terminals</li>
          <li><strong>All E+ terminals:</strong> Connected to common 5V supply</li>
          <li><strong>All E− terminals:</strong> Connected to common ground</li>
        </ul>
        
        <h4>Power Distribution</h4>
        <ul>
          <li><strong>Primary Power:</strong> 5V 3A switching adapter with surge protection</li>
          <li><strong>Pi Power:</strong> USB-C connector with power delivery monitoring</li>
          <li><strong>Display Power:</strong> Micro-USB or GPIO power rail (depending on model)</li>
          <li><strong>Load Cell Power:</strong> 5V regulated supply through HX711 module</li>
        </ul>
      </div>
    ),
  },
  assembly: {
    title: 'Hardware Assembly',
    content: (
      <div>
        <h4>Pre-Assembly Preparation:</h4>
        <ol>
          <li>Verify all components are present and undamaged</li>
          <li>Prepare clean, static-free workspace</li>
          <li>Download latest system image to MicroSD card</li>
        </ol>
        <h4>Physical Assembly Steps:</h4>
        <ol>
          <li><strong>Load Cell Mounting:</strong> Secure load cells at each corner of the weighing platform using provided bolts</li>
          <li><strong>Wiring Harness:</strong> Connect load cells to HX711 using color-coded jumper wires (maintain polarity)</li>
          <li><strong>GPIO Connection:</strong> Wire HX711 to Raspberry Pi GPIO pins according to circuit diagram</li>
          <li><strong>Storage Setup:</strong> Insert programmed MicroSD card into Pi and secure</li>
          <li><strong>Power Connection:</strong> Connect 5V power supply (ensure system is off during wiring)</li>
          <li><strong>Display Integration:</strong> Connect touch display via HDMI and USB for power/touch</li>
          <li><strong>Network Setup:</strong> Connect ethernet cable or configure Wi-Fi for network access</li>
        </ol>
        <h4>Initial Testing:</h4>
        <ol>
          <li>Power on system and verify boot sequence</li>
          <li>Check display output and touch responsiveness</li>
          <li>Verify network connectivity and web dashboard access</li>
        </ol>
      </div>
    ),
  },
  safety: {
    title: 'Safety Precautions',
    content: (
      <div>
        <h4>Electrical Safety:</h4>
        <ul>
          <li>Always disconnect power before making any electrical connections</li>
          <li>Use anti-static wrist strap when handling electronic components</li>
          <li>Verify voltage levels before connecting power supplies</li>
          <li>Keep all electronics away from water and moisture</li>
        </ul>
        <h4>Mechanical Safety:</h4>
        <ul>
          <li>Ensure load cells are properly mounted and cannot shift during operation</li>
          <li>Do not exceed maximum weight capacity of 200kg total (50kg per sensor)</li>
          <li>Use appropriate tools for mounting hardware installation</li>
        </ul>
        <h4>Installation Guidelines:</h4>
        <ul>
          <li>Use insulated jumper wires instead of direct soldering for easy maintenance</li>
          <li>Route cables away from moving parts and sharp edges</li>
          <li>Provide adequate ventilation around Raspberry Pi for cooling</li>
          <li>Secure all connections to prevent accidental disconnection</li>
        </ul>
      </div>
    ),
  },
  calibration: {
    title: 'Calibration Procedure',
    content: (
      <div>
        <h4>Pre-Calibration Setup</h4>
        <ol>
          <li>Ensure all hardware connections are secure and verified</li>
          <li>Allow system to warm up for 10-15 minutes for thermal stability</li>
          <li>Prepare certified reference weights (1kg, 5kg, 10kg recommended)</li>
          <li>Clear the weighing platform of all objects</li>
        </ol>
        
        <h4>Manual Calibration Process</h4>
        <ol>
          <li><strong>Zero Point Calibration:</strong> Perform system tare with empty platform</li>
          <li><strong>Reference Weight Placement:</strong> Place known weight (preferably 1kg certified mass) on center of platform</li>
          <li><strong>Calibration Factor Adjustment:</strong> Modify calibration factor in Load Cell settings until reading matches known weight</li>
          <li><strong>Validation Testing:</strong> Test with multiple weights across expected range (0.5kg to 20kg)</li>
          <li><strong>Repeatability Check:</strong> Perform multiple measurements with same weight to verify consistency</li>
        </ol>
        
        <h4>Automated Calibration Script</h4>
        <p>For advanced users, run the automated calibration script:</p>
        <ol>
          <li>Access Raspberry Pi terminal via SSH or direct connection</li>
          <li>Navigate to calibration directory: <code>cd /home/pi/waste-management/calibration/</code></li>
          <li>Execute calibration script: <code>python3 Calibration-Wcell.py</code></li>
          <li>Follow on-screen prompts for weight placement and measurements</li>
          <li>Script automatically calculates and applies optimal calibration factor</li>
        </ol>
        
        <h4>Calibration Verification</h4>
        <ul>
          <li><strong>Accuracy Test:</strong> ±1% accuracy across full measurement range</li>
          <li><strong>Linearity Check:</strong> Verify proportional response across weight increments</li>
          <li><strong>Stability Test:</strong> Monitor readings over 5-minute period for drift</li>
          <li><strong>Environmental Test:</strong> Verify performance under operational temperature conditions</li>
        </ul>
      </div>
    ),
  },
  troubleshooting: {
    title: 'Hardware Troubleshooting Guide',
    content: (
      <div>
        <h4>Weight Measurement Issues</h4>
        <h5>❌ No Weight Readings</h5>
        <ul>
          <li><strong>Check Physical Connections:</strong> Verify all load cell wires are properly connected to HX711</li>
          <li><strong>Verify Power Supply:</strong> Ensure 5V power is reaching HX711 module (check with multimeter)</li>
          <li><strong>GPIO Pin Verification:</strong> Confirm DT and SCK pins are connected to correct GPIO pins (5 and 6)</li>
          <li><strong>HX711 Module Test:</strong> Try replacing HX711 module if available</li>
          <li><strong>Software Check:</strong> Verify HX711 service is running: <code>sudo systemctl status hx711-service</code></li>
        </ul>
        
        <h5>📊 Inaccurate or Erratic Readings</h5>
        <ul>
          <li><strong>Recalibration Required:</strong> Perform complete calibration procedure with certified weights</li>
          <li><strong>Environmental Factors:</strong> Check for vibrations, temperature changes, or air currents</li>
          <li><strong>Load Cell Alignment:</strong> Verify all load cells are properly mounted and level</li>
          <li><strong>Electrical Interference:</strong> Check for nearby electromagnetic sources affecting readings</li>
          <li><strong>Wiring Integrity:</strong> Inspect wires for damage, corrosion, or loose connections</li>
        </ul>
        
        <h4>System Communication Issues</h4>
        <h5>🌐 Network Connection Problems</h5>
        <ul>
          <li><strong>Network Cable:</strong> Verify ethernet cable is properly connected and functional</li>
          <li><strong>IP Configuration:</strong> Check network settings in RPi configuration panel</li>
          <li><strong>Router/Switch:</strong> Verify network infrastructure is operational</li>
          <li><strong>Firewall Settings:</strong> Ensure required ports (80, 443, 22) are not blocked</li>
          <li><strong>DNS Resolution:</strong> Test with direct IP address if hostname fails</li>
        </ul>
        
        <h5>🖥️ Display and Interface Issues</h5>
        <ul>
          <li><strong>Display Connection:</strong> Check HDMI and USB connections for touch display</li>
          <li><strong>Touch Calibration:</strong> Recalibrate touch input if responsiveness is poor</li>
          <li><strong>Resolution Settings:</strong> Verify display resolution matches screen capabilities</li>
          <li><strong>Web Browser:</strong> Clear cache and restart browser application</li>
          <li><strong>System Reboot:</strong> Restart Raspberry Pi if display remains unresponsive</li>
        </ul>
        
        <h4>Performance and Reliability Issues</h4>
        <h5>🔥 Overheating and Thermal Issues</h5>
        <ul>
          <li><strong>Temperature Monitoring:</strong> Check system temperature in General Diagnostics</li>
          <li><strong>Ventilation Improvement:</strong> Ensure adequate airflow around device</li>
          <li><strong>Heat Sink Cleaning:</strong> Remove dust from CPU heat sink and fan</li>
          <li><strong>Location Assessment:</strong> Relocate away from heat sources or direct sunlight</li>
          <li><strong>Thermal Shutdown:</strong> System will automatically throttle if temperature exceeds 80°C</li>
        </ul>
        
        <h5>💾 Storage and Memory Issues</h5>
        <ul>
          <li><strong>SD Card Health:</strong> Check SD card for corruption using: <code>sudo fsck /dev/mmcblk0p2</code></li>
          <li><strong>Storage Space:</strong> Monitor available disk space: <code>df -h</code></li>
          <li><strong>Memory Usage:</strong> Check RAM utilization in system diagnostics</li>
          <li><strong>Log File Management:</strong> Rotate or archive large log files to free space</li>
          <li><strong>Database Optimization:</strong> Perform periodic database maintenance and cleanup</li>
        </ul>
      </div>
    ),
  },
};

export function HardwareManual({ onBack }) {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <ManualLayout
      title="Hardware Setup"
      sections={hardwareSections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      <h2>{hardwareSections[activeSection].title}</h2>
      {hardwareSections[activeSection].content}
    </ManualLayout>
  );
}
