import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ParentIcon from '../icons/ParentIcon';

const ParentPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    if (!isLoggedIn) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto">
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4">
                                <ParentIcon />
                            </div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Parent Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div>
                                    <label htmlFor="parent_id" className="sr-only">Parent ID / Email</label>
                                    <input 
                                        type="text" 
                                        id="parent_id"
                                        placeholder="Parent ID or Email"
                                        required 
                                        defaultValue="parent@example.com"
                                        className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                                <p className="text-sm text-gray-500">Password not required for this demo.</p>
                                <Button type="submit" className="w-full" size="lg">
                                    Login
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

     return (
        <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                        Welcome, <span className="text-brand-green">Parent</span>!
                    </h1>
                    <Button onClick={handleLogout} variant="secondary">Logout</Button>
                </div>
                <Card>
                    <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Dashboard Overview</h2>
                    <p className="text-gray-400">This is the parent dashboard. Features such as viewing your child's grades, attendance, and school announcements will be available here soon.</p>
                </Card>
            </div>
        </div>
    );
};

export default ParentPortal;
