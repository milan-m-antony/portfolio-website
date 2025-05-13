import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Certification } from '@/data/portfolioData';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <div className="relative w-full h-40">
        <Image
          src={certification.imageUrl}
          alt={certification.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={certification.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{certification.title}</CardTitle>
        <CardDescription>{certification.issuer} - {certification.date}</CardDescription>
      </CardHeader>
      {certification.verifyUrl && (
        <CardFooter className="mt-auto pt-0">
          <Button asChild variant="link" className="p-0 h-auto text-primary">
            <Link href={certification.verifyUrl} target="_blank" rel="noopener noreferrer">
              Verify Credential <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
