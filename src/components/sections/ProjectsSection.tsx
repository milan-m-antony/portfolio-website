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
  if (typeof window === 'undefined') return 1; // Default for SSR, will be updated on client
  if (window.innerWidth >= 1024) return 3; // lg and up: 3 cards
  if (window.innerWidth >= 768) return 2;  // md: 2 cards
  return 1; // sm and down: 1 card
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [visibleCardsCountOnClient, setVisibleCardsCountOnClient] = useState<number | null>(null); // Initialize as null

  const totalProjects = projectsData.length;

  useEffect(() => {
    // This effect runs only on the client after hydration
    const calculateAndSetVisibleCards = () => {
      const count = getResponsiveVisibleCardsCount();
      setVisibleCardsCountOnClient(count);
    };

    calculateAndSetVisibleCards(); 

    window.addEventListener('resize', calculateAndSetVisibleCards);
    return () => window.removeEventListener('resize', calculateAndSetVisibleCards);
  }, []); 

  // Use visibleCardsCountOnClient for rendering, defaulting to 1 if still null (initial server render or before effect runs)
  const currentVisibleCards = visibleCardsCountOnClient ?? 1; 

  useEffect(() => {
    if (totalProjects > 0 && currentVisibleCards > 0) {
      const maxPossibleIndex = Math.max(0, totalProjects - currentVisibleCards);
      if (currentIndex > maxPossibleIndex) {
        setCurrentIndex(maxPossibleIndex);
      } else if (currentIndex < 0) { 
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
    if (totalProjects <= currentVisibleCards) return; 

    setCurrentIndex((prevIndex) => {
      const nextIndexCandidate = prevIndex + 1;
      // If next slide would show fewer than currentVisibleCards (because we're at the end)
      // and we want to loop, go to 0. Otherwise, cap at the last possible full slide.
      if (nextIndexCandidate > totalProjects - currentVisibleCards) {
        return 0; // Loop to the beginning
      }
      return nextIndexCandidate;
    });
  }, [totalProjects, currentVisibleCards]);

  useEffect(() => {
    resetTimeout();
    if (!isPaused && totalProjects > currentVisibleCards) { 
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
      if (prevIndexCandidate < 0) {
        // If prev would go before start, loop to the end (last possible full slide)
        return Math.max(0, totalProjects - currentVisibleCards);
      }
      return prevIndexCandidate;
    });
  };

  if (!projectsData || totalProjects === 0) {
    return (
      <SectionWrapper id="projects" className="bg-background section-fade-in" style={{ animationDelay: '0.4s' }}>
        <SectionTitle subtitle="A selection of my recent work.">
          Featured Projects
        </SectionTitle>
        <p className="text-center text-muted-foreground">No projects to display at the moment.</p>
      </SectionWrapper>
    );
  }
  
  // Calculate card width based on the client-determined visible count, or default during SSR/initial load
  const cardWidthPercentage = currentVisibleCards > 0 ? 100 / currentVisibleCards : 100;

  return (
    <SectionWrapper id="projects" className="bg-background section-fade-in" style={{ animationDelay: '0.4s' }}>
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
          {/* Conditional rendering: Only render the slider content if visibleCardsCountOnClient is set (client-side) */}
          {visibleCardsCountOnClient !== null ? (
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / currentVisibleCards)}%)` }} // Recalculate transform based on currentVisibleCards
              role="list"
            >
              {projectsData.map((project: Project, index: number) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 p-1 md:p-2 box-border" 
                  style={{ width: `${cardWidthPercentage}%` }}
                  role="listitem"
                  aria-hidden={!(index >= currentIndex && index < currentIndex + currentVisibleCards)}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            // Placeholder for SSR or before client-side calculation (optional, or render a single card, or a loader)
            // For now, let's render a basic placeholder or nothing to avoid mismatch
            <div className="flex justify-center items-center h-96">
              {/* You could put a spinner or a single placeholder card here */}
               <p className="text-muted-foreground">Loading projects...</p>
            </div>
          )}
        </div>

        {/* Render buttons only if client-side calculation is done and there are enough projects */}
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
