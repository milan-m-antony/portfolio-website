import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
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
            Full functionality including authentication and CRUD operations would be implemented here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Currently, this is a placeholder page. In a complete application, you would find tools to manage projects, skills, timeline entries, and more.
          </p>
          <Button asChild>
            <Link href="/">Back to Portfolio</Link>
          </Button>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
