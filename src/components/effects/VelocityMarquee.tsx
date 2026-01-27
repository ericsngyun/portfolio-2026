"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, Observer } from "@/hooks/useGsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface VelocityMarqueeProps {
    /** Text to display in the marquee */
    text?: string;
    /** Base speed in pixels per second */
    baseSpeed?: number;
    /** Maximum speed multiplier when scrolling fast */
    maxSpeedMultiplier?: number;
    /** Maximum skew angle in degrees */
    maxSkew?: number;
    /** Additional className */
    className?: string;
    /** Direction of marquee movement */
    direction?: "left" | "right";
    /** Stroke width for outlined text */
    strokeWidth?: number;
}

/**
 * VelocityMarquee - Scroll-velocity-aware marquee
 * Speed and skew dynamically respond to scroll velocity
 * Editorial light-mode styling with Syne font
 */
export function VelocityMarquee({
    text = "DESIGN & ENGINEERING",
    baseSpeed = 30,
    maxSpeedMultiplier = 6,
    maxSkew = 10,
    className,
    direction = "left",
    strokeWidth = 1.5,
}: VelocityMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const [currentSkew, setCurrentSkew] = useState(0);

    // Refs for animation state
    const xRef = useRef(0);
    const velocityRef = useRef(0);
    const targetSpeedRef = useRef(baseSpeed);
    const targetSkewRef = useRef(0);

    useEffect(() => {
        if (prefersReducedMotion || !marqueeRef.current) return;

        // GSAP Observer for scroll velocity
        const observer = Observer.create({
            target: window,
            type: "scroll,wheel,touch",
            onChangeY: (self) => {
                const velocity = self.velocityY || 0;
                const absVelocity = Math.abs(velocity);

                // Calculate target speed based on velocity
                const speedMultiplier = gsap.utils.clamp(
                    1,
                    maxSpeedMultiplier,
                    1 + (absVelocity / 500) * (maxSpeedMultiplier - 1)
                );
                targetSpeedRef.current = baseSpeed * speedMultiplier;

                // Calculate skew based on velocity direction and magnitude
                const skewAmount = gsap.utils.clamp(
                    -maxSkew,
                    maxSkew,
                    (velocity / 1000) * maxSkew
                );
                targetSkewRef.current = skewAmount;
            },
        });

        // Animation loop
        let rafId: number;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            if (!marqueeRef.current) return;

            // Lerp speed towards target (with decay back to base)
            const speedLerp = 0.05;
            velocityRef.current +=
                (targetSpeedRef.current - velocityRef.current) * speedLerp;

            // Decay target speed back to base
            targetSpeedRef.current +=
                (baseSpeed - targetSpeedRef.current) * 0.02;

            // Lerp skew towards target
            const skewLerp = 0.08;
            const newSkew =
                currentSkew + (targetSkewRef.current - currentSkew) * skewLerp;

            // Decay target skew back to 0
            targetSkewRef.current *= 0.95;

            // Update position
            const moveAmount = velocityRef.current * deltaTime;
            xRef.current += direction === "left" ? -moveAmount : moveAmount;

            // Get single text width for wrapping
            const singleWidth = marqueeRef.current.scrollWidth / 4;

            // Wrap around
            if (direction === "left" && xRef.current <= -singleWidth) {
                xRef.current += singleWidth;
            } else if (direction === "right" && xRef.current >= 0) {
                xRef.current -= singleWidth;
            }

            // Apply transforms
            gsap.set(marqueeRef.current, {
                x: xRef.current,
                skewX: newSkew,
            });

            setCurrentSkew(newSkew);

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            observer.kill();
            cancelAnimationFrame(rafId);
        };
    }, [
        baseSpeed,
        maxSpeedMultiplier,
        maxSkew,
        direction,
        prefersReducedMotion,
        currentSkew,
    ]);

    // Reduced motion fallback
    if (prefersReducedMotion) {
        return (
            <div className={cn("overflow-hidden", className)}>
                <div
                    className="whitespace-nowrap font-[family-name:var(--font-syne)] font-extrabold tracking-[-0.05em] text-[var(--color-border)]"
                    style={{ fontSize: "clamp(4rem, 15vw, 14rem)" }}
                >
                    {text}
                </div>
            </div>
        );
    }

    // Create repeated text for seamless loop with separator
    const repeatedText = Array(4)
        .fill(null)
        .map((_, i) => (
            <span key={i} className="inline-flex items-baseline">
                <span className="px-[0.15em]">{text}</span>
                <span
                    className="mx-[0.3em] text-[0.5em] opacity-30"
                    style={{ fontWeight: 400 }}
                >
                    ✦
                </span>
            </span>
        ));

    return (
        <div
            ref={containerRef}
            className={cn("overflow-hidden select-none", className)}
        >
            <div
                ref={marqueeRef}
                className="inline-flex whitespace-nowrap will-change-transform font-[family-name:var(--font-syne)]"
                style={{
                    fontSize: "clamp(4rem, 15vw, 14rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.85,
                    color: "transparent",
                    WebkitTextStroke: `${strokeWidth}px var(--color-border-strong)`,
                }}
            >
                {repeatedText}
            </div>
        </div>
    );
}

/**
 * Dual-direction velocity marquee for more visual interest
 */
export function DualVelocityMarquee({
    topText = "DESIGN",
    bottomText = "ENGINEERING",
    className,
}: {
    topText?: string;
    bottomText?: string;
    className?: string;
}) {
    return (
        <div className={cn("space-y-[-3vw]", className)}>
            <VelocityMarquee
                text={topText}
                direction="left"
                baseSpeed={25}
                maxSkew={6}
            />
            <VelocityMarquee
                text={bottomText}
                direction="right"
                baseSpeed={20}
                maxSkew={-6}
            />
        </div>
    );
}
