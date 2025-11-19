import React, { useEffect, useRef, useState } from 'react';
import { SKILLS } from '../constants';
import { Icons } from './Icons';

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-bgDark px-4 overflow-hidden">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          <span className="border-b-4 border-primary pb-2">Technical Arsenal</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SKILLS.map((category, idx) => {
            const Icon = Icons[category.icon] || Icons.Shield;
            return (
              <div 
                key={idx} 
                className={`group bg-bgSurface p-6 rounded-xl border border-gray-800 hover:border-primary transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] flex flex-col h-full transform transition-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center mb-5 border-b border-gray-800 pb-4">
                  <div className="p-2.5 bg-bgDark rounded-lg text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white ml-3 group-hover:text-primary transition-colors">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 content-start">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 py-1.5 text-xs font-mono font-medium bg-bgDark text-textSecondary rounded-md border border-gray-800 group-hover:border-primary/30 group-hover:text-white transition-all hover:bg-primary/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;