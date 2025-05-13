
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import CertificationCard from '@/components/ui/CertificationCard';
import { certificationsData } from '@/data/portfolioData';

export default function CertificationsSection() {
  return (
    <SectionWrapper id="certifications" className="bg-secondary section-fade-in" style={{ animationDelay: '1.0s' }}>
      <SectionTitle subtitle="A collection of certifications and badges earned from reputable platforms, validating my expertise.">
        Certifications & Badges
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificationsData.map((cert, index) => (
          <div key={cert.id} className="animate-fadeIn" style={{animationDelay: `${index * 0.15}s`}}>
            <CertificationCard certification={cert} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
