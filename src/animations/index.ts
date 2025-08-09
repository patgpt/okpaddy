// Centralized animation presets for motion/react components
// Keep these declarative to reuse across the app

// Motion One easing from Motion MCP spring generator
export const springDuration = 0.55;
export const springEasing =
  "linear(0, 0.2544, 0.6825, 0.9908, 1.1163, 1.1146, 1.0635, 1.0154, 0.9897, 0.9841, 0.9889, 0.9957, 1.0002, 1.0019, 1.0018, 1.0009, 1.0002, 1)";

export const animations = {
  // Text blur-in + rise
  blurInUp: {
    initial: { opacity: 0, y: 16, filter: "blur(12px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: springDuration, easing: springEasing },
    },
  },

  // Soft neon glow that subtly breathes
  neonTextPulse: {
    initial: {
      textShadow: "0 0 0 var(--color-primary), 0 0 0 var(--color-accent)",
    },
    animate: {
      textShadow: "0 0 24px var(--color-primary), 0 0 10px var(--color-accent)",
      transition: {
        duration: 2.4,
        repeat: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      },
    },
  },

  // Subtle transform-based drift for large background layers (GPU-friendly)
  floatSlow: {
    initial: { x: "-5%", y: "-2%", rotate: -1 },
    animate: {
      x: "5%",
      y: "2%",
      rotate: 1,
      transition: {
        duration: 50,
        repeat: Infinity,
        direction: "alternate",
        easing: "linear",
      },
    },
  },
};

export type AnimationPresetKeys = keyof typeof animations;
