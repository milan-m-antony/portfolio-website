
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Ensure TimelineEvent type used here matches what TimelineSection provides.
// For now, we'll assume event.iconName is a string and try to map it.
import type { TimelineEvent as PortfolioTimelineEvent } from '@/data/portfolioData'; // This has strict iconName
import type { TimelineEvent as SupabaseTimelineEvent } from '@/types/supabase'; // This has iconName as string
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Briefcase, Award, GraduationCap, Laptop, Star, type LucideIcon, HelpCircle } from 'lucide-react'; // Added HelpCircle for fallback

// This map uses specific string keys expected from the database or mapping logic
const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Briefcase,
  Award,
  GraduationCap,
  Laptop,
  Star,
  // Add other explicit icon names you use in your DB here if they differ from Lucide export names
};

interface TimelineItemProps {
  event: SupabaseTimelineEvent; // Changed to use SupabaseTimelineEvent which has iconName: string
  isLeft: boolean;
}

export default function TimelineItem({ event, isLeft }: TimelineItemProps) {
  // Resolve the icon component safely
  let ResolvedIconComponent: LucideIcon = iconMap[event.iconName] || HelpCircle; // Default to HelpCircle if not found
  if (typeof ResolvedIconComponent !== 'function') { // Double check if lookup failed badly
    ResolvedIconComponent = HelpCircle;
  }


  const colors = {
    work: 'bg-blue-500',
    education: 'bg-green-500',
    certification: 'bg-yellow-500',
    milestone: 'bg-purple-500',
    default: 'bg-gray-500', // Default color if type is unexpected
  };
  const typeColor = colors[event.type as keyof typeof colors] || colors.default;


  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
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
