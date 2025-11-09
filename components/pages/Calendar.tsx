import React from 'react';
import { events } from '../../data/events';
import Card from '../common/Card';
import CalendarIcon from '../icons/CalendarIcon';
import HolidayIcon from '../icons/HolidayIcon';
import EventIcon from '../icons/EventIcon';

const Calendar: React.FC = () => {

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const eventsByMonth: { [key: string]: typeof events } = sortedEvents.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {} as { [key: string]: typeof events });

  const getEventIcon = (category: string) => {
    switch(category) {
        case 'Academic': return <CalendarIcon />;
        case 'Holiday': return <HolidayIcon />;
        case 'Event': return <EventIcon />;
        case 'Extracurricular': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
        default: return <EventIcon />;
    }
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
        case 'Academic': return 'border-blue-500/50';
        case 'Holiday': return 'border-yellow-500/50';
        case 'Event': return 'border-purple-500/50';
        case 'Extracurricular': return 'border-pink-500/50';
        default: return 'border-brand-green/20';
    }
  }
  
  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">School <span className="text-brand-green">Calendar</span></h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">Important Dates & Events for the Academic Session.</p>
        </div>

        <div className="space-y-12">
            {Object.keys(eventsByMonth).map(month => (
                <div key={month}>
                    <h2 className="text-3xl font-orbitron font-bold text-white mb-6 border-b-2 border-brand-green/20 pb-2">{month}</h2>
                    <div className="space-y-6">
                        {eventsByMonth[month].map((event, index) => (
                            <Card key={index} className={`border-l-4 ${getCategoryColor(event.category)}`}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                                    <div className="flex-shrink-0 flex items-center space-x-4">
                                        <div className="text-brand-green">{getEventIcon(event.category)}</div>
                                        <p className="font-orbitron text-white font-bold w-36 text-lg">
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                        <p className="text-gray-400">{event.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Calendar;