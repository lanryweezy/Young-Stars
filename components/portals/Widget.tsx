import React from 'react';
import Card from '../common/Card';

interface WidgetProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, icon, children, className = '' }) => {
    return (
        <Card className={`flex flex-col ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-green">{icon}</div>
                <h2 className="font-orbitron text-xl font-bold text-white">{title}</h2>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </Card>
    );
};

export default Widget;
