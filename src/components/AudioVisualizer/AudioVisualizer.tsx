import React, { useEffect, useState, useMemo } from "react";
import './AudioVisualizer.css';

interface AudioVisualizerProps {
  isExpanded: boolean;
}

const ROWS = 24;
const COLUMNS = 22;
const LEVEL_COLUMNS = Math.floor(COLUMNS / 2);

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isExpanded }) => {
  const [stateMatrix, setStateMatrix] = useState<number[][]>(
    Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0))
  );

  const generateLevels = () => {
    const newLevels = Array.from({ length: LEVEL_COLUMNS }, () =>
      Math.floor(Math.random() * ROWS)
    );

    setStateMatrix((prevMatrix) =>
      prevMatrix.map((row, rowIndex) =>
        row.map((_, colIndex) => {
          const columnLevelIndex = Math.floor(colIndex / 2);
          const isOn = ROWS - rowIndex <= newLevels[columnLevelIndex];
          return isOn ? 1 : 0;
        })
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateLevels();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const grid = useMemo(
    () =>
      Array.from({ length: ROWS }).map((_, rowIndex) =>
        Array.from({ length: COLUMNS }).map((_, colIndex) => {
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
                transition: isOn
                  ? "none"
                  : "background-color 0.15s ease-out",
              }}
            ></div>
          );
        })
      ),
    [stateMatrix]
  );

  return (
    <div
      className={`visualizer flex items-center justify-center ${isExpanded ? "expanded" : ""
        }`}
    >
      <div
        className={`grid ${isExpanded ? "expanded" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gap: "0.75vh",
        }}
      >
        {grid}
      </div>
    </div>
  );
};

export default AudioVisualizer;
