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
      
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth', // Ensure smooth scrolling for programmatic scroll
      });
    }
  };

  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Add a small tolerance (e.g., 5px) for floating point inaccuracies
      setCanScrollPrev(scrollLeft > 5);
      setCanScrollNext(scrollWidth - clientWidth - scrollLeft > 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability(); 
      // Debounce or throttle checkScrollability if performance issues arise on frequent scrolls
      container.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability); 

      // Initial check after projects are loaded
      const initialCheckTimeout = setTimeout(checkScrollability, 100);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        clearTimeout(initialCheckTimeout);
      };
    }
  }, [checkScrollability]);

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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-lg bg-background/70 hover:bg-background backdrop-blur-sm md:left-[-1rem] lg:left-[-1.5rem]"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2 scroll-snap-type-x-mandatory" 
          role="list"
        >
          {projectsData.map((project: Project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-72 sm:w-80 scroll-snap-align-start animate-fadeIn" // Fixed width for cards, scroll-snap align
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-lg bg-background/70 hover:bg-background backdrop-blur-sm md:right-[-1rem] lg:right-[-1.5rem]"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
