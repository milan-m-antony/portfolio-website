import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-secondary section-fade-in" style={{ animationDelay: '1.2s' }}>
      <SectionTitle subtitle="Have a project in mind, a question, or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.">
        Get In Touch
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">Contact Information</h3>
          <p className="text-muted-foreground">
            You can reach me through the form, or via my social channels and email below. I typically respond within 24-48 hours.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <a href="mailto:milan@example.com" className="text-foreground hover:text-primary transition-colors">milan@example.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <span className="text-foreground">(Note: Phone number not public)</span>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="h-6 w-6 text-primary" />
              <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                linkedin.com/in/yourusername
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Github className="h-6 w-6 text-primary" />
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                github.com/yourusername
              </Link>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  );
}
