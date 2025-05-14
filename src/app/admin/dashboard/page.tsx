
"use client";

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, LogOut, AlertTriangle, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticatedForRender, setIsAuthenticatedForRender] = useState(false);

  // State for login form if not authenticated
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAuthenticatedForRender(authStatus);
    }
  }, []);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(''); 

    const correctUsername = "milanmantony2002@gmail.com";
    const correctPassword = "Ma@#9746372046";

    if (username === correctUsername && password === correctPassword) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdminAuthenticated', 'true');
      }
      setIsAuthenticatedForRender(true); // Re-render to show dashboard content
    } else {
      setError("Invalid username or password. Please try again.");
      setIsAuthenticatedForRender(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdminAuthenticated');
    }
    setIsAuthenticatedForRender(false); // Re-render to show login form
    setUsername(''); // Clear form fields
    setPassword('');
  };

  if (!isMounted) {
    return (
      <SectionWrapper>
        <SectionTitle subtitle="Loading...">
          Admin Area
        </SectionTitle>
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!isAuthenticatedForRender) {
    // Render Login Form
    return (
      <SectionWrapper className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/30">
        <Card className="w-full max-w-md shadow-2xl bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <LogIn className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
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
                <Input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="milanmantony2002@gmail.com"
                  required
                  className="bg-background/70 focus:bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-background/70 focus:bg-background"
                />
              </div>
              <Button type="submit" className="w-full text-lg py-3">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </Button>
            </form>
            <p className="mt-6 text-xs text-center text-muted-foreground">
              This is a restricted area. Authorized personnel only.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>
    );
  }
  

  // Render Dashboard Content
  return (
    <SectionWrapper>
      <SectionTitle subtitle="Manage your portfolio content from one central place.">
        Admin Dashboard
      </SectionTitle>
      <Card className="max-w-2xl mx-auto text-center shadow-xl">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Content Management Area</CardTitle>
          <CardDescription>
            This area is intended for administrators to add, edit, and delete portfolio content.
            This is a basic client-side authenticated section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Welcome, Admin! Here you would find tools to manage projects, skills, timeline entries, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Back to Portfolio</Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
