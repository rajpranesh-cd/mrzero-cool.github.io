import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../constants';

// Helper type for parsed chunks
interface ParsedBlock {
  title: string;
  items: string[];
}

const Experience: React.FC = () => {
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

  // Parse the single experience entry into multiple blocks for the visual timeline
  const exp = EXPERIENCE[0]; 
  const blocks: ParsedBlock[] = [];
  let currentBlock: ParsedBlock | null = null;

  exp.achievements.forEach((item) => {
    if (item.startsWith('###')) {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = {
        title: item.replace('###', '').trim(),
        items: []
      };
    } else if (currentBlock) {
      currentBlock.items.push(item);
    }
  });
  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-bgDark px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className={`max-w-6xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
          <span className="border-b-4 border-tertiary pb-2">Mission History</span>
        </h2>
        
        {/* Role Header - Static Position */}
        <div className="relative z-20 mb-20 bg-bgSurface p-8 rounded-2xl border border-tertiary/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] max-w-3xl mx-auto text-center group hover:border-tertiary/40 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tertiary text-bgDark font-bold px-6 py-1.5 rounded-full text-sm uppercase tracking-widest shadow-lg">
              Current Role
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 mt-2">{exp.title}</h3>
            <div className="text-xl text-tertiary mb-4 font-mono tracking-wide">{exp.company}</div>
            
            <div className="flex justify-center items-center gap-4 text-textSecondary text-sm">
               <span className="bg-bgDark px-4 py-2 rounded-full border border-gray-700 inline-block">
                 {exp.duration}
               </span>
            </div>
        </div>

        <div className="relative">
          {/* Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tertiary/50 via-secondary/30 to-transparent md:-translate-x-1/2"></div>

          <div className="space-y-16">
            {blocks.map((block, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
                
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-bgDark bg-tertiary shadow-[0_0_15px_#ffd700] -translate-x-[7px] md:-translate-x-1/2 mt-8 z-10 group-hover:scale-150 transition-transform duration-300"></div>
                
                {/* Spacer for alignment */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="bg-bgSurface/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 transition-all duration-300 hover:border-tertiary/30 hover:bg-bgSurface hover:shadow-xl relative overflow-hidden group-hover:-translate-y-1">
                    
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800/50">
                      <span className="text-tertiary/20 font-mono text-4xl font-bold">0{idx + 1}</span>
                      <h4 className="text-xl font-bold text-white">{block.title}</h4>
                    </div>
                    
                    {/* List */}
                    <ul className="space-y-4">
                      {block.items.map((achievement, aIdx) => (
                          <li key={aIdx} className="flex items-start text-textSecondary text-sm leading-relaxed group/item">
                            <span className="mr-3 text-secondary mt-1.5 shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity">▹</span>
                            <span className="group-hover/item:text-gray-300 transition-colors">{achievement}</span>
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;