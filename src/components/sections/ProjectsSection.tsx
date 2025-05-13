"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Scroll by 100% of the container's visible width
  const SCROLL_AMOUNT_PERCENT = 1.0; 

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * SCROLL_AMOUNT_PERCENT;
      
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollPrev(scrollLeft > 5);
      setCanScrollNext(scrollWidth - clientWidth - scrollLeft > 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability(); 
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability); 

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [checkScrollability]); // Removed projectsData from dependencies as it's not directly used by checkScrollability

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
      
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          disabled={!canScrollPrev}
          aria-label="Previous projects"
          className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-lg bg-background/70 hover:bg-background backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2 px-10 sm:px-12 md:px-14" 
          role="list"
        >
          {projectsData.map((project: Project, index) => (
            <div
              key={project.id}
              // Base (mobile): 1 card (w-full of scrollable area)
              // md (tablets, 768px+): 2 cards (w-64 = 256px each)
              // lg (desktops, 1024px+): 3 cards (w-72 = 288px each)
              className="flex-shrink-0 w-full md:w-64 lg:w-72 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          disabled={!canScrollNext}
          aria-label="Next projects"
          className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-lg bg-background/70 hover:bg-background backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
