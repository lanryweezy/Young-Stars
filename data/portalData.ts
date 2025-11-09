import { Grade, Assignment, AttendanceRecord, Invoice, ExtracurricularActivity, TimetableEntry, Announcement } from '../types';

interface StudentPortalData {
    grades: Grade[];
    assignments: Assignment[];
    attendance: AttendanceRecord;
    invoices: Invoice[];
    timetable: TimetableEntry[];
}

export const announcements: Announcement[] = [
    {
        id: 'AN01',
        title: 'Mid-Term Break Announcement',
        date: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(),
        content: 'The school will be closed for the mid-term break. We wish all our students and their families a restful time.',
    },
    {
        id: 'AN02',
        title: 'Upcoming Science & Tech Fair',
        date: new Date(new Date().setDate(new Date().getDate() + 18)).toISOString(),
        content: 'Get your projects ready! The annual Science & Tech Fair is just around the corner. We can\'t wait to see your innovative ideas.',
    },
];

export const studentData: Record<string, StudentPortalData> = {
    'S001': {
        grades: [
            { subject: 'Mathematics', score: 85, grade: 'B+', term: 'First', teacher: 'Mr. John von Neumann', feedback: 'Excellent work, Ada! Your logical reasoning is top-notch.' },
            { subject: 'English Language', score: 92, grade: 'A', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'A pleasure to read your well-structured essays.' },
            { subject: 'Basic Science', score: 88, grade: 'B+', term: 'First', teacher: 'Mr. Tunde Okoro', feedback: 'Great participation in class experiments.' },
            { subject: 'Social Studies', score: 82, grade: 'B', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'Good understanding of historical concepts.' },
            { subject: 'Creative Arts', score: 95, grade: 'A', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'Exceptionally creative project.' },
            
            { subject: 'Mathematics', score: 90, grade: 'A-', term: 'Second', teacher: 'Mr. John von Neumann', feedback: 'Marked improvement in geometry.' },
            { subject: 'English Language', score: 94, grade: 'A', term: 'Second', teacher: 'Mrs. Aisha Bello', feedback: 'Fantastic creative writing piece.' },
            { subject: 'Basic Science', score: 91, grade: 'A-', term: 'Second', teacher: 'Mr. Tunde Okoro', feedback: 'Very insightful project work.' },
            { subject: 'Social Studies', score: 85, grade: 'B', term: 'Second', teacher: 'Mrs. Aisha Bello', feedback: 'Consistent effort shown.' },
            { subject: 'Creative Arts', score: 96, grade: 'A', term: 'Second', teacher: 'Mrs. Aisha Bello', feedback: 'Continues to excel in arts.' },

            { subject: 'Mathematics', score: 98, grade: 'A+', term: 'Third', teacher: 'Mr. John von Neumann', feedback: 'Perfect score on the final exam. Outstanding!' },
            { subject: 'English Language', score: 91, grade: 'A-', term: 'Third', teacher: 'Mrs. Aisha Bello', feedback: 'Strong performance throughout the year.' },
            { subject: 'Basic Science', score: 93, grade: 'A', term: 'Third', teacher: 'Mr. Tunde Okoro', feedback: 'Demonstrates a deep understanding of scientific concepts.' },
            { subject: 'Social Studies', score: 88, grade: 'B+', term: 'Third', teacher: 'Mrs. Aisha Bello', feedback: 'Excellent final presentation.' },
            { subject: 'Creative Arts', score: 97, grade: 'A+', term: 'Third', teacher: 'Mrs. Aisha Bello', feedback: 'A true artist in the making.' },
        ],
        assignments: [
            { id: 'AS01', title: 'Algebra Worksheet II', subject: 'Mathematics', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), submittedDate: null, status: 'Pending', score: null },
            { id: 'AS02', title: 'Essay: My Favourite Scientist', subject: 'English Language', dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), submittedDate: null, status: 'Pending', score: null },
            { id: 'AS03', title: 'Robotics Project Phase 1', subject: 'Basic Science', dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), submittedDate: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(), status: 'Graded', score: '10/10' },
        ],
        attendance: { total: 50, present: 49, absent: 1, late: 0 },
        invoices: [
            { id: 'INV001', description: 'First Term School Fees', amount: 350000, dueDate: '2024-09-30', status: 'Paid' },
            { id: 'INV002', description: 'Robotics Club Fee', amount: 25000, dueDate: '2024-10-15', status: 'Due' },
            { id: 'INV002A', description: 'Extracurricular Levy', amount: 15000, dueDate: '2024-09-25', status: 'Overdue' },
        ],
        timetable: [
            { time: '09:00 - 10:00', subject: 'Mathematics', teacherId: 'T04' },
            { time: '10:00 - 11:00', subject: 'English Language', teacherId: 'T03' },
            { time: '11:00 - 12:00', subject: 'Basic Science', teacherId: 'T02' },
            { time: '12:00 - 13:00', subject: 'Lunch Break', teacherId: '' },
            { time: '13:00 - 14:00', subject: 'Social Studies', teacherId: 'T03' },
        ]
    },
    'S002': { // Head Boy
        grades: [{ subject: 'Mathematics', score: 95, grade: 'A', term: 'First', teacher: 'Mr. Tunde Okoro', feedback: 'Charles continues to excel in all areas.' }],
        assignments: [{ id: 'AS04', title: 'Advanced Geometry', subject: 'Mathematics', dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), submittedDate: null, status: 'Pending', score: null }],
        attendance: { total: 50, present: 50, absent: 0, late: 0 },
        invoices: [{ id: 'INV003', description: 'First Term School Fees', amount: 350000, dueDate: '2024-09-30', status: 'Paid' }],
        timetable: [
             { time: '09:00 - 10:00', subject: 'Mathematics', teacherId: 'T02' },
             { time: '10:00 - 11:00', subject: 'English Language', teacherId: 'T03' },
             { time: '11:00 - 12:00', subject: 'Basic Science', teacherId: 'T02' },
        ]
    },
     'S003': {
        grades: [{ subject: 'Creative Arts', score: 99, grade: 'A+', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'Grace has an exceptional creative talent.' }],
        assignments: [{ id: 'AS05', title: 'Watercolour Painting', subject: 'Creative Arts', dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), submittedDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), status: 'Submitted', score: null }],
        attendance: { total: 50, present: 48, absent: 1, late: 1 },
        invoices: [{ id: 'INV004', description: 'First Term School Fees', amount: 300000, dueDate: '2024-09-30', status: 'Overdue' }],
        timetable: [
             { time: '09:00 - 10:00', subject: 'English Language', teacherId: 'T03' },
             { time: '10:00 - 11:00', subject: 'Creative Arts', teacherId: 'T03' },
        ]
    },
     'S005': {
        grades: [{ subject: 'Basic Science', score: 85, grade: 'B', term: 'First', teacher: 'Mr. David Adewale', feedback: 'Tim shows great promise and curiosity.' }],
        assignments: [],
        attendance: { total: 50, present: 50, absent: 0, late: 0 },
        invoices: [{ id: 'INV005', description: 'First Term School Fees', amount: 300000, dueDate: '2024-09-30', status: 'Paid' }],
        timetable: [
            { time: '09:00 - 10:00', subject: 'Mathematics', teacherId: 'T06' },
        ]
    },
    'S006': { // Head Girl
        grades: [{ subject: 'English Language', score: 96, grade: 'A', term: 'First', teacher: 'Mrs. Aisha Bello', feedback: 'An exemplary student with strong leadership qualities.' }],
        assignments: [{ id: 'AS06', title: 'Leadership Essay', subject: 'Social Studies', dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), submittedDate: null, status: 'Pending', score: null }],
        attendance: { total: 50, present: 50, absent: 0, late: 0 },
        invoices: [{ id: 'INV006', description: 'First Term School Fees', amount: 350000, dueDate: '2024-09-30', status: 'Paid' }],
        timetable: [
             { time: '09:00 - 10:00', subject: 'Mathematics', teacherId: 'T02' },
        ]
    }
};

export const extracurricularActivities: ExtracurricularActivity[] = [
    { id: 'EC01', name: 'Robotics Club', supervisor: 'T02', day: 'Wednesday', time: '3:00 PM', members: ['S001', 'S002'] },
    { id: 'EC02', name: 'Debate Team', supervisor: 'T03', day: 'Thursday', time: '3:00 PM', members: ['S006'] },
    { id: 'EC03', name: 'Art Club', supervisor: 'T03', day: 'Tuesday', time: '3:00 PM', members: ['S003'] },
    { id: 'EC04', name: 'Chess Club', supervisor: 'T06', day: 'Friday', time: '3:00 PM', members: ['S005'] },
];