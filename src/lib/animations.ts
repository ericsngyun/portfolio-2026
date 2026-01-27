import type { Variants, Transition } from "motion/react";

// ============================================
// EASING CURVES
// ============================================

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  smoothOut: [0, 0, 0.2, 1] as const,
  smoothIn: [0.4, 0, 1, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.5, 1.5, 0.5, 1] as const,
  expo: [0.87, 0, 0.13, 1] as const,
};

// ============================================
// DURATION TOKENS
// ============================================

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0,
};

// ============================================
// STAGGER CONFIGS
// ============================================

export const stagger = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
  slower: 0.1,
};

// ============================================
// BASE TRANSITIONS
// ============================================

export const transitions = {
  smooth: {
    duration: durations.normal,
    ease: easings.smooth,
  } satisfies Transition,

  smoothSlow: {
    duration: durations.slow,
    ease: easings.smooth,
  } satisfies Transition,

  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } satisfies Transition,

  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 20,
  } satisfies Transition,

  springGentle: {
    type: "spring",
    stiffness: 150,
    damping: 20,
  } satisfies Transition,

  magnetic: {
    type: "spring",
    stiffness: 150,
    damping: 15,
  } satisfies Transition,
};

// ============================================
// ANIMATION VARIANTS
// ============================================

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smoothSlow,
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smoothSlow,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smoothSlow,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smoothSlow,
  },
};

// Scale animations
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

// Slide animations
export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: transitions.smoothSlow,
  },
};

export const slideDown: Variants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: transitions.smoothSlow,
  },
};

// Clip-path reveal animations
export const clipRevealLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
};

export const clipRevealRight: Variants = {
  hidden: { clipPath: "inset(0 0 0 100%)" },
  visible: {
    clipPath: "inset(0 0 0 0%)",
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
};

export const clipRevealDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
};

export const clipRevealCenter: Variants = {
  hidden: { clipPath: "inset(50% 50% 50% 50%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: durations.slower,
      ease: easings.expo,
    },
  },
};

// ============================================
// CONTAINER VARIANTS (for staggered children)
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// LETTER ANIMATION VARIANTS
// ============================================

export const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.fast,
    },
  },
};

export const letterFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
};

export const letterSlideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.expo,
    },
  },
};

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easings.smoothIn,
    },
  },
};

export const pageSlide: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: durations.fast,
      ease: easings.smoothIn,
    },
  },
};

// ============================================
// HOVER VARIANTS
// ============================================

export const hoverScale = {
  scale: 1.05,
  transition: transitions.spring,
};

export const hoverLift = {
  y: -5,
  transition: transitions.spring,
};

export const tapScale = {
  scale: 0.98,
};

// ============================================
// SCROLL-TRIGGERED VIEWPORT CONFIG
// ============================================

export const viewportOnce = {
  once: true,
  margin: "-100px" as const,
};

export const viewportRepeat = {
  once: false,
  margin: "-100px" as const,
};

export const viewportEager = {
  once: true,
  margin: "-50px" as const,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a stagger container with custom timing
 */
export function createStaggerContainer(
  staggerDelay: number = stagger.normal,
  initialDelay: number = 0
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/**
 * Creates a fade animation with custom values
 */
export function createFade(
  from: { x?: number; y?: number; scale?: number } = {},
  duration: number = durations.normal
): Variants {
  return {
    hidden: { opacity: 0, ...from },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: easings.smooth,
      },
    },
  };
}

/**
 * Creates a delayed variant
 */
export function withDelay(variants: Variants, delay: number): Variants {
  const result: Variants = {};
  for (const key in variants) {
    const variant = variants[key];
    if (typeof variant === "object" && variant !== null) {
      result[key] = {
        ...variant,
        transition: {
          ...(typeof variant === "object" && "transition" in variant
            ? (variant.transition as Transition)
            : {}),
          delay,
        },
      };
    } else {
      result[key] = variant;
    }
  }
  return result;
}
