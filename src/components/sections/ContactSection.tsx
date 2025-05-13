
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, MessageSquare, Users2 } from 'lucide-react';
import Link from 'next/link';

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
      icon: Twitter, // Using Twitter icon as X.com
      label: "X (Twitter)",
      href: "https://x.com/yourusername",
      text: "x.com/yourusername"
    },
    // Optional: WhatsApp & Telegram can be added here if needed.
    // For now, keeping it simple with common professional links.
    // { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me/1234567890", text: "Chat on WhatsApp" }, // Example, use real number
    // { icon: Users2, label: "Telegram", href: "https://t.me/yourusername", text: "Chat on Telegram" },
  ];


  return (
    <SectionWrapper id="contact" className="bg-secondary section-fade-in" style={{ animationDelay: '1.4s' }}>
      <SectionTitle subtitle="Have a project in mind, a question, or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.">
        Get In Touch
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        <div className="space-y-8 p-6 bg-card rounded-lg shadow-md">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start gap-4 mb-4">
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
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Connect With Me</h3>
            <div className="space-y-3">
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-3">
                <social.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <Link href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {social.text}
                </Link>
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg shadow-md">
           <h3 className="text-2xl font-semibold text-foreground mb-6 text-center md:text-left">Send Me a Message</h3>
          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  );
}
