

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
  const isGlobalSearchActive = searchTerm !== '' && selectedCategory === null; // Global search only when no category is selected
  const isCategorySearchActive = searchTerm !== '' && selectedCategory !== null; // Category-specific search
  const isCategorySelectedView = selectedCategory !== null && searchTerm === ''; // Category selected, no search term
  const isCategoriesOverviewView = !selectedCategory && searchTerm === ''; // Initial view: categories overview

  const categoriesToDisplay = useMemo(() => {
    if (!isCategoriesOverviewView) return [];
    return skillsData;
  }, [isCategoriesOverviewView]);

  const skillsToDisplay = useMemo(() => {
    if (isCategoriesOverviewView) return []; 

    const lowerSearchTerm = searchTerm.toLowerCase();

    if (isGlobalSearchActive) {
      // Global search: filter all skills from all categories
      const allMatchingSkills: Skill[] = [];
      skillsData.forEach(category => {
        category.skills.forEach(skill => {
          if (skill.name.toLowerCase().includes(lowerSearchTerm) || category.name.toLowerCase().includes(lowerSearchTerm)) {
            // Add skill if skill name or its category name matches
            if (!allMatchingSkills.some(s => s.name === skill.name)) { // Avoid duplicates if searching by category term
              allMatchingSkills.push(skill);
            }
          }
        });
      });
      return allMatchingSkills;
    }
    
    if (isCategorySelectedView && selectedCategory) { 
      return selectedCategory.skills;
    }

    if (isCategorySearchActive && selectedCategory) {
      // Category-specific search: filter skills only within the selected category
      return selectedCategory.skills.filter(skill => 
        skill.name.toLowerCase().includes(lowerSearchTerm)
      );
    }

    return []; // Fallback
  }, [isCategoriesOverviewView, isGlobalSearchActive, isCategorySelectedView, isCategorySearchActive, searchTerm, selectedCategory]);

  // Section Title and Subtitle
  let currentTitle = "My Skills & Technologies";
  let currentSubtitle = "A diverse range of technical and soft skills I've honed through experience and continuous learning.";
  
  if (isGlobalSearchActive) {
    currentTitle = `Search Results for "${searchTerm}"`;
    currentSubtitle = `Found ${skillsToDisplay.length} skill(s) across all categories.`;
  } else if (selectedCategory) { // Covers both isCategorySelectedView and isCategorySearchActive
    currentTitle = selectedCategory.name;
    currentSubtitle = `Exploring skills in ${selectedCategory.name}${isCategorySearchActive ? ` (filtered by "${searchTerm}")` : ''}.`;
    if (isCategorySearchActive) {
      currentSubtitle = `Found ${skillsToDisplay.length} skill(s) in ${selectedCategory.name} matching "${searchTerm}".`;
    }
  }


  // Search Input Placeholder
  const searchInputPlaceholder = selectedCategory 
    ? `Search skills in ${selectedCategory.name}...` 
    : "Search skills or categories...";

  return (
    <SectionWrapper id="skills" className="section-fade-in" style={{ animationDelay: '0.6s' }}>
      <SectionTitle subtitle={currentSubtitle}>
        {currentTitle}
      </SectionTitle>

      <div className="mb-8 max-w-lg mx-auto flex gap-2 items-center">
        {selectedCategory && ( 
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
        <div key={`skills-${selectedCategory?.name || 'search_results'}-${animationKey}`}>
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
                ? `No skills found matching "${searchTerm}". Try a broader search.` 
                : (isCategorySearchActive && selectedCategory ? `No skills in ${selectedCategory.name} matching "${searchTerm}".` 
                : (selectedCategory ? `No skills listed in ${selectedCategory.name}.` : 'No skills to display.'))}
            </p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
