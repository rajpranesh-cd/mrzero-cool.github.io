import React, { useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { STATS } from '../constants';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles: { 
      x: number; 
      y: number; 
      dx: number; 
      dy: number; 
      size: number; 
      alpha: number;
      angle: number;
      speed: number;
    }[] = [];
    
    const particleCount = width < 600 ? 30 : 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005
      });
    }

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, ${p.alpha})`;
        ctx.fill();

        // Complex movement: Linear drift + Sine wave float
        p.x += p.dx + Math.sin(time + p.angle) * 0.3;
        p.y += p.dy + Math.cos(time + p.angle) * 0.3;

        // Gentle pulse in size
        const sizePulse = Math.sin(time * p.speed) * 0.5; 
        // ctx.arc uses p.size, we simulate visual size change via drawing (not changing state to keep physics simple)
        
        // Wrap around edges seamlessly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Connect lines
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Use specific stats for the hero banner - picking the most impressive ones
  const heroStats = [
    STATS.find(s => s.label === 'Apps Secured') || STATS[0],
    STATS.find(s => s.label === 'Vuln Reduction') || STATS[2],
    STATS.find(s => s.label === 'Audit Findings') || STATS[3],
    STATS.find(s => s.label === 'Threats Blocked') || STATS[5],
  ];

  const scrollToTerminal = () => {
    const terminal = document.getElementById('terminal');
    if (terminal) {
      terminal.scrollIntoView({ behavior: 'smooth' });
      // Attempt to focus the input after scroll
      setTimeout(() => {
        document.getElementById('terminal-input')?.focus();
      }, 1000);
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-bgDark">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Rajpranesh M</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl text-textSecondary mb-8 font-mono">
          Senior Security Engineer | AppSec Specialist | DevSecOps Expert
        </h2>
        
        <p className="text-textSecondary max-w-2xl mx-auto mb-10 leading-relaxed">
          Security Engineer with 4+ years of hands-on experience in Application Security, DevSecOps, and Cloud Security across AWS/Azure environments.
          Built comprehensive security programs that reduced organizational vulnerabilities by 80% and achieved zero-finding compliance audits.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={scrollToTerminal} className="group relative px-8 py-3 bg-primary/10 border border-primary text-primary font-mono font-bold rounded overflow-hidden transition-all hover:bg-primary hover:text-bgDark">
            <span className="relative z-10 flex items-center gap-2">
               OPEN_TERMINAL <span className="group-hover:translate-x-1 transition-transform">_&gt;</span>
            </span>
          </button>
          
          <a 
            href="https://drive.google.com/file/d/1VxrWqiKxlk12t-prMFL2rNpLdf7gPD9D/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 border border-textSecondary text-textSecondary hover:border-white hover:text-white font-mono rounded transition-all flex items-center justify-center gap-2"
          >
            <Icons.Download className="w-4 h-4" /> DOWNLOAD RESUME
          </a>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8 text-sm font-mono text-textSecondary">
          {heroStats.map((stat, idx) => (
             <div key={idx} className="flex flex-col items-center">
               <span className={`${stat.color} font-bold text-xl`}>{stat.value}</span>
               <span>{stat.label}</span>
             </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-textSecondary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;