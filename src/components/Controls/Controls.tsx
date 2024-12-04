import React from 'react';
import './Controls.css';

const Controls: React.FC = () => {
  return (
    <div className="controls">
      <a href="https://github.com/rfikes4/stream-design-engineer-test/tree/master" target="_blank" rel="noopener noreferrer">
        <div className="control-icon">
          <img src="./images/icon-left.svg" alt="Icon Left" />
        </div>
      </a>
      <div className="control-icon-up">
        <img src="./images/icon-up.svg" alt="Icon Up" />
      </div>
      <a href="https://www.robertfikesiv.com/" target="_blank" rel="noopener noreferrer">
        <div className="control-icon">
          <img src="./images/icon-right.svg" alt="Icon Right" />
        </div>
      </a>
    </div>
  );
};

export default Controls;
