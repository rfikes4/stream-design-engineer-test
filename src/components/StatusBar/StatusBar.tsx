import React, { useState, useEffect } from 'react';
import { getFormattedTime } from '../../utils/timeUtils';
import './StatusBar.css';

const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkTime = () => {
      const newTime = getFormattedTime();
      if (newTime !== currentTime) {
        setCurrentTime(newTime);
        clearInterval(interval);
        interval = setInterval(checkTime, 60000);
      }
    };

    interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <div className="status">
      <div className="status-left">
        <span className="status-time">{currentTime}</span>
      </div>
      <div className="status-right">
        <img src="/ios15-cellular-signal-icon.png" alt="Signal Icon" className="status-icon" />
        <img src="/ios15-wifi-icon.png" alt="WiFi Icon" className="status-icon" />
        <img src="/ios15-battery-status-icon.png" alt="Battery Icon" className="status-icon" />
      </div>
    </div>
  );
};

export default StatusBar;
