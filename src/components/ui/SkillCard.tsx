import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Skill } from '@/data/portfolioData';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon;
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="text-center p-4 hover:shadow-xl transition-shadow duration-300 bg-card h-full flex flex-col justify-center items-center group transform hover:scale-105">
            <CardContent className="flex flex-col items-center justify-center gap-2 pt-6">
              <Icon className="h-10 w-10 text-primary mb-1 transition-transform group-hover:scale-110" />
              <p className="text-sm font-medium text-foreground">{skill.name}</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        {skill.description && (
          <TooltipContent side="bottom" className="max-w-xs text-center">
            <p>{skill.description}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
