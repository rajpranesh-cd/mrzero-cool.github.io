import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { Icons } from './Icons';

const Projects: React.FC = () => {
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
    <section id="projects" ref={sectionRef} className="py-20 bg-bgSecondary px-4">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          <span className="border-b-4 border-secondary pb-2">Security Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx}
              className={`group relative bg-bgSurface overflow-hidden rounded-xl border border-gray-800 transition-all duration-700 ease-out hover:border-secondary hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${100 + idx * 150}ms` }}
            >
              {/* Decorative Header */}
              <div className="h-2 bg-gradient-to-r from-secondary to-quaternary w-full"></div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <a href={project.link} className="text-gray-500 hover:text-white transition-colors">
                    <Icons.ExternalLink className="w-6 h-6" />
                  </a>
                </div>

                <p className="text-textSecondary mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Impact Analysis</h4>
                  <p className="text-primary font-mono text-sm border-l-2 border-primary pl-3">
                    {project.impact}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-3 py-1 text-xs font-mono text-secondary bg-secondary/10 rounded-full border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;