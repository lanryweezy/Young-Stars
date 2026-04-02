import React from 'react';
import Card from '../common/Card';

const About: React.FC = () => {
  const staff = [
    { name: 'Dr. Evelyn Adebayo', role: 'Head of School', image: 'https://i.pravatar.cc/400?u=evelyn_adebayo' },
    { name: 'Mr. Tunde Okoro', role: 'Head of STEM', image: 'https://i.pravatar.cc/400?u=tunde_okoro' },
    { name: 'Mrs. Aisha Bello', role: 'Head of Arts & Creativity', image: 'https://i.pravatar.cc/400?u=aisha_bello' },
    { name: 'Mrs. Funke Adeyemi', role: 'Lead Innovator (Nursery)', image: 'https://i.pravatar.cc/400?u=funke_adeyemi' },
  ];

  const achievements = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
      title: 'National Jr. Robotics Champions',
      year: '2023'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
      title: 'Inter-State Digital Art Prize',
      year: '2024'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242z" /></svg>,
      title: 'Eco-Innovator School Award',
      year: '2023'
    },
     {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5 11v4m-2-2h4M12 8a2 2 0 100-4 2 2 0 000 4z" /></svg>,
      title: 'Excellence in Early-Years STEM',
      year: '2022'
    }
  ];

  const facilities = [
    {
      name: 'Robotics & AI Lab',
      description: 'Equipped with the latest robotics kits and AI learning modules, our lab is where future engineers and innovators are born.',
      image: 'https://picsum.photos/seed/facility1/800/600'
    },
    {
      name: 'Digital Library & Media Center',
      description: 'A vast collection of digital resources, e-books, and interactive learning tools to support research and ignite curiosity.',
      image: 'https://picsum.photos/seed/facility2/800/600'
    },
    {
      name: 'Creative Arts Studio',
      description: 'A vibrant space for students to explore painting, sculpture, and digital design, fostering creativity and self-expression.',
      image: 'https://picsum.photos/seed/facility3/800/600'
    },
    {
      name: 'Smart Classrooms',
      description: 'Interactive whiteboards, tablets, and high-speed internet in every classroom create a dynamic and engaging learning environment.',
      image: 'https://picsum.photos/seed/facility4/800/600'
    },
    {
      name: 'Multi-Sport Arena',
      description: 'A modern indoor and outdoor sports complex for a variety of physical activities, promoting health and teamwork.',
      image: 'https://picsum.photos/seed/facility5/800/600'
    },
    {
      name: 'Discovery Playground',
      description: 'A safe and stimulating play area with futuristic equipment designed to encourage imaginative play and physical development.',
      image: 'https://picsum.photos/seed/facility6/800/600'
    }
  ];

  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">About <span className="text-brand-green">Young Stars</span></h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">Pioneering a new era of education in Ado Ekiti.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img src="https://picsum.photos/seed/history/800/600" alt="School Campus" className="rounded-2xl shadow-2xl shadow-brand-green/10 w-full" />
          </div>
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-white mb-4">Our History</h2>
            <p className="text-gray-400 mb-4">
              Founded in 2015 with the vision to create a paradigm shift in early childhood education, Young Stars International School started as a small, passionate community of educators and families. Our goal was simple yet ambitious: to build a nurturing space where children are not just taught, but are inspired to become lifelong learners and innovators.
            </p>
            <p className="text-gray-400">
              From those humble beginnings, we have grown into a beacon of modern education in Nigeria, consistently integrating technology and progressive teaching methods to prepare our young stars for a future that is yet to be written.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-400">To provide a futuristic and holistic education that equips students with the knowledge, skills, and character to excel in a rapidly evolving world.</p>
          </Card>
          <Card>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-400">To be a leading global institution recognized for innovation in early childhood education and for nurturing the next generation of leaders and creators.</p>
          </Card>
        </div>

        <div className="text-center mb-20">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-4">Our Achievements</h2>
             <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto mb-12">Celebrating milestones on our journey to excellence.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((ach, index) => (
                    <Card key={index} className="text-center">
                        {ach.icon}
                        <h4 className="text-lg font-bold text-white mt-3">{ach.title}</h4>
                        <p className="text-brand-green font-orbitron">{ach.year}</p>
                    </Card>
                ))}
            </div>
        </div>

        <div className="mb-20">
            <h2 className="text-3xl text-center font-orbitron font-bold text-white mb-4">Our State-of-the-Art Facilities</h2>
            <p className="mt-4 text-lg text-center text-brand-cream-dark max-w-3xl mx-auto mb-12">An environment built to inspire creativity, collaboration, and discovery.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <Card key={index} className="p-0 overflow-hidden">
                    <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h4 className="text-xl font-bold font-orbitron text-white mb-2">{facility.name}</h4>
                      <p className="text-gray-400">{facility.description}</p>
                    </div>
                </Card>
              ))}
            </div>
        </div>

        <div className="text-center">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-4">Meet Our Core Educators</h2>
            <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto mb-12">A team of passionate, dedicated, and forward-thinking mentors lighting the way for our young stars.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {staff.map((person, index) => (
                <Card key={index} className="text-center">
                  <div className="p-1 rounded-full inline-block bg-gradient-to-br from-brand-green to-butter-yellow/50 mb-4">
                    <img src={person.image} alt={person.name} className="w-32 h-32 rounded-full border-4 border-space-light" />
                  </div>
                  <h4 className="text-xl font-bold text-white">{person.name}</h4>
                  <p className="text-brand-green font-medium">{person.role}</p>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;