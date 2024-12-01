import React, { useState } from "react";
import { motion } from "framer-motion";

const Card: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="w-full max-w-xs md:max-w-sm lg:max-w-md p-4 bg-white shadow-lg rounded-lg cursor-pointer transition-all duration-300"
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ scale: 1 }}
      animate={{ scale: isExpanded ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Image or Main Content */}
      <motion.div
        className="h-48 md:h-56 lg:h-64 bg-blue-500 rounded"
        layout
        initial={{ opacity: 0.8 }}
        animate={{ opacity: isExpanded ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      />

      {/* Text Content */}
      <motion.div
        className="mt-4 text-center text-gray-800 text-sm md:text-base lg:text-lg"
        layout
        initial={{ y: 20 }}
        animate={{ y: isExpanded ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded ? "Expanded State with more details" : "Default State"}
      </motion.div>

      {/* Action Buttons (Optional) */}
      <motion.div
        className="mt-4 flex justify-center space-x-4"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded && (
          <>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Action 1
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
              Action 2
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Card;
