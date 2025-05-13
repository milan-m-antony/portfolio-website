"use client";

import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

export default function ResumeSection() {
  const handlePrint = () => {
    // Ideally, you'd have a print-specific version of your resume
    // or open the PDF and trigger print. For simplicity:
    window.print();
  };

  return (
    <SectionWrapper id="resume" className="section-fade-in" style={{ animationDelay: '1.0s' }}>
      <SectionTitle subtitle="Access my comprehensive resume for a detailed overview of my qualifications and experience.">
        My Resume / CV
      </SectionTitle>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <p className="text-muted-foreground">
          Download the latest version of my resume to learn more about my skills, experience, and accomplishments. 
          You can also print a copy directly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="/resume-milan.pdf" download="Milan_Resume.pdf">
              <Download className="mr-2 h-5 w-5" /> Download PDF
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={handlePrint} className="w-full sm:w-auto">
            <Printer className="mr-2 h-5 w-5" /> Print Resume
          </Button>
        </div>
         <p className="text-xs text-muted-foreground">
          (Note: Download links to a placeholder PDF. Print functionality uses browser print.)
        </p>
      </div>
    </SectionWrapper>
  );
}
