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
  const exp = EXPERIENCE[0]; // Assuming single role for now based on constants.ts
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
    <section id="experience" ref={sectionRef} className="py-20 bg-bgDark px-4">
      <div className={`max-w-5xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          <span className="border-b-4 border-tertiary pb-2">Mission History</span>
        </h2>
        
        {/* Role Header */}
        <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>
            <div className="text-xl text-white mt-1">{exp.company}</div>
            <div className="inline-block mt-2 px-4 py-1 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary font-mono text-sm">
              {exp.duration}
            </div>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
          {blocks.map((block, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bgDark bg-tertiary shadow-[0_0_10px_#ffd700] absolute left-0 md:static shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 translate-x-0 z-10">
                <span className="text-bgDark font-bold text-xs">{idx + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-bgSurface p-6 rounded-xl border border-gray-800 shadow-lg transition-all duration-300 hover:border-tertiary hover:transform hover:scale-[1.02] hover:shadow-[0_5px_15px_rgba(255,215,0,0.1)]">
                <div className="flex flex-col mb-4 border-b border-gray-800 pb-2">
                  <h3 className="text-lg font-bold text-tertiary">{block.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {block.items.map((achievement, aIdx) => (
                      <li key={aIdx} className="flex items-start text-textSecondary text-sm leading-relaxed">
                        <span className="mr-2 text-tertiary mt-1.5 text-[10px]">▹</span>
                        {achievement}
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;