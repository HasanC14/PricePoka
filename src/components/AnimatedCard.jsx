import * as React from "react";
import { motion } from "framer-motion";

const AnimatedCard = React.forwardRef(
  ({ className, hoverScale = 1.03, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`${className}`}
        whileHover={{ scale: hoverScale, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };
