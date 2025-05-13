
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from '@/components/ContactForm';

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-secondary section-fade-in" style={{ animationDelay: '1.4s' }}>
      <SectionTitle subtitle="Have a project in mind, a question, or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.">
        Get In Touch
      </SectionTitle>
      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}

