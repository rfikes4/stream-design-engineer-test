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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [expandedClicked, setExpandedClicked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setIsDragged] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [dialTransition, setDialTransition] = useState("none");
  const trackRef = useRef<HTMLDivElement>(null);
  const [isTouchDown, setIsTouchDown] = useState(false);

  const updatePosition = (x: number, bounds: DOMRect) => {
    const clampedPosition = Math.max(4, Math.min(x - bounds.left, bounds.width - 4));
    const percentage = (clampedPosition / bounds.width) * 100;
    setTunerPosition(percentage);
    const newStation = parseFloat((84.5 + (percentage / 100) * 24).toFixed(1));
    setStation(newStation);
  };

  const handleUp = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(false);
      if (!("touches" in event)) {
        if (expandedClicked && !dragged) {
          setIsExpanded(false);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 500);
        }
        setIsMouseDown(false);
        setIsTouchDown(false);
      }
    }, [dragged, expandedClicked]);

  const handleDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
      const isTouchEvent = "touches" in event;
      const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;

      if (isTouchEvent) {
        setIsTouchDown(true);
      } else {
        if (isTouchDown) {
          handleUp(event);
          return;
        }
        setIsMouseDown(true);
      }

      if (!isExpanded) {
        setExpandedClicked(false);
        setIsExpanded(true);
        setInitialX(clientX);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      } else {
        setExpandedClicked(true);
        setIsDragged(false);
      }
    },
    [handleUp, isExpanded, isTouchDown]
  );

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
      const isTouchEvent = "touches" in event;
      const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;

      if ((isTouchEvent && isTouchDown) || (!isTouchEvent && isMouseDown)) {
        if (clientX !== initialX && !isDragging) {
          setIsDragging(true);
          setDialTransition("left 0.25s ease-out");
          setTimeout(() => setDialTransition("none"), 250);
        }

        if (trackRef.current) {
          const bounds = trackRef.current.getBoundingClientRect();
          updatePosition(clientX, bounds);
          setIsDragged(true);
        }
      }
    },
    [initialX, isDragging, isMouseDown, isTouchDown]
  );

  useEffect(() => {
    if (isExpanded) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [isExpanded, onExpand, onCollapse]);

  useOnClickOutside(trackRef, () => {
    if (!isDragging && isExpanded) {
      setIsExpanded(false);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  });

  return (
    <div
      className={`tuner ${isExpanded ? "expanded" : ""} ${isDragging ? "dragging" : ""} ${isMouseDown ? "mouse-down" : ""}`}
      onMouseDown={(event) => handleDown(event)}
      onMouseUp={(event) => handleUp(event)}
      onMouseMove={(event) => handleMove(event)}
      onTouchStart={(event) => handleDown(event)}
      onTouchMove={(event) => handleMove(event)}
      onTouchEnd={(event) => handleUp(event)}
      ref={trackRef}
    >
      <div className="tuner-wrapper">
        <div className={`tuner-detail ${isExpanded ? "expanded" : ""}`}>
          <NumberFlow
            value={station}
            format={{ minimumFractionDigits: 1 }}
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
              transition: isAnimating ? "height 0.5s ease-in-out" : undefined,
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
              top: isExpanded ? "6.5vh" : "0vh",
              height: isExpanded ? "48%" : "100%",
              transition: isAnimating
                ? "left 0.25s ease-in-out, top 0.5s ease-in-out, height 0.5s ease-in-out"
                : dialTransition,
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
