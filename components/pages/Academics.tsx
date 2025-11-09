import React from 'react';
import Card from '../common/Card';

const Academics: React.FC = () => {

  const coreSubjects = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01M15 5h.01M12 5h.01M9 5h.01M4 7h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" /></svg>,
        title: 'Mathematics',
        description: 'Developing logical reasoning and problem-solving skills through interactive and real-world applications.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-5.52 0-10.33 4.22-11.4 9.62a14.95 14.95 0 003.88 10.88c2.76 2.45 6.36 3.99 10.28 3.99s7.52-1.54 10.28-3.99z" /></svg>,
        title: 'Basic Science & Tech',
        description: 'Fostering curiosity and an inquiry-based mindset to understand the world around us, from biology to basic machines.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        title: 'English Language',
        description: 'Mastering communication through comprehensive literacy, creative writing, and public speaking programs.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.585A10.023 10.023 0 0112 3c4.218 0 7.935 2.164 10.158 5.415M4.842 19.415A10.023 10.023 0 0112 21c4.218 0 7.935-2.164 10.158-5.415" /></svg>,
        title: 'Social Studies',
        description: 'Exploring history, geography, and civic education to build informed and responsible global citizens.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
        title: 'Creative Arts',
        description: 'Nurturing self-expression and creativity through visual arts, music, drama, and digital design.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        title: 'Health & P.E.',
        description: 'Promoting physical well-being, teamwork, and sportsmanship through a variety of fun activities and sports.'
    }
  ];

  const learningMethods = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
        title: 'Project-Based Learning',
        description: 'Students engage in in-depth investigations of real-world topics, fostering critical thinking.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        title: 'Gamified Learning',
        description: 'Using game mechanics to make learning complex subjects more engaging and rewarding.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        title: 'Collaborative Work',
        description: 'Group projects and peer-to-peer teaching that build teamwork and communication skills.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
        title: 'Personalized Paths',
        description: 'Using adaptive tech to tailor learning experiences to each child’s unique pace and style.'
    }
  ];

  const techPrograms = [
    {
      title: 'Robotics & AI Lab',
      description: 'Students get hands-on experience building and programming robots, exploring the fundamentals of artificial intelligence in a fun, interactive way.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
    },
    {
      title: 'Creative Coding',
      description: 'We turn code into art. Children learn programming logic by creating their own games, animations, and interactive stories.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    },
    {
      title: 'Digital Arts & Design',
      description: 'From 3D modeling to graphic design, students unleash their creativity using professional-grade software and tools.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    },
  ];

  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Curriculum & <span className="text-brand-green">Methods</span></h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">An integrated approach to education, blending foundational knowledge with future-ready skills.</p>
        </div>

        <section className="mb-20">
            <h2 className="text-3xl font-orbitron text-center font-bold text-white mb-12">Core Subjects: A Strong Foundation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreSubjects.map((subject, index) => (
                    <Card key={index} className="flex flex-col items-center text-center">
                        {subject.icon}
                        <h3 className="font-orbitron text-xl font-bold text-white mt-4 mb-2">{subject.title}</h3>
                        <p className="text-gray-400">{subject.description}</p>
                    </Card>
                ))}
            </div>
        </section>

        <section className="mb-20">
            <h2 className="text-3xl font-orbitron text-center font-bold text-white mb-12">Innovative Learning Methodologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {learningMethods.map((method, index) => (
                    <Card key={index} className="flex flex-col items-center text-center p-8">
                        {method.icon}
                        <h3 className="font-orbitron text-xl font-bold text-white mt-4 mb-2">{method.title}</h3>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                    </Card>
                ))}
            </div>
        </section>

        <section>
            <h2 className="text-3xl font-orbitron text-center font-bold text-white mb-12">Signature Technology Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {techPrograms.map((program, index) => (
                    <Card key={index} className="flex flex-col items-center text-center">
                        <div className="mb-4">{program.icon}</div>
                        <h3 className="font-orbitron text-xl font-bold text-white mb-2">{program.title}</h3>
                        <p className="text-gray-400">{program.description}</p>
                    </Card>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};

export default Academics;