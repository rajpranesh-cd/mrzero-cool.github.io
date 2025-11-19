import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Icons } from './Icons';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bgDark/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,255,157,0.1)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold font-mono text-primary tracking-wider cursor-pointer hover:text-white transition-colors">
              &lt;RAJPRANESH /&gt;
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-textSecondary hover:text-primary px-3 py-2 rounded-md text-sm font-mono font-medium transition-all duration-300 hover:-translate-y-1 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/mrzero-cool" target="_blank" rel="noreferrer" className="text-textSecondary hover:text-white transition-transform hover:scale-110">
              <Icons.Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/rajpranesh003" target="_blank" rel="noreferrer" className="text-textSecondary hover:text-white transition-transform hover:scale-110">
              <Icons.Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-textSecondary hover:text-primary hover:bg-bgHover focus:outline-none"
            >
              {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-bgSecondary shadow-lg border-b border-primary/20">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-textSecondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium font-mono"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;