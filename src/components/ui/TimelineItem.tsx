
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TimelineEvent as SupabaseTimelineEvent } from '@/types/supabase';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Briefcase, Award, GraduationCap, Laptop, Star, type LucideIcon, HelpCircle } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Briefcase,
  Award,
  GraduationCap,
  Laptop,
  Star,
  HelpCircle, // Add HelpCircle to map as a known fallback
};

interface TimelineItemProps {
  event: SupabaseTimelineEvent;
  isLeft: boolean;
}

export default function TimelineItem({ event, isLeft }: TimelineItemProps) {
  let ResolvedIconComponent: LucideIcon | undefined = iconMap[event.iconName];

  if (!ResolvedIconComponent || typeof ResolvedIconComponent !== 'function') {
    console.warn(
      `TimelineItem: Icon name "${event.iconName}" for event "${event.title}" not found in iconMap or is invalid. Falling back to HelpCircle.`
    );
    ResolvedIconComponent = HelpCircle;
  }
  
  // Ultimate fallback check
  if (typeof ResolvedIconComponent !== 'function') {
     console.error(
      `TimelineItem Critical Error: ResolvedIconComponent is still not a function for event "${event.title}" (iconName: "${event.iconName}"). ` +
      `Rendering HelpCircle as ultimate fallback.`
    );
    ResolvedIconComponent = HelpCircle; // Ensure it's always a function
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
        threshold: 0.1,
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
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        "mb-8 flex justify-between items-center w-full",
        isLeft ? "flex-row-reverse left-timeline" : "right-timeline",
        isVisible ? 'animate-fadeIn' : 'opacity-0 translate-y-5'
      )}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 shadow-xl w-12 h-12 rounded-full">
        <div className={cn("mx-auto rounded-full w-12 h-12 flex items-center justify-center text-white", typeColor)}>
         {ResolvedIconComponent && <ResolvedIconComponent className="h-6 w-6" />}
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
