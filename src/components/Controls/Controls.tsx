import React from 'react';
import './Controls.css';

const Controls: React.FC = () => {
  return (
    <div className="controls">
      <a href="https://x.com/slavakornilov/status/1844337146775339088" target="_blank" rel="noopener noreferrer" className="control-icon">
        <img src="./images/icon-left.svg" alt="Icon Left" />
      </a>
      <div className="control-icon-up">
        <img src="./images/icon-up.svg" alt="Icon Up" />
      </div>
      <a href="https://www.robertfikesiv.com/" target="_blank" rel="noopener noreferrer" className="control-icon">
        <img src="./images/icon-right.svg" alt="Icon Right" />
      </a>
    </div>
  );
};

export default Controls;
