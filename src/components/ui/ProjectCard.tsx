import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Rocket, Wrench, FlaskConical, CheckCircle2, Archive, ClipboardList, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Project, ProjectStatus } from '@/data/portfolioData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface ProjectCardProps {
  project: Project;
}

const statusConfig: Record<ProjectStatus, { icon: LucideIcon; label: string; badgeVariant: "default" | "secondary" | "destructive" | "outline" }> = {
  'Deployed': { icon: Rocket, label: 'Deployed', badgeVariant: 'default' },
  'Completed': { icon: CheckCircle2, label: 'Completed', badgeVariant: 'default' },
  'In Progress': { icon: Wrench, label: 'In Progress', badgeVariant: 'secondary' },
  'Prototype': { icon: FlaskConical, label: 'Prototype', badgeVariant: 'secondary' },
  'Archived': { icon: Archive, label: 'Archived', badgeVariant: 'outline' },
  'Concept': { icon: ClipboardList, label: 'Concept', badgeVariant: 'outline' },
};


export default function ProjectCard({ project }: ProjectCardProps) {
  const currentStatusConfig = statusConfig[project.status];
  const isActionable = project.status === 'Deployed' || project.status === 'Completed';

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg bg-card transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.015]">
      <div className="relative w-full h-48 md:h-56 group">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={project.imageHint}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
          {currentStatusConfig && (
            <Badge variant={currentStatusConfig.badgeVariant} className="ml-2 shrink-0">
              <currentStatusConfig.icon className="mr-1.5 h-3.5 w-3.5" />
              {currentStatusConfig.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground mb-3 flex-grow">{project.description}</p>
        
        {project.status === 'In Progress' && project.progress !== undefined && (
          <div className="my-3">
            <Progress value={project.progress} className="h-2" aria-label={`${project.progress}% complete`} />
            <p className="text-xs text-muted-foreground mt-1 text-right">{project.progress}% complete</p>
          </div>
        )}
        {project.status === 'Concept' && (
          <p className="text-xs text-muted-foreground my-3 italic">Concept Phase - Coming Soon!</p>
        )}
         {project.status === 'Prototype' && (
          <p className="text-xs text-muted-foreground my-3 italic">Currently a Prototype</p>
        )}


        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-0">
        <div className="flex gap-2 w-full">
          {project.liveDemoUrl ? (
            isActionable ? (
              <Button asChild variant="outline" className="flex-1">
                <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="flex-1" disabled>
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This project is under development.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          ) : ( // Render disabled button even if no URL, if not actionable
             !isActionable && (
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="flex-1" disabled>
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This project is under development.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
             )
          )}
          {project.repoUrl ? (
            isActionable ? (
              <Button asChild variant="secondary" className="flex-1">
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Source Code
                </Link>
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="flex-1" disabled>
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This project is under development.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          ) : ( // Render disabled button even if no URL, if not actionable
            !isActionable && (
                 <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="flex-1" disabled>
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This project is under development.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
