import { useState, useRef } from "react";
// import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

interface TunerProps {
  onExpand: () => void;
  onCollapse: () => void;
}

const Tuner: React.FC<TunerProps> = ({ onExpand, onCollapse }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tunerPosition, setTunerPosition] = useState(50); // Red line position percentage
  const ref = useRef(null);

  // Close the tuner when clicking outside
  useOnClickOutside(ref, () => setIsExpanded(false));

  const handleMouseDown = () => {
    setIsExpanded(true);
    onExpand();
  };

  const handleMouseUp = () => {
    setIsExpanded(false);
    onCollapse();
  };

  // const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
  //   const newPosition = Math.max(0, Math.min(100, tunerPosition + info.delta.x));
  //   setTunerPosition(newPosition);
  // };

  return (
    <div className="tuner"
      onMouseDown={handleMouseDown} // Expand on mousedown
      onMouseUp={handleMouseUp} // Collapse on mouseup 
      onMouseLeave={handleMouseUp} // Collapse on mouseleave
    // onClick={() => {
    //   setIsExpanded(!isExpanded);
    // }}
    // onClick={() => {
    //   setIsExpanded(true);
    // }}
    >
      <div className="tuner-wrapper">
        <div className="tuner-stations tuner-fm">
          <em>FM</em>
          <span>88</span>
          <span>92</span>
          <span>96</span>
          <span>100</span>
          <span>104</span>
          <span>107</span>
        </div>
        <div className="tuner-track">
          <div className="knotch-long-wrapper">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={`knotch-long-${i}`}
                className="knotch-long"
              ></span>
            ))}
          </div>
          <div className="knotch-short-wrapper">
            {Array.from({ length: 35 }).map((_, i) => (
              <span
                key={`knotch-short-${i}`}
                className="knotch-short"
              ></span>
            ))}
          </div>
        </div>
        <div className="tuner-dial" style={{ left: `${tunerPosition}%` }}></div>
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
      {/* <motion.div
        layoutId="wrapper"
        // onMouseDown={handleMouseDown} // Expand on mousedown
        // onMouseUp={handleMouseUp} // Collapse on mouseup
        className="tuner-collapsed"
        ref={ref}
      >
        <motion.span layoutId="fm" className="tuner-stations tuner-fm"><em>FM</em> 88 92 96 100 104 107</motion.span>
        <motion.span layoutId="am" className="tuner-stations tuner-am"><em>AM</em> 5.4 06 07 08 10 12 14 16</motion.span>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {isExpanded && (
          <motion.div
            layoutId="wrapper"
            className="tuner-expanded"
            // initial={{ opacity: 0, transform: "scale(0.9)" }}
            // animate={{ opacity: 1, transform: "scale(1)" }}
            // exit={{ opacity: 0, transform: "scale(0.9)" }}
            // transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            transition={{ duration: 0.5 }}
          // onClick={() => {
          //   setIsExpanded(false);
          // }}
          >
            <motion.span layoutId="fm" className="tuner-stations tuner-fm"><em>FM</em> 88 92 96 100 104 107</motion.span>
            <motion.span layoutId="am" className="tuner-stations tuner-am"><em>AM</em> 5.4 06 07 08 10 12 14 16</motion.span>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default Tuner;
