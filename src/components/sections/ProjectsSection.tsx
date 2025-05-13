
"use client";

import { useState, useEffect, useRef } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';
import { cn } from '@/lib/utils';

const ProjectsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollPrev(scrollLeft > 0);
      // Add a small tolerance (e.g., 1px) for floating point inaccuracies
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      handleScrollButtons();
      // Check if content actually overflows to enable/disable next button
      if (container.scrollWidth <= container.clientWidth) {
        setCanScrollNext(false);
      }
      
      container.addEventListener('scroll', handleScrollButtons);
      window.addEventListener('resize', handleScrollButtons);

      // Re-evaluate on projectsData change
      const observer = new MutationObserver(handleScrollButtons);
      observer.observe(container, { childList: true, subtree: true });


      return () => {
        container.removeEventListener('scroll', handleScrollButtons);
        window.removeEventListener('resize', handleScrollButtons);
        observer.disconnect();
      };
    }
  }, [projectsData]);

  const scroll = (direction: 'prev' | 'next') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // Scroll by 80% of visible width
      scrollContainerRef.current.scrollBy({
        left: direction === 'prev' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
      
      <div className="relative group">
        {projectsData.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('prev')}
            aria-label="Previous projects"
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-70 group-hover:opacity-100 transition-opacity hover:bg-primary/10 focus:ring-2 focus:ring-primary/50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-4 space-x-6 scrollbar-hide mx-12 snap-x snap-mandatory"
        >
          {projectsData.map((project: Project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[380px] snap-start"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {projectsData.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('next')}
            aria-label="Next projects"
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-70 group-hover:opacity-100 transition-opacity hover:bg-primary/10 focus:ring-2 focus:ring-primary/50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
