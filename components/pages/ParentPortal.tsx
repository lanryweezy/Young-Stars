
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ParentIcon from '../icons/ParentIcon';
import { mockStudents } from '../../data/users';
import { studentData, announcements } from '../../data/portalData';
import { events } from '../../data/events';
import DashboardLayout from '../portals/DashboardLayout';
import Widget from '../portals/Widget';
import GradebookIcon from '../icons/GradebookIcon';
import AttendanceIcon from '../icons/AttendanceIcon';
import BillingIcon from '../icons/BillingIcon';
import PaymentModal from '../portals/PaymentModal';
import { Invoice } from '../../types';
import InfoIcon from '../icons/InfoIcon';
import CalendarIcon from '../icons/CalendarIcon';
import LogoIcon from '../icons/LogoIcon';

const ParentPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState('S001');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const parent = { name: "Mr. & Mrs. Lovelace", children: mockStudents.filter(s => s.status === 'Active') };
    const childData = studentData[selectedChildId];

    const upcomingEvents = events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    const handleOpenPaymentModal = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsPaymentModalOpen(true);
    };

    const getStatusColor = (status: 'Paid' | 'Due' | 'Overdue') => {
        switch (status) {
            case 'Paid': return 'bg-green-500/20 text-green-400';
            case 'Due': return 'bg-yellow-500/20 text-yellow-300';
            case 'Overdue': return 'bg-red-500/20 text-red-400';
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto text-center">
                         <div className="flex justify-center items-center space-x-2 mb-4">
                            <LogoIcon />
                            <span className="text-2xl font-orbitron font-bold text-white tracking-wider">YOUNG <span className="text-brand-green">STARS</span></span>
                        </div>
                        <p className="text-gray-400 mb-6">Welcome back, parent! Please log in to view your child's progress.</p>
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4"><ParentIcon /></div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Parent Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div>
                                    <input type="text" placeholder="Parent ID or Email" required defaultValue="parent@example.com" className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                                </div>
                                <p className="text-sm text-gray-500">Password not required for this demo.</p>
                                <Button type="submit" className="w-full" size="lg">Login</Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    const attendancePercentage = Math.round((childData.attendance.present / childData.attendance.total) * 100);

    return (
        <>
            <DashboardLayout userName={parent.name} userType="Parent" onLogout={() => setIsLoggedIn(false)}>
                <div className="mb-6">
                    <label htmlFor="child-selector" className="text-sm text-gray-400">Viewing records for:</label>
                    <select
                        id="child-selector"
                        value={selectedChildId}
                        onChange={e => setSelectedChildId(e.target.value)}
                        className="mt-1 block w-full md:w-1/3 bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"
                    >
                        {parent.children.map(child => <option key={child.id} value={child.id}>{child.name}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Academic Overview */}
                    <Widget title="Academic Snapshot" icon={<GradebookIcon />} className="lg:col-span-2">
                        <h3 className="font-bold text-white mb-2">Most Recent Teacher Feedback</h3>
                        <p className="text-sm text-gray-300 italic bg-space-dark/50 p-3 rounded-md mb-4">"{childData.grades[childData.grades.length - 1].feedback}"</p>
                        
                        <h3 className="font-bold text-white mb-2">Latest Grades (Third Term)</h3>
                        <ul className="space-y-2">
                            {childData.grades.filter(g => g.term === 'Third').slice(0, 4).map((g, i) => (
                                <li key={i} className="flex justify-between text-sm"><span>{g.subject}</span><span className="font-semibold">{g.grade} ({g.score}%)</span></li>
                            ))}
                        </ul>
                    </Widget>

                    {/* Attendance */}
                    <Widget title="Attendance" icon={<AttendanceIcon />}>
                         <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                            <div className="relative">
                                <svg className="w-24 h-24" viewBox="0 0 36 36">
                                    <path className="text-space-dark" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                    <path className="text-brand-green" strokeDasharray={`${attendancePercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-orbitron font-bold text-white">{attendancePercentage}%</span>
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <div><p className="text-gray-400 text-sm">Present</p><p className="font-bold text-white text-lg">{childData.attendance.present}</p></div>
                                <div><p className="text-gray-400 text-sm">Absent</p><p className="font-bold text-red-500 text-lg">{childData.attendance.absent}</p></div>
                            </div>
                        </div>
                    </Widget>
                    
                    {/* Billing */}
                    <Widget title="Billing & Payments" icon={<BillingIcon />} className="lg:col-span-3">
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-brand-green/30">
                                        <th className="py-2 pr-2 font-semibold text-white">Description</th>
                                        <th className="py-2 px-2 font-semibold text-white">Amount</th>
                                        <th className="py-2 px-2 font-semibold text-white">Status</th>
                                        <th className="py-2 pl-2 font-semibold text-white text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {childData.invoices.map(invoice => (
                                        <tr key={invoice.id} className="border-b border-brand-green/20">
                                            <td className="py-3 pr-2 text-gray-300">{invoice.description}</td>
                                            <td className="py-3 px-2 text-gray-300">₦{invoice.amount.toLocaleString()}</td>
                                            <td className="py-3 px-2"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(invoice.status)}`}>{invoice.status}</span></td>
                                            <td className="py-3 pl-2 text-right">
                                                {invoice.status !== 'Paid' && (
                                                    <Button onClick={() => handleOpenPaymentModal(invoice)} size="md" className="px-3 py-1 text-sm">Pay Now</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Widget>

                     {/* Announcements */}
                    <Widget title="School Announcements" icon={<InfoIcon />} className="lg:col-span-2">
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
                    
                     {/* Upcoming Events */}
                    <Widget title="Upcoming Events" icon={<CalendarIcon />}>
                        <ul className="space-y-3">
                            {upcomingEvents.map(event => (
                                <li key={event.title} className="p-2 bg-space-dark/50 rounded-md">
                                    <p className="font-bold text-white text-sm">{event.title}</p>
                                    <p className="text-xs text-brand-green">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                </li>
                            ))}
                        </ul>
                    </Widget>
                </div>
            </DashboardLayout>
            {isPaymentModalOpen && selectedInvoice && (
                <PaymentModal 
                    invoice={selectedInvoice}
                    studentName={parent.children.find(c => c.id === selectedChildId)?.name || ''}
                    onClose={() => setIsPaymentModalOpen(false)}
                />
            )}
        </>
    );
};

export default ParentPortal;
