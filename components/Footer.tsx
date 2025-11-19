import React from 'react';
import { Icons } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bgDark border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Let's Connect</h2>
            <p className="text-textSecondary max-w-md">
              Open to discussing AppSec strategies, DevSecOps implementation, or security audit opportunities.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:rajpranesh003@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-bgSurface border border-gray-700 rounded hover:border-primary hover:text-primary transition-all">
              <Icons.Mail className="w-4 h-4" />
              rajpranesh003@gmail.com
            </a>
            <a href="tel:+919659999778" className="flex items-center justify-center gap-2 px-6 py-3 bg-bgSurface border border-gray-700 rounded hover:border-primary hover:text-primary transition-all">
              <span>📞</span>
              +91 9659999778
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="mb-4 md:mb-0">
            &copy; 2025 Rajpranesh M. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/mrzero-cool" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/rajpranesh003" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;