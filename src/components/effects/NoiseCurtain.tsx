"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NoiseCurtainProps {
    /** Whether the curtain is visible/animating */
    isActive?: boolean;
    /** Duration of the slide animation in seconds */
    duration?: number;
    /** Callback when animation completes */
    onComplete?: () => void;
}

/**
 * NoiseCurtain - Full-screen static/noise transition overlay
 * Creates a TV-static effect that slides down during page transitions
 */
export function NoiseCurtain({
    isActive = false,
    duration = 0.8,
    onComplete,
}: NoiseCurtainProps) {
    const prefersReducedMotion = useReducedMotion();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    // Generate noise pattern on canvas
    useEffect(() => {
        if (!canvasRef.current || prefersReducedMotion) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = 256;
        const height = 256;
        canvas.width = width;
        canvas.height = height;

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        const generateNoise = () => {
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value; // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 255; // A
            }
            ctx.putImageData(imageData, 0, 0);

            if (isActive) {
                animationRef.current = requestAnimationFrame(generateNoise);
            }
        };

        if (isActive) {
            generateNoise();
        }

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [isActive, prefersReducedMotion]);

    if (prefersReducedMotion) {
        return null;
    }

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isActive && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{
                        duration,
                        ease: [0.76, 0, 0.24, 1], // Custom ease for dramatic effect
                    }}
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    style={{
                        background: "#0A0A0B",
                    }}
                >
                    {/* Noise texture */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full opacity-20"
                        style={{
                            imageRendering: "pixelated",
                            mixBlendMode: "overlay",
                        }}
                    />

                    {/* Scan lines */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.3) 2px,
                rgba(0, 0, 0, 0.3) 4px
              )`,
                        }}
                    />

                    {/* CRT flicker effect */}
                    <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.03, 0, 0.02, 0],
                        }}
                        transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Hook to manage noise curtain transitions
 */
export function useNoiseCurtain() {
    const [isActive, setIsActive] = useState(false);

    const trigger = () => {
        setIsActive(true);
    };

    const complete = () => {
        setIsActive(false);
    };

    return {
        isActive,
        trigger,
        complete,
        NoiseCurtainComponent: () => (
            <NoiseCurtain isActive={isActive} onComplete={complete} />
        ),
    };
}
