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

const getResponsiveVisibleCardsCount = () => {
  if (typeof window === 'undefined') return 1; // Default for SSR
  if (window.innerWidth >= 1024) return 3; // lg and up: 3 cards
  if (window.innerWidth >= 768) return 2;  // md: 2 cards
  return 1; // sm and down: 1 card
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visibleCardsCount, setVisibleCardsCount] = useState(getResponsiveVisibleCardsCount());

  const totalProjects = projectsData.length;

  useEffect(() => {
    const handleResize = () => {
      setVisibleCardsCount(getResponsiveVisibleCardsCount());
    };

    // Set initial count correctly on client mount
    if (typeof window !== 'undefined') {
      handleResize();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust currentIndex if it becomes invalid after resize or if visibleCardsCount changes
  useEffect(() => {
    if (totalProjects > 0 && visibleCardsCount > 0) {
      const maxPossibleIndex = Math.max(0, totalProjects - visibleCardsCount);
      if (currentIndex > maxPossibleIndex) {
        setCurrentIndex(maxPossibleIndex);
      } else if (currentIndex < 0) { // Should not happen with current logic, but as a safeguard
        setCurrentIndex(0);
      }
    }
  }, [visibleCardsCount, totalProjects, currentIndex]);


  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (totalProjects <= visibleCardsCount) return; // No sliding if all cards fit or fewer than fit

    setCurrentIndex((prevIndex) => {
      const nextIndexCandidate = prevIndex + 1;
      // If next index would cause the view to go past the last possible full set of cards, loop to 0
      if (nextIndexCandidate > totalProjects - visibleCardsCount) {
        return 0;
      }
      return nextIndexCandidate;
    });
  }, [totalProjects, visibleCardsCount]);

  useEffect(() => {
    resetTimeout();
    if (!isPaused && totalProjects > visibleCardsCount) { // Only auto-slide if there's something to slide
      timeoutRef.current = setTimeout(handleNext, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPaused, totalProjects, visibleCardsCount, resetTimeout, handleNext]);

  const handlePrev = () => {
    if (totalProjects <= visibleCardsCount) return;

    setCurrentIndex((prevIndex) => {
      const prevIndexCandidate = prevIndex - 1;
      // If previous index is less than 0, loop to the last possible starting index
      if (prevIndexCandidate < 0) {
        return Math.max(0, totalProjects - visibleCardsCount);
      }
      return prevIndexCandidate;
    });
  };

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

  const cardWidthPercentage = visibleCardsCount > 0 ? 100 / visibleCardsCount : 100;

  return (
    <SectionWrapper id="projects" className="bg-secondary section-fade-in" style={{ animationDelay: '0.4s' }}>
      <SectionTitle subtitle="A selection of my recent work, showcasing my skills in creating engaging and functional digital experiences.">
        Featured Projects
      </SectionTitle>

      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)} 
        onTouchEnd={() => setIsPaused(false)}  
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * cardWidthPercentage}%)` }}
            role="list"
          >
            {projectsData.map((project: Project, index: number) => (
              <div
                key={project.id}
                className="flex-shrink-0 p-1 md:p-2 box-border" // Added box-border
                style={{ width: `${cardWidthPercentage}%` }}
                role="listitem"
                aria-hidden={!(index >= currentIndex && index < currentIndex + visibleCardsCount)}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {totalProjects > visibleCardsCount && (
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