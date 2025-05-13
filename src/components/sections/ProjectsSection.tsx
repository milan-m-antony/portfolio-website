
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // To pause auto-slide on hover
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalProjects = projectsData.length;

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects);
  }, [totalProjects]);

  useEffect(() => {
    resetTimeout();
    if (!isPaused && totalProjects > 1) {
      timeoutRef.current = setTimeout(handleNext, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPaused, totalProjects, resetTimeout, handleNext]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
  };

  // No need for getVisibleCardsCount or related state for a single-item carousel

  if (!projectsData || totalProjects === 0) {
    return (
      <SectionWrapper id="projects" className="bg-secondary section-fade-in" style={{ animationDelay: '0.4s' }}>
        <SectionTitle subtitle="A selection of my recent work.">
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

      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} // Pause on touch for mobile
        onTouchEnd={() => setIsPaused(false)}   // Resume on touch end
      >
        <div className="overflow-hidden rounded-lg">
          {/* Slidable Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            role="list"
          >
            {projectsData.map((project: Project) => (
              <div
                key={project.id}
                className="w-full flex-shrink-0 p-1 md:p-2" // Each card takes full width of the viewport
                role="listitem"
                aria-hidden={projectsData.indexOf(project) !== currentIndex}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {totalProjects > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-1 sm:ml-2 md:ml-4 opacity-70 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80 focus:opacity-100"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-1 sm:mr-2 md:mr-4 opacity-70 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80 focus:opacity-100"
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
