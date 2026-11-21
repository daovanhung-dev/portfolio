/** Content-only data module: no dependency on a markdown renderer or Astro collection schema. */
import raw from './ubuntuServerGuides.json';

export type UbuntuRisk = 'low' | 'medium' | 'high';
export type UbuntuSection = 'setup' | 'deploy' | 'operate';
export interface UbuntuCommand { title: string; code: string; lang: string; why: string }
export interface UbuntuGuide {
  id: string;
  slug: string;
  group: UbuntuSection;
  order: number;
  title: string;
  summary: string;
  level: string;
  risk: UbuntuRisk;
  minutes: number;
  tags: string[];
  commands: UbuntuCommand[];
  note: string;
}
export interface UbuntuGroup { id: UbuntuSection; label: string; title: string; summary: string }

export const ubuntuGroups = raw.sections as UbuntuGroup[];
export const ubuntuGuides = (raw.guides as UbuntuGuide[]).slice().sort((a,b) => {
  const groups: UbuntuSection[] = ['setup','deploy','operate'];
  return groups.indexOf(a.group)-groups.indexOf(b.group) || a.order-b.order;
});
export const ubuntuRiskLabels: Record<UbuntuRisk, string> = { low: 'Chỉ đọc / cơ bản', medium: 'Cần kiểm tra', high: 'Thao tác có rủi ro' };
export function ubuntuGuideSequence(guide: UbuntuGuide) {
  const i = ubuntuGuides.findIndex(item=>item.slug === guide.slug);
  return { prev: ubuntuGuides[i-1], next: ubuntuGuides[i+1] };
}
