import { Card, CardContent } from '@/components/ui/card';
import type { Skill } from '@/data/portfolioData';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon;
  return (
    <Card className={cn(
      "text-center p-4 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center group transform hover:scale-105",
      "bg-card/80 backdrop-blur-md" // Enhanced glass/blur effect, slightly more transparent and blurred
    )}>
      <CardContent className="flex flex-col items-center justify-start gap-3 pt-4 sm:pt-5 md:pt-6 flex-grow w-full">
        <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-1 transition-transform group-hover:scale-110" />
        <p className="text-sm sm:text-base font-semibold text-foreground">{skill.name}</p>
        {skill.description && (
          <p className="text-xs text-muted-foreground mt-2 text-center px-1 sm:px-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out h-auto max-h-0 group-hover:max-h-40 overflow-hidden">
            {/* max-h-0 and group-hover:max-h-40 for smooth height transition if needed, combined with opacity */}
            {skill.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
