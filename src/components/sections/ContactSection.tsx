
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactSection() {
  const contactDetails = [
    {
      icon: MapPin,
      label: "Address",
      value: "123 Creative Lane, Tech City, TC 54321",
      href: "#",
      isLink: false,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      isLink: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: "milan@example.com",
      href: "mailto:milan@example.com",
      isLink: true,
    },
  ];

  const socialLinks = [
     {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourusername",
      text: "linkedin.com/in/yourusername"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/yourusername",
      text: "github.com/yourusername"
    },
    {
      icon: Twitter, 
      label: "X (Twitter)",
      href: "https://x.com/yourusername",
      text: "x.com/yourusername"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/yourusername",
      text: "instagram.com/yourusername"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/yourusername",
      text: "facebook.com/yourusername"
    },
  ];


  return (
    <SectionWrapper id="contact" className="bg-secondary section-fade-in" style={{ animationDelay: '1.4s' }}>
      <SectionTitle subtitle="Have a project in mind, a question, or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.">
        Get In Touch
      </SectionTitle>
      <Card className="max-w-5xl mx-auto shadow-xl"> {/* Increased max-width for better two-column layout */}
        <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8 md:gap-12 items-start"> {/* Grid layout for two columns */}
          
          {/* Left Column: Contact Info & Social Links */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start gap-4 mb-4 last:mb-0">
                  <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.isLink ? (
                      <Link href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors break-all">
                        {item.value}
                      </Link>
                    ) : (
                      <p className="text-muted-foreground break-all">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8"> {/* Ensure some space if the above content is short */}
              <h3 className="text-xl font-semibold text-foreground mb-6">Connect With Me</h3>
              <div className="space-y-4"> {/* Use space-y for vertical stacking of social links */}
                {socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <social.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <Link href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm break-all">
                      {social.text}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center md:text-left">Send Me a Message</h3>
            <ContactForm />
          </div>

        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
