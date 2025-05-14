
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, LogIn } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // If already "authenticated", redirect to dashboard
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
      if (isAuthenticated === 'true') {
        router.replace('/admin/dashboard');
      }
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Hardcoded credentials
    const correctUsername = "milanmantony2002@gmail.com";
    const correctPassword = "Ma@#9746372046";

    if (username === correctUsername && password === correctPassword) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdminAuthenticated', 'true');
      }
      router.push('/admin/dashboard');
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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
