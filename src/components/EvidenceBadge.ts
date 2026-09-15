import type { EvidenceLevel, ProjectStatus } from '../data/types';
import { escapeHtml, slug } from './utils';

const evidenceDescriptions: Record<EvidenceLevel, string> = {
  ENTERPRISE: 'Commercial/company environment with engineering workflow evidence.',
  'PRODUCTION / ACTIVE PRODUCT': 'Active product evidence; scope and runtime depth may vary.',
  'LIVE PRODUCT': 'Publicly deployed system that can be opened and inspected.',
  'TEAM LEAD': 'Team coordination, task decomposition and implementation support evidence.',
  ARCHITECTURE: 'Strong architecture/design evidence; production scope may vary.',
  PROJECT: 'Implemented project experience without a production-scale claim.',
  'DESIGN / DEVELOPMENT': 'Design, planning or active development evidence.',
  'FRONTEND PROOF': 'Focused proof of frontend craftsmanship and delivery quality.',
  FOUNDATION: 'Foundational knowledge or supporting engineering practice.',
  'LEARNING DIRECTION': 'A direction being developed; not a claim of professional practice.',
};

export function evidenceBadge(level: EvidenceLevel): string {
  return `<span class="evidence evidence-${slug(level)}" title="${escapeHtml(evidenceDescriptions[level])}">${escapeHtml(level)}</span>`;
}

export function statusBadge(status: ProjectStatus): string {
  return `<span class="status-badge status-${slug(status)}">${escapeHtml(status)}</span>`;
}
