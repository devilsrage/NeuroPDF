import { GraduationCap, Microscope, Briefcase, BarChart3 } from 'lucide-react';

export const mockOutline = [
  { level: 'H1', text: 'Introduction to Machine Learning', page: 1, id: '1' },
  { level: 'H2', text: 'Historical Overview', page: 2, id: '2' },
  { level: 'H3', text: 'Early Developments', page: 3, id: '3' },
  { level: 'H3', text: 'Modern Era', page: 4, id: '4' },
  { level: 'H2', text: 'Core Concepts', page: 5, id: '5' },
  { level: 'H3', text: 'Supervised Learning', page: 6, id: '6' },
  { level: 'H3', text: 'Unsupervised Learning', page: 8, id: '7' },
  { level: 'H1', text: 'Neural Networks', page: 10, id: '8' },
  { level: 'H2', text: 'Architecture', page: 11, id: '9' },
  { level: 'H2', text: 'Training Process', page: 13, id: '10' },
];

export const mockInsights = {
  Student: [
    {
      section_title: 'Core Concepts',
      refined_text: 'Key definitions and fundamental principles...',
      page_number: 5,
      importance_rank: 1,
      confidence_score: 0.95,
    },
    {
      section_title: 'Neural Networks Architecture',
      refined_text: 'Essential mathematical foundations including...',
      page_number: 11,
      importance_rank: 2,
      confidence_score: 0.88,
    },
  ],
  Researcher: [
    {
      section_title: 'Historical Overview',
      refined_text: 'Comprehensive timeline of ML development...',
      page_number: 2,
      importance_rank: 1,
      confidence_score: 0.92,
    },
    {
      section_title: 'Training Process',
      refined_text: 'Novel optimization techniques and recent advances...',
      page_number: 13,
      importance_rank: 2,
      confidence_score: 0.85,
    },
  ],
};

export const personas = [
  {
    id: 'Student',
    label: '🎓 Student',
    icon: GraduationCap,
    description: 'Focus on key concepts and exam preparation',
  },
  {
    id: 'Researcher',
    label: '🔬 Researcher',
    icon: Microscope,
    description: 'Emphasize methodology and novel findings',
  },
  {
    id: 'Analyst',
    label: '📊 Analyst',
    icon: BarChart3,
    description: 'Highlight data and analytical frameworks',
  },
  {
    id: 'Professional',
    label: '💼 Professional',
    icon: Briefcase,
    description: 'Prioritize practical applications',
  },
];
