import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import StaffIcon from '../icons/StaffIcon';
import DashboardLayout from '../portals/DashboardLayout';
import { mockStaff, mockStudents } from '../../data/users';
import { studentData } from '../../data/portalData';
import Widget from '../portals/Widget';
import AssignmentIcon from '../icons/AssignmentIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import { Assignment } from '../../types';

const StaffPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staffId, setStaffId] = useState('T02');
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    
    const currentStaff = mockStaff.find(s => s.id === staffId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const staffMember = mockStaff.find(s => s.id === staffId);
        if (staffMember && staffMember.assignedClasses.length > 0) {
            setSelectedClass(staffMember.assignedClasses[0]);
        }
        setIsLoggedIn(true);
    };

    if (!isLoggedIn || !currentStaff) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto">
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


    return (
        <DashboardLayout userType={currentStaff.role} userName={currentStaff.name} onLogout={() => setIsLoggedIn(false)}>
            <div className="mb-6">
                <label htmlFor="class-selector" className="text-sm text-gray-400">Managing Class:</label>
                <select
                    id="class-selector"
                    value={selectedClass || ''}
                    onChange={e => setSelectedClass(e.target.value)}
                    className="mt-1 block w-full md:w-1/3 bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"
                >
                    {currentStaff.assignedClasses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            {selectedClass ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Widget title={`Assignments - ${selectedClass}`} icon={<AssignmentIcon />}>
                        <div className="space-y-3">
                            {uniqueAssignments.slice(0, 4).map(assign => (
                                <div key={assign.id} className="p-2 bg-space-dark/50 rounded-md">
                                    <p className="text-white">{assign.title}</p>
                                    <p className="text-xs text-gray-400">Due: {new Date(assign.dueDate).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </Widget>

                    <Widget title={`Attendance - ${selectedClass}`} icon={<AttendanceIcon />}>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
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
                </div>
            ) : <p className="text-gray-400">Please select a class to manage.</p>}
        </DashboardLayout>
    );
};

export default StaffPortal;
