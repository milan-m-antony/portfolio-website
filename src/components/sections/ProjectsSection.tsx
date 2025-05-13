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

  const SCROLL_AMOUNT_PERCENT = 0.75; // Scroll by 75% of the container's visible width, or roughly 1-2 cards

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Attempt to scroll by approx one card width + gap.
      // Card width is dynamic, so using a percentage of clientWidth.
      // A more precise scroll would involve getting card width, but this is simpler.
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
      // Enable/disable buttons based on scroll position
      // Use a small threshold (e.g., 5px) to account for floating point inaccuracies and smooth end stops
      setCanScrollPrev(scrollLeft > 5);
      setCanScrollNext(scrollWidth - clientWidth - scrollLeft > 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollability(); // Initial check
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability); // Re-check on resize

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [checkScrollability, projectsData]);

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
        {/* Previous Button */}
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
          // Horizontal padding (px-10, sm:px-12, md:px-14) makes space for the absolute buttons
          // so content doesn't go directly under them.
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2 px-10 sm:px-12 md:px-14" 
          role="list"
        >
          {projectsData.map((project: Project, index) => (
            <div
              key={project.id}
              // Card widths:
              // - Default: Almost full width minus space for buttons & padding.
              // - min-[480px] (xs-sm): A bit wider than smallest.
              // - sm (640px+): Fixed width allowing potentially 2 cards visible.
              // - md (768px+): Wider fixed width, potentially 2-3 cards visible.
              className="flex-shrink-0 w-[calc(100vw-8rem)] min-[480px]:w-72 sm:w-80 md:w-96 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Next Button */}
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