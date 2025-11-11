// router.tsx
import React from 'react';

// A simple Link component to act as a placeholder for a real router Link
export const Link: React.FC<{ to?: string, href?: string, className?: string, children: React.ReactNode }> = ({ to, href, className, children }) => {
    const destination = to || href || '#';
    return (
        <a href={destination} className={className}>
            {children}
        </a>
    );
};

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Route: React.FC<{ path: string, element: React.ReactNode }> = () => null;

export const useParams = () => ({ id: '1' });
