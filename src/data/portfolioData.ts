import type { LucideIcon } from 'lucide-react';
import { Briefcase, GraduationCap, Award, Code, Laptop, Database, Brain, Settings, Users, Star, GitMerge, Server, Palette, MessageSquare, Users2, Clock, Target, Cloud, PenTool, Film, BarChart2, BookOpen, FileText } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  liveDemoUrl?: string;
  repoUrl?: string;
  tags: string[];
}

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: LucideIcon;
  type: 'work' | 'education' | 'certification' | 'milestone';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  verifyUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with Next.js, Stripe, and Firebase. Includes product listings, cart, checkout, and user authentication.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    imageHint: 'online store',
    liveDemoUrl: '#',
    repoUrl: '#',
    tags: ['Next.js', 'React', 'Firebase', 'Stripe', 'Tailwind CSS'],
  },
  {
    id: '2',
    title: 'AI Powered Blog Generator',
    description: 'A SaaS application that uses OpenAI API to generate blog posts based on user prompts. Built with Python (Flask) and React.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    imageHint: 'ai writing',
    repoUrl: '#',
    tags: ['Python', 'Flask', 'React', 'OpenAI API', 'Docker'],
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for tracking workouts and nutrition. Developed using React Native and Firebase.',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    imageHint: 'fitness app',
    tags: ['React Native', 'Firebase', 'Mobile App'],
  },
];

export const skillsData: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', icon: Code },
      { name: 'JavaScript', icon: Code },
      { name: 'TypeScript', icon: Code },
      { name: 'Java', icon: Code },
      { name: 'C / C++', icon: Code },
      { name: 'HTML / CSS', icon: Palette },
    ],
  },
  {
    name: 'Web Development',
    icon: Laptop,
    skills: [
      { name: 'React.js', icon: Code },
      { name: 'Next.js', icon: Code },
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Server },
      { name: 'RESTful APIs', icon: GitMerge },
      { name: 'Tailwind CSS', icon: Palette },
      { name: 'Bootstrap', icon: Palette },
    ],
  },
  {
    name: 'Mobile Development',
    icon: Laptop, // Using Laptop as a placeholder, consider a mobile icon
    skills: [
      { name: 'React Native', icon: Code },
      { name: 'Flutter (Dart)', icon: Code },
      { name: 'Android (Java/Kotlin)', icon: Code },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'Microsoft Azure', icon: Cloud },
      { name: 'GitHub Actions', icon: GitMerge },
      { name: 'Docker', icon: Server },
      { name: 'Firebase', icon: Cloud },
    ],
  },
  {
    name: 'Databases',
    icon: Database,
    skills: [
      { name: 'MongoDB', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'SQLite', icon: Database },
    ],
  },
  {
    name: 'AI / ML / Data',
    icon: Brain,
    skills: [
      { name: 'Pandas', icon: BarChart2 },
      { name: 'NumPy', icon: BarChart2 },
      { name: 'Scikit-learn', icon: Brain },
      { name: 'TensorFlow', icon: Brain },
      { name: 'Keras', icon: Brain },
      { name: 'OpenAI API', icon: MessageSquare },
      { name: 'Data Visualization (Matplotlib, Seaborn)', icon: BarChart2 },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: Settings,
    skills: [
      { name: 'Git', icon: GitMerge },
      { name: 'GitHub', icon: GitMerge },
      { name: 'VS Code', icon: Code },
      { name: 'Figma', icon: PenTool },
      { name: 'Adobe XD', icon: PenTool },
      { name: 'Postman', icon: Settings },
      { name: 'Linux', icon: Laptop },
      { name: 'WSL', icon: Laptop },
      { name: 'Ubuntu', icon: Laptop },
    ],
  },
  {
    name: 'Soft Skills',
    icon: Users,
    skills: [
      { name: 'Problem Solving', icon: Target },
      { name: 'Communication', icon: MessageSquare },
      { name: 'Team Collaboration', icon: Users2 },
      { name: 'Time Management', icon: Clock },
      { name: 'Creativity', icon: Palette },
    ],
  },
];

export const timelineData: TimelineEvent[] = [
  {
    id: '1',
    date: 'Jan 2023 - Present',
    title: 'Creative Developer',
    description: 'Developing innovative web and mobile solutions for various clients. Specializing in full-stack development and UI/UX design.',
    icon: Briefcase,
    type: 'work',
  },
  {
    id: '2',
    date: 'Aug 2019 - Dec 2022',
    title: 'B.Sc. in Computer Science',
    description: 'Graduated with honors from University of Technology. Focused on software engineering and artificial intelligence.',
    icon: GraduationCap,
    type: 'education',
  },
  {
    id: '3',
    date: 'Mar 2023',
    title: 'Azure Fundamentals Certified',
    description: 'Achieved Microsoft Certified: Azure Fundamentals certification, demonstrating foundational knowledge of cloud services.',
    icon: Award,
    type: 'certification',
  },
  {
    id: '4',
    date: 'Jun 2021',
    title: 'Lead Developer - Capstone Project',
    description: 'Led a team of 4 to develop an award-winning AI-driven recommendation engine for our final year project.',
    icon: Star,
    type: 'milestone',
  },
];

export const certificationsData: Certification[] = [
  {
    id: '1',
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'March 2023',
    imageUrl: 'https://picsum.photos/seed/cert1/300/200',
    imageHint: 'azure certificate',
    verifyUrl: '#',
  },
  {
    id: '2',
    title: 'Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    date: 'July 2022',
    imageUrl: 'https://picsum.photos/seed/cert2/300/200',
    imageHint: 'web development',
    verifyUrl: '#',
  },
  {
    id: '3',
    title: 'Data Science Specialization',
    issuer: 'Coursera (Johns Hopkins University)',
    date: 'May 2021',
    imageUrl: 'https://picsum.photos/seed/cert3/300/200',
    imageHint: 'data science',
  },
];

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Journey" },
  { href: "#certifications", label: "Certifications" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];
