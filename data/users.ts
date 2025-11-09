// Fix: Add missing properties to Student interface to match usage in AdminPortal.tsx
export interface Student {
    id: string;
    name: string;
    class: string;
    status: 'Active' | 'Inactive';
    dateRegistered: string;
    guardianContact: string;
}

// Fix: Define and export staffRoles and StaffRole type for use in AdminPortal.tsx
export const staffRoles = [
    'Head of School',
    'Administrator',
    'Head of Department',
    'Head of STEM',
    'Head of Arts',
    'Mathematics Teacher',
    'Nursery Lead',
    'Teacher',
] as const;

export type StaffRole = (typeof staffRoles)[number];

export type Permission = 'manage_students' | 'manage_staff' | 'view_audit_log' | 'access_billing';

export const allPermissions: Permission[] = ['manage_students', 'manage_staff', 'view_audit_log', 'access_billing'];

export interface Staff {
    id: string;
    name: string;
    // Fix: Use the specific StaffRole type instead of a generic string
    role: StaffRole;
    status: 'Active' | 'Inactive';
    permissions: Permission[];
}

export const defaultPermissionsByRole: Record<StaffRole, Permission[]> = {
    'Head of School': ['manage_students', 'manage_staff', 'view_audit_log', 'access_billing'],
    'Administrator': ['manage_students', 'manage_staff', 'view_audit_log', 'access_billing'],
    'Head of Department': ['manage_students', 'view_audit_log'],
    'Head of STEM': ['manage_students', 'view_audit_log'],
    'Head of Arts': ['manage_students', 'view_audit_log'],
    'Teacher': ['manage_students'],
    'Nursery Lead': ['manage_students'],
    'Mathematics Teacher': ['manage_students'],
};

// Fix: Add data for the new properties in the Student interface
export const mockStudents: Student[] = [
    { id: 'S001', name: 'Ada Lovelace', class: 'Primary 5', status: 'Active', dateRegistered: '2022-09-01', guardianContact: '08012345671' },
    { id: 'S002', name: 'Charles Babbage', class: 'Primary 6', status: 'Active', dateRegistered: '2021-09-01', guardianContact: '08012345672' },
    { id: 'S003', name: 'Grace Hopper', class: 'Primary 4', status: 'Active', dateRegistered: '2023-09-01', guardianContact: '08012345673' },
    { id: 'S004', name: 'Alan Turing', class: 'Primary 6', status: 'Inactive', dateRegistered: '2021-09-01', guardianContact: '08012345674' },
    { id: 'S005', name: 'Tim Berners-Lee', class: 'Primary 3', status: 'Active', dateRegistered: '2023-09-01', guardianContact: '08012345675' },
];

export const mockStaff: Staff[] = [
    { id: 'T01', name: 'Dr. Evelyn Adebayo', role: 'Head of School', status: 'Active', permissions: ['manage_students', 'manage_staff', 'view_audit_log', 'access_billing'] },
    { id: 'T02', name: 'Mr. Tunde Okoro', role: 'Head of STEM', status: 'Active', permissions: ['manage_students', 'view_audit_log'] },
    { id: 'T03', name: 'Mrs. Aisha Bello', role: 'Head of Arts', status: 'Active', permissions: ['manage_students', 'view_audit_log'] },
    { id: 'T04', name: 'Mr. John von Neumann', role: 'Mathematics Teacher', status: 'Inactive', permissions: ['manage_students'] },
    { id: 'T05', name: 'Mrs. Funke Adeyemi', role: 'Nursery Lead', status: 'Active', permissions: ['manage_students'] },
];