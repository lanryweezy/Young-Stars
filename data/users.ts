// FIX: Import types from the central `types.ts` file and remove unused imports.
import { Student, Staff, StaffRole, Permission } from '../types';

// FIX: Type the staffRoles array with the centrally defined StaffRole type.
export const staffRoles: StaffRole[] = [
    'Head of School',
    'Administrator',
    'Head of Department',
    'Head of STEM',
    'Head of Arts',
    'Mathematics Teacher',
    'Nursery Lead',
    'Teacher',
];

export const allPermissions: Permission[] = ['manage_students', 'manage_staff', 'view_audit_log', 'access_billing'];

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

export const mockStudents: Student[] = [
    { id: 'S001', name: 'Ada Lovelace', class: 'Primary 5', status: 'Active', dateRegistered: '2022-09-01', guardianContact: '08012345671', isPrefect: false },
    { id: 'S002', name: 'Charles Babbage', class: 'Primary 6', status: 'Active', dateRegistered: '2021-09-01', guardianContact: '08012345672', isPrefect: true, prefectRole: 'Head Boy' },
    { id: 'S003', name: 'Grace Hopper', class: 'Primary 4', status: 'Active', dateRegistered: '2023-09-01', guardianContact: '08012345673', isPrefect: false },
    { id: 'S004', name: 'Alan Turing', class: 'Primary 6', status: 'Inactive', dateRegistered: '2021-09-01', guardianContact: '08012345674', isPrefect: false },
    { id: 'S005', name: 'Tim Berners-Lee', class: 'Primary 3', status: 'Active', dateRegistered: '2023-09-01', guardianContact: '08012345675', isPrefect: false },
    { id: 'S006', name: 'Chiamaka Okoro', class: 'Primary 6', status: 'Active', dateRegistered: '2021-09-01', guardianContact: '08012345676', isPrefect: true, prefectRole: 'Head Girl' },
];

export const mockStaff: Staff[] = [
    { id: 'T01', name: 'Dr. Evelyn Adebayo', role: 'Head of School', status: 'Active', permissions: defaultPermissionsByRole['Head of School'], assignedClasses: [] },
    { id: 'T02', name: 'Mr. Tunde Okoro', role: 'Head of STEM', status: 'Active', permissions: defaultPermissionsByRole['Head of STEM'], assignedClasses: ['Primary 6'] },
    { id: 'T03', name: 'Mrs. Aisha Bello', role: 'Head of Arts', status: 'Active', permissions: defaultPermissionsByRole['Head of Arts'], assignedClasses: ['Primary 4', 'Primary 5'] },
    { id: 'T04', name: 'Mr. John von Neumann', role: 'Mathematics Teacher', status: 'Inactive', permissions: defaultPermissionsByRole['Mathematics Teacher'], assignedClasses: [] },
    { id: 'T05', name: 'Mrs. Funke Adeyemi', role: 'Nursery Lead', status: 'Active', permissions: defaultPermissionsByRole['Nursery Lead'], assignedClasses: ['Nursery 1', 'Nursery 2'] },
    { id: 'T06', name: 'Mr. David Adewale', role: 'Teacher', status: 'Active', permissions: defaultPermissionsByRole['Teacher'], assignedClasses: ['Primary 3'] },
];
