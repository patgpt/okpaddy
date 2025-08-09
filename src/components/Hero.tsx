"use client";

import { animations } from "@/animations";
import { cn } from "@/utils/cn";
import { motion, useReducedMotion } from "motion/react";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const neonAnimate = prefersReducedMotion
    ? {
        textShadow:
          "0 0 10px var(--color-primary), 0 0 6px var(--color-accent)",
      }
    : animations.neonTextPulse.animate; // TODO: No Pulsing. just make it's a static neon shadow

  return (
    <section className="relative isolate flex min-h-[75dvh] items-center justify-center overflow-hidden">
      {/* Full-bleed subtle gradient layer using theme tokens; animate with GPU-friendly transforms */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          inset: "-10%", // overscan to avoid edges on translate/rotate
          willChange: "transform",
          backgroundImage:
            `radial-gradient(110% 70% at 20% 25%, color-mix(in oklch, var(--color-primary) 24%, transparent), transparent 60%),` +
            `radial-gradient(110% 70% at 80% 75%, color-mix(in oklch, var(--color-accent) 18%, transparent), transparent 60%),` +
            `radial-gradient(140% 90% at 50% 50%, color-mix(in oklch, var(--color-primary) 50%, var(--color-accent) 50%) 10%, transparent 70%)`,
        }}
        initial={animations.floatSlow.initial}
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, rotate: 0 }
            : animations.floatSlow.animate
        }
      />

      {/* Global frosted veil; base-100 to keep theme-aware, keep opacity low so gradient reads */}
      <div className="bg-base-100/30 pointer-events-none absolute inset-0 z-10 backdrop-blur-xl" />

      {/* Centered content, no container box */}
      <div className="relative z-20 mx-auto w-full px-6 py-16 text-center">
        <motion.h1
          className={cn(
            "text-base-content font-sans tracking-tight",
            "text-5xl sm:text-7xl md:text-8xl lg:text-9xl",
          )}
          initial={animations.blurInUp.initial}
          animate={animations.blurInUp.animate}
        >
          Patrick Kelly
        </motion.h1>

        <motion.p
          className={cn(
            "mt-6 text-sm opacity-85 sm:text-base md:text-lg",
            "[text-shadow:0_0_0_var(--color-primary),0_0_0_var(--color-accent)]",
          )}
          initial={animations.neonTextPulse.initial}
          animate={neonAnimate}
        >
          UX Specialist · Game Developer · Software Engineer
        </motion.p>
      </div>
    </section>
  );
}
