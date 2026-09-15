import type { LinkItem } from './types';

export const navigationLinks: LinkItem[] = [
  { label: 'Giới thiệu', url: '#about', kind: 'internal' },
  { label: 'Kinh nghiệm', url: '#experience', kind: 'internal' },
  { label: 'Dự án', url: '#projects', kind: 'internal' },
  { label: 'Live products', url: '#live-products', kind: 'internal' },
  { label: 'Năng lực', url: '#capabilities', kind: 'internal' },
  { label: 'Case kỹ thuật', url: '#cases', kind: 'internal' },
];

export const contactLinks: LinkItem[] = [
  { label: 'GitHub', url: 'https://github.com/daovanhung-dev', kind: 'external' },
  { label: 'Email', url: 'mailto:daohungmt2005@gmail.com', kind: 'mailto' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/daovanhung-dev', kind: 'external' },
];

export const sectionIds = [
  'about',
  'experience',
  'projects',
  'live-products',
  'capabilities',
  'cases',
  'direction',
  'education',
  'contact',
] as const;
