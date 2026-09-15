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
  order: number;
  organization: string;
  period: string;
  role: string;
  status: string;
  summary: string;
  highlights: string[];
  stack: string[];
  projectIds: string[];
}

export interface Project {
  id: string;
  order: number;
  timelineExperienceId?: string;
  name: string;
  category: string;
  status: string;
  role: string;
  summary: string;
  problem?: string;
  users?: string[];
  solution?: string;
  architecture: string;
  businessFlow?: string;
  workDone: string[];
  quality?: string[];
  evidence?: string[];
  limitations?: string[];
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
