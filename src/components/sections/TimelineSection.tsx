
"use server";

import { supabase } from '@/lib/supabaseClient';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionTitle from '@/components/ui/SectionTitle';
import TimelineItem from '@/components/ui/TimelineItem';
import type { TimelineEvent } from '@/types/supabase';

async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .order('sort_order', { ascending: true }) // Assuming you want to order by date or a sort_order column
    .order('created_at', { ascending: false });


  if (error) {
    console.error('Error fetching timeline events:', error);
    return [];
  }
  // Map Supabase row to TimelineEvent type
  return data.map(event => ({
    id: event.id,
    date: event.date,
    title: event.title,
    description: event.description,
    iconName: event.icon_name, // ensure this matches your DB column name and TimelineItem prop
    type: event.type as TimelineEvent['type'], // Cast to the specific string literal union type
    sort_order: event.sort_order,
  })) as TimelineEvent[];
}


export default async function TimelineSection() {
  const timelineEvents = await getTimelineEvents();

  if (!timelineEvents || timelineEvents.length === 0) {
    return (
      <SectionWrapper id="timeline" className="bg-background section-fade-in" style={{ animationDelay: '0.8s' }}>
        <SectionTitle subtitle="Follow my professional and educational path.">
          My Career Journey
        </SectionTitle>
        <p className="text-center text-muted-foreground">No timeline events to display. Data will be populated from Supabase.</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="timeline" className="bg-background section-fade-in" style={{ animationDelay: '0.8s' }}>
      <SectionTitle subtitle="Follow my professional and educational path, highlighting key experiences and achievements along the way.">
        My Career Journey
      </SectionTitle>
      <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
        <div className="absolute border-opacity-20 border-border h-full border" style={{ left: '50%' }}></div>
        {timelineEvents.map((event, index) => (
          <div key={event.id}>
            <TimelineItem event={event} isLeft={index % 2 !== 0} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
