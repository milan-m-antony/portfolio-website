import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import TimelineItem from '@/components/ui/TimelineItem';
import { timelineData } from '@/data/portfolioData';

export default function TimelineSection() {
  return (
    <SectionWrapper id="timeline" className="bg-background section-fade-in" style={{ animationDelay: '0.6s' }}>
      <SectionTitle subtitle="Follow my professional and educational path, highlighting key experiences and achievements along the way.">
        My Career Journey
      </SectionTitle>
      <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
        <div className="absolute border-opacity-20 border-border h-full border" style={{ left: '50%' }}></div>
        {timelineData.map((event, index) => (
          <div key={event.id} className="animate-fadeIn" style={{animationDelay: `${index * 0.2}s`}}>
            <TimelineItem event={event} isLeft={index % 2 !== 0} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
