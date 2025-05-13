"use client";

import { useState, useMemo } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillCard from '@/components/ui/SkillCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X as ClearIcon } from 'lucide-react';
import { skillsData } from '@/data/portfolioData';
import type { SkillCategory } from '@/data/portfolioData';

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = useMemo(() => {
    if (!searchTerm) return skillsData;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return skillsData
      .map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.name.toLowerCase().includes(lowerSearchTerm)
        ),
      }))
      .filter(category => category.skills.length > 0);
  }, [searchTerm]);

  return (
    <SectionWrapper id="skills" className="section-fade-in" style={{ animationDelay: '0.4s' }}>
      <SectionTitle subtitle="A diverse range of technical and soft skills I've honed through experience and continuous learning.">
        My Skills & Technologies
      </SectionTitle>

      <div className="mb-8 max-w-lg mx-auto flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search skills..."
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

      {filteredSkills.length > 0 ? (
        <div className="space-y-10">
          {filteredSkills.map((category, catIndex) => (
            <div key={category.name} className="animate-fadeIn" style={{animationDelay: `${catIndex * 0.1}s`}}>
              <div className="flex items-center mb-6">
                <category.icon className="h-7 w-7 text-primary mr-3" />
                <h3 className="text-2xl font-semibold text-foreground">{category.name}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="animate-fadeIn" style={{animationDelay: `${(catIndex * 0.1) + (skillIndex * 0.05)}s`}}>
                     <SkillCard skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No skills found matching your search.</p>
      )}
    </SectionWrapper>
  );
}
