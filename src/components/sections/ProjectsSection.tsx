
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

  const SCROLL_AMOUNT_PERCENT = 80; // Scroll by 80% of the container's visible width

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = (current.offsetWidth * SCROLL_AMOUNT_PERCENT) / 100;
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
      // The 'scroll' event listener will call checkScrollability
    }
  };

  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const isEffectivelySmallScreen = window.innerWidth < 768; // Tailwind's 'md' breakpoint

      if (isEffectivelySmallScreen) {
        setCanScrollPrev(scrollLeft > 5); // Use a small threshold
        setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 5); // Use a small threshold
      } else {
        // On larger screens, ensure buttons are disabled as scrolling is not the primary interaction
        setCanScrollPrev(false);
        setCanScrollNext(false);
      }
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
  }, [checkScrollability, projectsData]); // Re-check if projectsData changes

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
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide p-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-x-0 md:overflow-visible md:p-0"
          role="list"
        >
          {projectsData.map((project: Project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[calc(100vw-5rem)] max-w-sm sm:w-80 md:w-auto animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="listitem"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons - visible and functional only on <md screens */}
        <div className="md:hidden flex justify-center items-center space-x-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollPrev}
            aria-label="Previous projects"
            className="rounded-full shadow-md"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollNext}
            aria-label="Next projects"
            className="rounded-full shadow-md"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
