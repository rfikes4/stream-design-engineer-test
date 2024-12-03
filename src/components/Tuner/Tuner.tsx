import { useState, useRef, useEffect, useCallback } from "react";
import { useOnClickOutside } from "usehooks-ts";
import NumberFlow from "@number-flow/react";
import "./Tuner.css";

interface TunerProps {
  onExpand: () => void;
  onCollapse: () => void;
}

const Tuner: React.FC<TunerProps> = ({ onExpand, onCollapse }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tunerPosition, setTunerPosition] = useState(50);
  const [station, setStation] = useState(96.1); // Initial station value
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updatePosition = (x: number, bounds: DOMRect) => {
    const clampedPosition = Math.max(4, Math.min(x - bounds.left, bounds.width - 4));
    const percentage = (clampedPosition / bounds.width) * 100;
    setTunerPosition(percentage);
    const newStation = 84.5 + (percentage / 100) * 24;
    setStation(newStation);
  };

  const handleDragStart = useCallback(
    (clientX: number) => {
      if (!isExpanded) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      }
      setIsExpanded(true);
      setIsDragging(true);

      if (trackRef.current) {
        const bounds = trackRef.current.getBoundingClientRect();
        updatePosition(clientX, bounds);
      }
      onExpand();
    },
    [isExpanded, onExpand]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (isDragging && trackRef.current) {
        const bounds = trackRef.current.getBoundingClientRect();
        updatePosition(clientX, bounds);
      }
    },
    [isDragging]
  );

  const handleCollapse = useCallback(() => {
    setIsExpanded(false);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onCollapse();
  }, [onCollapse]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (isExpanded) {
      handleCollapse();
    }
  }, [isExpanded, handleCollapse]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging, handleDragEnd]);

  useOnClickOutside(trackRef, handleCollapse);

  return (
    <div
      className={`tuner ${isExpanded ? "expanded" : ""}`}
      onMouseDown={(event) => handleDragStart(event.clientX)}
      onMouseMove={(event) => handleDragMove(event.clientX)}
      onMouseUp={handleDragEnd}
      onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
      onTouchMove={(event) => handleDragMove(event.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      ref={trackRef}
    >
      <div className="tuner-wrapper">
        <div className={`tuner-detail ${isExpanded ? "expanded" : ""}`}>
          <NumberFlow
            value={station}
            format={{ style: "decimal", maximumFractionDigits: 1 }}
            className="tuner-frequency text-primary"
          />
          <span className="tuner-label">KISS FM</span>
        </div>
        <div className="tuner-stations-wrapper">
          <div className="tuner-stations tuner-fm text-primary">
            <em>FM</em>
            {[88, 92, 96, 100, 104, 107].map((freq) => (
              <span key={freq}>{freq}</span>
            ))}
          </div>
          <div
            className="tuner-track"
            style={{
              height: isExpanded ? "12vh" : "2px",
              transition: isAnimating ? "height 0.3s ease-in-out" : undefined,
            }}
          >
            <div className="knotch-long-wrapper">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={`knotch-long-${i}`} className="knotch-long"></span>
              ))}
            </div>
            <div className="knotch-short-wrapper">
              {Array.from({ length: 35 }).map((_, i) => (
                <span key={`knotch-short-${i}`} className="knotch-short"></span>
              ))}
            </div>
          </div>
          <div
            className={`tuner-dial ${isExpanded ? "expanded" : ""}`}
            style={{
              left: `${tunerPosition}%`,
              transition: isAnimating
                ? "left 0.3s ease-in-out, top 0.3s ease-in-out, height 0.3s ease-in-out"
                : "none",
            }}
          ></div>
          <div className="tuner-stations tuner-am text-primary">
            <em>AM</em>
            {[5.4, 6, 7, 8, 10, 12, 14, 16].map((freq) => (
              <span key={freq}>{freq}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuner;
