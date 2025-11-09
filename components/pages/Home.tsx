
import React from 'react';
import { Page } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { events } from '../../data/events';
import CalendarIcon from '../icons/CalendarIcon';
import HolidayIcon from '../icons/HolidayIcon';
import EventIcon from '../icons/EventIcon';

interface HomeProps {
    setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
    const features = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-5.52 0-10.33 4.22-11.4 9.62a14.95 14.95 0 003.88 10.88c2.76 2.45 6.36 3.99 10.28 3.99s7.52-1.54 10.28-3.99z" /></svg>,
            title: 'Future-Ready Curriculum',
            description: 'We go beyond traditional learning with programs in coding, robotics, and digital arts, preparing your child for tomorrow.'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
            title: 'Nurturing Environment',
            description: 'Our passionate educators foster a safe, inclusive, and inspiring atmosphere where every child can thrive.'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            title: 'Holistic Development',
            description: 'We focus on academic excellence, creative expression, and character building to shape well-rounded individuals.'
        },
    ];

    const upcomingEvents = events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
    
    const getEventIcon = (category: string) => {
        switch(category) {
            case 'Academic': return <CalendarIcon />;
            case 'Holiday': return <HolidayIcon />;
            case 'Event': return <EventIcon />;
            default: return <EventIcon />;
        }
    }

    return (
        <div className="animate-fade-in-up">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-space-dark/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/95 via-transparent"></div>

                <div className="relative z-10 p-6 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 tracking-wide leading-tight">
                        Welcome to Young Stars<br/> International School
                    </h1>
                    <p className="text-lg md:text-xl text-brand-cream-dark max-w-3xl mx-auto mb-8">
                        Building tomorrow’s leaders through quality education in Ado Ekiti.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button onClick={() => setCurrentPage(Page.About)} size="lg" className="w-full sm:w-auto">
                            Learn More <ChevronRightIcon />
                        </Button>
                        <Button onClick={() => setCurrentPage(Page.Contact)} size="lg" variant="secondary" className="w-full sm:w-auto">
                            Visit Our Campus
                        </Button>
                    </div>
                     {/* Trust Signals */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-400 mt-8">
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Federal Ministry of Education Approved</span>
                        </div>
                        <div className="hidden sm:block w-px h-5 bg-brand-green/30"></div> {/* Separator */}
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span>Established in 2015</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-b from-space-dark/95 to-space-light/95">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Why Young Stars?</h2>
                    <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-12">We are more than a school; we are a launchpad for a lifetime of learning and achievement.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                             <Card key={index} className="text-left">
                                <div className="flex items-center mb-4">
                                    {feature.icon}
                                    <h3 className="ml-4 font-orbitron text-xl font-bold text-white">{feature.title}</h3>
                                </div>
                                <p className="text-gray-400">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 bg-space-dark/95">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Upcoming Events</h2>
                    <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-12">Stay connected with the latest happenings at our school.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {upcomingEvents.map((event, index) => (
                             <Card key={index} className="text-left">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 text-brand-green mt-1">
                                        {getEventIcon(event.category)}
                                    </div>
                                    <div>
                                        <p className="font-orbitron text-brand-green font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        <h3 className="text-xl font-bold text-white mt-1 mb-2">{event.title}</h3>
                                        <p className="text-gray-400 text-sm">{event.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <Button onClick={() => setCurrentPage(Page.Calendar)} size="lg" variant="secondary">
                        View Full Calendar
                    </Button>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-space-light/95">
                <div className="container mx-auto px-6 text-center">
                    <div className="bg-gradient-to-br from-space-dark/90 via-space-dark/80 to-brand-green/40 backdrop-blur-sm py-16 rounded-2xl">
                        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Ready to Join the Future?</h2>
                        <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-8">
                            Explore our admissions process and give your child the gift of a world-class, future-focused education.
                        </p>
                        <Button onClick={() => setCurrentPage(Page.Admissions)} size="lg">
                            Start Your Application
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;