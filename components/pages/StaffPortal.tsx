
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StaffIcon from '../icons/StaffIcon';
import DashboardLayout from '../portals/DashboardLayout';
import { mockStaff, mockStudents } from '../../data/users';
import { studentData, announcements } from '../../data/portalData';
import { schoolDocuments } from '../../data/documents';
import Widget from '../portals/Widget';
import AssignmentIcon from '../icons/AssignmentIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import InfoIcon from '../icons/InfoIcon';
import DocumentManager from '../portals/DocumentManager';
import { Permission } from '../../types';
import CalendarIcon from '../icons/CalendarIcon';
import StudentIcon from '../icons/StudentIcon';
import LogoIcon from '../icons/LogoIcon';

type StaffView = 'dashboard' | 'class_management' | 'documents';

const StaffPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staffId, setStaffId] = useState('T02');
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [view, setView] = useState<StaffView>('dashboard');
    
    const currentStaff = mockStaff.find(s => s.id === staffId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const staffMember = mockStaff.find(s => s.id === staffId);
        if (staffMember && staffMember.assignedClasses.length > 0) {
            setSelectedClass(staffMember.assignedClasses[0]);
        }
        setIsLoggedIn(true);
    };
    
    const hasPermission = (permission: Permission) => {
        return currentStaff?.permissions.includes(permission);
    };
    
    const accessibleDocuments = schoolDocuments.filter(category => {
        if (!category.requiredPermission) return true; // Accessible to all staff if no permission is set
        if (hasPermission('manage_documents_all')) return true;
        return hasPermission(category.requiredPermission);
    });

    if (!isLoggedIn || !currentStaff) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto text-center">
                         <div className="flex justify-center items-center space-x-2 mb-4">
                            <LogoIcon />
                            <span className="text-2xl font-orbitron font-bold text-white tracking-wider">YOUNG <span className="text-brand-green">STARS</span></span>
                        </div>
                        <p className="text-gray-400 mb-6">Welcome back, staff! Please select your profile to continue.</p>
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4"><StaffIcon /></div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Staff Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div>
                                    <select
                                        id="staff_id"
                                        value={staffId}
                                        onChange={(e) => setStaffId(e.target.value)}
                                        className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"
                                    >
                                        {mockStaff.filter(s => s.status === 'Active').map(s => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                                    </select>
                                </div>
                                <p className="text-sm text-gray-500">Select a staff member. Password not required for demo.</p>
                                <Button type="submit" className="w-full" size="lg">Login</Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    const studentsInClass = mockStudents.filter(s => s.class === selectedClass);
    const assignmentsForClass = Object.values(studentData).flatMap(d => d.assignments).filter(a => a.subject.includes(selectedClass?.split(' ')[0] || ''));
    const uniqueAssignments = Array.from(new Map(assignmentsForClass.map(item => [item['title'], item])).values());
    
    const renderContent = () => {
        switch(view) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Widget title="Today's Schedule" icon={<CalendarIcon />}>
                           <p className="text-gray-400 text-center">Schedule feature coming soon.</p>
                        </Widget>
                        <Widget title="School Announcements" icon={<InfoIcon />}>
                            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
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
                );
            case 'class_management':
                 return selectedClass ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Widget title={`Student Roster - ${selectedClass}`} icon={<StudentIcon />}>
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {studentsInClass.map(student => (
                                    <div key={student.id} className="flex justify-between items-center p-3 bg-space-dark/50 rounded-md">
                                        <p className="text-white font-semibold">{student.name}</p>
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${student.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{student.status}</span>
                                    </div>
                                ))}
                            </div>
                        </Widget>

                        <Widget title={`Attendance - ${selectedClass}`} icon={<AttendanceIcon />}>
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {studentsInClass.map(student => (
                                    <div key={student.id} className="flex justify-between items-center p-2 bg-space-dark/50 rounded-md">
                                        <p className="text-white">{student.name}</p>
                                        <div className="flex gap-2">
                                            <button className="px-2 py-1 text-xs rounded-md bg-green-500/20 text-green-300 hover:bg-green-500/40">Present</button>
                                            <button className="px-2 py-1 text-xs rounded-md bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40">Late</button>
                                            <button className="px-2 py-1 text-xs rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/40">Absent</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Widget>
                        
                         <Widget title={`Assignments - ${selectedClass}`} icon={<AssignmentIcon />} className="lg:col-span-2">
                            <div className="space-y-3">
                                {uniqueAssignments.slice(0, 4).map(assign => (
                                    <div key={assign.id} className="flex justify-between items-center p-3 bg-space-dark/50 rounded-md">
                                        <div>
                                            <p className="text-white">{assign.title}</p>
                                            <p className="text-xs text-gray-400">Due: {new Date(assign.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        <Button size="md" variant="secondary" className="text-sm px-3 py-1">View Submissions</Button>
                                    </div>
                                ))}
                            </div>
                        </Widget>
                    </div>
                ) : <p className="text-gray-400">Please select a class to manage.</p>;
            case 'documents':
                return <DocumentManager documentCategories={accessibleDocuments} readOnly={true} />;
        }
    }


    return (
        <DashboardLayout userType={currentStaff.role} userName={currentStaff.name} onLogout={() => setIsLoggedIn(false)}>
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex gap-2 border-b border-brand-green/20">
                     <button onClick={() => setView('dashboard')} className={`px-4 py-2 font-semibold transition-colors ${view === 'dashboard' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400 hover:text-white'}`}>Dashboard</button>
                     <button onClick={() => setView('class_management')} className={`px-4 py-2 font-semibold transition-colors ${view === 'class_management' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400 hover:text-white'}`}>Class Management</button>
                     <button onClick={() => setView('documents')} className={`px-4 py-2 font-semibold transition-colors ${view === 'documents' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-400 hover:text-white'}`}>Documents</button>
                </div>
                {view === 'class_management' && (
                     <div>
                        <label htmlFor="class-selector" className="text-sm text-gray-400 mr-2">Managing Class:</label>
                        <select
                            id="class-selector"
                            value={selectedClass || ''}
                            onChange={e => setSelectedClass(e.target.value)}
                            className="bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"
                        >
                            {currentStaff.assignedClasses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}
            </div>
            {renderContent()}
        </DashboardLayout>
    );
};

export default StaffPortal;
