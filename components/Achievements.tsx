import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../constants';
import { Icons } from './Icons';
import { Stat } from '../types';

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    const endValue = stat.numberValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out expo: 1 - 2^(-10 * t)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasAnimated, stat.numberValue]);

  const Icon = Icons[stat.icon] || Icons.Shield;
  const suffix = stat.value.replace(stat.numberValue.toString(), '');

  return (
    <div 
      ref={elementRef}
      className="bg-bgDark p-6 rounded-xl border border-gray-800 text-center hover:border-gray-600 transition-colors group"
    >
      <div className={`mb-3 inline-flex p-3 rounded-full bg-bgSurface ${stat.color.replace('text-', 'bg-')}/10 ${stat.color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`text-3xl font-bold ${stat.color} mb-1 font-mono group-hover:scale-110 transition-transform`}>
        {count}{suffix}
      </div>
      <div className="text-xs text-textSecondary uppercase tracking-wider font-medium">
        {stat.label}
      </div>
    </div>
  );
};

const Achievements: React.FC = () => {
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
    <section id="about" ref={sectionRef} className="py-20 bg-bgSecondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className={`max-w-7xl mx-auto px-4 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          <span className="border-b-4 border-secondary pb-2">Key Metrics</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;