
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StudentIcon from '../icons/StudentIcon';
import { studentData, extracurricularActivities, announcements } from '../../data/portalData';
import DashboardLayout from '../portals/DashboardLayout';
import Widget from '../portals/Widget';
import GradebookIcon from '../icons/GradebookIcon';
import AssignmentIcon from '../icons/AssignmentIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import { mockStudents, mockStaff } from '../../data/users';
import ActivityIcon from '../icons/ActivityIcon';
import CalendarIcon from '../icons/CalendarIcon';
import InfoIcon from '../icons/InfoIcon';
import LogoIcon from '../icons/LogoIcon';

const StudentPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentId, setStudentId] = useState('S001'); // Default student for demo

    const currentStudent = mockStudents.find(s => s.id === studentId);
    const data = studentData[studentId];
    const studentActivities = extracurricularActivities.filter(act => act.members.includes(studentId));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    if (!isLoggedIn || !currentStudent || !data) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto text-center">
                         <div className="flex justify-center items-center space-x-2 mb-4">
                            <LogoIcon />
                            <span className="text-2xl font-orbitron font-bold text-white tracking-wider">YOUNG <span className="text-brand-green">STARS</span></span>
                        </div>
                        <p className="text-gray-400 mb-6">Welcome back, student! Please select your profile to continue.</p>
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

    const gradesBySubject = data.grades.reduce((acc, grade) => {
        if (!acc[grade.subject]) {
            acc[grade.subject] = [];
        }
        acc[grade.subject].push({ term: grade.term, score: grade.score });
        return acc;
    }, {} as Record<string, { term: string; score: number }[]>);
    
    const terms: ('First' | 'Second' | 'Third')[] = ['First', 'Second', 'Third'];
    const termColors: Record<typeof terms[number], string> = {
        'First': '#10B981', // brand-green
        'Second': '#60A5FA', // blue-400
        'Third': '#A78BFA', // purple-400
    };
    
    const sortedSubjects = Object.keys(gradesBySubject).sort();


    return (
        <DashboardLayout
            userType="Student"
            userName={currentStudent.name}
            onLogout={() => setIsLoggedIn(false)}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grades */}
                <Widget title="Academic Performance" icon={<GradebookIcon />} className="lg:col-span-3">
                    <div className="w-full h-80 bg-space-dark/50 p-4 rounded-lg flex gap-4">
                        <div className="h-full flex flex-col justify-between text-xs text-gray-400 py-2">
                            <span>100</span>
                            <span>75</span>
                            <span>50</span>
                            <span>25</span>
                            <span className="opacity-0">0</span>
                        </div>
                        <div className="flex-1 h-full border-l border-b border-gray-700 flex justify-around items-end px-2 gap-4">
                            {sortedSubjects.map(subject => (
                                <div key={subject} className="flex-grow flex flex-col items-center h-full justify-end group relative">
                                    <div className="flex items-end gap-1.5 h-full w-full justify-center">
                                        {terms.map(term => {
                                            const grade = gradesBySubject[subject].find(g => g.term === term);
                                            const score = grade ? grade.score : 0;
                                            return (
                                                <div 
                                                    key={term}
                                                    className="w-1/3 min-w-[20px] max-w-[40px] rounded-t-md transition-all duration-300 ease-out hover:opacity-80 relative group/bar"
                                                    style={{ height: `${score}%`, backgroundColor: score > 0 ? termColors[term] : 'transparent' }}
                                                >
                                                   <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-space-dark text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10 pointer-events-none">
                                                        {term}: {score}%
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <span className="text-xs text-gray-300 mt-1 text-center absolute -bottom-5 w-full truncate">{subject}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="flex justify-center gap-6 mt-6 text-sm">
                        {terms.map(term => (
                            <div key={term} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded`} style={{backgroundColor: termColors[term]}}></div>
                                <span className="text-gray-400">{term} Term</span>
                            </div>
                        ))}
                    </div>
                </Widget>
                
                {/* Timetable */}
                 <Widget title="Today's Timetable" icon={<CalendarIcon />}>
                    <ul className="space-y-3">
                        {data.timetable.map((item, index) => (
                            <li key={index} className={`flex items-center justify-between p-2 rounded-md ${item.subject === 'Lunch Break' ? 'bg-yellow-500/10' : 'bg-space-dark/50'}`}>
                                <span className="font-semibold text-gray-400 text-sm">{item.time}</span>
                                <span className="font-bold text-white">{item.subject}</span>
                                <span className="text-xs text-gray-500">{mockStaff.find(s => s.id === item.teacherId)?.name}</span>
                            </li>
                        ))}
                    </ul>
                </Widget>

                {/* Assignments */}
                <Widget title="Upcoming Assignments" icon={<AssignmentIcon />}>
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
                         {data.assignments.filter(a => a.status === 'Pending').length === 0 && (
                            <p className="text-gray-400 text-center py-4">No upcoming assignments. Great job!</p>
                         )}
                    </ul>
                </Widget>
                
                {/* Attendance */}
                <Widget title="Attendance" icon={<AttendanceIcon />}>
                     <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                        <div className="relative">
                            <svg className="w-32 h-32" viewBox="0 0 36 36">
                                <path className="text-space-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                <path className="text-brand-green" strokeDasharray={`${attendancePercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-orbitron font-bold text-white">{attendancePercentage}%</span>
                            </div>
                        </div>
                        <div className="flex justify-around w-full">
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
                
                 {/* Extracurricular Activities */}
                <Widget title="My Activities" icon={<ActivityIcon />} className="lg:col-span-2">
                    <ul className="space-y-3">
                        {studentActivities.map(act => (
                            <li key={act.id} className="p-3 bg-space-dark/50 rounded-md">
                                <p className="font-bold text-white">{act.name}</p>
                                <p className="text-sm text-gray-400">Supervisor: {mockStaff.find(s => s.id === act.supervisor)?.name}</p>
                                <p className="text-xs text-brand-green">{act.day} at {act.time}</p>
                            </li>
                        ))}
                         {studentActivities.length === 0 && (
                            <p className="text-gray-400 text-center py-4">You are not yet enrolled in any extracurricular activities.</p>
                         )}
                    </ul>
                </Widget>

                {/* Announcements */}
                <Widget title="School Announcements" icon={<InfoIcon />} className="lg:col-span-1">
                    <ul className="space-y-4">
                        {announcements.map(ann => (
                             <li key={ann.id} className="p-3 bg-space-dark/50 rounded-md">
                                <p className="font-bold text-white text-sm">{ann.title}</p>
                                <p className="text-xs text-gray-500 mb-1">{new Date(ann.date).toLocaleDateString()}</p>
                                <p className="text-xs text-gray-300">{ann.content}</p>
                            </li>
                        ))}
                    </ul>
                </Widget>

            </div>
        </DashboardLayout>
    );
};

export default StudentPortal;
