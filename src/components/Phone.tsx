import React, { useState } from 'react';
import AudioVisualizer from './AudioVisualizer/AudioVisualizer';
import Tuner from './Tuner';
import StatusBar from './StatusBar';
import './Phone.css';
import Controls from './Controls';

const Phone: React.FC = () => {
  const [tunerExpanded, setTunerExpanded] = useState(false);

  return (
    <div className="phone h-[calc(90vh)] flex items-center justify-center relative before:bg-primary">
      <img src="/iphone.png" alt="iPhone" className="h-full" />
      <StatusBar />
      <div className="content">
        <div className="content-wrapper">
          <div className="title">{`PLAY\nKISS FM\nFOR ME`}</div>
          <AudioVisualizer isExpanded={tunerExpanded} />
          <Tuner
            onExpand={() => setTunerExpanded(true)}
            onCollapse={() => setTunerExpanded(false)}
          />
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default Phone;
