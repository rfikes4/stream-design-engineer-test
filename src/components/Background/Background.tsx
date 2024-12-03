import React from 'react';
import './Background.css';

const Background: React.FC = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full m-auto border-b border-lightGray overflow-hidden py-5 lg:h-[206px] lg:py-0 xsm:flex hidden items-center justify-center dynamic-container">
        <p className="tracking-tighter lg:text-[252px] lg:leading-[206px] dynamic-text">
          ELECTRONICS
        </p>
      </div>
      <div className="absolute top-0 left-0 flex gap-16 text-[3vh]">
        <p className="text-mediumGray">RADIO</p>
        <p className="whitespace-pre-line">{`SMART\nFEATURES`}</p>
      </div>
    </div>
  );
};

export default Background;
