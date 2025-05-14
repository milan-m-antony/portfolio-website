
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Skill } from '@/types/supabase'; // Use Skill type from supabase
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react'; // Import all icons

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  let IconComponent: LucideIcon = LucideIcons.CpuChip; // Default icon

  if (skill.iconName) {
    const FoundIcon = LucideIcons[skill.iconName as keyof typeof LucideIcons];
    // Check if FoundIcon is a valid React component type (a function)
    if (typeof FoundIcon === 'function') {
      IconComponent = FoundIcon as LucideIcon;
    }
    // If FoundIcon is not a function (e.g., undefined or some other property), IconComponent remains the default CpuChip
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
