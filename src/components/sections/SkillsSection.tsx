
"use client";

import { useState, useMemo, useEffect } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillCard from '@/components/ui/SkillCard';
import CategoryCard from '@/components/ui/CategoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X as ClearIcon, ArrowLeft } from 'lucide-react';
import { skillsData } from '@/data/portfolioData';
import type { SkillCategory, Skill } from '@/data/portfolioData';

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Reset animation key when view changes to ensure fade-in
    setAnimationKey(prev => prev + 1);
  }, [selectedCategory, searchTerm]);

  const handleCategorySelect = (category: SkillCategory) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when entering a category
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm(''); // Clear search when going back
  };

  // Determine view mode
  const isGlobalSearchActive = searchTerm !== '';
  const isCategorySelectedView = selectedCategory !== null && !isGlobalSearchActive;
  const isCategoriesOverviewView = !selectedCategory && !isGlobalSearchActive;

  const categoriesToDisplay = useMemo(() => {
    if (!isCategoriesOverviewView) return [];
    // In this mode, searchTerm is empty, so no filtering of categories by search term is needed.
    // If skillsData itself is empty, this will be an empty array.
    return skillsData;
  }, [isCategoriesOverviewView]);

  const skillsToDisplay = useMemo(() => {
    if (isCategoriesOverviewView) return []; // Not displaying skills if in category overview

    const lowerSearchTerm = searchTerm.toLowerCase();

    if (isGlobalSearchActive) {
      // Global search: filter all skills from all categories
      const allMatchingSkills: Skill[] = [];
      skillsData.forEach(category => {
        category.skills.forEach(skill => {
          if (skill.name.toLowerCase().includes(lowerSearchTerm)) {
            // Ensure unique skills if a skill name could appear in multiple raw data categories (though not current structure)
            if (!allMatchingSkills.some(s => s.name === skill.name)) {
              allMatchingSkills.push(skill);
            }
          }
        });
      });
      return allMatchingSkills;
    }
    
    // If here, isCategorySelectedView must be true (category selected, no global search)
    if (selectedCategory) { 
      return selectedCategory.skills;
    }

    return []; // Fallback, should not be reached if logic is correct
  }, [isCategoriesOverviewView, isGlobalSearchActive, searchTerm, selectedCategory, skillsData]);

  // Section Title and Subtitle
  let currentTitle = "My Skills & Technologies";
  let currentSubtitle = "A diverse range of technical and soft skills I've honed through experience and continuous learning.";

  if (isGlobalSearchActive) {
    currentTitle = `Search Results for "${searchTerm}"`;
    currentSubtitle = `Found ${skillsToDisplay.length} skill(s).`;
  } else if (isCategorySelectedView && selectedCategory) {
    currentTitle = selectedCategory.name;
    currentSubtitle = `Exploring skills in ${selectedCategory.name}`;
  }
  // isCategoriesOverviewView uses the default title/subtitle.

  // Search Input Placeholder
  const searchInputPlaceholder = selectedCategory 
    ? "Search all skills..." 
    : "Search skills or categories...";

  return (
    <SectionWrapper id="skills" className="section-fade-in" style={{ animationDelay: '0.4s' }}>
      <SectionTitle subtitle={currentSubtitle}>
        {currentTitle}
      </SectionTitle>

      <div className="mb-8 max-w-lg mx-auto flex gap-2 items-center">
        {selectedCategory && ( // Show back button if a category context was established (even if now globally searching)
          <Button variant="outline" size="icon" onClick={handleBackToCategories} aria-label="Back to categories" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchInputPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            aria-label="Search skills"
          />
        </div>
        {searchTerm && (
          <Button variant="ghost" size="icon" onClick={() => setSearchTerm('')} aria-label="Clear search">
            <ClearIcon className="h-5 w-5" />
          </Button>
        )}
      </div>

      {isCategoriesOverviewView ? (
        // Category View
        <div key={`categories-${animationKey}`}>
          {categoriesToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoriesToDisplay.map((category, index) => (
                <div key={category.name} className="animate-fadeIn" style={{animationDelay: `${index * 0.1}s`}}>
                  <CategoryCard
                    name={category.name}
                    icon={category.icon}
                    iconColor={category.iconColor}
                    skillCount={category.skills.length}
                    onClick={() => handleCategorySelect(category)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No skill categories available.</p>
          )}
        </div>
      ) : (
        // Skills View (Global Search OR Specific Category)
        <div key={`skills-${selectedCategory?.name || 'global_search'}-${animationKey}`}>
            {skillsToDisplay.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {skillsToDisplay.map((skill, index) => (
                <div key={skill.name} className="animate-fadeIn" style={{animationDelay: `${index * 0.05}s`}}>
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              {isGlobalSearchActive 
                ? `No skills found matching "${searchTerm}".` 
                : (selectedCategory ? `No skills in ${selectedCategory.name}.` : 'No skills to display.')}
            </p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
