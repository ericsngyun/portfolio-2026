"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionOptions {
  /** Whether to track mouse position */
  enabled?: boolean;
  /** Element to track position relative to (default: window) */
  element?: React.RefObject<HTMLElement>;
}

/**
 * Hook to track mouse position
 * Returns { x, y } coordinates relative to window or specified element
 */
export function useMousePosition(
  options: UseMousePositionOptions = {}
): MousePosition {
  const { enabled = true, element } = options;
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent) => {
      if (element?.current) {
        const rect = element.current.getBoundingClientRect();
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      } else {
        setPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled, element]);

  return position;
}

/**
 * Hook to track mouse position relative to an element's center
 * Useful for magnetic button effects
 */
export function useRelativeMousePosition(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean = true
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!ref.current || !enabled) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setPosition({
        x: event.clientX - centerX,
        y: event.clientY - centerY,
      });
    },
    [ref, enabled]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, enabled, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { position, isHovering };
}

/**
 * Hook for smooth mouse following with lerp
 * Returns interpolated position for smoother animations
 */
export function useSmoothMousePosition(
  lerp: number = 0.1,
  enabled: boolean = true
) {
  const mousePosition = useMousePosition({ enabled });
  const [smoothPosition, setSmoothPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const frameRef = useRef<number>(0);
  const targetRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    targetRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * lerp,
        y: prev.y + (targetRef.current.y - prev.y) * lerp,
      }));
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [lerp, enabled]);

  return smoothPosition;
}
