
"use client";

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, LogOut, AlertTriangle, LogIn, PlusCircle, Edit, Trash2, Home } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import type { Project, ProjectStatus } from '@/types/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger, // No longer needed here if button manually sets state
} from "@/components/ui/alert-dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image_hint: z.string().optional(),
  live_demo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(tag => tag)),
  status: z.enum(['Deployed', 'In Progress', 'Prototype', 'Archived', 'Concept', 'Completed']),
  progress: z.coerce.number().min(0).max(100).optional().nullable(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

type CurrentProjectEditState = Omit<Project, 'tags' | 'created_at' | 'imageUrl' | 'liveDemoUrl' | 'repoUrl' | 'imageHint'> & {
    tags: string;
    imageUrl?: string | null;
    liveDemoUrl?: string | null;
    repoUrl?: string | null;
    imageHint?: string | null;
    created_at?: string;
};


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
  const [currentProject, setCurrentProject] = useState<CurrentProjectEditState | null>(null);
  const { toast } = useToast();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);


  const { register, handleSubmit, reset, setValue, formState: { errors: formErrors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
        title: '',
        description: '',
        image_url: '',
        image_hint: '',
        live_demo_url: '',
        repo_url: '',
        tags: '',
        status: 'Concept',
        progress: null,
      }
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
      setValue('image_url', currentProject.imageUrl || '');
      setValue('image_hint', currentProject.imageHint || '');
      setValue('live_demo_url', currentProject.liveDemoUrl || '');
      setValue('repo_url', currentProject.repoUrl || '');
      setValue('tags', currentProject.tags);
      setValue('status', currentProject.status || 'Concept');
      setValue('progress', currentProject.progress === null || currentProject.progress === undefined ? null : Number(currentProject.progress));
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
        progress: null,
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
      console.error('Error fetching projects:', JSON.stringify(fetchError, null, 2));
      toast({ title: "Error", description: `Could not fetch projects: ${fetchError.message || 'Supabase returned an error without a specific message. Check RLS policies or console for details.'}`, variant: "destructive" });
      setProjects([]);
    } else if (data) {
      const mappedProjects: Project[] = data.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        imageUrl: p.image_url,
        imageHint: p.image_hint,
        liveDemoUrl: p.live_demo_url,
        repoUrl: p.repo_url,
        tags: p.tags,
        status: p.status as ProjectStatus,
        progress: p.progress,
        created_at: p.created_at,
      }));
      setProjects(mappedProjects);
    } else {
      setProjects([]);
    }
    setIsLoadingProjects(false);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const correctUsername = "milanmantony2002@gmail.com";
    const correctPassword = "Ma@#9746372046";

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === correctUsername && trimmedPassword === correctPassword) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdminAuthenticated', 'true');
        window.dispatchEvent(new CustomEvent('authChange'));
      }
      setIsAuthenticatedForRender(true);
      fetchProjects();
    } else {
      setError("Invalid username or password.");
      setIsAuthenticatedForRender(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdminAuthenticated');
      window.dispatchEvent(new CustomEvent('authChange'));
    }
    setIsAuthenticatedForRender(false);
    setUsername('');
    setPassword('');
    setProjects([]);
  };

  const onProjectSubmit: SubmitHandler<ProjectFormData> = async (formData) => {
    const projectDataToSave = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      image_hint: formData.image_hint || null,
      live_demo_url: formData.live_demo_url || null,
      repo_url: formData.repo_url || null,
      tags: formData.tags,
      status: formData.status,
      progress: formData.status === 'In Progress' && formData.progress !== undefined && formData.progress !== null ? Number(formData.progress) : null,
    };

    if (currentProject?.id) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectDataToSave)
        .eq('id', currentProject.id);
      if (updateError) {
        console.error("Error updating project (raw Supabase error object):", JSON.stringify(updateError, null, 2));
        toast({ title: "Error", description: `Failed to update project: ${updateError.message || 'Supabase returned an error without a specific message. Check RLS policies or console for details.'}`, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project updated successfully." });
      }
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert(projectDataToSave as any);
      if (insertError) {
        console.error("Error adding project (raw Supabase error object):", JSON.stringify(insertError, null, 2));
        toast({ title: "Error", description: `Failed to add project: ${insertError.message || 'Supabase returned an error without a specific message. Check RLS policies or console for details.'}`, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project added successfully." });
      }
    }
    setIsProjectModalOpen(false);
    setCurrentProject(null);
    fetchProjects();
    router.refresh();
  };

  const triggerDeleteConfirmation = (project: Project) => {
    console.log("[AdminDashboard] triggerDeleteConfirmation called for project:", project.title);
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const performDeleteProject = async (projectId: string) => {
    console.log(`[AdminDashboard] performDeleteProject called for projectId: ${projectId}`);
    // Log 3 from previous debugging
    if (!projectToDelete || projectToDelete.id !== projectId) {
        console.error("[AdminDashboard] Mismatch or missing projectToDelete state for ID:", projectId);
        toast({ title: "Error", description: "Could not delete project due to an internal state error.", variant: "destructive"});
        setShowDeleteConfirm(false);
        setProjectToDelete(null);
        return;
    }
    console.log("[AdminDashboard] User confirmed delete. Proceeding with Supabase call...");

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (deleteError) {
      console.error("[AdminDashboard] Error deleting project (raw Supabase error object):", JSON.stringify(deleteError, null, 2)); // Log 4 from previous debugging
      toast({ title: "Error", description: `Failed to delete project: ${deleteError.message || 'Supabase returned an error without a specific message. Check RLS policies or console for details.'}`, variant: "destructive" });
    } else {
      console.log("[AdminDashboard] Project deleted successfully from Supabase.");
      toast({ title: "Success", description: "Project deleted successfully." });
      fetchProjects(); // Re-fetch projects to update the list
      router.refresh();
    }
    setShowDeleteConfirm(false); // Close modal after operation
    setProjectToDelete(null); // Clear the project to delete state
  };


  const handleOpenProjectModal = (project?: Project) => {
    setCurrentProject(project ? {
        ...project, // Spread all original Project properties
        tags: (Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || '')),
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
                <Input id="username" type="email" value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder="milanmantony2002@gmail.com" required className="bg-background/70 focus:bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} placeholder="••••••••" required className="bg-background/70 focus:bg-background" />
              </div>
              <Button type="submit" className="w-full text-lg py-3">
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </Button>
            </form>
             <div className="mt-6 text-center">
                <Button variant="link" asChild>
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" /> Back to Portfolio
                    </Link>
                </Button>
            </div>
            <p className="mt-4 text-xs text-center text-muted-foreground">Restricted area. Authorized personnel only.</p>
          </CardContent>
        </Card>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <SectionTitle subtitle="Manage portfolio content.">Admin Dashboard</SectionTitle>
      <div className="flex justify-between items-center mb-6">
        <Button asChild className="mb-0">
            <Link href="/">Back to Portfolio</Link>
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Projects Management Section */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Manage Projects
            <Dialog open={isProjectModalOpen} onOpenChange={(isOpen) => {
                setIsProjectModalOpen(isOpen);
                if (!isOpen) setCurrentProject(null);
             }}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenProjectModal()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onProjectSubmit)} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto p-2 scrollbar-hide">
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
                    <Label htmlFor="image_hint">Image Hint (for AI placeholders)</Label>
                    <Input id="image_hint" {...register("image_hint")} placeholder="e.g. online store, tech gear" />
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
                    <Input id="tags" {...register("tags" as any)} placeholder="React, Next.js, Supabase" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        {...register("status")}
                        className="w-full p-2 border rounded-md bg-background text-sm focus:ring-ring focus:border-input"
                    >
                      {(['Concept', 'Prototype', 'In Progress', 'Completed', 'Deployed', 'Archived'] as ProjectStatus[]).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="progress">Progress (0-100, for 'In Progress')</Label>
                    <Input id="progress" type="number" {...register("progress", {setValueAs: (v) => (v === '' || v === null || v === undefined ? null : Number(v))})} />
                     {formErrors.progress && <p className="text-destructive text-sm mt-1">{formErrors.progress.message}</p>}
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
          {isLoadingProjects ? <p className="text-center text-muted-foreground">Loading projects...</p> : (
            projects.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No projects found. Add one to get started!</p>
            ) : (
                <div className="space-y-4">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:shadow-md transition-shadow">
                    <div className="flex-grow mb-3 sm:mb-0">
                        <h4 className="font-semibold text-lg">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">
                        Status: <span className={`font-medium ${project.status === 'Deployed' ? 'text-green-600' : project.status === 'In Progress' ? 'text-blue-600' : 'text-gray-600'}`}>{project.status}</span>
                        {project.status === 'In Progress' && project.progress != null && ` (${project.progress}%)`}
                        </p>
                        {project.tags && (Array.isArray(project.tags) ? project.tags.length > 0 : (project.tags as string).length > 0) && (
                        <p className="text-xs text-muted-foreground mt-1">Tags: {(Array.isArray(project.tags) ? project.tags.join(', ') : project.tags)}</p>
                        )}
                    </div>
                    <div className="flex space-x-2 self-start sm:self-center shrink-0">
                        <Button variant="outline" size="sm" onClick={() => handleOpenProjectModal(project)}>
                        <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
                        </Button>
                        {/* Removed AlertDialogTrigger wrapper, button onClick now directly triggers confirmation */}
                        <Button variant="destructive" size="sm" onClick={() => triggerDeleteConfirmation(project)}>
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                        </Button>
                    </div>
                    </Card>
                ))}
                </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-destructive border-destructive text-destructive-foreground">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive-foreground">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-destructive-foreground/90">
              This action cannot be undone. This will permanently delete the
              project "{projectToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowDeleteConfirm(false);
                setProjectToDelete(null);
              }}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-destructive-foreground/40 text-destructive-foreground",
                "hover:bg-destructive-foreground/10 hover:text-destructive-foreground hover:border-destructive-foreground/60"
              )}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (projectToDelete) {
                  performDeleteProject(projectToDelete.id);
                }
                // setShowDeleteConfirm(false); // Already handled in performDeleteProject or its callback
                // setProjectToDelete(null); // Already handled in performDeleteProject or its callback
              }}
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-destructive-foreground text-destructive",
                "hover:bg-destructive-foreground/90"
              )}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* Placeholder for other sections */}
      <Card className="mb-8 shadow-lg">
        <CardHeader><CardTitle>Manage Skills (Coming Soon)</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Functionality to add, edit, and delete skills categories and individual skills will be here.</p></CardContent>
      </Card>
       <Card className="mb-8 shadow-lg">
        <CardHeader><CardTitle>Manage About Content (Coming Soon)</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Functionality to edit the About Me section content.</p></CardContent>
      </Card>
    </SectionWrapper>
  );
}
