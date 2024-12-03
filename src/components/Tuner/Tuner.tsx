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
      console.log("handleUp");


      // if (expandedClicked && !dragged) {
      //   setIsExpanded(false);
      //   setIsAnimating(true);
      //   setTimeout(() => setIsAnimating(false), 300);
      // }

      // if (isDragging) {
      //   setIsDragging(false);
      // }

      // if ("touches" in event) {
      //   setIsTouchDown(false);
      // } else {
      //   setIsMouseDown(false);
      // }

      if ("touches" in event) {
        console.log('touchup');
        // if (expandedClicked && !dragged) {
        //   setIsExpanded(false);
        //   setIsAnimating(true);
        //   setTimeout(() => setIsAnimating(false), 300);
        // }

        // if (isDragging) {
        //   setIsDragging(false);
        // }

        // setIsTouchDown(false);
        // return;
      } else {
        if (expandedClicked && !dragged) {
          setIsExpanded(false);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        }

        if (isDragging) {
          setIsDragging(false);
        }

        setIsMouseDown(false);
        setIsTouchDown(false);
      }
    }, [dragged, expandedClicked, isDragging]);

  // const handleMouseDown = useCallback(
  //   (clientX: number) => {
  //     console.log("handleMouseDown");
  //     // if (isTouch) return;
  //     // console.log("handleMouseDown", isExpanded);
  //     setIsMouseDown(true);
  //     if (!isExpanded) {
  //       setExpandedClicked(false);
  //       setIsExpanded(true);
  //       setInitialX(clientX);
  //       setIsAnimating(true);
  //       setTimeout(() => setIsAnimating(false), 300);
  //     } else {
  //       setExpandedClicked(true);
  //       setIsDragged(false);
  //     }
  //   }, [isExpanded]);
  const handleDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
      console.log("handleDown");
      if ("touches" in event) {
        // handleMouseDown(event.clientX);
        console.log("touch");
        setIsTouchDown(true);
        // setIsMouseDown(true); // rename? use?
        if (!isExpanded) {
          setExpandedClicked(false);
          setIsExpanded(true);
          setInitialX(event.touches[0].clientX);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        } else {
          setExpandedClicked(true);
          setIsDragged(false);
        }
      } else {
        if (isTouchDown) {
          handleUp(event);
          return;
        };
        console.log("mouse");
        // handleTouchDown(event.touches[0].clientX);
        setIsMouseDown(true);
        if (!isExpanded) {
          setExpandedClicked(false);
          setIsExpanded(true);
          setInitialX(event.clientX);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 300);
        } else {
          setExpandedClicked(true);
          setIsDragged(false);
        }
      }
      // if (event instanceof MouseEvent) {
      //   // handleMouseDown(event.clientX);
      //   console.log("mouse");
      // } else if (event instanceof TouchEvent) {
      //   console.log("touch");
      //   // handleTouchDown(event.touches[0].clientX);
      // }
      // if (isTouch) return;
      // console.log("handleMouseDown", isExpanded);


      // setIsMouseDown(true);
      // if (!isExpanded) {
      //   setExpandedClicked(false);
      //   setIsExpanded(true);
      //   setInitialX(clientX);
      //   setIsAnimating(true);
      //   setTimeout(() => setIsAnimating(false), 300);
      // } else {
      //   setExpandedClicked(true);
      //   setIsDragged(false);
      // }
    }, [handleUp, isExpanded, isTouchDown]);



  // const handleTouchDown = useCallback(
  //   (clientX: number) => {
  //     // if (isTouch) return;
  //     console.log("handleTouchDown");
  //     setIsMouseDown(true);
  //     if (!isExpanded) {
  //       setExpandedClicked(false);
  //       setIsExpanded(true);
  //       setInitialX(clientX);
  //       setIsAnimating(true);
  //       setTimeout(() => setIsAnimating(false), 300);
  //     } else {
  //       setExpandedClicked(true);
  //       setIsDragged(false);
  //     }
  //   }, [isExpanded]);

  // const handleMouseUp = useCallback(() => {
  //   if (expandedClicked && !dragged) {
  //     setIsExpanded(false);
  //     setIsAnimating(true);
  //     setTimeout(() => setIsAnimating(false), 300);
  //   }

  //   if (isDragging) {
  //     setIsDragging(false);
  //   }

  //   setIsMouseDown(false);
  // }, [dragged, expandedClicked, isDragging]);


  // const handleMouseMove = useCallback(
  //   (clientX: number) => {
  //     console.log("handleMouseMove", isMouseDown, isDragging);
  //     if (isMouseDown && clientX !== initialX && !isDragging) {
  //       setIsDragging(true);
  //       console.log("handleMouseMove", clientX);

  //       // drag start
  //       setDialTransition("left 0.3s ease-out");

  //       if (trackRef.current) {
  //         const bounds = trackRef.current.getBoundingClientRect();
  //         updatePosition(clientX, bounds);
  //       }


  //       setTimeout(() => {
  //         setDialTransition("none");
  //       }, 300);

  //       setIsDragged(true);
  //     }
  //     if (isDragging && trackRef.current) {
  //       const bounds = trackRef.current.getBoundingClientRect();
  //       updatePosition(clientX, bounds);
  //       setIsDragged(true);
  //     }
  //   },
  //   [initialX, isDragging, isMouseDown]
  // );
  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
      // console.log("handleMouseMove", isMouseDown, isDragging);
      if ("touches" in event) {
        // if (isMouseDown && event.touches[0].clientX !== initialX && !isDragging) {
        if (isTouchDown && event.touches[0].clientX !== initialX && !isDragging) {
          setIsDragging(true);
          console.log("handleToucheMove", event.touches[0].clientX);

          // drag start
          setDialTransition("left 0.3s ease-out");

          if (trackRef.current) {
            const bounds = trackRef.current.getBoundingClientRect();
            updatePosition(event.touches[0].clientX, bounds);
          }


          setTimeout(() => {
            setDialTransition("none");
          }, 300);

          setIsDragged(true);
        }
        if (isDragging && trackRef.current) {
          const bounds = trackRef.current.getBoundingClientRect();
          updatePosition(event.touches[0].clientX, bounds);
          setIsDragged(true);
        }
      } else {

        if (isMouseDown && event.clientX !== initialX && !isDragging) {
          setIsDragging(true);
          console.log("handleMouseMove", event.clientX);

          // drag start
          setDialTransition("left 0.3s ease-out");

          if (trackRef.current) {
            const bounds = trackRef.current.getBoundingClientRect();
            updatePosition(event.clientX, bounds);
          }


          setTimeout(() => {
            setDialTransition("none");
          }, 300);

          setIsDragged(true);
        }
        if (isDragging && trackRef.current) {
          const bounds = trackRef.current.getBoundingClientRect();
          updatePosition(event.clientX, bounds);
          setIsDragged(true);
        }
      }
    },
    [initialX, isDragging, isMouseDown, isTouchDown]
  );

  // const handleDragStart = useCallback(
  //   (clientX: number) => {
  //     if (isExpanded) {
  //       setIsDragging(true);
  //       setDialTransition("left 0.3s ease-in-out");

  //       if (trackRef.current) {
  //         const bounds = trackRef.current.getBoundingClientRect();
  //         updatePosition(clientX, bounds);
  //       }

  //       // Remove the transition after 300ms
  //       setTimeout(() => {
  //         setDialTransition("none");
  //       }, 300);
  //     }
  //   },
  //   [isExpanded]
  // );

  // const handleDragMove = useCallback(
  //   (clientX: number) => {
  //     if (isDragging && trackRef.current) {
  //       const bounds = trackRef.current.getBoundingClientRect();
  //       updatePosition(clientX, bounds);
  //     }
  //   },
  //   [isDragging]
  // );

  // const handleDragEnd = useCallback(() => {
  //   setIsDragging(false);
  // }, []);

  // const toggleExpandCollapse = useCallback(() => {
  //   if (!isDragging) {
  //     setIsExpanded((prev) => !prev);
  //   }
  // }, [isDragging]);

  useEffect(() => {
    if (isExpanded) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [isExpanded, onExpand, onCollapse]);

  // useEffect(() => {
  //   const handleGlobalMouseUp = () => {
  //     if (isDragging) {
  //       handleDragEnd();
  //     }
  //   };

  //   window.addEventListener("mouseup", handleGlobalMouseUp);
  //   window.addEventListener("touchend", handleGlobalMouseUp);

  //   return () => {
  //     window.removeEventListener("mouseup", handleGlobalMouseUp);
  //     window.removeEventListener("touchend", handleGlobalMouseUp);
  //   };
  // }, [isDragging, handleDragEnd]);

  useOnClickOutside(trackRef, () => {
    if (!isDragging && isExpanded) {
      setIsExpanded(false);
    }
  });

  return (
    <div
      className={`tuner ${isExpanded ? "expanded" : ""}`}
      onMouseDown={(event) => handleDown(event)}
      onMouseUp={(event) => handleUp(event)}
      onMouseMove={(event) => handleMove(event)}
      onTouchStart={(event) => handleDown(event)}
      onTouchMove={(event) => handleMove(event)}
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
              top: isExpanded ? "6.5vh" : "0vh", // Animate top position
              height: isExpanded ? "48%" : "100%", // Animate height
              transition: isAnimating
                ? "left 0.3s ease-in-out, top 0.3s ease-in-out, height 0.3s ease-in-out"
                : dialTransition, // Use dynamic transitions
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
