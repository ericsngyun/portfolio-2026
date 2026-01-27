"use client";

import { useRef, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useRelativeMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum distance the button can be pulled */
  distance?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Additional className */
  className?: string;
  /** Click handler */
  onClick?: (e?: React.MouseEvent) => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Element type */
  as?: "button" | "a" | "div";
  /** Link href (when as="a") */
  href?: string;
  /** Link target (when as="a") */
  target?: string;
  /** Link rel (when as="a") */
  rel?: string;
  /** ARIA label */
  "aria-label"?: string;
}

/**
 * MagneticButton - A button with magnetic hover effect
 * The button follows the cursor when hovered, creating a magnetic pull effect
 */
export function MagneticButton({
  children,
  distance = 12,
  stiffness = 150,
  damping = 15,
  className,
  onClick,
  disabled = false,
  as: Component = "button",
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { position, isHovering } = useRelativeMousePosition(
    ref,
    !prefersReducedMotion && !disabled
  );

  // Spring animations for smooth movement
  const springConfig = { stiffness, damping };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  // Calculate the magnetic pull based on cursor position
  const handleMouseMove = () => {
    if (prefersReducedMotion || disabled || !isHovering) {
      x.set(0);
      y.set(0);
      return;
    }

    const maxDistance = distance;
    const distX = Math.min(Math.max(position.x * 0.2, -maxDistance), maxDistance);
    const distY = Math.min(Math.max(position.y * 0.2, -maxDistance), maxDistance);

    x.set(distX);
    y.set(distY);
  };

  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Update position based on hover state
  if (isHovering) {
    handleMouseMove();
  } else if (x.get() !== 0 || y.get() !== 0) {
    handleMouseLeave();
  }

  const commonProps = {
    className: cn(
      "relative inline-flex items-center justify-center",
      "transition-colors",
      disabled && "opacity-50 cursor-not-allowed",
      className
    ),
    onClick: disabled ? undefined : onClick,
    disabled: Component === "button" ? disabled : undefined,
    "aria-label": ariaLabel,
  };

  const linkProps =
    Component === "a"
      ? {
          href: disabled ? undefined : href,
          target,
          rel: target === "_blank" ? rel || "noopener noreferrer" : rel,
        }
      : {};

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
    >
      {Component === "a" ? (
        <a {...commonProps} {...linkProps}>
          {children}
        </a>
      ) : Component === "button" ? (
        <button {...commonProps} type="button">
          {children}
        </button>
      ) : (
        <div {...commonProps}>{children}</div>
      )}
    </motion.div>
  );
}

/**
 * MagneticLink - A link with magnetic hover effect
 * Specialized version for navigation links
 */
interface MagneticLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  distance?: number;
  target?: string;
  "aria-label"?: string;
}

export function MagneticLink({
  children,
  href,
  className,
  distance = 8,
  target,
  "aria-label": ariaLabel,
}: MagneticLinkProps) {
  return (
    <MagneticButton
      as="a"
      href={href}
      target={target}
      distance={distance}
      className={cn("link-hover", className)}
      aria-label={ariaLabel}
    >
      {children}
    </MagneticButton>
  );
}

/**
 * MagneticIconButton - An icon button with magnetic effect
 * Good for social links, close buttons, etc.
 */
interface MagneticIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
  "aria-label": string;
}

export function MagneticIconButton({
  children,
  onClick,
  href,
  target,
  className,
  "aria-label": ariaLabel,
}: MagneticIconButtonProps) {
  return (
    <MagneticButton
      as={href ? "a" : "button"}
      href={href}
      target={target}
      onClick={onClick}
      distance={6}
      stiffness={200}
      damping={20}
      className={cn(
        "p-2 rounded-full",
        "hover:bg-[var(--color-accent-100)]",
        "transition-colors duration-200",
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </MagneticButton>
  );
}
