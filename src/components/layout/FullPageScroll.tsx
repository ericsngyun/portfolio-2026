"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Section {
  id: string;
  label: string;
}

interface FullPageScrollContextType {
  currentSection: number;
  totalSections: number;
  scrollToSection: (index: number) => void;
  sections: Section[];
}

const FullPageScrollContext = createContext<FullPageScrollContextType | null>(
  null
);

export function useFullPageScroll() {
  const context = useContext(FullPageScrollContext);
  if (!context) {
    throw new Error(
      "useFullPageScroll must be used within a FullPageScrollProvider"
    );
  }
  return context;
}

interface FullPageScrollProviderProps {
  children: ReactNode;
  sections: Section[];
}

export function FullPageScrollProvider({
  children,
  sections,
}: FullPageScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const scrollToSection = useCallback(
    (index: number) => {
      if (
        isScrolling ||
        index < 0 ||
        index >= sections.length ||
        index === currentSection
      ) {
        return;
      }

      setIsScrolling(true);
      setCurrentSection(index);

      // Scroll to section
      const sectionElement = document.getElementById(sections[index].id);
      if (sectionElement) {
        sectionElement.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }

      // Reset scrolling flag after animation
      setTimeout(
        () => {
          setIsScrolling(false);
        },
        prefersReducedMotion ? 100 : 1000
      );
    },
    [currentSection, isScrolling, sections, prefersReducedMotion]
  );

  // Handle wheel events for section navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Throttle scroll events
      if (now - lastScrollTime.current < 1000 || isScrolling) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        lastScrollTime.current = now;
        if (delta > 0 && currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (delta < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    // Handle touch events
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1000 || isScrolling) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - touchEndY;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        lastScrollTime.current = now;
        if (delta > 0 && currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (delta < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          scrollToSection(0);
          break;
        case "End":
          e.preventDefault();
          scrollToSection(sections.length - 1);
          break;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSection, sections.length, scrollToSection, isScrolling]);

  return (
    <FullPageScrollContext.Provider
      value={{
        currentSection,
        totalSections: sections.length,
        scrollToSection,
        sections,
      }}
    >
      <div ref={containerRef} className="full-page-container">
        {children}
      </div>
    </FullPageScrollContext.Provider>
  );
}

// Section Wrapper Component
interface PageSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  index: number;
}

export function PageSection({
  children,
  id,
  className = "",
  index,
}: PageSectionProps) {
  const { currentSection } = useFullPageScroll();
  const prefersReducedMotion = useReducedMotion();
  const isActive = currentSection === index;
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.25, 0.1, 0.25, 1] as const,
        },
      });
    }
  }, [isActive, controls, prefersReducedMotion]);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0.3, y: 50 }}
      animate={controls}
      className={`page-section ${className}`}
    >
      {children}
    </motion.section>
  );
}

// Navigation Dots Component
export function SectionIndicator() {
  const { currentSection, totalSections, scrollToSection, sections } =
    useFullPageScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[var(--z-fixed)] hidden lg:flex flex-col items-end gap-4"
      aria-label="Section navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${section.label}`}
          aria-current={currentSection === index ? "true" : undefined}
        >
          {/* Label - appears on hover */}
          <span
            className={`text-xs font-medium tracking-wide transition-all duration-300 ${
              currentSection === index
                ? "opacity-100 text-[var(--color-text-primary)]"
                : "opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)]"
            }`}
          >
            {section.label}
          </span>

          {/* Dot/Line indicator */}
          <span className="relative flex items-center justify-center w-3 h-3">
            <motion.span
              animate={{
                width: currentSection === index ? 24 : 8,
                height: 2,
                backgroundColor:
                  currentSection === index
                    ? "var(--color-text-primary)"
                    : "var(--color-border-strong)",
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="rounded-full"
            />
          </span>
        </button>
      ))}
    </motion.nav>
  );
}
