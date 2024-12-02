import { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "usehooks-ts";
import NumberFlow from "@number-flow/react";

interface TunerProps {
  onExpand: () => void;
  onCollapse: () => void;
}

const Tuner: React.FC<TunerProps> = ({ onExpand, onCollapse }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tunerPosition, setTunerPosition] = useState(50);
  const ref = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [station, setStation] = useState(94.1); // Initial station value
  const trackRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<number | null>(null);

  useOnClickOutside(ref, () => setIsExpanded(false));

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsExpanded(false);
      onCollapse();
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
      setIsExpanded(false);
      onCollapse();
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [onCollapse]);

  useEffect(() => {
    if (isExpanded && mousePosition !== null && trackRef.current) {
      const trackBounds = trackRef.current.getBoundingClientRect();

      setIsAnimating(true);
      updatePosition(mousePosition, trackBounds);

      const timeout = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isExpanded, mousePosition]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMousePosition(event.clientX);
    setIsExpanded(true);
    setIsDragging(true);
    onExpand();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setMousePosition(event.touches[0].clientX);
    setIsExpanded(true);
    setIsDragging(true);
    onExpand();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || !trackRef.current) return;

    const trackBounds = trackRef.current.getBoundingClientRect();
    const mouseX = event.clientX;

    updatePosition(mouseX, trackBounds);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;

    const trackBounds = trackRef.current.getBoundingClientRect();
    const touchX = event.touches[0].clientX;

    updatePosition(touchX, trackBounds);
  };

  const updatePosition = (x: number, bounds: DOMRect) => {
    const clampedPosition = Math.max(4, Math.min(x - bounds.left, bounds.width - 4));
    const percentage = (clampedPosition / bounds.width) * 100;
    setTunerPosition(percentage);
    const newStation = 80 + (percentage / 100) * 28;
    setStation(parseFloat(newStation.toFixed(1)));
  };

  return (
    <div
      className="tuner"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      ref={trackRef}
    >
      <div className="tuner-wrapper">
        <div className={`tuner-detail ${isExpanded ? "expanded" : ""}`}>
          <NumberFlow value={parseFloat(station.toFixed(1))} className="tuner-frequency" />
          <span className="tuner-label">KISS FM</span>
        </div>
        <div className="tuner-stations-wrapper">
          <div className="tuner-stations tuner-fm">
            <em>FM</em>
            <span>88</span>
            <span>92</span>
            <span>96</span>
            <span>100</span>
            <span>104</span>
            <span>107</span>
          </div>
          <div
            className="tuner-track"
            style={{
              height: isExpanded ? "20vh" : "2px",
              transition: isExpanded ? "height 0.3s ease-in-out" : undefined,
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
              transition: isAnimating ? "left 0.3s ease-in-out, top 0.3s ease-in-out, height 0.3s ease-in-out" : "top 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          ></div>
          <div className="tuner-stations tuner-am">
            <em>AM</em>
            <span>5.4</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
            <span>10</span>
            <span>12</span>
            <span>14</span>
            <span>16</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuner;
