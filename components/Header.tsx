// components/Header.tsx
import React from 'react';
import { navLinks } from '../constants';
import { Link } from '../router';
import { schoolName } from '../data/schoolData';

const Header: React.FC = () => {
    return (
        <header className="bg-brand-blue text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold font-orbitron">{schoolName}</Link>
                <nav>
                    <ul className="flex space-x-4">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.href} className="hover:text-brand-green">{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
