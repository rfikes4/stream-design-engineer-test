import './App.css'; // TODO: just use index.css
import React, { useState, useEffect } from 'react';
import AudioVisualizer from './AudioVisualizer';
import Tuner from './Tuner';
// import iconUp from './icon-up.svg';
// import iconLeft from './icon-left.svg';
// import iconRight from './icon-right.svg';

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
  const [tunerExpanded, setTunerExpanded] = useState(false);

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
          <div className="content-wrapper">
            <div className="title">{`PLAY\nKISS FM\nFOR ME`}</div>
            <AudioVisualizer />
            <Tuner
              onExpand={() => setTunerExpanded(true)} // Set state when tuner expands
              onCollapse={() => setTunerExpanded(false)} // Set state when tuner collapses
            />
            <div className="controls">
              <div className="control-icon">
                <img src="/icon-left.svg" alt="Icon Left" />
              </div>
              <div className="control-icon-up" >
                <img src="/icon-up.svg" alt="Icon Up" />
              </div>
              <div className="control-icon">
                <img src="/icon-right.svg" alt="Icon Right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
