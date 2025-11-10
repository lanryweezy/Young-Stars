// components/Footer.tsx

import React from 'react';
import { navLinks } from '../constants';
import { Link } from '../router';
import { schoolName } from '../data/schoolData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-brand-cream-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-orbitron font-bold mb-4">{schoolName}</h3>
            <p className="text-sm">Nurturing the innovators of tomorrow with a world-class, future-ready curriculum.</p>
          </div>

          {/* Quick Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-orbitron font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.filter(link => !link.sublinks).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-brand-green transition-colors duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-orbitron font-bold mb-4">Portals</h3>
            <ul className="space-y-2">
              {navLinks.find(link => link.name === 'Portals')?.sublinks?.map((sublink) => (
                <li key={sublink.name}>
                  <Link href={sublink.href} className="hover:text-brand-green transition-colors duration-300">{sublink.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-orbitron font-bold mb-4">Contact Us</h3>
            <p className="text-sm">123 Innovation Drive, Ado Ekiti, Nigeria</p>
            <p className="text-sm">admissions@lanrystars.com</p>
            <p className="text-sm">+234 123 456 7890</p>
            {/* Social Media Icons can be added here */}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-blue-dark text-center text-sm">
          <p>&copy; {new Date().getFullYear()} lanrystars. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
