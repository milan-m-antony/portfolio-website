
import type { LucideIcon } from 'lucide-react';
import {
  Briefcase, GraduationCap, Award, Code, Laptop, Database, Brain, Settings, Users, Star, GitMerge, Server, Palette, MessageSquare, Users2, Clock, Target, Cloud, PenTool, Film, BarChart2, BookOpen, FileText,
  Terminal, GitFork, Figma, FileCode, Package, Layers3, Orbit, Wind, GalleryThumbnails, Webhook, Route, Coffee, Binary, CodeXml, FileJson2, FileBadge2, DatabaseZap, Cpu, Network, Share2, Activity, ShieldCheck, Lightbulb, Workflow, Sparkles, TestTube2,
  Smartphone, Bot, ServerCog, CloudCog, DatabaseBackup, FolderGit2, Blocks, Anchor, Atom, AppWindow, BookMarked, Puzzle, BookHeart,
  Braces, SquareCode, Link, DatabaseIcon as SqlDatabase, BrainCircuit, Settings2, CircleUser, CheckCircle, Zap, DraftingCompass, Video, GanttChartSquare, Edit3, DownloadCloud, FolderKanban, UserCog,
} from 'lucide-react'; // Added more icons

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

export interface Skill {
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  iconColor?: string; // For colorful category icons
  skills: Skill[];
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
  {
    id: '4',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js and React. Features various chart types and filtering options.',
    imageUrl: 'https://picsum.photos/seed/project4/600/400',
    imageHint: 'data dashboard charts',
    liveDemoUrl: '#',
    tags: ['React', 'D3.js', 'Data Visualization', 'JavaScript'],
  },
  {
    id: '5',
    title: 'Real-time Chat Application',
    description: 'A scalable chat application built with Node.js, Socket.IO, and React. Supports multiple rooms and private messaging.',
    imageUrl: 'https://picsum.photos/seed/project5/600/400',
    imageHint: 'chat interface',
    repoUrl: '#',
    tags: ['Node.js', 'Socket.IO', 'React', 'MongoDB', 'Real-time'],
  },
  {
    id: '6',
    title: 'Personal Blog Platform',
    description: 'A custom-built blogging platform with a Markdown editor, categories, tags, and a comment system. Developed using Next.js and Supabase.',
    imageUrl: 'https://picsum.photos/seed/project6/600/400',
    imageHint: 'blog website',
    liveDemoUrl: '#',
    repoUrl: '#',
    tags: ['Next.js', 'Supabase', 'Markdown', 'PostgreSQL', 'SSR'],
  }
];

export const skillsData: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: Braces, // Changed from Code
    iconColor: 'text-sky-500',
    skills: [
      { name: 'Python', icon: SquareCode, description: 'Versatile language for web, data science, and AI.' }, // Changed
      { name: 'JavaScript', icon: SquareCode, description: 'Core language for web interactivity and full-stack development.' }, // Changed
      { name: 'TypeScript', icon: SquareCode, description: 'Superset of JavaScript adding static types for robust applications.' }, // Changed
      { name: 'Java', icon: Coffee, description: 'Widely-used, object-oriented language for enterprise applications.' },
      { name: 'C / C++', icon: Binary, description: 'Powerful languages for system programming and performance-critical tasks.' },
      { name: 'HTML / CSS', icon: Palette, description: 'Fundamental technologies for structuring and styling web content.' },
    ],
  },
  {
    name: 'Web Development',
    icon: Laptop,
    iconColor: 'text-blue-600',
    skills: [
      { name: 'React.js', icon: Orbit, description: 'JavaScript library for building user interfaces.' },
      { name: 'Next.js', icon: Layers3, description: 'React framework for server-side rendering and static site generation.' },
      { name: 'Node.js', icon: Package, description: 'JavaScript runtime for building server-side applications.' },
      { name: 'Express.js', icon: Route, description: 'Minimalist web framework for Node.js.' },
      { name: 'RESTful APIs', icon: Link, description: 'Designing and implementing scalable web services.' }, // Changed from Webhook
      { name: 'Tailwind CSS', icon: Wind, description: 'Utility-first CSS framework for rapid UI development.' },
      { name: 'Bootstrap', icon: GalleryThumbnails, description: 'Popular front-end framework for responsive web design.' },
    ],
  },
  {
    name: 'Mobile Development',
    icon: Smartphone,
    iconColor: 'text-green-500',
    skills: [
      { name: 'React Native', icon: Orbit, description: 'Framework for building native mobile apps with React.' },
      { name: 'Flutter (Dart)', icon: AppWindow, description: 'UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.' },
      { name: 'Android (Java/Kotlin)', icon: Smartphone, description: 'Native Android app development using Java and Kotlin.' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: CloudCog,
    iconColor: 'text-purple-500',
    skills: [
      { name: 'Microsoft Azure', icon: Cloud, description: 'Cloud computing platform for building, deploying, and managing applications.' },
      { name: 'GitHub Actions', icon: Workflow, description: 'CI/CD and automation platform integrated with GitHub.' },
      { name: 'Docker', icon: Anchor, description: 'Platform for developing, shipping, and running applications in containers.' },
      { name: 'Firebase', icon: Cloud, description: 'Platform for building mobile and web applications with backend services.' },
    ],
  },
  {
    name: 'Databases',
    icon: Database, // Using generic Database icon for category
    iconColor: 'text-yellow-500',
    skills: [
      { name: 'MongoDB', icon: DatabaseZap, description: 'NoSQL document-oriented database.' },
      { name: 'MySQL', icon: SqlDatabase, description: 'Popular open-source relational database.' }, // Changed
      { name: 'PostgreSQL', icon: SqlDatabase, description: 'Powerful open-source object-relational database system.' }, // Changed
      { name: 'SQLite', icon: FileText, description: 'Lightweight, file-based relational database.' },
    ],
  },
  {
    name: 'AI / ML / Data',
    icon: BrainCircuit, // Changed from Brain
    iconColor: 'text-red-500',
    skills: [
      { name: 'Pandas', icon: BarChart2, description: 'Data manipulation and analysis library for Python.' },
      { name: 'NumPy', icon: Atom, description: 'Fundamental package for numerical computation in Python.' },
      { name: 'Scikit-learn', icon: TestTube2, description: 'Machine learning library for Python.' },
      { name: 'TensorFlow', icon: Cpu, description: 'Open-source machine learning framework.' },
      { name: 'Keras', icon: Blocks, description: 'High-level neural networks API, running on top of TensorFlow.' },
      { name: 'OpenAI API', icon: Bot, description: 'Access to powerful AI models like GPT for various tasks.' },
      { name: 'Data Visualization', icon: Share2, description: 'Creating informative visuals with Matplotlib and Seaborn.' },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: Settings2, // Changed from Settings
    iconColor: 'text-indigo-500',
    skills: [
      { name: 'Git', icon: GitFork, description: 'Distributed version control system.' },
      { name: 'GitHub', icon: FolderGit2, description: 'Web-based platform for version control and collaboration using Git.' },
      { name: 'VS Code', icon: FileCode, description: 'Popular source code editor with extensive features.' },
      { name: 'Figma', icon: Figma, description: 'Collaborative interface design tool.' },
      { name: 'Adobe XD', icon: DraftingCompass, description: 'Vector-based UI/UX design tool for web and mobile apps.' }, // Changed
      { name: 'Postman', icon: Network, description: 'API platform for building and using APIs.' },
      { name: 'Linux', icon: Terminal, description: 'Open-source operating system widely used in servers and development.' },
      { name: 'WSL', icon: Laptop, description: 'Windows Subsystem for Linux for running Linux environments on Windows.' },
      { name: 'Ubuntu', icon: ServerCog, description: 'Popular Linux distribution.' },
    ],
  },
  {
    name: 'Soft Skills',
    icon: CircleUser, // Changed from Users
    iconColor: 'text-teal-500',
    skills: [
      { name: 'Problem Solving', icon: Lightbulb, description: 'Identifying issues and implementing effective solutions.' },
      { name: 'Communication', icon: MessageSquare, description: 'Clearly conveying ideas and collaborating with teams.' },
      { name: 'Team Collaboration', icon: Users2, description: 'Working effectively with others towards common goals.' },
      { name: 'Time Management', icon: Clock, description: 'Organizing tasks and meeting deadlines efficiently.' },
      { name: 'Creativity', icon: Sparkles, description: 'Developing innovative ideas and approaches.' },
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
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Journey" },
  { href: "#certifications", label: "Certifications" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

