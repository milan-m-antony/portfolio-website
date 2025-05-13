
"use client";

import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Typewriter = ({ text, speed = 100 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, text, speed]);

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
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          <Typewriter text="Hi, I'm Milan" />
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 text-foreground/90">
          <Typewriter text="— a Creative Developer" speed={75} />
        </p>
        {/* Removed Scroll to explore button */}
      </div>
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ArrowDown className="h-8 w-8 text-foreground/70 animate-bounce" />
      </div>
    </section>
  );
}

