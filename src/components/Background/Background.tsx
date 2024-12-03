import React from "react";
import "./Background.css";

const Background: React.FC = () => {
  return (
    <div className="background absolute w-full h-full">
      <div className="relative w-full h-full">
        <div className="w-full m-auto border-b border-lightGray overflow-hidden py-5 lg:h-[206px] lg:py-0 xsm:flex hidden items-center justify-center dynamic-container">
          <p className="tracking-tighter lg:text-[252px] lg:leading-[206px] dynamic-text">
            ELECTRONICS
          </p>
        </div>

        <div className="w-full flex justify-between px-10 mt-10">
          <div className="flex gap-16 text-[2.5vh] leading-none">
            <p className="text-mediumGray">RADIO</p>
            <p className="whitespace-pre-line">{`SMART\nFEATURES`}</p>
          </div>
          <div className="flex gap-16 text-[2.5vh] leading-none">
            <p className=" text-mediumGray">RADIO</p>
            <p className="whitespace-pre-line">{`VOICE\nCOMMANDS`}</p>
          </div>
        </div>

        <div className="w-full h-[20vh] flex justify-between px-40 mt-[8vh]">
          <img
            src="./images/wheel.svg"
            alt="Left Wheel"
            className="wheel-left"
          />
          <img
            src="./images/wheel.svg"
            alt="Right Wheel"
            className="wheel-right"
          />
        </div>

        <div className="w-full px-60 mt-[9vh] flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="play-triangle" />
            <p className="text-[2.5vh]">PLAY</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="play-triangle" />
            <p className="text-[2.5vh]">PLAY</p>
          </div>
        </div>

        <div className="w-full px-32 mt-[9vh] flex justify-between">
          <div className="flex gap-[7vw] items-center">
            <p className="text-[2.5vh] text-mediumGray">PART</p>
            <p className="text-[2.5vh]">{`{0004}`}</p>
          </div>
          <div className="flex gap-[7vw] items-center">
            <p className="text-[2.5vh] text-mediumGray">PART</p>
            <p className="text-[2.5vh]">{`{0004}`}</p>
          </div>
        </div>

        <div className="absolute bottom-0 w-full px-32 flex justify-center border-t border-lightGray pt-[3vh] pb-[2vh] more lg:justify-between">
          <div className="flex gap-[7vw] items-center">
            <p className="text-[2.5vh] text-mediumGray">MORE</p>
            <div className="flex">
              <p className="text-[2.5vh] text-mediumGray">CREATIVE.</p>
              <p className="text-[2.5vh]">GEEX-ARTS.COM</p>
            </div>
          </div>
          <div className="gap-[7vw] items-center more-right hidden lg:flex">
            <p className="text-[2.5vh] text-mediumGray">MORE</p>
            <div className="flex">
              <p className="text-[2.5vh] text-mediumGray">CREATIVE.</p>
              <p className="text-[2.5vh]">GEEX-ARTS.COM</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Background;
