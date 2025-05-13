
"use client";

import { useEffect, useState } from 'react';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Enhanced Typewriter component specific to HeroSection
const EnhancedTypewriter = ({
  texts,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseAfterTypingDuration = 1500,
  pauseAfterDeletingDuration = 500,
}: {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTypingDuration?: number;
  pauseAfterDeletingDuration?: number;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  // charDisplayProgress tracks the number of characters currently displayed from the target string
  const [charDisplayProgress, setCharDisplayProgress] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentTargetText = texts[currentTextIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) { // Typing phase
      if (charDisplayProgress < currentTargetText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentTargetText.substring(0, charDisplayProgress + 1));
          setCharDisplayProgress((prev) => prev + 1);
        }, typingSpeed);
      } else { // Finished typing, pause then switch to deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
          // charDisplayProgress is already at currentTargetText.length, which is correct for starting deletion
        }, pauseAfterTypingDuration);
      }
    } else { // Deleting phase
      if (charDisplayProgress > 0) {
        timer = setTimeout(() => {
          // Use currentTargetText to ensure correct substring during deletion
          setDisplayedText(currentTargetText.substring(0, charDisplayProgress - 1));
          setCharDisplayProgress((prev) => prev - 1);
        }, deletingSpeed);
      } else { // Finished deleting, pause then switch to next text
        timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          // charDisplayProgress is 0, ready for next typing. displayedText is already ""
        }, pauseAfterDeletingDuration);
      }
    }

    return () => clearTimeout(timer);
  }, [
    charDisplayProgress,
    isDeleting,
    currentTextIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseAfterTypingDuration,
    pauseAfterDeletingDuration,
  ]);

  // Effect to reset progress when the text to display (currentTextIndex) changes,
  // ensuring we start typing the new text from scratch.
  useEffect(() => {
    // Only reset if we are not in a deleting phase.
    // This check ensures that if currentTextIndex changes as part of finishing deletion,
    // we correctly reset for the *next* typing cycle.
    if (!isDeleting) {
      setCharDisplayProgress(0);
      setDisplayedText('');
    }
  }, [currentTextIndex, isDeleting]); // isDeleting is included to correctly handle the transition from deleting to typing the next word


  return <span>{displayedText}</span>;
};


export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { href: "https://github.com/yourusername", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/yourusername", icon: Linkedin, label: "LinkedIn" },
    { href: "https://instagram.com/yourusername", icon: Instagram, label: "Instagram" },
    { href: "https://facebook.com/yourusername", icon: Facebook, label: "Facebook" },
  ];

  const roles = [
    "— a Creative Developer",
    "— a Cloud Developer",
    "— a Web Designer",
    "— a Network Engineer",
    "— a Full-Stack Specialist",
  ];

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center bg-background text-foreground p-4">
      {/* Social Media Icons */}
      <div className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-4">
        {socialLinks.map((social) => (
          <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
            <social.icon className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors duration-300 ease-in-out transform hover:scale-110" />
          </Link>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 animate-float">
           <Image
            src="https://picsum.photos/seed/avatar/150/150"
            alt="Milan - Creative Developer"
            width={150}
            height={150}
            className="rounded-full border-4 border-primary shadow-lg"
            data-ai-hint="profile picture"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {/* Simple static text for the name, as typewriter is now for roles */}
          Hi, I'm Milan
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 text-foreground/90 min-h-[2.5em] sm:min-h-[1.5em]">
          <EnhancedTypewriter 
            texts={roles} 
            typingSpeed={60} 
            deletingSpeed={40}
            pauseAfterTypingDuration={1800}
            pauseAfterDeletingDuration={300}
          />
        </p>
      </div>
    </section>
  );
}
