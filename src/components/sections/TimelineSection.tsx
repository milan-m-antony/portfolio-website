import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import TimelineItem from '@/components/ui/TimelineItem';
import { timelineData } from '@/data/portfolioData';

export default function TimelineSection() {
  return (
    <SectionWrapper id="timeline" className="bg-background section-fade-in" style={{ animationDelay: '0.8s' }}>
      <SectionTitle subtitle="Follow my professional and educational path, highlighting key experiences and achievements along the way.">
        My Career Journey
      </SectionTitle>
      <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
        <div className="absolute border-opacity-20 border-border h-full border" style={{ left: '50%' }}></div>
        {timelineData.map((event, index) => (
          // Removed animate-fadeIn class and animationDelay style from this div
          // TimelineItem now handles its own reveal animation
          <div key={event.id}>
            <TimelineItem event={event} isLeft={index % 2 !== 0} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}