import type { Profile } from './types';

export const profile: Profile = {
  name: 'Đào Văn Hùng',
  shortName: 'DVH',
  role: 'Full-stack Developer',
  headline: 'Tôi xây sản phẩm từ business → system → code → test → delivery.',
  supportingStatement:
    'Tập trung vào Backend Python, Flutter, PostgreSQL/Supabase, API & System Design, debugging xuyên tầng và AI-assisted Engineering.',
  availability: 'Open to strong engineering opportunities',
  summary:
    'Tôi kết nối được nhiều lớp của một sản phẩm: yêu cầu nghiệp vụ, thiết kế API/CSDL, implementation, kiểm thử, dữ liệu và điều tra lỗi. Tôi ưu tiên thay đổi có bằng chứng, traceability rõ và không coi source tồn tại đồng nghĩa với feature đã production-ready.',
  metrics: [
    { value: '06', label: 'REST APIs tại FPT' },
    { value: '02', label: 'Màn hình nghiệp vụ tại FPT' },
    { value: '06', label: 'Thành viên Flutter team từng lead' },
    { value: '8+', label: 'Repo/project public & active' },
  ],
  principles: [
    {
      number: '01',
      title: 'End-to-end reasoning',
      description: 'Business → Module → Feature → API/UI/Data → Test.',
    },
    {
      number: '02',
      title: 'Evidence-driven debugging',
      description: 'Log → payload → state → API → service → SQL → database.',
    },
    {
      number: '03',
      title: 'Data consistency',
      description: 'Ownership, constraints, transactions, migration và local/cloud sync.',
    },
    {
      number: '04',
      title: 'Security-aware thinking',
      description: 'Authentication, authorization, secrets, RLS và server-side boundaries.',
    },
  ],
  aiWorkflow: ['Context', 'Analyze', 'Plan', 'Execute', 'Test', 'Review', 'Handoff'],
  securityFoundation: [
    'Linux',
    'Networking fundamentals',
    'Python',
    'Web/API',
    'SQL',
    'Authentication',
    'RBAC',
    'RLS',
    'Debugging',
    'Application Security fundamentals',
  ],
  securityDirection: ['AppSec', 'Web Security', 'Attack / Defense Labs', 'Python Security Tooling'],
};
