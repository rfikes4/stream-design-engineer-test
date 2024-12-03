import React from 'react';
import './Controls.css';

const Controls: React.FC = () => {
  return (
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
  );
};

export default Controls;
