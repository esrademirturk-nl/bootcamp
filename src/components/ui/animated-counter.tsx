'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = '', duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return value;
    }
    return 0;
  });
  const hasAnimated = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion varsa başlangıç state'i zaten doğru ayarlandı, bir şey yapmaya gerek yok
    if (prefersReducedMotion) {
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    function animateCount() {
      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        setDisplayValue(Math.round(eased * value));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {displayValue}
      {suffix}
    </span>
  );
}
