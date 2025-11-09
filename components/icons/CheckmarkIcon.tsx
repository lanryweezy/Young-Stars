import React from 'react';

const CheckmarkIcon: React.FC = () => {
    return (
        <div className="w-24 h-24 rounded-full bg-brand-green/20 flex items-center justify-center animate-pop-in">
            <svg className="w-16 h-16 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
    );
};

export default CheckmarkIcon;