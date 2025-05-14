
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Package as DefaultCategoryIcon } from 'lucide-react'; // Import default icon
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react'; // Import all icons

interface CategoryCardProps {
  name: string;
  iconName: string | null;
  skillCount: number;
  onClick: () => void;
}

export default function CategoryCard({ name, iconName, skillCount, onClick }: CategoryCardProps) {
  let IconComponent: LucideIcon = DefaultCategoryIcon; // Use imported default

  if (iconName) {
    const FoundIcon = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon | undefined;
    if (FoundIcon && typeof FoundIcon === 'function') {
      IconComponent = FoundIcon;
    } else {
      console.warn(`CategoryCard: Lucide icon "${iconName}" not found or is not a valid component. Falling back to default.`);
    }
  }

  return (
    <Card
      className="text-center p-4 hover:shadow-xl transition-shadow duration-300 bg-card cursor-pointer group transform hover:scale-105"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`View skills in ${name} category`}
    >
      <CardHeader className="pb-2">
        <IconComponent className={cn("h-12 w-12 mx-auto mb-3 transition-transform group-hover:scale-110", "text-primary")} />
        <CardTitle className="text-xl font-semibold text-foreground">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{skillCount} skill{skillCount !== 1 ? 's' : ''}</p>
        <div className="flex justify-center mt-3">
          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
