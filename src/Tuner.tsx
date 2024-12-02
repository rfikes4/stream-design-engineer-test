import { useEffect, useState, useRef } from "react";
// import { useOnClickOutside } from "usehooks-ts";
// import { motion, PanInfo } from "framer-motion";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

// Define props for the Tuner component
interface TunerProps {
  onExpand: () => void;
  onCollapse: () => void;
}

const Tuner: React.FC<TunerProps> = ({ onExpand, onCollapse }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false); // Tuner expanded state
  const [tunerPosition, setTunerPosition] = useState(50); // Tuner red line position (percentage)

  // const minFrequency = 88.0; // Minimum radio frequency
  // const maxFrequency = 108.0; // Maximum radio frequency

  // Calculate the current radio station frequency
  // const getFrequency = (): string =>
  //   (minFrequency + (maxFrequency - minFrequency) * (tunerPosition / 100)).toFixed(1);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newPosition = Math.max(0, Math.min(100, tunerPosition + info.delta.x));
    setTunerPosition(newPosition);
  };

  const handleMouseDown = () => {
    setExpanded(true);
    onExpand();
  };

  const handleMouseUp = () => {
    setExpanded(false);
    onCollapse();
  };


  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  // function submit() {
  //   setFormState("loading");
  //   setTimeout(() => {
  //     setFormState("success");
  //   }, 1500);

  //   setTimeout(() => {
  //     setOpen(false);
  //   }, 3300);
  // }

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => { // Specify type here
  //     if (event.key === "Escape") {
  //       setOpen(false);
  //     }

  //     if (
  //       (event.ctrlKey || event.metaKey) &&
  //       event.key === "Enter" &&
  //       open &&
  //       formState === "idle"
  //     ) {
  //       submit();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [open, formState]);

  return (
    // <div>
    //   <motion.div
    //     className="w-64 p-4 bg-white shadow-lg rounded-lg cursor-pointer"
    //     // onClick={() => setIsExpanded(!isExpanded)}
    //     onMouseDown={() => setIsExpanded(true)}
    //     onMouseUp={() => setIsExpanded(false)}
    //     initial={{ scale: 1 }}
    //     animate={{ scale: isExpanded ? 1.1 : 1 }}
    //     transition={{ type: "spring", bounce: 0.35 }}
    //   // transition={{ type: "spring", stiffness: 200 }}
    //   >
    //     <motion.div
    //       className="h-40 bg-blue-500 rounded"
    //       layout
    //       initial={{ opacity: 0.8 }}
    //       animate={{ opacity: isExpanded ? 1 : 0.8 }}
    //       transition={{ duration: 0.15 }}
    //     />
    //     <motion.div
    //       className="mt-4 text-center text-gray-800"
    //       layout
    //       initial={{ y: 20 }}
    //       animate={{ y: isExpanded ? 0 : 20 }}
    //       transition={{ duration: 0.15 }}
    //     >
    //       {isExpanded ? "Expanded State" : "Default State"}
    //     </motion.div>
    //   </motion.div>
    // </div>
    <div className="feedback-wrapper">
      <motion.button
        layoutId="wrapper"
        onClick={() => {
          setOpen(true);
          setFormState("idle");
          setFeedback("");
        }}
        key="button"
        className="feedback-button"
        style={{ borderRadius: 8 }}
      >
        <motion.span layoutId="title">Feedback</motion.span>
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="wrapper"
            className="feedback-popover"
            ref={ref}
            style={{ borderRadius: 12 }}
          >
            <motion.span
              aria-hidden
              className="placeholder"
              layoutId="title"
              data-success={formState === "success" ? "true" : "false"}
              data-feedback={feedback ? "true" : "false"}
            >
              Feedback
            </motion.span>
            <AnimatePresence mode="popLayout">
              <motion.form
                exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  // if (!feedback) return;
                  // submit();
                }}
                className="feedback-form"
              >
                <textarea
                  autoFocus
                  placeholder="Feedback"
                  onChange={(e) => setFeedback(e.target.value)}
                  className="textarea"
                  required
                />
                <div className="feedback-footer">
                  <button type="submit" className="submit-button">
                    <span>Send feedback</span>
                  </button>
                </div>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Tuner;
