// components/pages/Admissions.tsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, navLinks } from '../../constants';
import { schoolName } from '../../data/schoolData';
import PageBanner from '../common/PageBanner';
import AdmissionForm from '../forms/AdmissionForm';
import { applicationSuccessMessage } from '../common/SubmissionSuccess';

const Admissions: React.FC = () => {
    const pageInfo = navLinks.find(link => link.href === Page.Admissions);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const timelineSteps = [
        {
            title: 'Step 1: Application Submission',
            description: 'Complete and submit our online application form with the required documents.'
        },
        {
            title: 'Step 2: Entrance Assessment',
            description: 'Prospective students will be invited for a friendly, age-appropriate assessment to gauge their readiness.'
        },
        {
            title: 'Step 3: Family Interview',
            description: 'A meeting with parents/guardians to discuss our educational philosophy and answer any questions.'
        },
        {
            title: 'Step 4: Admission Offer',
            description: 'Successful candidates will receive an offer of admission. Welcome to the lanrystars family!'
        },
    ];

    return (
        <div>
            <Helmet>
                <title>{`${pageInfo?.name} | ${schoolName}`}</title>
                <meta name="description" content={pageInfo?.metaDescription} />
            </Helmet>
            <PageBanner title="Admissions" subtitle="Join Our Family of Future Leaders" />

            <div className="py-16 bg-brand-cream-light">
                <div className="container mx-auto px-4">
                    {/* Admissions Process Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-orbitron font-bold text-brand-blue mb-6 text-center">Our Admissions Process</h2>
                        <p className="text-center text-lg text-brand-blue-dark max-w-3xl mx-auto mb-10">
                            Our process is designed to be simple, transparent, and welcoming. Follow these steps to begin your journey at the best school in Ado Ekiti.
                        </p>
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-blue-dark hidden md:block"></div>

                            {timelineSteps.map((step, index) => (
                                <div key={index} className="mb-8 flex justify-between items-center w-full">
                                    <div className="md:w-5/12"></div>
                                    <div className="z-10 bg-brand-green text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">{index + 1}</div>
                                    <div className={`p-6 rounded-lg bg-white shadow-md md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                        <h3 className="font-orbitron font-bold text-brand-blue text-xl mb-2">{step.title}</h3>
                                        <p className="text-brand-blue-dark">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Application Form Section */}
                    <section>
                        <h2 className="text-3xl font-orbitron font-bold text-brand-blue mb-6 text-center">Apply Now</h2>
                        <p className="text-center text-lg text-brand-blue-dark max-w-3xl mx-auto mb-10">
                            Begin your journey to a brighter future at lanrystars.
                        </p>
                        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                            {isSubmitted ? (
                                applicationSuccessMessage
                            ) : (
                                <AdmissionForm setIsSubmitted={setIsSubmitted} />
                            )}

                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
