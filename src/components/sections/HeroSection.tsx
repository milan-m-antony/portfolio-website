
"use client";

import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Local Typewriter component specific to HeroSection
const Typewriter = ({ text, speed = 100 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect to reset and start typing when 'text' prop changes
  useEffect(() => {
    setDisplayedText(''); // Reset displayed text
    setCurrentIndex(0);  // Reset current index to start typing from the beginning
  }, [text]); // This effect runs when 'text' prop changes

  // Effect for the typing animation itself
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

  const roles = [
    "— a Creative Developer",
    "— a Cloud Developer",
    "— a Web Designer",
    "— a Network Engineer",
    "— a Full-Stack Specialist",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const typingSpeedForRole = 75;
  const pauseBetweenRoles = 2000; // 2 seconds pause

  useEffect(() => {
    const currentRoleText = roles[currentRoleIndex];
    const timeToType = currentRoleText.length * typingSpeedForRole;
    const cycleDelay = timeToType + pauseBetweenRoles;

    const timer = setTimeout(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, cycleDelay);

    return () => clearTimeout(timer);
  }, [currentRoleIndex, roles, typingSpeedForRole, pauseBetweenRoles]);


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
          <Typewriter text="Hi, I'm Milan" speed={100} />
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 text-foreground/90 min-h-[2.5em] sm:min-h-[1.5em]"> {/* Added min-h to prevent layout shift */}
          <Typewriter text={roles[currentRoleIndex]} speed={typingSpeedForRole} />
        </p>
      </div>
    </section>
  );
}

