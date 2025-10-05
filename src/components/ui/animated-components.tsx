import { motion, useInView, useAnimation, HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

// Fade in animation variant
export const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

// Scale in animation variant
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

// Slide up animation variant
export const slideUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

// Slide from left variant
export const slideFromLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

// Slide from right variant
export const slideFromRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

// Stagger container variant
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Stagger item variant
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1]
    }
  }
};

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variants?: any;
  delay?: number;
  className?: string;
}

/**
 * Animated section that triggers animations when scrolled into view
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  variants = fadeInVariants,
  delay = 0,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated container with stagger effect for child elements
 */
export const StaggerContainer: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated stagger item
 */
export const StaggerItem: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Hover animation wrapper
 */
interface HoverAnimationProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}

export const HoverAnimation: React.FC<HoverAnimationProps> = ({
  children,
  className = "",
  hoverScale = 1.05,
  hoverY = -5
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Floating animation for elements
 */
export const FloatingElement: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Pulse animation for attention-grabbing elements
 */
export const PulseElement: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};