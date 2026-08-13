'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { InstructorCard } from './instructor-card';
import type { ResolvedInstructor } from '@/types';

interface InstructorCarouselProps {
  instructors: ResolvedInstructor[];
  prevLabel: string;
  nextLabel: string;
}

export function InstructorCarousel({ instructors, prevLabel, nextLabel }: InstructorCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  return (
    <div className="relative sm:px-14">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {instructors.map((instructor) => (
          <div
            key={instructor.slug}
            className="w-[85%] flex-shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <InstructorCard instructor={instructor} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label={prevLabel}
        className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-md hover:bg-surface-muted sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label={nextLabel}
        className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-md hover:bg-surface-muted sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
