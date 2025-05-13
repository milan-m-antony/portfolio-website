
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Certification } from '@/data/portfolioData';
import { cn } from '@/lib/utils';

interface CertificationCardProps {
  certification: Certification;
  onClick?: () => void;
}

export default function CertificationCard({ certification, onClick }: CertificationCardProps) {
  return (
    <Card 
      className={cn(
        "flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      aria-label={onClick ? `View details for ${certification.title}` : undefined}
    >
      <div className="relative w-full h-40 group"> {/* Added group for potential image zoom on hover */}
        <Image
          src={certification.imageUrl}
          alt={certification.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105" // Optional: zoom image on hover
          data-ai-hint={certification.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{certification.title}</CardTitle>
        <CardDescription>{certification.issuer} - {certification.date}</CardDescription>
      </CardHeader>
      {certification.verifyUrl && (
        <CardFooter className="mt-auto pt-0">
          <Button 
            asChild 
            variant="link" 
            className="p-0 h-auto text-primary"
            onClick={(e) => e.stopPropagation()} // Prevent card's onClick if clicking the link
          >
            <Link href={certification.verifyUrl} target="_blank" rel="noopener noreferrer">
              Verify Credential <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
