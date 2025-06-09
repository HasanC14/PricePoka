import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.5,
  once = true,
  className = "",
  threshold = 0.1,
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Set up variants based on direction
  const getDirectionalVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay } },
    };

    switch (direction) {
      case "up":
        variants.hidden = { ...variants.hidden, y: distance };
        variants.visible = { ...variants.visible, y: 0 };
        break;
      case "down":
        variants.hidden = { ...variants.hidden, y: -distance };
        variants.visible = { ...variants.visible, y: 0 };
        break;
      case "left":
        variants.hidden = { ...variants.hidden, x: distance };
        variants.visible = { ...variants.visible, x: 0 };
        break;
      case "right":
        variants.hidden = { ...variants.hidden, x: -distance };
        variants.visible = { ...variants.visible, x: 0 };
        break;
      default:
        break;
    }

    return variants;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          controls.start("visible");
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsInView(false);
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
  }, [controls, once, threshold]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getDirectionalVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
