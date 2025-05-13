
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
      <Card className="max-w-2xl mx-auto shadow-xl"> {/* Adjusted max-width for single column */}
        <CardContent className="p-6 md:p-8"> {/* Unified padding for the entire card content */}
          
          {/* Top Part: Contact Info & Social Links */}
          <div className="mb-12"> {/* Increased bottom margin for separation */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Contact Information</h3>
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start gap-4 mb-4 last:mb-0">
                  <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.isLink ? (
                      <Link href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        {item.value}
                      </Link>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Connect With Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"> {/* Grid for social links, adjusted gap */}
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

          {/* Bottom Part: Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Send Me a Message</h3>
            <ContactForm />
          </div>

        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
