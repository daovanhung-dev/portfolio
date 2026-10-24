/** Evidence levels and records used by the public portfolio. */
export type EvidenceKind =
  | 'verified-source'
  | 'verified-runtime'
  | 'user-attested'
  | 'design-doc'
  | 'learning-lab'
  | 'unverified';

export type FeatureState =
  | 'implemented'
  | 'partial'
  | 'placeholder'
  | 'source-only'
  | 'design'
  | 'deployed-verified'
  | 'historical';

export type EvidenceLevel = LegacyEvidenceLevel;

export interface EvidenceRef {
  id: string;
  kind: EvidenceKind;
  repoId?: string;
  path?: string;
  commitSha?: string;
  branch?: string;
  url?: string;
  observedAt: string;
  note: string;
  publicSafe: true;
}

export interface SourceRepository {
  id: string;
  name: string;
  url?: string;
  defaultBranch?: string;
  defaultSha?: string;
  newestBranch?: string;
  newestBranchSha?: string;
  remoteBranchCount: number;
  tagCount: number;
  windowCommitCount: number;
  auditMode: 'full-history' | 'shallow-window' | 'empty';
  state: 'available' | 'empty';
  coverageNote?: string;
}

export interface FeatureProof {
  id: string;
  label: string;
  state: FeatureState;
  evidenceRefIds: string[];
  limitation?: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  category: string;
  role: string;
  summary: string;
  status: FeatureState;
  repositoryIds: string[];
  evidenceRefIds: string[];
  featureProofs: FeatureProof[];
  stack: string[];
  period?: string;
  liveUrl?: string;
  liveAvailability: 'reachable' | 'unreachable' | 'unknown';
  availabilityCheckedAt?: string;
  featureVerifiedAt?: string;
  limitations: string[];
}

export interface PortfolioExperience {
  id: string;
  organization: string;
  role: string;
  period: string;
  summary: string;
  evidenceRefIds: string[];
  projectIds: string[];
  attribution: 'user-attested' | 'source-backed' | 'mixed';
}

export interface PortfolioCaseStudy {
  id: string;
  slug: string;
  title: string;
  context: string;
  approach: string[];
  result: string;
  evidenceRefIds: string[];
  featureState: FeatureState;
  limitations: string[];
}

export interface PortfolioLab {
  id: string;
  slug: string;
  title: string;
  description: string;
  topics: string[];
  evidenceRefIds: string[];
  state: 'learning' | 'source-only' | 'planned';
  limitations: string[];
}

export interface CapabilityMapping {
  id: string;
  label: string;
  projectIds: string[];
  evidenceRefIds: string[];
  state: FeatureState;
}

/* Legacy component contracts retained while the new evidence-led pages replace
 * the former data-driven sections. They are not used by public route content. */
export type LegacyEvidenceLevel =
  | 'ENTERPRISE' | 'PRODUCTION / ACTIVE PRODUCT' | 'LIVE PRODUCT' | 'TEAM LEAD'
  | 'ARCHITECTURE' | 'PROJECT' | 'DESIGN / DEVELOPMENT' | 'FRONTEND PROOF'
  | 'FOUNDATION' | 'LEARNING DIRECTION';
export type ProjectStatus =
  | 'LIVE' | 'ACTIVE DEVELOPMENT' | 'PRODUCTION PRODUCT' | 'ENTERPRISE EXPERIENCE'
  | 'DESIGN / DEVELOPMENT' | 'HISTORICAL';
export interface LinkItem { label: string; url: string; kind?: 'external' | 'mailto' | 'internal'; }
export interface Metric { value: string; label: string; }
export interface Principle { number: string; title: string; description: string; }
export interface Profile {
  name: string; shortName: string; role: string; headline: string; supportingStatement: string;
  availability: string; summary: string; metrics: Metric[]; principles: Principle[];
  aiWorkflow: string[]; securityFoundation: string[]; securityDirection: string[];
}
export interface Experience {
  id: string; order: number; organization: string; period: string; role: string; status: string;
  summary: string; highlights: string[]; stack: string[]; projectIds: string[];
}
export interface Project {
  id: string; order: number; timelineExperienceId?: string; name: string; category: string;
  status: string; role: string; summary: string; problem?: string; users?: string[];
  solution?: string; architecture: string; businessFlow?: string; workDone: string[];
  quality?: string[]; evidence?: string[]; limitations?: string[]; stack: Record<string, string[]>;
  repository?: string; liveUrl?: string; relatedUrls?: LinkItem[]; caseStudyIds?: string[]; featured?: boolean;
}
export interface LiveProduct {
  id: string; name: string; purpose: string; status: Extract<ProjectStatus, 'LIVE' | 'ACTIVE DEVELOPMENT'>;
  projectId: string; liveUrl: string; repository?: string; architectureHighlight: string; role: string;
}
export interface CapabilityItem {
  name: string; level: LegacyEvidenceLevel; evidenceProjectIds?: string[]; evidenceExperienceIds?: string[];
}
export interface CapabilityGroup { id: string; label: string; title: string; description: string; items: CapabilityItem[]; }
export interface CaseStudy {
  id: string; number: string; title: string; problem: string; flow: string[]; takeaway: string;
  evidenceProjectIds?: string[]; evidenceExperienceIds?: string[];
}
export interface Education {
  institution: string; field: string; cohort: string; graduation: string;
  stats: { value: string; label: string }[]; note: string;
}
