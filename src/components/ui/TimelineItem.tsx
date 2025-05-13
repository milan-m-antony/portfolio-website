import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TimelineEvent } from '@/data/portfolioData';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: TimelineEvent;
  isLeft: boolean;
}

export default function TimelineItem({ event, isLeft }: TimelineItemProps) {
  const Icon = event.icon;
  const colors = {
    work: 'bg-blue-500',
    education: 'bg-green-500',
    certification: 'bg-yellow-500',
    milestone: 'bg-purple-500',
  };

  return (
    <div className={cn("mb-8 flex justify-between items-center w-full", isLeft ? "flex-row-reverse left-timeline" : "right-timeline")}>
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 shadow-xl w-12 h-12 rounded-full">
        <div className={cn("mx-auto rounded-full w-12 h-12 flex items-center justify-center text-white", colors[event.type])}>
         <Icon className="h-6 w-6" />
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
