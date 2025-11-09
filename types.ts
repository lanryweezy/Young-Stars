export enum Page {
  Home = 'Home',
  About = 'About Us',
  Academics = 'Curriculum',
  Admissions = 'Admissions',
  Gallery = 'Gallery',
  News = 'News & Blog',
  Contact = 'Contact Us',
  Calendar = 'Calendar',
  Portals = 'Portals',
  StudentPortal = 'Student Portal',
  ParentPortal = 'Parent Portal',
  StaffPortal = 'Staff Portal',
  AdminPortal = 'Admin Portal',
  Documents = 'Documents',
}

type BaseNavLink = {
  name: Page;
  metaDescription: string;
};

type LinkWithHref = BaseNavLink & {
  href: string;
  dropdown?: never;
};

type LinkWithDropdown = BaseNavLink & {
  href?: never;
  dropdown: {
    name: string;
    href: string;
    page: Page;
    metaDescription: string;
  }[];
};

export type NavLink = LinkWithHref | LinkWithDropdown;


export interface Article {
  id: string;
  title: string;
  authorId: string; // Can be a staff or student ID
  date: string;
  category: string;
  image: string;
  summary: string;
  content: string;
}

// Portal-specific types
export interface Grade {
  subject: string;
  score: number;
  grade: string;
  term: string;
  teacher: string;
  feedback: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submittedDate: string | null;
  status: 'Pending' | 'Submitted' | 'Graded';
  score: string | null;
}

export interface AttendanceRecord {
  total: number;
  present: number;
  absent: number;
  late: number;
}

export interface Invoice {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Overdue';
}

export interface ExtracurricularActivity {
  id: string;
  name: string;
  supervisor: string; // Staff ID
  day: string;
  time: string;
  members: string[]; // Student IDs
}

export interface TimetableEntry {
    time: string;
    subject: string;
    teacherId: string;
}

export interface Announcement {
    id: string;
    title: string;
    date: string;
    content: string;
}


// Admin & User Management Types
export type Permission = 'manage_students' | 'manage_staff' | 'view_audit_log' | 'access_billing' | 'manage_documents_academics' | 'manage_documents_all';

export type StaffRole =
  | 'Head of School'
  | 'Administrator'
  | 'Head of Department'
  | 'Head of STEM'
  | 'Head of Arts'
  | 'Mathematics Teacher'
  | 'Nursery Lead'
  | 'Teacher';

export interface Student {
  id: string;
  name: string;
  class: string;
  dateOfBirth: string;
  status: 'Active' | 'Inactive';
  dateRegistered: string;
  guardianContact: string;
  isPrefect: boolean;
  prefectRole?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  status: 'Active' | 'Inactive';
  permissions: Permission[];
  assignedClasses: string[];
}

// Document Management Types
export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'PNG' | 'JPG';
  size: string;
  lastModified: string;
}

export interface DocumentCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // Corresponds to an icon component name
  documents: DocumentItem[];
  requiredPermission?: Permission;
}