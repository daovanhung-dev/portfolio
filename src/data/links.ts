import type { LinkItem } from './types';

export const navigationLinks: LinkItem[] = [
  { label: 'Dự án', url: '#/projects', kind: 'internal' },
  { label: 'Case', url: '#/case-studies', kind: 'internal' },
  { label: 'Labs', url: '#/labs', kind: 'internal' },
  { label: 'Quy trình', url: '#/process', kind: 'internal' },
];

export const contactLinks: LinkItem[] = [
  { label: 'GitHub', url: 'https://github.com/daovanhung-dev', kind: 'external' },
  { label: 'Email', url: 'mailto:daohungmt2005@gmail.com', kind: 'mailto' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/daovanhung-dev', kind: 'external' },
];

export const sectionIds = ['projects', 'case-studies', 'labs', 'process'] as const;
