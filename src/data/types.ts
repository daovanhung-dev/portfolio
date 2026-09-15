export type EvidenceLevel =
  | 'ENTERPRISE'
  | 'PRODUCTION / ACTIVE PRODUCT'
  | 'LIVE PRODUCT'
  | 'TEAM LEAD'
  | 'ARCHITECTURE'
  | 'PROJECT'
  | 'DESIGN / DEVELOPMENT'
  | 'FRONTEND PROOF'
  | 'FOUNDATION'
  | 'LEARNING DIRECTION';

export type ProjectStatus =
  | 'LIVE'
  | 'ACTIVE DEVELOPMENT'
  | 'PRODUCTION PRODUCT'
  | 'ENTERPRISE EXPERIENCE'
  | 'DESIGN / DEVELOPMENT'
  | 'HISTORICAL';

export interface LinkItem {
  label: string;
  url: string;
  kind?: 'external' | 'mailto' | 'internal';
}

export interface Metric {
  value: string;
  label: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  headline: string;
  supportingStatement: string;
  availability: string;
  summary: string;
  metrics: Metric[];
  principles: Principle[];
  aiWorkflow: string[];
  securityFoundation: string[];
  securityDirection: string[];
}

export interface Experience {
  id: string;
  organization: string;
  period: string;
  role: string;
  evidenceLevel: EvidenceLevel;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: ProjectStatus;
  evidenceLevel: EvidenceLevel;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: Record<string, string[]>;
  repository?: string;
  liveUrl?: string;
  relatedUrls?: LinkItem[];
  caseStudyIds?: string[];
  featured?: boolean;
}

export interface LiveProduct {
  id: string;
  name: string;
  purpose: string;
  status: Extract<ProjectStatus, 'LIVE' | 'ACTIVE DEVELOPMENT'>;
  projectId: string;
  liveUrl: string;
  repository?: string;
  architectureHighlight: string;
  role: string;
}

export interface CapabilityItem {
  name: string;
  level: EvidenceLevel;
  evidenceProjectIds?: string[];
  evidenceExperienceIds?: string[];
}

export interface CapabilityGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  items: CapabilityItem[];
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  problem: string;
  flow: string[];
  takeaway: string;
  evidenceProjectIds?: string[];
  evidenceExperienceIds?: string[];
}

export interface Education {
  institution: string;
  field: string;
  cohort: string;
  graduation: string;
  stats: { value: string; label: string }[];
  note: string;
}
