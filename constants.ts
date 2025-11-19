import { Project, Experience, SkillCategory, Stat, Certification } from './types';

export const NAV_LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'PROJECTS', href: '#projects' },
];

export const STATS: Stat[] = [
  { label: 'Apps Secured', value: '75+', numberValue: 75, icon: 'Shield', color: 'text-primary' },
  { label: 'Pentests', value: '25+', numberValue: 25, icon: 'Crosshair', color: 'text-secondary' },
  { label: 'Vuln Reduction', value: '80%', numberValue: 80, icon: 'TrendingDown', color: 'text-tertiary' },
  { label: 'Audit Findings', value: '45+', numberValue: 45, icon: 'FileText', color: 'text-primary' },
  { label: 'Engineers Trained', value: '80+', numberValue: 80, icon: 'Users', color: 'text-quaternary' },
  { label: 'Threats Blocked', value: '95%', numberValue: 95, icon: 'Lock', color: 'text-secondary' },
];

export const EXPERIENCE: Experience[] = [
  {
    title: "Senior Security Engineer",
    company: "Cloud Destinations",
    duration: "Nov 2021 - Present",
    achievements: [
      "### Application Security & DevSecOps",
      "Architected centralized DevSecOps platform covering 75+ applications with SAST, DAST, SCA, and IAST integration, achieving 95% automation coverage.",
      "Reduced organizational vulnerabilities by 80% through comprehensive DevSecOps automation and risk-based prioritization.",
      "Implemented shift-left security for 50+ microservices, eliminating 90% of production vulnerabilities.",
      "Blocked 60% of insecure commits before deployment using automated security gates in Jenkins/GitHub Actions.",
      "Implemented GitGuardian for enterprise-wide secrets detection across 100+ repositories.",
      
      "### Cloud & Infrastructure Security",
      "Secured multi-cloud infrastructure (AWS/Azure) using CSPM to remediate 80+ critical misconfigurations via policy-as-code.",
      "Deployed AWS WAF and Shield Advanced, blocking 95% of malicious traffic and preventing DDoS attacks.",
      "Implemented Zero Trust architecture with MFA and conditional access, reducing unauthorized access risks by 85%.",
      "Designed Kubernetes security framework (RBAC, Network Policies) for 15+ production clusters.",
      
      "### Vulnerability Management & Pentesting",
      "Managed vulnerability lifecycle for 100+ assets using Qualys VMDR/WAS, reducing organizational risk by 80%.",
      "Executed 25+ penetration tests on web/mobile apps & APIs, achieving 100% remediation compliance.",
      "Implemented OPA Gatekeeper policies for Kubernetes, blocking 100% of non-compliant deployments.",
      
      "### Incident Response & Automation",
      "Built Cortex XSOAR playbooks reducing manual incident response effort by 50%.",
      "Integrated AWS GuardDuty EKS Runtime Monitoring, reducing detection-to-response time by 35%.",
      
      "### Compliance & Governance",
      "Led compliance programs for ISO 27001, SOC2, FedRAMP, and PCI DSS, achieving zero audit findings.",
      "Delivered secure coding workshops to 80+ developers, reducing security defects by 60%."
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "App Security",
    icon: "ShieldCheck",
    skills: ["SAST (Veracode, SonarQube)", "DAST (Burp Suite, ZAP)", "SCA (Snyk, Trivy)", "IAST/MAST (MobSF)", "Threat Modeling", "OAuth 2.0 / JWT"]
  },
  {
    title: "Cloud Security",
    icon: "CloudLock",
    skills: ["AWS (IAM, GuardDuty, WAF)", "Azure (Entra ID)", "Kubernetes Security", "CSPM", "Encryption (AES-256)", "VPC Security"]
  },
  {
    title: "DevSecOps",
    icon: "Infinite",
    skills: ["Jenkins", "GitHub Actions", "GitLab CI", "Terraform", "OPA", "GitGuardian", "SBOM (Syft/CycloneDX)"]
  },
  {
    title: "Network Defense",
    icon: "Network",
    skills: ["AWS WAF/Shield", "Fortigate IDS/IPS", "NACLs & Security Groups", "Network Segmentation", "DDoS Protection"]
  },
  {
    title: "IAM & Zero Trust",
    icon: "UserCheck",
    skills: ["Zero Trust Arch", "RBAC/ABAC", "MFA", "Conditional Access", "Just-in-Time Access"]
  },
  {
    title: "Vuln Management",
    icon: "Radar",
    skills: ["Qualys VMDR/WAS", "CVSS Scoring", "Risk Prioritization", "Penetration Testing", "API Security"]
  },
  {
    title: "Automation",
    icon: "Bot",
    skills: ["Cortex XSOAR", "Python & Bash", "boto3 SDK", "MITRE ATT&CK", "Auto-Remediation"]
  },
  {
    title: "Compliance",
    icon: "BadgeCheck",
    skills: ["ISO 27001", "SOC2", "FedRAMP", "PCI DSS", "NIST CSF", "CIS Benchmarks"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "AWS Security Automation Tool",
    description: "Developed Python-based tool using boto3 SDK for automated IAM role drift detection and CIS compliance monitoring across multi-account environments.",
    tags: ["Python", "boto3", "AWS IAM", "Compliance"],
    impact: "Automated drift detection",
    link: "#"
  },
  {
    title: "Kubernetes Hardening",
    description: "Implemented comprehensive security controls including RBAC, Network Policies, and Pod Security Standards for production EKS clusters.",
    tags: ["Kubernetes", "EKS", "RBAC", "OPA"],
    impact: "60% attack surface reduction",
    link: "#"
  },
  {
    title: "SOAR Integration Platform",
    description: "Built custom Cortex XSOAR playbooks for automated incident response to phishing and malware triage, ensuring consistent response handling.",
    tags: ["Cortex XSOAR", "Python", "Automation", "IR"],
    impact: "50% less manual IR effort",
    link: "#"
  },
  {
    title: "Control Validation Framework",
    description: "Framework using AWS SDK and GitHub Actions to automate validation of IAM policies, WAF rules, and GuardDuty alerts.",
    tags: ["AWS SDK", "GitHub Actions", "Python"],
    impact: "100% continuous verification",
    link: "#"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "CompTIA Security+", issuer: "CompTIA", date: "Active", color: "border-primary" },
  { name: "Certified AppSec Practitioner", issuer: "SecOps Group", date: "Active", color: "border-secondary" },
  { name: "Qualys WAS", issuer: "Qualys", date: "Active", color: "border-tertiary" },
  { name: "Certified Network Sec Practitioner", issuer: "SecOps Group", date: "Active", color: "border-quaternary" }
];