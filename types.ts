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
}

export type NavLink = {
  name: Page;
  href: string;
  metaDescription: string;
} | {
  name: Page.Portals;
  metaDescription: string;
  dropdown: {
    name: string;
    href: string;
    page: Page;
    metaDescription: string;
  }[];
};

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

// FIX: Define and export missing types for Student, Staff, Permission, and StaffRole.
// Admin & User Management Types
export type Permission = 'manage_students' | 'manage_staff' | 'view_audit_log' | 'access_billing';

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
