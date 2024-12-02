import './App.css'; // TODO: just use index.css
import React, { useState, useEffect } from 'react';
import AudioVisualizer from './AudioVisualizer';

const getFormattedTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedHours = (hours % 12 || 12).toString();
  return `${formattedHours}:${minutes}`;
}

function App() {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const phoneBgColor = "#91a482";

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
    <div className="App flex items-center justify-center h-screen">
      <div className="absolute top-0 left-0 w-full">
        <div className="flex items-center justify-center w-full h-[206px] m-auto border-b border-lightGray overflow-hidden py-5">
          <p className="text-[252px] tracking-tighter">
            ELECTRONICS
          </p>
        </div>
      </div>
      <div className="phone h-[calc(90vh)] flex items-center justify-center relative" style={{ "--phone-bg-color": phoneBgColor } as React.CSSProperties}>
        <img src="/iphone.png" alt="iPhone" className="h-full" />
        <div className="status">
          {/* TODO: turn into status component */}
          <div className="status-left">
            <span className="status-time">{currentTime}</span>
          </div>
          <div className="status-right">
            <img src="/ios15-cellular-signal-icon.png" alt="Signal Icon" className="status-icon" />
            <img src="/ios15-wifi-icon.png" alt="WiFi Icon" className="status-icon" />
            <img src="/ios15-battery-status-icon.png" alt="Battery Icon" className="status-icon" />
          </div>
        </div>
        <div className="content">
          <div className="title">{`PLAY\nKISS FM\nFOR ME`}</div>
          <AudioVisualizer />
        </div>
      </div>
    </div>
  );
}

export default App;
