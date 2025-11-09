import { Grade, Assignment, AttendanceRecord, Invoice, ExtracurricularActivity } from '../types';

interface StudentPortalData {
    grades: Grade[];
    assignments: Assignment[];
    attendance: AttendanceRecord;
    invoices: Invoice[];
}

export const studentData: Record<string, StudentPortalData> = {
    'S001': {
        grades: [
            { subject: 'Mathematics', score: 98, grade: 'A+', term: 'First', teacher: 'Mr. John von Neumann', feedback: 'Excellent work, Ada! Your logical reasoning is top-notch.' },
            { subject: 'English Language', score: 92, grade: 'A', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'A pleasure to read your well-structured essays.' },
            { subject: 'Basic Science', score: 88, grade: 'B+', term: 'First', teacher: 'Mr. Tunde Okoro', feedback: 'Great participation in class experiments.' },
        ],
        assignments: [
            { id: 'AS01', title: 'Algebra Worksheet II', subject: 'Mathematics', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), submittedDate: null, status: 'Pending', score: null },
            { id: 'AS02', title: 'Essay: My Favourite Scientist', subject: 'English', dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), submittedDate: null, status: 'Pending', score: null },
            { id: 'AS03', title: 'Robotics Project Phase 1', subject: 'Basic Science', dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), submittedDate: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(), status: 'Graded', score: '10/10' },
        ],
        attendance: { total: 50, present: 49, absent: 1, late: 0 },
        invoices: [
            { id: 'INV001', description: 'First Term School Fees', amount: 350000, dueDate: '2024-09-30', status: 'Paid' },
            { id: 'INV002', description: 'Robotics Club Fee', amount: 25000, dueDate: '2024-10-15', status: 'Due' },
        ],
    },
    'S002': { // Head Boy
        grades: [{ subject: 'Mathematics', score: 95, grade: 'A', term: 'First', teacher: 'Mr. Tunde Okoro', feedback: 'Charles continues to excel in all areas.' }],
        assignments: [{ id: 'AS04', title: 'Advanced Geometry', subject: 'Mathematics', dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), submittedDate: null, status: 'Pending', score: null }],
        attendance: { total: 50, present: 50, absent: 0, late: 0 },
        invoices: [{ id: 'INV003', description: 'First Term School Fees', amount: 350000, dueDate: '2024-09-30', status: 'Paid' }],
    },
     'S003': {
        grades: [{ subject: 'Creative Arts', score: 99, grade: 'A+', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'Grace has an exceptional creative talent.' }],
        assignments: [{ id: 'AS05', title: 'Watercolour Painting', subject: 'Creative Arts', dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), submittedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), status: 'Submitted', score: null }],
        attendance: { total: 50, present: 48, absent: 1, late: 1 },
        invoices: [{ id: 'INV004', description: 'First Term School Fees', amount: 300000, dueDate: '2024-09-30', status: 'Overdue' }],
    },
     'S005': {
        grades: [{ subject: 'Basic Science', score: 85, grade: 'B', term: 'First', teacher: 'Mr. David Adewale', feedback: 'Tim shows great promise and curiosity.' }],
        assignments: [],
        attendance: { total: 50, present: 50, absent: 0, late: 0 },
        invoices: [{ id: 'INV005', description: 'First Term School Fees', amount: 300000, dueDate: '2024-09-30', status: 'Paid' }],
    },
    'S006': { // Head Girl
        grades: [{ subject: 'English Language', score: 96, grade: 'A', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'An exemplary student with strong leadership qualities.' }],
        assignments: [{ id: 'AS06', title: 'Leadership Essay', subject: 'Social Studies', dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), submittedDate: null, status: 'Pending', score: null }],
        attendance: { total: 50, present: 50, absent: 0, late: 0 },
        invoices: [{ id: 'INV006', description: 'First Term School Fees', amount: 350000, dueDate: '2024-09-30', status: 'Paid' }],
    }
};

export const extracurricularActivities: ExtracurricularActivity[] = [
    { id: 'EC01', name: 'Robotics Club', supervisor: 'T02', day: 'Wednesday', time: '3:00 PM', members: ['S001', 'S002'] },
    { id: 'EC02', name: 'Debate Team', supervisor: 'T03', day: 'Thursday', time: '3:00 PM', members: ['S006'] },
    { id: 'EC03', name: 'Art Club', supervisor: 'T03', day: 'Tuesday', time: '3:00 PM', members: ['S003'] },
    { id: 'EC04', name: 'Chess Club', supervisor: 'T06', day: 'Friday', time: '3:00 PM', members: ['S005'] },
];
