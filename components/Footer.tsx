
import React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import FacebookIcon from './icons/FacebookIcon';
import XIcon from './icons/XIcon';
import InstagramIcon from './icons/InstagramIcon';
import YouTubeIcon from './icons/YouTubeIcon';
import LogoIcon from './icons/LogoIcon';

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    const socialLinks = [
        { name: 'Facebook', icon: <FacebookIcon />, href: 'https://facebook.com/youngstarsinternationalschool' },
        { name: 'X', icon: <XIcon />, href: 'https://x.com/youngstars_school' },
        { name: 'Instagram', icon: <InstagramIcon />, href: 'https://instagram.com/youngstarsinternationalschool' },
        { name: 'YouTube', icon: <YouTubeIcon />, href: 'https://youtube.com/channel/UC-example' },
    ];

  return (
    <footer className="bg-gradient-to-t from-space-dark to-space-light border-t border-brand-green/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
               <LogoIcon />
                <span className="text-xl font-orbitron font-bold text-white">YOUNG STARS</span>
            </div>
            <p className="text-gray-400">Shaping the innovators of tomorrow in Ado Ekiti, Nigeria.</p>
          </div>

          <div>
            <h3 className="font-orbitron text-lg font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(link.name as Page); }} className="text-gray-400 hover:text-brand-green transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-lg font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Zone 5, Road 8 Olorunsogo Street, Ado Ekiti</li>
              <li>info@youngstars.ng</li>
              <li>+234 806 373 1163</li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-lg font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex space-x-4">
                {socialLinks.map(social => (
                     <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-brand-green transition-colors duration-300"
                        aria-label={`Follow us on ${social.name}`}
                     >
                        {social.icon}
                        <span className="sr-only">{social.name}</span>
                    </a>
                ))}
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-brand-green/20 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Young Stars International School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
