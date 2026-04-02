import React from 'react';
import { Page } from '../../constants';
import Card from '../common/Card';
import StudentIcon from '../icons/StudentIcon';
import ParentIcon from '../icons/ParentIcon';
import StaffIcon from '../icons/StaffIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import AdminIcon from '../icons/AdminIcon';
import { useNavigate } from 'react-router-dom';

const PortalGatewayCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => {
    return (
        <Card 
            className="text-center group cursor-pointer transition-all duration-300 hover:border-brand-green h-full flex flex-col items-center"
            onClick={onClick}
        >
            <div className="text-brand-green mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
            <h2 className="font-orbitron text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400 mb-6 flex-grow">{description}</p>
            <span className="font-bold text-brand-green inline-flex items-center">
                Access Portal <ChevronRightIcon />
            </span>
        </Card>
    );
};


const Portals: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen">
      <div className="container mx-auto px-6 text-brand-blue-dark">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Access Your <span className="text-brand-green">Portal</span></h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">Welcome back! Please select your portal to continue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <PortalGatewayCard 
                icon={<StudentIcon />}
                title="Student Portal"
                description="Access grades, assignments, and learning resources."
                onClick={() => navigate(Page.StudentPortal)}
            />
            <PortalGatewayCard 
                icon={<ParentIcon />}
                title="Parent Portal"
                description="View your child's progress, attendance, and announcements."
                onClick={() => navigate(Page.ParentPortal)}
            />
            <PortalGatewayCard 
                icon={<StaffIcon />}
                title="Staff Portal"
                description="Access teaching materials, admin tools, and communications."
                onClick={() => navigate(Page.StaffPortal)}
            />
             <PortalGatewayCard 
                icon={<AdminIcon />}
                title="Admin Portal"
                description="Manage students, staff, and school-wide configurations."
                onClick={() => navigate(Page.AdminPortal)}
            />
        </div>
      </div>
    </div>
  );
};

export default Portals;
