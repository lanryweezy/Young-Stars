import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StudentIcon from '../icons/StudentIcon';
import { studentData } from '../../data/portalData';
import DashboardLayout from '../portals/DashboardLayout';
import Widget from '../portals/Widget';
import GradebookIcon from '../icons/GradebookIcon';
import AssignmentIcon from '../icons/AssignmentIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import { mockStudents } from '../../data/users';

const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-brand-green';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    if (grade.startsWith('D')) return 'text-orange-400';
    return 'text-red-500';
};

const StudentPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentId, setStudentId] = useState('S001'); // Default student for demo

    const currentStudent = mockStudents.find(s => s.id === studentId);
    const data = studentData[studentId];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    if (!isLoggedIn || !currentStudent || !data) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto">
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4"><StudentIcon /></div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Student Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div>
                                    <label htmlFor="student_id" className="sr-only">Student ID</label>
                                    <select
                                        id="student_id"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition"
                                    >
                                        {mockStudents.filter(s => s.status === 'Active').map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                                    </select>
                                </div>
                                <p className="text-sm text-gray-500">Select a student and log in. Password not required for this demo.</p>
                                <Button type="submit" className="w-full" size="lg">Login</Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    const attendancePercentage = Math.round((data.attendance.present / data.attendance.total) * 100);

    return (
        <DashboardLayout
            userType="Student"
            userName={currentStudent.name}
            onLogout={() => setIsLoggedIn(false)}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grades */}
                <Widget title="Current Grades" icon={<GradebookIcon />} className="lg:col-span-1">
                    <ul className="space-y-3">
                        {data.grades.map((grade, index) => (
                            <li key={index} className="flex justify-between items-center bg-space-dark/50 p-2 rounded-md">
                                <span className="text-gray-300">{grade.subject}</span>
                                <span className={`font-bold ${getGradeColor(grade.grade)}`}>{grade.grade} ({grade.score}%)</span>
                            </li>
                        ))}
                    </ul>
                </Widget>

                {/* Assignments */}
                <Widget title="Upcoming Assignments" icon={<AssignmentIcon />} className="lg:col-span-2">
                    <ul className="space-y-4">
                        {data.assignments.filter(a => a.status === 'Pending').map((assignment, index) => (
                            <li key={index} className="flex flex-col sm:flex-row justify-between sm:items-center bg-space-dark/50 p-3 rounded-md">
                                <div>
                                    <p className="text-white font-semibold">{assignment.title}</p>
                                    <p className="text-sm text-gray-400">{assignment.subject}</p>
                                </div>
                                <p className="text-brand-green font-bold text-sm sm:text-base mt-1 sm:mt-0">
                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Widget>
                
                {/* Attendance */}
                <Widget title="Attendance Summary" icon={<AttendanceIcon />} className="lg:col-span-3">
                     <div className="flex flex-col sm:flex-row items-center justify-around text-center gap-8">
                        <div className="relative">
                            <svg className="w-32 h-32" viewBox="0 0 36 36">
                                <path className="text-space-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                <path className="text-brand-green" strokeDasharray={`${attendancePercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-orbitron font-bold text-white">{attendancePercentage}%</span>
                            </div>
                        </div>
                        <div className="flex space-x-8">
                            <div>
                                <p className="text-gray-400 text-sm">Present</p>
                                <p className="font-bold text-white text-2xl">{data.attendance.present}</p>
                            </div>
                             <div>
                                <p className="text-gray-400 text-sm">Late</p>
                                <p className="font-bold text-yellow-400 text-2xl">{data.attendance.late}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Absent</p>
                                <p className="font-bold text-red-500 text-2xl">{data.attendance.absent}</p>
                            </div>
                        </div>
                    </div>
                </Widget>
            </div>
        </DashboardLayout>
    );
};

export default StudentPortal;
