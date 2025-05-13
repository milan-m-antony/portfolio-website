"use client";

import { useEffect, useState } from 'react'; // Removed unused useRef, useCallback
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
// Removed Button and Chevron icons as scroll buttons are removed
import { projectsData } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';

const ProjectsSection = () => {
  // Removed state and refs related to horizontal scrolling (scrollContainerRef, canScrollPrev, canScrollNext)
  // Removed scroll and checkScrollability functions

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
      
      {/* Replaced horizontal scroll container with a responsive grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        role="list" // Added role for semantics
      >
        {projectsData.map((project: Project, index) => (
          <div
            key={project.id}
            // Removed flex-shrink-0, fixed widths, and scroll-snap-align-start
            className="animate-fadeIn h-full" // Ensure cards in a row stretch to the same height if content varies
            style={{ animationDelay: `${index * 0.1}s` }}
            role="listitem"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {/* Removed scroll buttons */}
    </SectionWrapper>
  );
};

export default ProjectsSection;

