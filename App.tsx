import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/Achievements'; // Achievements doubles as quick stats details
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import { CERTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Handle Escape key to close terminal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-bgDark text-textPrimary font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        
        {/* Certification Section - Small enough to be inline */}
        <section className="py-16 bg-bgSurface/50 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
             <h3 className="text-2xl font-bold text-center text-white mb-8 font-mono">&lt;CERTIFICATIONS /&gt;</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className={`p-4 rounded bg-bgDark border-l-4 ${cert.color} hover:translate-x-2 transition-transform`}>
                    <h4 className="font-bold text-white">{cert.name}</h4>
                    <p className="text-sm text-textSecondary">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <Skills />
        <Experience />
        <Projects />
      </main>
      
      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
      
      <Footer />
    </div>
  );
};

export default App;