
import { Cpu as ExplicitDefaultSkillIcon, type LucideIcon, HelpCircle } from 'lucide-react'; // Explicit default
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Skill } from '@/types/supabase';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  let IconToShow: LucideIcon = ExplicitDefaultSkillIcon; // Start with a known, explicitly imported default

  if (!ExplicitDefaultSkillIcon) {
    console.error("SkillCard Error: ExplicitDefaultSkillIcon (Cpu) is undefined! Falling back to HelpCircle.");
    IconToShow = HelpCircle; // Ultimate fallback if Cpu is somehow undefined
  }

  if (skill.iconName && typeof skill.iconName === 'string' && skill.iconName.trim() !== '') {
    const FoundIcon = LucideIcons[skill.iconName as keyof typeof LucideIcons] as LucideIcon | undefined;

    if (FoundIcon && typeof FoundIcon === 'function') {
      IconToShow = FoundIcon;
    } else {
      console.warn(
        `SkillCard: Lucide icon "${skill.iconName}" for skill "${skill.name}" not found or is not a valid component. ` +
        `Falling back to default icon (${IconToShow === ExplicitDefaultSkillIcon ? 'Cpu' : 'HelpCircle'}).`
      );
      // IconToShow remains the default (ExplicitDefaultSkillIcon or HelpCircle if ExplicitDefaultSkillIcon was bad)
    }
  } else if (skill.iconName !== null && skill.iconName !== undefined && skill.iconName !== '') {
    // skill.iconName exists but is not a non-empty string after trim, or is not a string at all.
    console.warn(
        `SkillCard: Invalid iconName value for skill "${skill.name}": ${JSON.stringify(skill.iconName)}. ` +
        `Falling back to default icon (${IconToShow === ExplicitDefaultSkillIcon ? 'Cpu' : 'HelpCircle'}).`
    );
    // IconToShow remains the default
  }
  // If skill.iconName is null, undefined, or empty string, IconToShow remains its initialized default.

  // Final check to prevent rendering undefined
  if (typeof IconToShow !== 'function') {
    console.error(
      `SkillCard Critical Error: IconToShow is still not a function for skill "${skill.name}" (iconName: "${skill.iconName}"). ` +
      `Rendering HelpCircle as ultimate fallback.`
    );
    IconToShow = HelpCircle; // Ensure IconToShow is always a function.
  }

  return (
    <Card className={cn(
      "text-center p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center group transform hover:scale-105",
      "bg-card/80 backdrop-blur-md"
    )}>
      <CardContent className="flex flex-col items-center justify-start gap-3 pt-4 sm:pt-5 md:pt-6 flex-grow w-full">
        <IconToShow className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-1 transition-transform group-hover:scale-110" />
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
