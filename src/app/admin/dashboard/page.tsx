
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
      if (isAuthenticated !== 'true') {
        router.replace('/admin');
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdminAuthenticated');
    }
    router.push('/admin');
  };

  if (!isMounted) {
    // Prevent flash of content before auth check on client
    return (
      <SectionWrapper>
        <SectionTitle subtitle="Loading dashboard...">
          Admin Dashboard
        </SectionTitle>
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </SectionWrapper>
    );
  }

  // Ensure localStorage check has completed and user is authenticated client-side
  if (typeof window !== 'undefined' && localStorage.getItem('isAdminAuthenticated') !== 'true') {
    return null; // Or a loading state, handled by useEffect redirect
  }
  

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
