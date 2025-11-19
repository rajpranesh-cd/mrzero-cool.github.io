export interface Project {
  title: string;
  description: string;
  tags: string[];
  impact: string;
  link: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  achievements: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  numberValue: number;
  icon: string;
  color: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  color: string;
}