"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import CertificationCard from '@/components/ui/CertificationCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { certificationsData } from '@/data/portfolioData';
import type { Certification } from '@/data/portfolioData';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

const getResponsiveVisibleCardsCount = () => {
  if (typeof window === 'undefined') return 1; // Default for SSR
  if (window.innerWidth >= 1280) return 3; // xl and up: 3 cards
  if (window.innerWidth >= 768) return 2;  // md to lg: 2 cards
  return 1; // sm and down: 1 card
};

export default function CertificationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [visibleCardsCountOnClient, setVisibleCardsCountOnClient] = useState<number | null>(null); // Initialize as null
  
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCertifications = certificationsData.length;

  useEffect(() => {
    // This effect runs only on the client after hydration
    const calculateAndSetVisibleCards = () => {
      const count = getResponsiveVisibleCardsCount();
      setVisibleCardsCountOnClient(count);
    };

    calculateAndSetVisibleCards();
    window.addEventListener('resize', calculateAndSetVisibleCards);
    return () => window.removeEventListener('resize', calculateAndSetVisibleCards);
  }, []);

  const currentVisibleCards = visibleCardsCountOnClient ?? 1; // Default to 1 for SSR

  useEffect(() => {
    if (totalCertifications > 0 && currentVisibleCards > 0) {
      const maxPossibleIndex = Math.max(0, totalCertifications - currentVisibleCards);
      if (currentIndex > maxPossibleIndex) {
        setCurrentIndex(maxPossibleIndex);
      } else if (currentIndex < 0) {
        setCurrentIndex(0);
      }
    }
  }, [currentVisibleCards, totalCertifications, currentIndex]);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (totalCertifications <= currentVisibleCards) return;
    setCurrentIndex((prevIndex) => {
      const nextIndexCandidate = prevIndex + 1;
      if (nextIndexCandidate > totalCertifications - currentVisibleCards) {
        return 0;
      }
      return nextIndexCandidate;
    });
  }, [totalCertifications, currentVisibleCards]);

  useEffect(() => {
    resetTimeout();
    if (!isPaused && totalCertifications > currentVisibleCards) {
      timeoutRef.current = setTimeout(handleNext, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPaused, totalCertifications, currentVisibleCards, resetTimeout, handleNext]);

  const handlePrev = () => {
    if (totalCertifications <= currentVisibleCards) return;
    setCurrentIndex((prevIndex) => {
      const prevIndexCandidate = prevIndex - 1;
      if (prevIndexCandidate < 0) {
        return Math.max(0, totalCertifications - currentVisibleCards);
      }
      return prevIndexCandidate;
    });
  };

  const handleCertificationClick = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  if (!certificationsData || totalCertifications === 0) {
    return (
      <SectionWrapper id="certifications" className="bg-background section-fade-in" style={{ animationDelay: '1.0s' }}>
        <SectionTitle subtitle="A collection of certifications and badges.">
          Certifications & Badges
        </SectionTitle>
        <p className="text-center text-muted-foreground">No certifications to display at the moment.</p>
      </SectionWrapper>
    );
  }

  const cardWidthPercentage = currentVisibleCards > 0 ? 100 / currentVisibleCards : 100;

  return (
    <SectionWrapper id="certifications" className="bg-background section-fade-in" style={{ animationDelay: '1.0s' }}>
      <SectionTitle subtitle="A collection of certifications and badges earned from reputable platforms, validating my expertise.">
        Certifications & Badges
      </SectionTitle>

      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="overflow-hidden rounded-lg">
          {/* Conditional rendering: Only render the slider content if visibleCardsCountOnClient is set (client-side) */}
          {visibleCardsCountOnClient !== null ? (
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / currentVisibleCards)}%)` }} // Recalculate transform
              role="list"
            >
              {certificationsData.map((cert, index) => (
                <div
                  key={cert.id}
                  className="flex-shrink-0 p-1 md:p-2 box-border"
                  style={{ width: `${cardWidthPercentage}%` }}
                  role="listitem"
                  aria-hidden={!(index >= currentIndex && index < currentIndex + currentVisibleCards)}
                >
                  <CertificationCard 
                    certification={cert} 
                    onClick={() => handleCertificationClick(cert)} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-80"> {/* Adjusted height for certification cards */}
               <p className="text-muted-foreground">Loading certifications...</p>
            </div>
          )}
        </div>

        {/* Render buttons only if client-side calculation is done and there are enough certifications */}
        {visibleCardsCountOnClient !== null && totalCertifications > currentVisibleCards && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-1 sm:ml-2 md:ml-4 opacity-70 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80 focus:opacity-100"
              onClick={handlePrev}
              aria-label="Previous certification"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-1 sm:mr-2 md:mr-4 opacity-70 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80 focus:opacity-100"
              onClick={handleNext}
              aria-label="Next certification"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {selectedCertification && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl w-full p-0">
            <DialogHeader className="p-4 border-b">
              <DialogTitle>{selectedCertification.title}</DialogTitle>
              <DialogDescription>Issued by {selectedCertification.issuer} on {selectedCertification.date}</DialogDescription>
               <DialogClose asChild>
                <Button variant="ghost" size="icon" className="absolute right-4 top-3">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </DialogHeader>
            <div className="p-4">
              <div className="relative w-full aspect-[3/2] max-h-[70vh]"> {/* Aspect ratio 3:2 for typical certificate */}
                <Image
                  src={selectedCertification.imageUrl}
                  alt={`Certificate for ${selectedCertification.title}`}
                  layout="fill"
                  objectFit="contain" // Use contain to ensure the whole image is visible
                  className="rounded-md"
                  data-ai-hint={selectedCertification.imageHint + " preview"}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SectionWrapper>
  );
}
