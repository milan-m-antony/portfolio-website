
"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, LogOut, AlertTriangle, LogIn, PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import type { Project } from '@/types/supabase'; // Use Project type from Supabase
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from '@/hooks/use-toast';


const projectSchema = z.object({
  id: z.string().optional(), // UUID, optional for new projects
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image_hint: z.string().optional(),
  live_demo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(tag => tag)), // Comma-separated to array
  status: z.enum(['Deployed', 'In Progress', 'Prototype', 'Archived', 'Concept', 'Completed']),
  progress: z.coerce.number().min(0).max(100).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;


export default function AdminDashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticatedForRender, setIsAuthenticatedForRender] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectFormData | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors: formErrors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAuthenticatedForRender(authStatus);
      if (authStatus) {
        fetchProjects();
      }
    }
  }, []);
  
  useEffect(() => {
    if (currentProject) {
      setValue('id', currentProject.id);
      setValue('title', currentProject.title);
      setValue('description', currentProject.description || '');
      setValue('image_url', currentProject.image_url || '');
      setValue('image_hint', currentProject.image_hint || '');
      setValue('live_demo_url', currentProject.live_demo_url || '');
      setValue('repo_url', currentProject.repo_url || '');
      setValue('tags', (currentProject.tags || []).join(', '));
      setValue('status', currentProject.status || 'Concept');
      setValue('progress', currentProject.progress || 0);
    } else {
      reset({
        title: '',
        description: '',
        image_url: '',
        image_hint: '',
        live_demo_url: '',
        repo_url: '',
        tags: '',
        status: 'Concept',
        progress: 0,
      });
    }
  }, [currentProject, setValue, reset]);


  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      toast({ title: "Error", description: "Could not fetch projects.", variant: "destructive" });
      setProjects([]);
    } else {
      setProjects(data as Project[]);
    }
    setIsLoadingProjects(false);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const correctUsername = "milanmantony2002@gmail.com";
    const correctPassword = "Ma@#9746372046";

    if (username === correctUsername && password === correctPassword) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdminAuthenticated', 'true');
      }
      setIsAuthenticatedForRender(true);
      fetchProjects(); // Fetch projects after successful login
    } else {
      setError("Invalid username or password.");
      setIsAuthenticatedForRender(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdminAuthenticated');
    }
    setIsAuthenticatedForRender(false);
    setUsername('');
    setPassword('');
    setProjects([]); // Clear projects data on logout
  };

  const onProjectSubmit: SubmitHandler<ProjectFormData> = async (formData) => {
    const projectDataToSave = {
      ...formData,
      // Ensure optional fields that are empty strings are set to null for Supabase
      image_url: formData.image_url || null,
      image_hint: formData.image_hint || null,
      live_demo_url: formData.live_demo_url || null,
      repo_url: formData.repo_url || null,
      progress: formData.status === 'In Progress' ? formData.progress : null,
    };

    if (currentProject?.id) { // Update existing project
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectDataToSave)
        .eq('id', currentProject.id);
      if (updateError) {
        console.error("Error updating project:", updateError);
        toast({ title: "Error", description: `Failed to update project: ${updateError.message}`, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project updated successfully." });
      }
    } else { // Create new project
      const { id, ...dataToInsert } = projectDataToSave; // remove id if it's undefined
      const { error: insertError } = await supabase
        .from('projects')
        .insert(dataToInsert);
      if (insertError) {
        console.error("Error adding project:", insertError);
        toast({ title: "Error", description: `Failed to add project: ${insertError.message}`, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project added successfully." });
      }
    }
    setIsProjectModalOpen(false);
    setCurrentProject(null);
    fetchProjects(); // Refresh project list
    router.refresh(); // To re-fetch server components if project list is displayed elsewhere
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (deleteError) {
      console.error("Error deleting project:", deleteError);
      toast({ title: "Error", description: `Failed to delete project: ${deleteError.message}`, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Project deleted successfully." });
      fetchProjects();
      router.refresh();
    }
  };
  
  const handleOpenProjectModal = (project?: Project) => {
    setCurrentProject(project ? {
        ...project,
        image_url: project.imageUrl || '', // map back from component prop
        live_demo_url: project.liveDemoUrl || '',
        repo_url: project.repoUrl || '',
        tags: (project.tags || []).join(', ') // Convert array back to comma-separated string for form
    } : null);
    setIsProjectModalOpen(true);
  };


  if (!isMounted) {
    return (
      <SectionWrapper>
        <SectionTitle subtitle="Loading...">Admin Area</SectionTitle>
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!isAuthenticatedForRender) {
    return (
      <SectionWrapper className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <LogIn className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-fadeIn">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Email Address</Label>
                <Input id="username" type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="milanmantony2002@gmail.com" required className="bg-background/70 focus:bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="bg-background/70 focus:bg-background" />
              </div>
              <Button type="submit" className="w-full text-lg py-3">
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </Button>
            </form>
            <p className="mt-6 text-xs text-center text-muted-foreground">Restricted area. Authorized personnel only.</p>
          </CardContent>
        </Card>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <SectionTitle subtitle="Manage portfolio content.">Admin Dashboard</SectionTitle>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
      <Button asChild className="mb-4">
          <Link href="/">Back to Portfolio</Link>
      </Button>

      {/* Projects Management Section */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Manage Projects
            <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenProjectModal()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onProjectSubmit)} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto p-2">
                  {/* Form fields */}
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} />
                    {formErrors.title && <p className="text-destructive text-sm mt-1">{formErrors.title.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" {...register("description")} />
                    {formErrors.description && <p className="text-destructive text-sm mt-1">{formErrors.description.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input id="image_url" {...register("image_url")} placeholder="https://example.com/image.png" />
                     {formErrors.image_url && <p className="text-destructive text-sm mt-1">{formErrors.image_url.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="image_hint">Image Hint (for AI)</Label>
                    <Input id="image_hint" {...register("image_hint")} placeholder="e.g. online store" />
                  </div>
                  <div>
                    <Label htmlFor="live_demo_url">Live Demo URL</Label>
                    <Input id="live_demo_url" {...register("live_demo_url")} placeholder="https://example.com/demo" />
                    {formErrors.live_demo_url && <p className="text-destructive text-sm mt-1">{formErrors.live_demo_url.message}</p>}
                  </div>
                   <div>
                    <Label htmlFor="repo_url">Repository URL</Label>
                    <Input id="repo_url" {...register("repo_url")} placeholder="https://github.com/user/repo" />
                    {formErrors.repo_url && <p className="text-destructive text-sm mt-1">{formErrors.repo_url.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" {...register("tags")} placeholder="React, Next.js, Supabase" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select id="status" {...register("status")} className="w-full p-2 border rounded-md bg-background">
                      {['Concept', 'Prototype', 'In Progress', 'Completed', 'Deployed', 'Archived'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="progress">Progress (0-100, for 'In Progress')</Label>
                    <Input id="progress" type="number" {...register("progress")} />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">{currentProject?.id ? 'Save Changes' : 'Add Project'}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingProjects ? <p>Loading projects...</p> : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="flex justify-between items-center p-4">
                  <div>
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">{project.status} - {project.tags?.join(', ')}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpenProjectModal(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              {projects.length === 0 && <p>No projects found. Add one!</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Placeholder for other sections (Skills, About, Timeline, Certifications) */}
      <Card className="mb-8 shadow-lg">
        <CardHeader><CardTitle>Manage Skills (Coming Soon)</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Functionality to add, edit, and delete skills categories and individual skills will be here.</p></CardContent>
      </Card>
       <Card className="mb-8 shadow-lg">
        <CardHeader><CardTitle>Manage About Content (Coming Soon)</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Functionality to edit the About Me section content.</p></CardContent>
      </Card>
       {/* Add similar placeholders for Timeline and Certifications */}

    </SectionWrapper>
  );
}

