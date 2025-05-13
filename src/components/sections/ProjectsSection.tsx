
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
  
  // Initialize with null, will be set client-side after mount.
  // This ensures server render and initial client render use the fallback.
  const [visibleCardsCountOnClient, setVisibleCardsCountOnClient] = useState<number | null>(null);

  const totalProjects = projectsData.length;

  useEffect(() => {
    // This effect runs only on the client, after hydration.
    const calculateAndSetVisibleCards = () => {
      // window object is available here
      const count = getResponsiveVisibleCardsCount();
      setVisibleCardsCountOnClient(count);
    };

    calculateAndSetVisibleCards(); // Set initial count on client mount

    window.addEventListener('resize', calculateAndSetVisibleCards);
    return () => window.removeEventListener('resize', calculateAndSetVisibleCards);
  }, []); // Empty dependency array ensures this runs once on mount (client-side)

  // Use visibleCardsCountOnClient if available (client-side after mount),
  // otherwise fallback to a server-consistent value (1 card).
  const currentVisibleCards = visibleCardsCountOnClient ?? 1;

  // Adjust currentIndex if it becomes invalid after resize or if visibleCardsCount changes
  useEffect(() => {
    if (totalProjects > 0 && currentVisibleCards > 0) {
      const maxPossibleIndex = Math.max(0, totalProjects - currentVisibleCards);
      if (currentIndex > maxPossibleIndex) {
        setCurrentIndex(maxPossibleIndex);
      } else if (currentIndex < 0) { // Should not happen with current logic, but as a safeguard
        setCurrentIndex(0);
      }
    }
  }, [currentVisibleCards, totalProjects, currentIndex]);


  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (totalProjects <= currentVisibleCards) return; // No sliding if all cards fit or fewer than fit

    setCurrentIndex((prevIndex) => {
      const nextIndexCandidate = prevIndex + 1;
      // If next index would cause the view to go past the last possible full set of cards, loop to 0
      if (nextIndexCandidate > totalProjects - currentVisibleCards) {
        return 0;
      }
      return nextIndexCandidate;
    });
  }, [totalProjects, currentVisibleCards]);

  useEffect(() => {
    resetTimeout();
    if (!isPaused && totalProjects > currentVisibleCards) { // Only auto-slide if there's something to slide
      timeoutRef.current = setTimeout(handleNext, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPaused, totalProjects, currentVisibleCards, resetTimeout, handleNext]);

  const handlePrev = () => {
    if (totalProjects <= currentVisibleCards) return;

    setCurrentIndex((prevIndex) => {
      const prevIndexCandidate = prevIndex - 1;
      // If previous index is less than 0, loop to the last possible starting index
      if (prevIndexCandidate < 0) {
        return Math.max(0, totalProjects - currentVisibleCards);
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
  
  // On server & initial client render (pre-useEffect), currentVisibleCards is 1, so cardWidthPercentage is 100.
  // After useEffect on client, currentVisibleCards updates, and so does cardWidthPercentage.
  const cardWidthPercentage = currentVisibleCards > 0 ? 100 / currentVisibleCards : 100;

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
                className="flex-shrink-0 p-1 md:p-2 box-border" 
                style={{ width: `${cardWidthPercentage}%` }}
                role="listitem"
                // On server/initial client render: currentVisibleCards = 1. Only first card visible.
                // After client hydration & effect: currentVisibleCards reflects actual screen size.
                aria-hidden={!(index >= currentIndex && index < currentIndex + currentVisibleCards)}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons are only rendered client-side after visibleCardsCountOnClient is determined */}
        {visibleCardsCountOnClient !== null && totalProjects > currentVisibleCards && (
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
