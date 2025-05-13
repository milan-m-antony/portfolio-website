
"use client";

import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Coffee } from 'lucide-react';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="section-fade-in bg-background" style={{ animationDelay: '0.2s' }}>
      <SectionTitle subtitle="A little more about who I am and what I do.">
        About Me
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <h3 className="text-3xl font-semibold text-foreground leading-tight">
            Milan: Weaving <span className="text-primary">Code</span> with <span className="text-accent">Creativity</span>
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
              {/* Ensure the resume PDF exists in the public folder */}
              <a href="/resume-milan.pdf" download="Milan_Resume.pdf"> 
                My Resume <Download className="ml-2 h-5 w-5" />
              </a>
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
