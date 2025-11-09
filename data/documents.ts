import { DocumentCategory } from '../types';

export const schoolDocuments: DocumentCategory[] = [
  {
    id: 'governance',
    title: 'Administrative & Governance',
    icon: 'GovernanceIcon',
    description: 'These establish the school’s identity, structure, and rules.',
    documents: [
      { id: 'gov-01', name: 'Certificate of Incorporation (CAC)', description: 'Official registration as a business or institution.', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'PDF', size: '1.2 MB', lastModified: '2023-01-15' },
      { id: 'gov-02', name: 'Approval from the Ministry of Education', description: 'License to operate.', url: '#', type: 'PDF', size: '850 KB', lastModified: '2023-02-20' },
      { id: 'gov-03', name: 'School Constitution / Policy Manual', description: 'Outlines mission, vision, structure, and code of conduct.', url: '#', type: 'DOCX', size: '3.5 MB', lastModified: '2024-05-10' },
    ],
    requiredPermission: 'manage_documents_all',
  },
  {
    id: 'academics',
    title: 'Academic & Teaching',
    icon: 'AcademicIcon',
    description: 'To ensure quality learning and consistent teaching.',
    documents: [
      { id: 'aca-01', name: 'Schemes of Work - Primary 5', description: 'Breakdown of topics per subject per term.', url: '#', type: 'PDF', size: '2.1 MB', lastModified: '2024-08-01' },
      { id: 'aca-02', name: 'Lesson Plan Template', description: 'Approved template for weekly lesson plans.', url: '#', type: 'DOCX', size: '150 KB', lastModified: '2024-01-30' },
      { id: 'aca-03', name: 'Report Card Template', description: 'Termly results showing grades, comments, attendance.', url: '#', type: 'XLSX', size: '450 KB', lastModified: '2024-06-18' },
    ],
    requiredPermission: 'manage_documents_academics',
  },
  {
    id: 'student-management',
    title: 'Student Management',
    icon: 'StudentManagementIcon',
    description: 'Keeps track of every child from admission to graduation.',
    documents: [
      { id: 'stu-01', name: 'Admission Form', description: 'Student data, parent info, previous school, medical info.', url: '#', type: 'PDF', size: '500 KB', lastModified: '2024-01-01' },
      { id: 'stu-02', name: 'Student Code of Conduct', description: 'Rules and expectations for student behaviour.', url: 'https://picsum.photos/seed/student-conduct/800/1100', type: 'JPG', size: '700 KB', lastModified: '2024-08-15' },
    ],
    requiredPermission: 'manage_documents_academics',
  },
  {
    id: 'human-resources',
    title: 'Staff & Human Resources',
    icon: 'HumanResourceIcon',
    description: 'To manage teachers, NYSC corps members, and admin staff properly.',
    documents: [
      { id: 'hr-01', name: 'Staff Handbook / Code of Conduct', description: 'Guidelines for professional conduct.', url: '#', type: 'PDF', size: '2.8 MB', lastModified: '2024-07-20' },
      { id: 'hr-02', name: 'Leave Application Form', description: 'Formal requests for time off.', url: '#', type: 'DOCX', size: '120 KB', lastModified: '2023-11-01' },
    ],
    requiredPermission: 'manage_documents_all',
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    icon: 'AccountingIcon',
    description: 'Transparency keeps trust with parents and regulators.',
    documents: [
      { id: 'fin-01', name: 'Fee Structure & Policy Document', description: 'Clear breakdown of all fees.', url: '#', type: 'PDF', size: '950 KB', lastModified: '2024-08-10' },
      { id: 'fin-02', name: 'Annual Audit Report 2023', description: 'Official financial review.', url: '#', type: 'PDF', size: '4.5 MB', lastModified: '2024-02-15' },
    ],
     requiredPermission: 'manage_documents_all',
  },
];