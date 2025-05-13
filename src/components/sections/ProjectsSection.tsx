
"use client";

import { useState, useEffect, useCallback } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/portfolioData';
import type { Project } from '@/data/portfolioData';

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerPage = 3; // Adjust based on screen size or preference

  const nextProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  }, []);

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextProject]);

  // Create a looped array for seamless carousel effect for display
  const getVisibleProjects = () => {
    const numProjects = projectsData.length;
    if (numProjects === 0) return [];
    
    const visible: Project[] = [];
    for (let i = 0; i < projectsPerPage; i++) {
      visible.push(projectsData[(currentIndex + i) % numProjects]);
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <SectionWrapper id="projects" className="bg-secondary section-fade-in" style={{ animationDelay: '0.4s' }}>
      <SectionTitle subtitle="A selection of my recent work, showcasing my skills in creating engaging and functional digital experiences.">
        Featured Projects
      </SectionTitle>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {visibleProjects.map((project, index) => (
            <div key={project.id + '-' + index} className="animate-fadeIn" style={{animationDelay: `${index * 0.1}s`}}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {projectsData.length > projectsPerPage && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevProject} aria-label="Previous project">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex space-x-2">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground/75'
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextProject} aria-label="Next project">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
