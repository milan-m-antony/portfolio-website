
// src/components/ui/SkillCard.tsx
import * as LucideIcons from 'lucide-react'; // Keep this for dynamic primary icon
import { Card, CardContent } from '@/components/ui/card';
import type { Skill } from '@/types/supabase';
import { cn } from '@/lib/utils';
import React from 'react'; // Explicitly import React for React.ElementType and SVGProps

interface SkillCardProps {
  skill: Skill;
}

// A very simple hardcoded SVG to use as an ultimate fallback for skills.
const DefaultSkillSvgFallback = (props: React.SVGProps<SVGSVGElement>) => (
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
    {/* Simple representation of a chip or abstract skill icon */}
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);


export default function SkillCard({ skill }: SkillCardProps) {
  let IconComponent: React.ElementType = DefaultSkillSvgFallback; // Default to hardcoded SVG

  if (skill.iconName && typeof skill.iconName === 'string' && skill.iconName.trim() !== '') {
    const FoundIcon = LucideIcons[skill.iconName as keyof typeof LucideIcons];
    if (FoundIcon && typeof FoundIcon === 'function') {
      IconComponent = FoundIcon;
    } else {
      console.warn(
        `SkillCard: Lucide icon named "${skill.iconName}" for skill "${skill.name}" not found or is not a function. Using hardcoded SVG fallback.`
      );
      // IconComponent remains DefaultSkillSvgFallback
    }
  } else {
    // If iconName is empty, null, or undefined, log it and use the fallback.
     console.warn(
        `SkillCard: No iconName provided for skill "${skill.name}". Using hardcoded SVG fallback.`
      );
     // IconComponent remains DefaultSkillSvgFallback
  }


  return (
    <Card className={cn(
      "text-center p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center group transform hover:scale-105",
      "bg-card/80 backdrop-blur-md"
    )}>
      <CardContent className="flex flex-col items-center justify-start gap-3 pt-4 sm:pt-5 md:pt-6 flex-grow w-full">
        <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-1 transition-transform group-hover:scale-110" />
        <p className="text-sm sm:text-base font-semibold text-foreground">{skill.name}</p>
        {skill.description && (
          <p className="text-xs text-muted-foreground mt-2 text-center px-1 sm:px-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out h-auto max-h-0 group-hover:max-h-40 overflow-hidden">
            {skill.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
