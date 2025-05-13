import { Card, CardContent } from '@/components/ui/card';
import type { Skill } from '@/data/portfolioData';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon;
  return (
    <Card className="text-center p-4 hover:shadow-lg transition-shadow duration-300 bg-card">
      <CardContent className="flex flex-col items-center justify-center gap-3 pt-6">
        <Icon className="h-10 w-10 text-primary mb-2" />
        <p className="text-sm font-medium text-foreground">{skill.name}</p>
      </CardContent>
    </Card>
  );
}
