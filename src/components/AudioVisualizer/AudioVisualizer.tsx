import React, { useEffect, useState } from "react";
import './AudioVisualizer.css';

interface AudioVisualizerProps {
  isExpanded: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isExpanded }) => {
  const rows = 24;
  const columns = 22;
  const levelColumns = 11;

  const [levels, setLevels] = useState<number[]>([]);
  const [stateMatrix, setStateMatrix] = useState<number[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(0))
  );

  const generateLevels = () => {
    const newLevels = Array.from({ length: levelColumns }, () =>
      Math.floor(Math.random() * rows)
    );

    setStateMatrix((prevMatrix) =>
      Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: columns }, (_, colIndex) => {
          const columnLevelIndex = Math.floor(colIndex / 2);
          const isOn = rows - rowIndex <= newLevels[columnLevelIndex];
          return isOn ? 1 : prevMatrix[rowIndex][colIndex] === 1 ? 0 : 0;
        })
      )
    );

    setLevels(newLevels);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateLevels();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      // className="visualizer flex items-center justify-center"
      className={`visualizer flex items-center justify-center ${isExpanded ? "expanded" : ""}`}
    >
      <div
        className={`grid ${isExpanded ? "expanded" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "0.75vh",
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: columns }).map((_, colIndex) => {
            const isOn = stateMatrix[rowIndex][colIndex] === 1;
            const backgroundColor = isOn
              ? "rgba(0, 0, 0, 1)"
              : "rgba(115, 131, 103, 1)";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="dot"
                style={{
                  backgroundColor,
                  transition: isOn ? "none" : "background-color 0.15s ease-out",
                }}
              ></div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AudioVisualizer;
