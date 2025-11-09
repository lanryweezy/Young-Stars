import React from 'react';
import Button from '../common/Button';
import LogoutIcon from '../icons/LogoutIcon';

interface DashboardLayoutProps {
    children: React.ReactNode;
    userName: string;
    userType: string;
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userName, userType, onLogout }) => {
    return (
        <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                            Welcome, <span className="text-brand-green">{userName.split(' ')[0]}</span>!
                        </h1>
                        <p className="text-gray-400">{userType} Dashboard</p>
                    </div>
                    <Button onClick={onLogout} variant="secondary">
                        <LogoutIcon/> Logout
                    </Button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
