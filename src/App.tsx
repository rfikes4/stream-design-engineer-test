import './App.css'; // TODO: just use index.css
import React, { useState, useEffect } from 'react';

const getFormattedTime = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function App() {
  const [phoneBgColor, setPhoneBgColor] = useState("#91a482");
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
    <div className="App flex items-center justify-center h-screen">
      <div className="absolute top-0 left-0 w-full">
        <div className="flex items-center justify-center w-full h-[206px] m-auto border-b border-lightGray overflow-hidden py-5">
          <p className="text-[252px] tracking-tighter">
            ELECTRONICS
          </p>
        </div>
      </div>
      <div className="Wrap h-[calc(90vh)] flex items-center justify-center relative" style={{ "--wrap-bg-color": phoneBgColor } as React.CSSProperties}>
        <img src="/iphone.png" alt="iPhone" className="h-full" />
        <span className="phoneTime">{currentTime}</span>
      </div>
    </div>
  );
}

export default App;
