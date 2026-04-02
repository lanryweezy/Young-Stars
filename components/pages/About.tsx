// components/pages/About.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, navLinks } from '../../constants';
import { schoolName } from '../../data/schoolData';
import PageBanner from '../common/PageBanner';

const About: React.FC = () => {
    const pageInfo = navLinks.find(link => link.href === Page.About);

    return (
        <div>
            <Helmet>
                <title>{`${pageInfo?.name} | ${schoolName}`}</title>
                <meta name="description" content={pageInfo?.metaDescription} />
            </Helmet>
            <PageBanner title="About Us" subtitle={`Our Story, Mission, and Vision for ${schoolName}`} />

            <div className="py-16 bg-brand-cream-light">
                <div className="container mx-auto px-4">
                    {/* Our Story Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-orbitron font-bold text-brand-blue mb-6">Our Story</h2>
                        <div className="prose prose-lg max-w-none text-brand-blue-dark">
                            <p>
                                Founded in 2015 with the vision to create a paradigm shift in early childhood education, lanrystars started as a small, passionate community of educators and families. Our goal was simple yet ambitious: to build a nurturing space where children are not just taught, but are inspired to become lifelong learners and innovators.
                            </p>
                            <p>
                                Over the years, we have grown into a leading educational institution in Ado Ekiti, known for our commitment to excellence, our innovative teaching methods, and our vibrant school community. We have consistently produced outstanding students who excel not just academically, but also in character and creativity. Our journey is one of continuous growth, driven by our passion for shaping the leaders of tomorrow.
                            </p>
                        </div>
                    </section>

                    {/* Our Mission and Vision Section */}
                    <section className="mb-16">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-orbitron font-bold text-brand-blue mb-4">Our Mission</h3>
                                <p className="prose prose-lg text-brand-blue-dark">
                                    To provide a stimulating and inclusive learning environment that fosters critical thinking, creativity, and a lifelong love for learning. We are dedicated to nurturing each child's potential and empowering them to become confident, compassionate, and responsible global citizens.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-orbitron font-bold text-brand-blue mb-4">Our Vision</h3>
                                <p className="prose prose-lg text-brand-blue-dark">
                                    To be a beacon of educational excellence and innovation in Nigeria, shaping future leaders who will drive positive change in the world. We envision a future where our students are at the forefront of discovery and progress, equipped with the skills and mindset to thrive in a rapidly evolving world.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Meet Our Team Section */}
                    <section>
                        <h2 className="text-3xl font-orbitron font-bold text-brand-blue mb-6 text-center">Meet Our Team</h2>
                        <p className="text-center text-lg text-brand-blue-dark max-w-3xl mx-auto mb-10">
                            Our dedicated team of educators is the heart of our school. Passionate, experienced, and committed to each child's success, they are the reason we are considered the school with the best teachers in Ado Ekiti.
                        </p>
                        {/* Team members can be mapped here */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {/* Example Team Member */}
                            <div className="text-center">
                                <img src="/assets/team-1.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                                <h4 className="font-bold text-lg text-brand-blue">Mrs. Funke Adebayo</h4>
                                <p className="text-sm text-brand-blue-dark">Head of School</p>
                            </div>
                            <div className="text-center">
                                <img src="/assets/team-2.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                                <h4 className="font-bold text-lg text-brand-blue">Mr. Tunde Okoro</h4>
                                <p className="text-sm text-brand-blue-dark">Head of STEM</p>
                            </div>
                            <div className="text-center">
                                <img src="/assets/team-3.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                                <h4 className="font-bold text-lg text-brand-blue">Ms. Aisha Bello</h4>
                                <p className="text-sm text-brand-blue-dark">Lead Nursery Educator</p>
                            </div>
                            <div className="text-center">
                                <img src="/assets/team-4.jpg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                                <h4 className="font-bold text-lg text-brand-blue">Mr. Chinedu Eze</h4>
                                <p className="text-sm text-brand-blue-dark">Sports & Recreation Lead</p>
                            </div>
                            {/* Add more team members as needed */}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
