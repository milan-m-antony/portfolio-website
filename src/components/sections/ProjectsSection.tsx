
"use client";

import { useState, useEffect, useCallback } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = useCallback(() => {
    if (projectsData.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  }, []);

  const prevProject = () => {
    if (projectsData.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };
  
  useEffect(() => {
    if (projectsData.length <= 1) return; // No auto-slide if only one or no project
    const interval = setInterval(() => {
      nextProject();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextProject]);

  if (!projectsData || projectsData.length === 0) {
    return (
      <SectionWrapper id="projects" className="bg-secondary section-fade-in" style={{ animationDelay: '0.4s' }}>
        <SectionTitle subtitle="A selection of my recent work, showcasing my skills in creating engaging and functional digital experiences.">
          Featured Projects
        </SectionTitle>
        <p className="text-center text-muted-foreground">No projects to display at the moment.</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="projects" className="bg-secondary section-fade-in" style={{ animationDelay: '0.4s' }}>
      <SectionTitle subtitle="A selection of my recent work, showcasing my skills in creating engaging and functional digital experiences.">
        Featured Projects
      </SectionTitle>
      
      <div className="relative flex items-center justify-center group py-4">
        {projectsData.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={prevProject}
            aria-label="Previous project"
            className="absolute left-0 sm:-left-2 md:-left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 z-10 opacity-70 group-hover:opacity-100 transition-opacity hover:bg-primary/10 focus:ring-2 focus:ring-primary/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            role="list"
          >
            {projectsData.map((project: Project, index: number) => (
              <div 
                key={project.id} 
                className="w-full flex-shrink-0 px-1"
                role="listitem"
                aria-hidden={index !== currentIndex}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
        
        {projectsData.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={nextProject}
            aria-label="Next project"
            className="absolute right-0 sm:-right-2 md:-right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 z-10 opacity-70 group-hover:opacity-100 transition-opacity hover:bg-primary/10 focus:ring-2 focus:ring-primary/50"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
        
      {projectsData.length > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          {projectsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-primary/50
                ${ index === currentIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/50 hover:bg-muted-foreground/75 hover:scale-110'
              }`}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};

export default ProjectsSection;

    