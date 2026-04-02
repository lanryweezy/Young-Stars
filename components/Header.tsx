// components/Header.tsx
import React from 'react';
import { navLinks } from '../constants';
import { Link } from 'react-router-dom';
import { schoolName } from '../data/schoolData';

const Header: React.FC = () => {
    return (
        <header className="bg-brand-blue text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold font-orbitron text-brand-green">{schoolName}</Link>
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.href} className="hover:text-brand-green transition-colors duration-200 font-medium">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Mobile menu button could be added here */}
            </div>
        </header>
    );
};

export default Header;
