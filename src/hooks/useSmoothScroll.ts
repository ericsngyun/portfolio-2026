"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface UseLenisOptions {
  /** Duration of the scroll animation */
  duration?: number;
  /** Scroll orientation */
  orientation?: "vertical" | "horizontal";
  /** Enable smooth scrolling */
  smoothWheel?: boolean;
  /** Wheel multiplier */
  wheelMultiplier?: number;
  /** Touch multiplier */
  touchMultiplier?: number;
}

/**
 * Hook to initialize and control Lenis smooth scroll
 */
export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      orientation: options.orientation ?? "vertical",
      gestureOrientation: "vertical",
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
      touchMultiplier: options.touchMultiplier ?? 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setIsReady(true);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [
    options.duration,
    options.orientation,
    options.smoothWheel,
    options.wheelMultiplier,
    options.touchMultiplier,
  ]);

  return {
    lenis: lenisRef.current,
    isReady,
    scrollTo: (target: string | number | HTMLElement, options?: object) => {
      lenisRef.current?.scrollTo(target, options);
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };
}

/**
 * Hook to get current scroll progress (0-1)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrollY(scrollTop);
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { progress, scrollY };
}

/**
 * Hook to detect scroll direction
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY.current;

      setDirection(isScrollingDown ? "down" : "up");
      setIsAtTop(scrollY < 10);
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { direction, isAtTop };
}
