// Based on your Supabase table structure
// This file helps provide TypeScript types for your Supabase data.
// You can generate these types automatically using the Supabase CLI:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/types/supabase.ts

// For now, let's define some basic types based on the SQL provided earlier.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          image_hint: string | null
          live_demo_url: string | null
          repo_url: string | null
          tags: string[] | null
          status: string | null
          progress: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          image_hint?: string | null
          live_demo_url?: string | null
          repo_url?: string | null
          tags?: string[] | null
          status?: string | null
          progress?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          image_hint?: string | null
          live_demo_url?: string | null
          repo_url?: string | null
          tags?: string[] | null
          status?: string | null
          progress?: number | null
          created_at?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          id: string
          name: string
          icon_name: string | null
          icon_color: string | null
          sort_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon_name?: string | null
          icon_color?: string | null
          sort_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon_name?: string | null
          icon_color?: string | null
          sort_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
          icon_name: string | null
          description: string | null
          category_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon_name?: string | null
          description?: string | null
          category_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon_name?: string | null
          description?: string | null
          category_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      // Define other tables (timeline_events, certifications, about_content) similarly
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Re-defining local types to match Supabase structure and avoid breaking existing components immediately.
// Ideally, components would use types directly from Database['public']['Tables']['projects']['Row'] etc.

export type ProjectStatus = 'Deployed' | 'In Progress' | 'Prototype' | 'Archived' | 'Concept' | 'Completed';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null; // Renamed from image_url for consistency with components
  imageHint: string | null;
  liveDemoUrl?: string | null;
  repoUrl?: string | null;
  tags: string[] | null;
  status: ProjectStatus | null; // More specific type
  progress?: number | null;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  iconName: string | null; // Storing name of the icon
  description: string | null;
  categoryId?: string | null; // category_id
  // category?: SkillCategory; // If you join them
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string | null; // Storing name of the icon
  iconColor?: string | null;
  skills?: Skill[]; // If you fetch them together
  skillCount?: number; // Calculated or fetched
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  iconName: string; // Storing name of the icon
  type: 'work' | 'education' | 'certification' | 'milestone';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string | null;
  imageHint: string | null;
  verifyUrl?: string | null;
}
