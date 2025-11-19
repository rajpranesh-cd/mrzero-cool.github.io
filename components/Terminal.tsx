import React, { useState, useRef, useEffect } from 'react';
import { SKILLS, EXPERIENCE, PROJECTS, STATS } from '../constants';
import { Icons } from './Icons';

interface TerminalProps {
  onClose: () => void;
}

interface TerminalLine {
  type: 'input' | 'output';
  content: string | React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Rajpranesh Security Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Keep focus
  const keepFocus = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response: React.ReactNode | string = '';

    switch (trimmedCmd) {
      case 'help':
        response = (
          <div className="grid grid-cols-1 gap-1 text-textSecondary">
            <p><span className="text-primary">about</span> - View professional summary</p>
            <p><span className="text-primary">skills</span> - List technical capabilities</p>
            <p><span className="text-primary">experience</span> - Show work history</p>
            <p><span className="text-primary">projects</span> - View security projects</p>
            <p><span className="text-primary">stats</span> - Show key metrics</p>
            <p><span className="text-primary">contact</span> - Display contact info</p>
            <p><span className="text-primary">clear</span> - Clear terminal</p>
            <p><span className="text-primary">exit</span> - Close terminal</p>
          </div>
        );
        break;
      case 'about':
        response = "Senior Security Engineer with 4+ years of experience securing enterprise applications. Specializing in Cloud Security (AWS/Azure), DevSecOps pipelines, and Automated Vulnerability Management.";
        break;
      case 'skills':
        response = (
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => (
              <div key={s.title} className="mb-2">
                <span className="text-secondary font-bold block">[{s.title}]</span>
                <span className="text-textSecondary">{s.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;
      case 'experience':
        // Simplified text output for terminal
        response = (
           <div className="space-y-2">
             <div className="text-tertiary font-bold">Senior Security Engineer @ Cloud Destinations (Nov 2021 - Present)</div>
             <ul className="list-disc pl-5 text-textSecondary">
                <li>Architected DevSecOps platform for 75+ apps (95% automation)</li>
                <li>Reduced organizational vulnerabilities by 80%</li>
                <li>Blocked 95% of malicious traffic via AWS WAF/Shield</li>
                <li>Zero audit findings in ISO 27001/SOC2</li>
             </ul>
           </div>
        );
        break;
      case 'projects':
         response = PROJECTS.map((p, i) => (
          <div key={i} className="mb-2">
            <span className="text-quaternary">{p.title}</span>: {p.description}
          </div>
        ));
        break;
      case 'stats':
        response = (
            <div className="grid grid-cols-2 gap-4">
                {STATS.map((s,i) => (
                    <div key={i}>{s.label}: <span className={s.color}>{s.value}</span></div>
                ))}
            </div>
        )
        break;
      case 'contact':
        response = (
          <div>
             Email: <a href="mailto:rajpranesh003@gmail.com" className="text-primary underline">rajpranesh003@gmail.com</a><br/>
             LinkedIn: <a href="https://linkedin.com/in/rajpranesh003" className="text-primary underline">linkedin.com/in/rajpranesh003</a><br/>
             GitHub: <a href="https://github.com/mrzero-cool" className="text-primary underline">github.com/mrzero-cool</a>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case '':
        response = '';
        break;
      default:
        response = `Command not found: ${trimmedCmd}. Type 'help' for list of commands.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: response }
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="w-full max-w-4xl">
        <div className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-gray-700 overflow-hidden transform transition-all hover:shadow-[0_0_30px_rgba(0,255,157,0.15)]">
          {/* Terminal Header */}
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex space-x-2">
              <div onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors" title="Close"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm font-mono">rajpranesh@security-terminal: ~/portfolio</div>
            <div className="w-4 flex justify-end">
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <Icons.X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 h-[60vh] overflow-y-auto font-mono text-sm bg-[#0a0e1a] text-gray-300" onClick={keepFocus}>
            {history.map((line, i) => (
              <div key={i} className="mb-1 break-words">
                {line.type === 'input' ? (
                  <div className="flex text-primary">
                    <span className="mr-2">visitor@rajpranesh:~$</span>
                    <span>{line.content}</span>
                  </div>
                ) : (
                  <div className="text-gray-300 ml-0">{line.content}</div>
                )}
              </div>
            ))}
            
            <div className="flex items-center mt-2">
              <span className="text-primary mr-2">visitor@rajpranesh:~$</span>
              <input
                ref={inputRef}
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="bg-transparent border-none outline-none text-gray-100 flex-1 font-mono terminal-cursor"
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
        
        <div className="text-center mt-4 text-textSecondary text-sm font-mono">
          Press 'ESC' or type 'exit' to close
        </div>
      </div>
    </div>
  );
};

export default Terminal;