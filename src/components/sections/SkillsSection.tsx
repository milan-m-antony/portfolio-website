
"use server"; // Make this a Server Component

import { supabase } from '@/lib/supabaseClient';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import type { SkillCategory, Skill } from '@/types/supabase';
// Client component for interactive parts (search, category selection)
import SkillsClientView from './SkillsClientView';

async function getSkillsData(): Promise<SkillCategory[]> {
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('skill_categories')
    .select(`
      id,
      name,
      icon_name,
      icon_color,
      skills (id, name, icon_name, description, category_id)
    `)
    .order('sort_order', { ascending: true });

  if (categoriesError) {
    console.error('Error fetching skill categories:', categoriesError);
    return [];
  }

  return categoriesData.map(category => ({
    ...category,
    iconName: category.icon_name, // map db column to component prop
    skills: category.skills.map(skill => ({
      ...skill,
      iconName: skill.icon_name, // map db column to component prop
      categoryId: skill.category_id
    }))
  })) as SkillCategory[];
}


export default async function SkillsSection() {
  const skillsData = await getSkillsData();

  return (
    <SectionWrapper id="skills" className="section-fade-in" style={{ animationDelay: '0.6s' }}>
      {/* SectionTitle will be managed by SkillsClientView for dynamic titles */}
      <SkillsClientView initialSkillsData={skillsData} />
    </SectionWrapper>
  );
}

