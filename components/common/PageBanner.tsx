// components/common/PageBanner.tsx
import React from 'react';

interface PageBannerProps {
    title: string;
    subtitle: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle }) => {
    return (
        <div className="bg-brand-blue py-12 text-white text-center">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-orbitron font-bold">{title}</h1>
                <p className="text-lg text-brand-cream-dark mt-2">{subtitle}</p>
            </div>
        </div>
    );
};

export default PageBanner;
