import React, { useState, useEffect } from "react";
import AudioVisualizer from "../AudioVisualizer/AudioVisualizer";
import Tuner from "../Tuner/Tuner";
import StatusBar from "../StatusBar/StatusBar";
import Controls from "../Controls/Controls";
import "./Phone.css";

const Phone: React.FC = () => {
  const [tunerExpanded, setTunerExpanded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Replay animation when Tuner collapses
  useEffect(() => {
    if (!tunerExpanded) {
      setAnimationKey((prevKey) => prevKey + 1);
    }
  }, [tunerExpanded]);

  // Function to split title into spans while keeping line spacing
  const splitText = (text: string) => {
    return text.split("\n").map((line, lineIndex) => (
      <div key={`line-${lineIndex}`} className="line">
        {line.split("").map((letter, letterIndex) => (
          <span
            key={`${animationKey}-${lineIndex}-${letterIndex}`}
            className="letter"
            style={{
              animation: `fadeIn 0.5s cubic-bezier(0,1,1,0) ${(lineIndex * 0.1 +
                letterIndex * 0.05).toFixed(2)}s forwards`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    ));
  };

  const title = `PLAY\nKISS FM\nFOR ME`;

  return (
    <div className={`phone h-[calc(90vh)] flex items-center justify-center relative before:bg-primary ${tunerExpanded ? "expanded" : ""}`}>
      <img src="/iphone.png" alt="iPhone" className="h-full phone-img" />
      <StatusBar />
      <div className="content">
        <div className="content-wrapper">
          <div className="title">{splitText(title)}</div>
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
