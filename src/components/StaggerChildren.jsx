import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export function StaggerChildren({
  children,
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  distance = 30,
  duration = 0.5,
  className = "",
  threshold = 0.1,
}) {
  const controls = useAnimation();
  const ref = useRef(null);

  // Set up variants based on direction
  const getDirectionalVariants = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: staggerDelay,
        },
      },
    };

    const childVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration } },
    };

    switch (direction) {
      case "up":
        childVariants.hidden = { ...childVariants.hidden, y: distance };
        childVariants.visible = { ...childVariants.visible, y: 0 };
        break;
      case "down":
        childVariants.hidden = { ...childVariants.hidden, y: -distance };
        childVariants.visible = { ...childVariants.visible, y: 0 };
        break;
      case "left":
        childVariants.hidden = { ...childVariants.hidden, x: distance };
        childVariants.visible = { ...childVariants.visible, x: 0 };
        break;
      case "right":
        childVariants.hidden = { ...childVariants.hidden, x: -distance };
        childVariants.visible = { ...childVariants.visible, x: 0 };
        break;
      default:
        break;
    }

    return { containerVariants, childVariants };
  };

  const { containerVariants, childVariants } = getDirectionalVariants();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
