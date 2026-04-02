
import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import SubmissionSuccess from '../common/SubmissionSuccess';
import { useToast } from '../../contexts/ToastContext';

const Admissions: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addToast('Thank you for your application! We will be in touch shortly.');
        setIsSubmitted(true);
    };

    const steps = [
        {
            step: '01',
            title: 'Inquiry & Tour',
            description: 'Start by exploring our website, then book a tour to see our futuristic campus in person.'
        },
        {
            step: '02',
            title: 'Application',
            description: 'Complete the official online application form below and submit the required documents.'
        },
        {
            step: '03',
            title: 'Interaction',
            description: 'We invite prospective students for a friendly and informal interaction to understand their unique abilities.'
        },
        {
            step: '04',
            title: 'Offer & Enrollment',
            description: 'Successful candidates will receive an offer of admission. Welcome to the Young Stars family!'
        }
    ];

    const requirements = [
        'Completed Online Application Form',
        'Copy of Child\'s Birth Certificate',
        'Copy of Child\'s Immunization Records',
        'Two recent passport-sized photographs of the child',
        'Previous term\'s academic report (for transfer students)',
    ];

    const feeStructure = [
        { level: 'Nursery (Ages 3-5)', tuition: '₦250,000', fees: '₦50,000' },
        { level: 'Lower Primary (Grades 1-3)', tuition: '₦300,000', fees: '₦60,000' },
        { level: 'Upper Primary (Grades 4-6)', tuition: '₦350,000', fees: '₦70,000' },
    ];

  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Admissions</h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">Begin your journey to a brighter future at Young Stars.</p>
        </div>

        <div className="mb-20">
            <h2 className="text-3xl font-orbitron text-center font-bold text-white mb-12">Our Simple 4-Step Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((s, i) => (
                    <div key={i} className="relative p-6 bg-space-light/50 rounded-2xl border border-brand-green/20 card-glow-container">
                        <div className="absolute -top-5 -left-3 text-6xl font-orbitron font-black text-brand-green/20 select-none opacity-50">{s.step}</div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-orbitron font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-gray-400">{s.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <h3 className="font-orbitron text-2xl font-bold text-white mb-4">Admission Requirements</h3>
                    <ul className="space-y-3 text-gray-300">
                        {requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-1 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{req}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card>
                    <h3 className="font-orbitron text-2xl font-bold text-white mb-4">Tuition & Fees</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-brand-green/30">
                                    <th className="py-2 pr-2 font-semibold text-white">Class Level</th>
                                    <th className="py-2 px-2 font-semibold text-white">Annual Tuition</th>
                                    <th className="py-2 pl-2 font-semibold text-white">One-Time Fees</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructure.map((fee, i) => (
                                    <tr key={i} className="border-b border-brand-green/20">
                                        <td className="py-3 pr-2 text-gray-300">{fee.level}</td>
                                        <td className="py-3 px-2 text-gray-300">{fee.tuition}</td>
                                        <td className="py-3 pl-2 text-gray-300">{fee.fees}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">* All fees are subject to review. Please contact the admissions office for the most current fee structure.</p>
                </Card>
            </div>

            <div className="lg:col-span-3">
                {isSubmitted ? (
                    <SubmissionSuccess />
                ) : (
                    <Card className="p-8">
                        <h3 className="font-orbitron text-2xl font-bold text-white mb-6">Online Application Form</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="parent_name" className="block text-sm font-medium text-gray-300 mb-1">Parent's Full Name</label>
                                    <input type="text" id="parent_name" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                    <input type="email" id="email" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                                    <input type="tel" id="phone" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                                <div>
                                    <label htmlFor="child_name" className="block text-sm font-medium text-gray-300 mb-1">Child's Full Name</label>
                                    <input type="text" id="child_name" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="child_dob" className="block text-sm font-medium text-gray-300 mb-1">Child's Date of Birth</label>
                                    <input type="date" id="child_dob" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                                <div>
                                    <label htmlFor="class_level" className="block text-sm font-medium text-gray-300 mb-1">Class Applying For</label>
                                    <select id="class_level" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition">
                                        <option value="">Select a class...</option>
                                        <option>Nursery 1</option>
                                        <option>Nursery 2</option>
                                        <option>Primary 1</option>
                                        <option>Primary 2</option>
                                        <option>Primary 3</option>
                                        <option>Primary 4</option>
                                        <option>Primary 5</option>
                                        <option>Primary 6</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="additional_info" className="block text-sm font-medium text-gray-300 mb-1">Additional Information (Optional)</label>
                                <textarea id="additional_info" rows={4} className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"></textarea>
                            </div>
                            <div>
                                <Button type="submit" className="w-full" size="lg">Submit Application</Button>
                            </div>
                        </form>
                    </Card>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;