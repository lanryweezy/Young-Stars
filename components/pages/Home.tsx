// components/pages/Home.tsx

import React from 'react';
import { Page } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { events } from '../../data/events';
import CalendarIcon from '../icons/CalendarIcon';
import HolidayIcon from '../icons/HolidayIcon';
import EventIcon from '../icons/EventIcon';
import { galleryImages } from '../../data/galleryData';

const Home: React.FC = () => {
    const pageInfo = navLinks.find(link => link.href === Page.Home);
    const galleryPreview = galleryData.slice(0, 4);

    return (
        <div className="animate-fade-in-up">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                <img src="/assets/hero-image.jpg" alt="Young Stars International School" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-space-dark/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/95 via-transparent"></div>

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] text-white flex items-center justify-center text-center">
                <img src="/assets/hero-image.jpg" alt="lanrystars" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
                        Welcome to lanrystars<br/> International School
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Nurturing the innovators of tomorrow in the heart of Ado Ekiti.
                    </p>
                    <Link href={Page.Admissions} className="mt-8 inline-block bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-105">
                        Apply Now
                    </Link>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-brand-blue">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Why lanrystars?</h2>
                    <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-12">We are not just a school; we are a community dedicated to excellence and innovation.</p>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {/* Feature 1 */}
                        <div className="bg-brand-blue-dark p-6 rounded-lg">
                            <h3 className="text-xl font-orbitron font-bold text-brand-green mb-2">Future-Ready Curriculum</h3>
                            <p className="text-brand-cream-light">Our curriculum integrates STEM, coding, and robotics from an early age, preparing students for the challenges of tomorrow.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-brand-blue-dark p-6 rounded-lg">
                            <h3 className="text-xl font-orbitron font-bold text-brand-green mb-2">Expert Teachers</h3>
                            <p className="text-brand-cream-light">Our educators are passionate, experienced, and committed to personalized learning for every child.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-brand-blue-dark p-6 rounded-lg">
                            <h3 className="text-xl font-orbitron font-bold text-brand-green mb-2">Nurturing Environment</h3>
                            <p className="text-brand-cream-light">We foster a safe, inclusive, and inspiring atmosphere where students can thrive emotionally and academically.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Life at lanrystars Section */}
            <section className="py-16 bg-brand-cream-light">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Our Life at lanrystars</h2>
                        <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto">A snapshot of the vibrant life at lanrystars.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <img src="/assets/sports.jpg" alt="Students playing sports" className="rounded-lg shadow-lg w-full h-auto object-cover" />
                        </div>
                        <div className="prose prose-lg text-brand-blue-dark">
                            <h3 className="text-2xl font-orbitron font-bold text-brand-blue">Excellence Beyond Academics</h3>
                            <p>
                                At lanrystars, we believe in holistic development. Our students engage in a wide range of extracurricular activities, from competitive sports and arts to coding clubs and community service. We provide a balanced education that nurtures talents, builds character, and prepares students for a successful future.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                        <div className="prose prose-lg text-brand-blue-dark md:order-2">
                            <h3 className="text-2xl font-orbitron font-bold text-brand-blue">A Day in the Life</h3>
                            <p>
                                Every day at lanrystars is an adventure in learning. Our classrooms are dynamic hubs of discovery, where students collaborate on projects, explore new ideas, and are challenged to think critically. From the science lab to the art studio, learning is always hands-on and engaging.
                            </p>
                        </div>
                        <div className="md:order-1">
                            <img src="/assets/working-student.jpg" alt="Student working on a project" className="rounded-lg shadow-lg w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Life at Young Stars Section */}
            <section className="py-20 bg-space-dark/95">
                <div className="container mx-auto px-6">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Our Life at Young Stars</h2>
                        <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-12">Beyond the classroom, our students engage in a vibrant school life.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/30">
                            <img src="/assets/sports.jpg" alt="Students engaged in sports" className="w-full h-auto object-cover"/>
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">Athletics and Team Sports</h3>
                            <p className="text-gray-400 mb-4">We believe in the power of sports to build character, discipline, and teamwork. Our students have opportunities to participate in a variety of sports, fostering a spirit of healthy competition and physical fitness.</p>
                            <Button onClick={() => setCurrentPage(Page.Academics)} variant="secondary">
                                Explore Our Curriculum
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
                        <div className="text-left md:order-2">
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">Hands-On Learning</h3>
                            <p className="text-gray-400 mb-4">Our curriculum is designed to be interactive and engaging. Students get to apply what they learn in the classroom to real-world projects, from building robots to creating art.</p>
                            <Button onClick={() => setCurrentPage(Page.Admissions)} variant="secondary">
                                Join Our School
                            </Button>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/30 md:order-1">
                            <img src="/assets/working-student.jpg" alt="A student working on a project" className="w-full h-auto object-cover"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview Section */}
            <section className="py-20 bg-space-light/95">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Gallery Preview</h2>
                    <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-12">A snapshot of the vibrant life at Young Stars International School.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {
                            [...galleryImages].slice(0, 4).map((image, index) => (
                                <div key={index} className="overflow-hidden rounded-2xl shadow-lg shadow-black/30">
                                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"/>
                                </div>
                            ))
                        }
                    </div>
                    <Button onClick={() => setCurrentPage(Page.Gallery)} size="lg">
                        View Full Gallery
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
                    <Link href={Page.Gallery} className="mt-8 inline-block bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-105">
                        View Full Gallery
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
