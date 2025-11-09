
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import Button from './common/Button';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import LogoIcon from './icons/LogoIcon';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsOpen(false);
    setMobilePortalOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobilePortalOpen(false);
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-space-dark/80 backdrop-blur-lg shadow-lg shadow-brand-green/10' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick(Page.Home)}>
             <LogoIcon />
            <span className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-wider">
              YOUNG <span className="text-brand-green">STARS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
                if ('dropdown' in link) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative"
                      onMouseEnter={() => setIsPortalOpen(true)}
                      onMouseLeave={() => setIsPortalOpen(false)}
                    >
                      <button onClick={() => handleNavClick(link.name)} className={`font-medium text-lg transition-colors duration-300 flex items-center gap-1 text-gray-300 hover:text-brand-green focus:outline-none`}>
                        {link.name}
                        <svg className={`w-4 h-4 transition-transform duration-200 ${isPortalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-space-light/90 backdrop-blur-lg border border-brand-green/20 rounded-xl shadow-lg transition-all duration-300 origin-top ${isPortalOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                        <div className="p-2">
                          {link.dropdown.map(item => (
                            <a key={item.name} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.page); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-brand-green/20 hover:text-white rounded-md transition-colors">
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                else {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.name); }}
                      className={`font-medium text-lg transition-colors duration-300 ${currentPage === link.name ? 'text-brand-green' : 'text-gray-300 hover:text-brand-green'}`}
                    >
                      {link.name}
                    </a>
                  );
                }
              })}
          </div>

          <div className="hidden md:block">
            <Button onClick={() => handleNavClick(Page.Admissions)}>Apply Now</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-space-light transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="flex flex-col items-center space-y-4 py-8">
            {NAV_LINKS.map((link) => {
                if ('dropdown' in link) {
                return (
                    <div key={link.name} className="w-full text-center">
                    <button 
                        onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
                        className="text-xl font-medium text-gray-300 hover:text-brand-green transition-colors duration-300 w-full flex items-center justify-center gap-2"
                    >
                        {link.name}
                        <svg className={`w-5 h-5 transition-transform duration-200 ${mobilePortalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobilePortalOpen ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="flex flex-col items-center space-y-3 pt-3">
                        {link.dropdown.map(item => (
                            <a key={item.name} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.page); }} className="text-lg font-medium text-gray-400 hover:text-brand-green transition-colors">
                            {item.name}
                            </a>
                        ))}
                        </div>
                    </div>
                    </div>
                );
                }
                else {
                  return (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.name); }}
                        className={`text-xl font-medium transition-colors duration-300 ${currentPage === link.name ? 'text-brand-green' : 'text-gray-300 hover:text-brand-green'}`}
                    >
                        {link.name}
                    </a>
                  );
                }
            })}
          <Button onClick={() => handleNavClick(Page.Admissions)} className="mt-4">Apply Now</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
