import type { LinkItem } from './types';

export const navigationLinks: LinkItem[] = [
  { label: 'Timeline', url: '#experience', kind: 'internal' },
  { label: 'Dự án', url: '#projects', kind: 'internal' },
  { label: 'Liên hệ', url: '#contact', kind: 'internal' },
];

export const contactLinks: LinkItem[] = [
  { label: 'GitHub', url: 'https://github.com/daovanhung-dev', kind: 'external' },
  { label: 'Email', url: 'mailto:daohungmt2005@gmail.com', kind: 'mailto' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/daovanhung-dev', kind: 'external' },
];

export const sectionIds = [
  'experience',
  'projects',
  'contact',
] as const;
