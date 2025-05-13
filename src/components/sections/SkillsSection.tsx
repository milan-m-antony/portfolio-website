
"use client";

import { useState, useMemo, useEffect } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillCard from '@/components/ui/SkillCard';
import CategoryCard from '@/components/ui/CategoryCard'; // New component
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X as ClearIcon, ArrowLeft, ChevronsRight } from 'lucide-react';
import { skillsData } from '@/data/portfolioData';
import type { SkillCategory, Skill } from '@/data/portfolioData';

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [animationKey, setAnimationKey] = useState(0); // For re-triggering animations

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

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return skillsData;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return skillsData.filter(category =>
      category.name.toLowerCase().includes(lowerSearchTerm) ||
      category.skills.some(skill => skill.name.toLowerCase().includes(lowerSearchTerm))
    );
  }, [searchTerm]);

  const skillsToDisplay = useMemo(() => {
    if (!selectedCategory) return [];
    if (!searchTerm) return selectedCategory.skills;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return selectedCategory.skills.filter(skill =>
      skill.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [selectedCategory, searchTerm]);

  return (
    <SectionWrapper id="skills" className="section-fade-in" style={{ animationDelay: '0.4s' }}>
      <SectionTitle subtitle={selectedCategory ? `Exploring skills in ${selectedCategory.name}` : "A diverse range of technical and soft skills I've honed through experience and continuous learning."}>
        {selectedCategory ? selectedCategory.name : 'My Skills & Technologies'}
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
            placeholder={selectedCategory ? `Search skills in ${selectedCategory.name}...` : "Search skills or categories..."}
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

      {!selectedCategory ? (
        // Category View
        <div key={`categories-${animationKey}`}>
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
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
            <p className="text-center text-muted-foreground">No categories found matching your search.</p>
          )}
        </div>
      ) : (
        // Skills View (within a category)
        <div key={`skills-${selectedCategory.name}-${animationKey}`}>
            {skillsToDisplay.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {skillsToDisplay.map((skill, index) => (
                <div key={skill.name} className="animate-fadeIn" style={{animationDelay: `${index * 0.05}s`}}>
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No skills found matching your search in {selectedCategory.name}.</p>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
