"use client";

import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';

// Typewriter component for animating text
const Typewriter = ({ text, speed = 100, onComplete, className }: { text: string, speed?: number, onComplete?: () => void, className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Reset animation if text prop changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsCompleted(false);
  }, [text]);

  useEffect(() => {
    if (!isCompleted && currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else if (!isCompleted && currentIndex === text.length && text.length > 0) {
      // Call onComplete only once when text is fully displayed
      setIsCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, onComplete, isCompleted]);

  // Render a non-breaking space if displayedText is empty to maintain layout
  return <span className={className}>{displayedText || <>&nbsp;</>}</span>;
};

export default function AboutSection() {
  const [typingStage, setTypingStage] = useState(0);

  useEffect(() => {
    // Start the first part of the animation chain after a short delay
    const startTimer = setTimeout(() => setTypingStage(1), 500); // Delay to sync with section fade-in
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <SectionWrapper id="about" className="section-fade-in bg-background" style={{ animationDelay: '0.2s' }}>
      <SectionTitle subtitle="A little more about who I am and what I do.">
        About Me
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <h3 className="text-3xl font-semibold text-foreground leading-tight min-h-[2.5em]"> {/* min-h to prevent layout shift */}
            {typingStage === 0 && <span className="invisible">Milan: Weaving Code with Creativity</span>} {/* Placeholder for layout */}
            {typingStage >= 1 && <Typewriter text="Milan: Weaving " speed={70} onComplete={() => setTypingStage(s => Math.max(s, 2))} />}
            {typingStage >= 2 && <Typewriter text="Code" speed={120} className="text-primary" onComplete={() => setTypingStage(s => Math.max(s, 3))} />}
            {typingStage >= 3 && <Typewriter text=" with " speed={70} onComplete={() => setTypingStage(s => Math.max(s, 4))} />}
            {typingStage >= 4 && <Typewriter text="Creativity" speed={120} className="text-accent" />}
          </h3>
          <p className="text-muted-foreground text-lg">
            Hello! I'm Milan, a passionate Creative Developer with a knack for transforming innovative ideas into engaging digital experiences. My journey in tech is driven by a relentless curiosity and a love for elegant problem-solving.
          </p>
          <p className="text-muted-foreground">
            With a foundation in Computer Science and a keen eye for design, I specialize in full-stack development, focusing on creating intuitive user interfaces and robust backend systems. I thrive in collaborative environments, constantly learning and adapting to new technologies to deliver impactful solutions.
          </p>
          <p className="text-muted-foreground">
            Beyond the screen, I enjoy exploring new coffee shops, hiking trails, and diving into a good book. Let's connect and build something amazing together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="#contact">
                Let's Talk <Coffee className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#resume"> 
                My Resume <Download className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-xl group animate-fadeIn" style={{animationDelay: '0.4s'}}>
          <Image
            src="https://picsum.photos/seed/aboutmilan/600/800"
            alt="Milan working on a project"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="developer working"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
           <div className="absolute bottom-4 left-4 text-white bg-black/40 p-3 rounded-md shadow-md">
            <p className="text-sm font-medium">Fuelled by coffee &amp; code.</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
