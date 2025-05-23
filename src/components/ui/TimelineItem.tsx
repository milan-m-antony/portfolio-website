// src/components/ui/TimelineItem.tsx
"use client"; // Add this directive

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TimelineEvent as SupabaseTimelineEvent } from '@/types/supabase';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react'; // For dynamic primary icon
import React from 'react'; // For React.ElementType

// A very simple hardcoded SVG to use as an ultimate fallback for timeline items.
const DefaultTimelineSvgFallback = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Simple star icon */}
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

interface TimelineItemProps {
  event: SupabaseTimelineEvent;
  isLeft: boolean;
}

export default function TimelineItem({ event, isLeft }: TimelineItemProps) {
  let IconComponent: React.ElementType = DefaultTimelineSvgFallback; // Default to hardcoded SVG

  if (event.iconName && typeof event.iconName === 'string' && event.iconName.trim() !== '') {
    const FoundIcon = LucideIcons[event.iconName as keyof typeof LucideIcons];
    if (FoundIcon && typeof FoundIcon === 'function') {
      IconComponent = FoundIcon;
    } else {
      console.warn(
        `TimelineItem: Lucide icon named "${event.iconName}" for event "${event.title}" not found or is not a function. Using hardcoded SVG fallback.`
      );
      // IconComponent remains DefaultTimelineSvgFallback
    }
  } else {
    console.warn(
        `TimelineItem: No iconName provided for event "${event.title}". Using hardcoded SVG fallback.`
    );
    // IconComponent remains DefaultTimelineSvgFallback
  }

  const colors = {
    work: 'bg-blue-500',
    education: 'bg-green-500',
    certification: 'bg-yellow-500',
    milestone: 'bg-purple-500',
    default: 'bg-gray-500',
  };
  const typeColor = colors[event.type as keyof typeof colors] || colors.default;

  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    const currentRef = itemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Final check to render a placeholder if IconComponent is still not a function
  // This scenario is highly unlikely if DefaultTimelineSvgFallback is correctly defined
  if (typeof IconComponent !== 'function') {
    console.error(`TimelineItem Critical Error: IconComponent for event "${event.title}" is still not a function. This should not happen if DefaultTimelineSvgFallback is valid.`);
    IconComponent = DefaultTimelineSvgFallback; // Ensure it's always a function
  }


  return (
    <div
      ref={itemRef}
      className={cn(
        "mb-8 flex justify-between items-center w-full",
        isLeft ? "flex-row-reverse left-timeline" : "right-timeline",
        isVisible ? 'animate-fadeIn' : 'opacity-0 translate-y-5' // Apply animation classes based on visibility
      )}
      style={{ transition: 'opacity 0.5s ease-out, transform 0.5s ease-out', animationDelay: isVisible ? '0s': '0.2s' }} // Added inline transition for smoother effect
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 shadow-xl w-12 h-12 rounded-full">
        <div className={cn("mx-auto rounded-full w-12 h-12 flex items-center justify-center text-white", typeColor)}>
         <IconComponent className="h-6 w-6" />
        </div>
      </div>
      <div className={cn("order-1 rounded-lg shadow-xl w-5/12 px-6 py-4", isLeft ? "bg-secondary" : "bg-card")}>
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="p-0 pb-2">
            <p className="text-sm text-muted-foreground">{event.date}</p>
            <CardTitle className="text-lg font-semibold text-foreground">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm text-foreground/80">{event.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
