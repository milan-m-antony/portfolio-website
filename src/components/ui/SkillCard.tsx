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
      "text-center p-4 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center group transform hover:scale-105",
      "bg-card/90 backdrop-blur-sm" // Added for glass/blur effect with slight transparency
    )}>
      <CardContent className="flex flex-col items-center justify-start gap-3 pt-4 sm:pt-5 md:pt-6 flex-grow w-full"> {/* Adjusted padding and ensure flex-grow */}
        <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-1 transition-transform group-hover:scale-110" />
        <p className="text-sm sm:text-base font-semibold text-foreground">{skill.name}</p>
        {skill.description && (
          <p className="text-xs text-muted-foreground mt-2 text-center px-1 sm:px-2 leading-relaxed">
            {skill.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
