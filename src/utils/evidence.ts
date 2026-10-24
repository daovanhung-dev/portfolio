import records from '../data/evidence.json';
import repositories from '../data/repositories.json';

export type EvidenceKind =
  | 'verified-source'
  | 'verified-runtime'
  | 'sanitized-private'
  | 'user-attested'
  | 'design-doc'
  | 'learning-lab'
  | 'unverified';

export interface EvidenceRecord {
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

interface RepositoryRecord {
  id: string;
  name: string;
  url?: string;
  state: 'available' | 'empty' | 'restricted';
}

export const evidence = records as EvidenceRecord[];
const repositoryRecords = repositories as RepositoryRecord[];

const labels: Record<EvidenceKind, string> = {
  'verified-source': 'Mã nguồn',
  'verified-runtime': 'Kiểm thử ứng dụng',
  'sanitized-private': 'Tư liệu riêng tư',
  'user-attested': 'Thông tin hồ sơ',
  'design-doc': 'Tài liệu thiết kế',
  'learning-lab': 'Ghi chú học tập',
  unverified: 'Tư liệu nội bộ',
};

export function evidenceLabel(kind: EvidenceKind): string {
  return labels[kind];
}

export function evidenceFor(ids: string[]): EvidenceRecord[] {
  const wanted = new Set(ids);
  return evidence.filter((record) => wanted.has(record.id));
}

export function publicEvidenceFor(ids: string[]): EvidenceRecord[] {
  return evidenceFor(ids).filter((record) =>
    ['verified-source', 'verified-runtime', 'design-doc'].includes(record.kind) && repositoryName(record.repoId),
  );
}

export function repositoryName(id: string | undefined): string | undefined {
  if (!id) return undefined;
  const repository = repositoryRecords.find((item) => item.id === id);
  return repository?.state === 'available' ? repository.name : undefined;
}
