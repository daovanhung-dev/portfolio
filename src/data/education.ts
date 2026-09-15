import type { Education } from './types';

export const education: Education = {
  institution: 'Vietnam National University of Agriculture',
  field: 'Information Technology',
  cohort: 'K68 CNTT',
  graduation: 'Dự kiến tốt nghiệp 2027',
  stats: [
    { value: '2.72 / 4.00', label: 'GPA gần nhất ghi nhận' },
    { value: '94', label: 'Tín chỉ tích lũy gần nhất' },
    { value: '~4.5', label: 'IELTS tự đánh giá gần nhất' },
  ],
  note: 'English đang được phát triển theo hướng IELTS 5.5–6.0+; mức IELTS hiển thị là self-assessed, không phải chứng chỉ chính thức.',
};
