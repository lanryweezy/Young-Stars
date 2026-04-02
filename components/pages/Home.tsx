// components/pages/Home.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Page, navLinks } from '../../constants';
import Button from '../common/Button';
import { galleryImages } from '../../data/galleryData';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const galleryPreview = galleryImages.slice(0, 4);

    return (
        <div className="animate-fade-in-up">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] text-white flex items-center justify-center text-center">
                <img src="/assets/hero-image.jpg" alt="lanrystars" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
                        Best Primary School in Ado Ekiti
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        lanrystars: Nurturing the innovators of tomorrow. The top-rated nursery and primary school in Ado Ekiti with a future-ready curriculum.
                    </p>
                    <Link to={Page.Admissions} className="mt-8 inline-block bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-105">
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

            {/* Life at lanrystars Section */}
            <section className="py-16 bg-brand-cream-light">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-brand-blue mb-4">Our Life at lanrystars</h2>
                        <p className="text-lg text-brand-blue-dark max-w-2xl mx-auto">A snapshot of the vibrant life at lanrystars.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <img src="/assets/sports.jpg" alt="Students playing sports" className="rounded-lg shadow-lg w-full h-[300px] object-cover" />
                        </div>
                        <div className="prose prose-lg text-brand-blue-dark">
                            <h3 className="text-2xl font-orbitron font-bold text-brand-blue">Excellence Beyond Academics</h3>
                            <p>
                                At lanrystars, we believe in holistic development. Our students engage in a wide range of extracurricular activities, from competitive sports and arts to coding clubs and community service. We provide a balanced education that nurtures talents, builds character, and prepares students for a successful future.
                            </p>
                            <Button onClick={() => navigate(Page.Academics)} variant="secondary" className="mt-4">
                                Explore Our Curriculum
                            </Button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                        <div className="prose prose-lg text-brand-blue-dark md:order-2">
                            <h3 className="text-2xl font-orbitron font-bold text-brand-blue">A Day in the Life</h3>
                            <p>
                                Every day at lanrystars is an adventure in learning. Our classrooms are dynamic hubs of discovery, where students collaborate on projects, explore new ideas, and are challenged to think critically. From the science lab to the art studio, learning is always hands-on and engaging.
                            </p>
                            <Button onClick={() => navigate(Page.Admissions)} variant="secondary" className="mt-4">
                                Join Our School
                            </Button>
                        </div>
                        <div className="md:order-1">
                            <img src="/assets/working-student.jpg" alt="Student working on a project" className="rounded-lg shadow-lg w-full h-[300px] object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview Section */}
            <section className="py-16 bg-brand-blue">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">Gallery Preview</h2>
                    <p className="text-lg text-brand-cream-dark max-w-2xl mx-auto mb-12">A snapshot of the vibrant life at lanrystars.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryPreview.map((item, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg h-48">
                                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                    <Link to={Page.Gallery} className="mt-8 inline-block bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-105">
                        View Full Gallery
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
