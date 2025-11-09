import React from 'react';
import { mockStudents } from '../../data/users';
import { studentData } from '../../data/portalData';
import Card from '../common/Card';
import Button from '../common/Button';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import Widget from './Widget';
import GradebookIcon from '../icons/GradebookIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import AssignmentIcon from '../icons/AssignmentIcon';
import BillingIcon from '../icons/BillingIcon';

interface StudentProfileProps {
    studentId: string;
    onBack: () => void;
}

const getStatusColor = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400';
};

const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-brand-green';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    if (grade.startsWith('D')) return 'text-orange-400';
    return 'text-red-500';
};

const getAssignmentStatusColor = (status: string) => {
    switch(status) {
        case 'Graded': return 'bg-blue-500/20 text-blue-300';
        case 'Submitted': return 'bg-green-500/20 text-green-300';
        case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
        default: return 'bg-gray-500/20 text-gray-300';
    }
}

const getInvoiceStatusColor = (status: 'Paid' | 'Due' | 'Overdue') => {
    switch (status) {
        case 'Paid': return 'bg-green-500/20 text-green-400';
        case 'Due': return 'bg-yellow-500/20 text-yellow-300';
        case 'Overdue': return 'bg-red-500/20 text-red-400';
    }
};

const StudentProfile: React.FC<StudentProfileProps> = ({ studentId, onBack }) => {
    const student = mockStudents.find(s => s.id === studentId);
    const data = studentData[studentId];

    if (!student || !data) {
        return (
            <div className="text-center">
                <h2 className="text-xl text-white">Student not found.</h2>
                <Button onClick={onBack} variant="secondary" className="mt-4">Go Back</Button>
            </div>
        );
    }
    
    const attendancePercentage = Math.round((data.attendance.present / data.attendance.total) * 100);

    return (
        <div className="animate-fade-in-up">
            <div className="mb-6">
                <Button onClick={onBack} variant="secondary"><ArrowLeftIcon /> Back to Student List</Button>
            </div>

            <Card className="p-6 mb-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img src={`https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} className="w-24 h-24 rounded-full border-4 border-brand-green/50"/>
                    <div>
                        <h2 className="text-3xl font-orbitron font-bold text-white flex items-center gap-3">
                            {student.name}
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusColor(student.status)}`}>{student.status}</span>
                        </h2>
                        <p className="text-gray-400">{student.class} | ID: {student.id}</p>
                         {student.isPrefect && <p className="text-yellow-400 font-semibold">{student.prefectRole}</p>}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Widget title="Student Information" icon={<GradebookIcon />}>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex justify-between"><span>Date Registered:</span> <span className="font-semibold">{new Date(student.dateRegistered).toLocaleDateString()}</span></li>
                        <li className="flex justify-between"><span>Date of Birth:</span> <span className="font-semibold">{new Date(student.dateOfBirth).toLocaleDateString()}</span></li>
                        <li className="flex justify-between"><span>Guardian Contact:</span> <span className="font-semibold">{student.guardianContact}</span></li>
                    </ul>
                </Widget>

                <Widget title="Attendance Summary" icon={<AttendanceIcon />}>
                    <div className="flex items-center justify-around text-center">
                        <div className="relative">
                            <svg className="w-24 h-24" viewBox="0 0 36 36">
                                <path className="text-space-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                <path className="text-brand-green" strokeDasharray={`${attendancePercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-orbitron font-bold text-white">{attendancePercentage}%</span>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div><p className="text-gray-400 text-xs">Present</p><p className="font-bold text-white text-lg">{data.attendance.present}</p></div>
                            <div><p className="text-gray-400 text-xs">Late</p><p className="font-bold text-yellow-400 text-lg">{data.attendance.late}</p></div>
                            <div><p className="text-gray-400 text-xs">Absent</p><p className="font-bold text-red-500 text-lg">{data.attendance.absent}</p></div>
                        </div>
                    </div>
                </Widget>

                <Widget title="Academic Performance" icon={<GradebookIcon />} className="lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead><tr className="border-b border-brand-green/30"><th className="p-2">Subject</th><th className="p-2">Teacher</th><th className="p-2">Score</th><th className="p-2">Grade</th></tr></thead>
                            <tbody>{data.grades.map((g, i) => (<tr key={i} className="border-b border-brand-green/20 text-gray-300"><td className="p-2">{g.subject}</td><td className="p-2">{g.teacher}</td><td className="p-2">{g.score}%</td><td className={`p-2 font-bold ${getGradeColor(g.grade)}`}>{g.grade}</td></tr>))}</tbody>
                        </table>
                    </div>
                </Widget>
                
                <Widget title="Assignment History" icon={<AssignmentIcon />} className="lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead><tr className="border-b border-brand-green/30"><th className="p-2">Title</th><th className="p-2">Due Date</th><th className="p-2">Status</th><th className="p-2">Score</th></tr></thead>
                            <tbody>{data.assignments.map((a, i) => (<tr key={i} className="border-b border-brand-green/20 text-gray-300"><td className="p-2">{a.title}</td><td className="p-2">{new Date(a.dueDate).toLocaleDateString()}</td><td className="p-2"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getAssignmentStatusColor(a.status)}`}>{a.status}</span></td><td className="p-2">{a.score || 'N/A'}</td></tr>))}</tbody>
                        </table>
                    </div>
                </Widget>

                <Widget title="Billing History" icon={<BillingIcon />} className="lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-brand-green/30">
                                    <th className="p-2">Description</th>
                                    <th className="p-2">Amount</th>
                                    <th className="p-2">Due Date</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.invoices.map(invoice => (
                                    <tr key={invoice.id} className="border-b border-brand-green/20 text-gray-300">
                                        <td className="p-2">{invoice.description}</td>
                                        <td className="p-2">₦{invoice.amount.toLocaleString()}</td>
                                        <td className="p-2">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                                        <td className="p-2">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getInvoiceStatusColor(invoice.status)}`}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Widget>

            </div>
        </div>
    );
};

export default StudentProfile;