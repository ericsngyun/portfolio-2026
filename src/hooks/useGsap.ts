"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

// Use useLayoutEffect on client, useEffect on server (SSR safety)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Creates a GSAP context for managing animations with proper cleanup.
 * Uses useLayoutEffect to avoid React StrictMode double-firing issues.
 */
export function useGsapContext<T extends HTMLElement = HTMLElement>(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(gsap.context(() => {}));
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Hook to create GSAP context with proper cleanup
 */
export function useGsap(
  callback: (ctx: gsap.Context) => void | (() => void),
  scope?: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook to track scroll velocity using GSAP Observer
 * Returns normalized velocity (-1 to 1) and raw velocity
 */
export function useScrollVelocity(options?: {
  maxVelocity?: number;
  smoothing?: number;
}) {
  const { maxVelocity = 1000, smoothing = 0.1 } = options || {};

  const [velocity, setVelocity] = useState(0);
  const [normalizedVelocity, setNormalizedVelocity] = useState(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);

  useIsomorphicLayoutEffect(() => {
    let currentVelocity = 0;

    const observer = Observer.create({
      target: window,
      type: "scroll,wheel,touch",
      onChangeY: (self) => {
        currentVelocity = self.velocityY || 0;
      },
    });

    // Smooth velocity updates via RAF
    const updateVelocity = () => {
      // Lerp towards current velocity
      velocityRef.current += (currentVelocity - velocityRef.current) * smoothing;

      // Decay when no new input
      if (Math.abs(currentVelocity) < 1) {
        velocityRef.current *= 0.95;
      }

      const normalized = gsap.utils.clamp(
        -1,
        1,
        velocityRef.current / maxVelocity
      );

      setVelocity(velocityRef.current);
      setNormalizedVelocity(normalized);

      rafRef.current = requestAnimationFrame(updateVelocity);
    };

    rafRef.current = requestAnimationFrame(updateVelocity);

    return () => {
      observer.kill();
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxVelocity, smoothing]);

  return { velocity, normalizedVelocity };
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger<T extends HTMLElement = HTMLElement>(
  config: ScrollTrigger.Vars,
  deps: React.DependencyList = []
) {
  const ref = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      ...config,
    });

    return () => {
      triggerRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Create a timeline with proper cleanup
 */
export function useTimeline(
  config?: gsap.TimelineVars,
  deps: React.DependencyList = []
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useIsomorphicLayoutEffect(() => {
    timelineRef.current = gsap.timeline(config);

    return () => {
      timelineRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return timelineRef;
}

export { gsap, ScrollTrigger, Observer };
