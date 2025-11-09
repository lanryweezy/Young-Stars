import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StudentIcon from '../icons/StudentIcon';

// Mock Data
const studentData = {
    name: 'Ada Lovelace',
    grades: [
        { subject: 'Mathematics', score: 98, grade: 'A+' },
        { subject: 'English Language', score: 92, grade: 'A' },
        { subject: 'Basic Science & Tech', score: 88, grade: 'B+' },
        { subject: 'Social Studies', score: 90, grade: 'A-' },
        { subject: 'Creative Arts', score: 95, grade: 'A' },
    ],
    assignments: [
        { title: 'Science Fair Project', subject: 'Basic Science', due: 'in 3 days' },
        { title: 'Book Report: "The Lion and the Jewel"', subject: 'English', due: 'in 1 week' },
        { title: 'Algebra Worksheet', subject: 'Mathematics', due: 'in 2 days' },
    ],
    announcements: [
        { title: 'Inter-House Sports Tryouts Next Week', date: '2 days ago' },
        { title: 'Mid-Term Break Schedule Announced', date: '5 days ago' },
        { title: 'Parent-Teacher Conference Sign-ups Open', date: '1 week ago' },
    ],
    attendance: {
        present: 49,
        absent: 1,
        total: 50,
        percentage: 98,
    },
};

const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-brand-green';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    if (grade.startsWith('D')) return 'text-orange-400';
    return 'text-red-500';
};

const StudentPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd perform authentication here.
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    if (!isLoggedIn) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto">
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4">
                                <StudentIcon />
                            </div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Student Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div>
                                    <label htmlFor="student_id" className="sr-only">Student ID</label>
                                    <input
                                        type="text"
                                        id="student_id"
                                        placeholder="Student ID"
                                        required
                                        defaultValue="S001"
                                        className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                                <p className="text-sm text-gray-500">Password not required for this demo.</p>
                                <Button type="submit" className="w-full" size="lg">
                                    Login
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                        Welcome, <span className="text-brand-green">{studentData.name.split(' ')[0]}</span>!
                    </h1>
                    <Button onClick={handleLogout} variant="secondary">Logout</Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Current Grades */}
                    <Card className="lg:col-span-1 xl:col-span-1">
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Current Grades</h2>
                        <ul className="space-y-3">
                            {studentData.grades.map((grade, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="text-gray-300">{grade.subject}</span>
                                    <span className={`font-bold ${getGradeColor(grade.grade)}`}>{grade.grade} ({grade.score}%)</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Upcoming Assignments */}
                    <Card className="lg:col-span-1 xl:col-span-2">
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Upcoming Assignments</h2>
                        <ul className="space-y-4">
                            {studentData.assignments.map((assignment, index) => (
                                <li key={index} className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div>
                                        <p className="text-white font-semibold">{assignment.title}</p>
                                        <p className="text-sm text-gray-400">{assignment.subject}</p>
                                    </div>
                                    <p className="text-brand-green font-bold text-sm sm:text-base mt-1 sm:mt-0">Due {assignment.due}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Recent Announcements */}
                    <Card className="lg:col-span-2 xl:col-span-2">
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Recent Announcements</h2>
                        <ul className="space-y-3">
                            {studentData.announcements.map((ann, index) => (
                                <li key={index} className="border-b border-brand-green/10 pb-3 last:border-b-0 last:pb-0">
                                    <p className="text-white">{ann.title}</p>
                                    <p className="text-xs text-gray-500">{ann.date}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Attendance Summary */}
                    <Card className="lg:col-span-1 xl:col-span-1 flex flex-col items-center justify-center text-center">
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Attendance</h2>
                        <div className="relative">
                            <svg className="w-32 h-32" viewBox="0 0 36 36">
                                <path className="text-space-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                <path className="text-brand-green" strokeDasharray={`${studentData.attendance.percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-orbitron font-bold text-white">{studentData.attendance.percentage}%</span>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-6">
                            <div>
                                <p className="text-gray-400 text-sm">Present</p>
                                <p className="font-bold text-white text-lg">{studentData.attendance.present}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Absent</p>
                                <p className="font-bold text-red-500 text-lg">{studentData.attendance.absent}</p>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default StudentPortal;
