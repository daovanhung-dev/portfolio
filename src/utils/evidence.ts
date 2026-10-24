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
  'verified-source': 'Source đã đối chiếu',
  'verified-runtime': 'Runtime đã kiểm tra',
  'sanitized-private': 'Nguồn riêng tư được giữ kín',
  'user-attested': 'Chủ sở hữu tự xác nhận',
  'design-doc': 'Tài liệu thiết kế',
  'learning-lab': 'Hướng học tập',
  unverified: 'Chưa xác minh',
};

export function evidenceLabel(kind: EvidenceKind): string {
  return labels[kind];
}

export function evidenceFor(ids: string[]): EvidenceRecord[] {
  const wanted = new Set(ids);
  return evidence.filter((record) => wanted.has(record.id));
}

export function repositoryName(id: string | undefined): string | undefined {
  if (!id) return undefined;
  const repository = repositoryRecords.find((item) => item.id === id);
  return repository?.state === 'available' ? repository.name : undefined;
}

export function safeEvidenceNote(record: EvidenceRecord): string {
  if (record.kind === 'sanitized-private') {
    return 'Chỉ sử dụng mô tả tổng quát do chủ sở hữu xác nhận; không có liên kết hoặc media riêng tư.';
  }
  return record.note;
}
