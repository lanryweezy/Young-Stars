import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import AdminIcon from '../icons/AdminIcon';
import { Student, Staff, StaffRole, Permission, Invoice, DocumentCategory, DocumentItem } from '../../types';
import { mockStudents, mockStaff, staffRoles, allPermissions, defaultPermissionsByRole } from '../../data/users';
import { extracurricularActivities, studentData } from '../../data/portalData';
import { schoolDocuments } from '../../data/documents';
import { ExtracurricularActivity } from '../../types';
import StudentIcon from '../icons/StudentIcon';
import StaffIcon from '../icons/StaffIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import SearchIcon from '../icons/SearchIcon';
import AuditLogIcon from '../icons/AuditLogIcon';
import AdjustmentsIcon from '../icons/AdjustmentsIcon';
import FinanceIcon from '../icons/FinanceIcon';
import ActivityIcon from '../icons/ActivityIcon';
import ViewProfileIcon from '../icons/ViewProfileIcon';
import StudentProfile from '../portals/StudentProfile';
import DocumentIcon from '../icons/DocumentIcon';
import DocumentManager from '../portals/DocumentManager';
import LogoIcon from '../icons/LogoIcon';
import DocumentPreviewModal from '../portals/DocumentPreviewModal';
import UserModal from '../portals/modals/UserModal';
import RolePermissionModal from '../portals/modals/RolePermissionModal';
import InvoiceModal from '../portals/modals/InvoiceModal';
import DocumentModal from '../portals/modals/DocumentModal';


type View = 'dashboard' | 'students' | 'staff' | 'audit' | 'roles' | 'activities' | 'finance' | 'documents';
type ModalMode = 'add' | 'edit' | 'delete';
type User = Student | Staff;

type AuditLogEntry = {
  id: string;
  timestamp: Date;
  adminUser: string;
  action: string;
  details: string;
};

const getInvoiceStatusColor = (status: 'Paid' | 'Due' | 'Overdue') => {
    switch (status) {
        case 'Paid': return 'bg-green-500/20 text-green-400';
        case 'Due': return 'bg-yellow-500/20 text-yellow-300';
        case 'Overdue': return 'bg-red-500/20 text-red-400';
    }
};

const Pagination: React.FC<{ currentPage: number, totalPages: number, onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-end items-center gap-2 mt-4">
            <Button variant="secondary" size="md" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</Button>
            <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
            <Button variant="secondary" size="md" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
        </div>
    );
};

const AdminPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState<View>('dashboard');
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [staff, setStaff] = useState<Staff[]>(mockStaff);
    const [activities, setActivities] = useState<ExtracurricularActivity[]>(extracurricularActivities);
    const [documents, setDocuments] = useState<DocumentCategory[]>(schoolDocuments);
    const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<StaffRole | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive' | 'Paid' | 'Due' | 'Overdue'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('add');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [rolePermissions, setRolePermissions] = useState<Record<StaffRole, Permission[]>>(defaultPermissionsByRole);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<StaffRole | null>(null);
    const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
    
    // Document Modal State
    const [isDocModalOpen, setDocModalOpen] = useState(false);
    const [currentDoc, setCurrentDoc] = useState<DocumentItem | null>(null);
    const [currentDocCategory, setCurrentDocCategory] = useState<string | null>(null);
    const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);


    // Finance State
    const initialInvoices = Object.entries(studentData).flatMap(([studentId, data]) => 
      data.invoices.map(invoice => ({ ...invoice, studentId, studentName: mockStudents.find(s => s.id === studentId)?.name || 'N/A' }))
    );
    const [invoices, setInvoices] = useState(initialInvoices);
    const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
    const [currentInvoice, setCurrentInvoice] = useState<typeof initialInvoices[0] | null>(null);


    const handleViewProfile = (studentId: string) => {
        setViewingProfileId(studentId);
    };

    const handleBackToList = () => {
        setViewingProfileId(null);
    };
    
    const handlePreviewDocument = (doc: DocumentItem) => {
        setPreviewDoc(doc);
    };
    
    const handleClosePreview = () => {
        setPreviewDoc(null);
    };

    const logAction = (action: string, details: string) => {
      const newLogEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        adminUser: 'Admin',
        action,
        details,
      };
      setAuditLog(prevLog => [newLogEntry, ...prevLog]);
    };

    const openModal = (mode: ModalMode, user: User | null = null) => {
        setModalMode(mode);
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);
    
    const openInvoiceModal = (mode: ModalMode, invoice: typeof initialInvoices[0] | null = null) => {
        setModalMode(mode);
        setCurrentInvoice(invoice);
        setInvoiceModalOpen(true);
    };
    
    const closeInvoiceModal = () => setInvoiceModalOpen(false);

    const handleSaveInvoice = (invoiceData: typeof initialInvoices[0]) => {
        if (modalMode === 'add') {
            const newInvoice = { ...invoiceData, id: `INV${Date.now()}` };
            setInvoices([...invoices, newInvoice]);
            logAction('Created Invoice', `New invoice #${newInvoice.id} for ${newInvoice.studentName}`);
        } else {
            setInvoices(invoices.map(inv => inv.id === invoiceData.id ? invoiceData : inv));
            logAction('Updated Invoice', `Invoice #${invoiceData.id} for ${invoiceData.studentName} updated.`);
        }
        closeInvoiceModal();
    };

    const handleDeleteInvoice = () => {
        if (!currentInvoice) return;
        setInvoices(invoices.filter(inv => inv.id !== currentInvoice.id));
        logAction('Deleted Invoice', `Invoice #${currentInvoice.id} for ${currentInvoice.studentName} deleted.`);
        closeInvoiceModal();
    };


    const handleOpenRoleModal = (role: StaffRole) => {
        setCurrentRole(role);
        setIsRoleModalOpen(true);
    };
    
    const handleCloseRoleModal = () => setIsRoleModalOpen(false);
    
    const handleSaveRolePermissions = (role: StaffRole, newPermissions: Permission[]) => {
        setRolePermissions(prev => ({ ...prev, [role]: newPermissions }));
        setStaff(prevStaff => prevStaff.map(member => 
            member.role === role ? { ...member, permissions: newPermissions } : member
        ));
        logAction('Updated Role Permissions', `Permissions updated for role: ${role}`);
        handleCloseRoleModal();
    };

    const handleSave = (user: User) => {
        const userType = view === 'students' ? 'Student' : 'Staff';
        if (modalMode === 'add') {
            logAction(`Created ${userType}`, `New user added: ${user.name}`);
            if (view === 'students') {
                const newId = `S${String(students.length + 1).padStart(3, '0')}`;
                setStudents([...students, { ...user, id: newId } as Student]);
            } else {
                const newId = `T${String(staff.length + 1).padStart(2, '0')}`;
                setStaff([...staff, { ...user, id: newId } as Staff]);
            }
        } else {
            logAction(`Updated ${userType}`, `Details updated for: ${user.name} (${user.id})`);
            if (view === 'students') {
                setStudents(students.map(s => s.id === user.id ? user as Student : s));
            } else {
                setStaff(staff.map(s => s.id === user.id ? user as Staff : s));
            }
        }
        closeModal();
    };
    
    const handleDelete = () => {
        if (!currentUser) return;
        const userType = view === 'students' ? 'Student' : 'Staff';
        logAction(`Deleted ${userType}`, `User removed: ${currentUser.name} (${currentUser.id})`);
        if (view === 'students') setStudents(students.filter(s => s.id !== currentUser.id));
        else setStaff(staff.filter(s => s.id !== currentUser.id));
        closeModal();
    };
    
     // Document Handlers
    const openDocModal = (mode: ModalMode, doc: DocumentItem | null, categoryId: string) => {
        setModalMode(mode);
        setCurrentDoc(doc);
        setCurrentDocCategory(categoryId);
        setDocModalOpen(true);
    };
    
    const closeDocModal = () => setDocModalOpen(false);

    const handleSaveDocument = (docData: DocumentItem, categoryId: string) => {
        setDocuments(prevDocs => prevDocs.map(cat => {
            if (cat.id === categoryId) {
                if (modalMode === 'add') {
                     logAction('Document Added', `Added "${docData.name}" to ${cat.title}.`);
                    return { ...cat, documents: [...cat.documents, docData] };
                } else {
                     logAction('Document Updated', `Updated "${docData.name}" in ${cat.title}.`);
                    return { ...cat, documents: cat.documents.map(d => d.id === docData.id ? docData : d) };
                }
            }
            return cat;
        }));
        closeDocModal();
    };

    const handleDeleteDocument = (doc: DocumentItem, categoryId: string) => {
        setDocuments(prevDocs => prevDocs.map(cat => {
            if (cat.id === categoryId) {
                 logAction('Document Deleted', `Deleted "${doc.name}" from ${cat.title}.`);
                return { ...cat, documents: cat.documents.filter(d => d.id !== doc.id) };
            }
            return cat;
        }));
        closeDocModal();
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        logAction('Admin Login', 'Admin user successfully logged in.');
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        logAction('Admin Logout', 'Admin user logged out.');
        setIsLoggedIn(false);
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
                        <p className="text-gray-400 mb-6">Welcome, Administrator. Please log in to manage the school.</p>
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4"><AdminIcon /></div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Admin Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <input type="text" placeholder="Admin ID or Email" required defaultValue="admin@youngstars.ng" className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                                <p className="text-sm text-gray-500">Password not required for this demo.</p>
                                <Button type="submit" className="w-full" size="lg">Login</Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
    
    const filteredStudents = students.filter(student => 
        (student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === 'All' || student.status === statusFilter)
    );
    const filteredStaff = staff.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (roleFilter === 'All' || member.role === roleFilter) &&
        (statusFilter === 'All' || member.status === statusFilter)
    );
    const filteredActivities = activities.filter(act => act.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredInvoices = invoices.filter(invoice =>
        (invoice.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === 'All' || invoice.status === statusFilter)
    );


    const dataToDisplay = { students: filteredStudents, staff: filteredStaff, activities: filteredActivities, audit: auditLog, roles: staffRoles, finance: filteredInvoices, documents: [] }[view] || [];
    const totalPages = Math.ceil(dataToDisplay.length / ITEMS_PER_PAGE);
    const paginatedData = dataToDisplay.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const resetAllFilters = () => {
        setSearchQuery('');
        setStatusFilter('All');
        setRoleFilter('All');
        setCurrentPage(1);
    };

    const renderMainContent = () => {
        if (viewingProfileId) {
            return <StudentProfile studentId={viewingProfileId} onBack={handleBackToList} />;
        }

        const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
        const outstandingFees = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);

        switch (view) {
            case 'dashboard':
                return (
                    <div>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                             <Card><h3 className="text-lg font-semibold text-gray-400">Active Students</h3><p className="text-4xl font-orbitron font-bold text-white">{students.filter(s => s.status === 'Active').length}</p></Card>
                             <Card><h3 className="text-lg font-semibold text-gray-400">Inactive Students</h3><p className="text-4xl font-orbitron font-bold text-gray-500">{students.filter(s => s.status === 'Inactive').length}</p></Card>
                             <Card><h3 className="text-lg font-semibold text-gray-400">Active Staff</h3><p className="text-4xl font-orbitron font-bold text-white">{staff.filter(s => s.status === 'Active').length}</p></Card>
                             <Card><h3 className="text-lg font-semibold text-gray-400">Total Revenue</h3><p className="text-4xl font-orbitron font-bold text-brand-green">₦{totalRevenue.toLocaleString()}</p></Card>
                             <Card className="lg:col-span-2"><h3 className="text-lg font-semibold text-gray-400">Outstanding Fees</h3><p className="text-4xl font-orbitron font-bold text-yellow-400">₦{outstandingFees.toLocaleString()}</p></Card>
                             <Card className="lg:col-span-2"><h3 className="text-lg font-semibold text-gray-400">Recent Log Activity</h3>
                                <ul className="text-xs text-gray-400 mt-2 space-y-1">
                                    {auditLog.slice(0,2).map(log => <li key={log.id}><strong>{log.action}:</strong> {log.details}</li>)}
                                </ul>
                             </Card>
                        </div>
                    </div>
                );
            case 'students':
                return (
                    <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Manage Students</h2>
                         <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="relative flex-grow">
                                <input type="text" placeholder="Search by name or ID..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 pl-10 pr-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                             <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"><option value="All">All Statuses</option><option>Active</option><option>Inactive</option></select>
                             <Button onClick={() => openModal('add')}><PlusIcon /> Add Student</Button>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left">
                                <thead><tr className="border-b border-brand-green/30"><th className="p-4">Name</th><th className="p-4">Class</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr></thead>
                                <tbody>
                                    {(paginatedData as Student[]).map(student => (
                                        <tr key={student.id} className="border-b border-brand-green/20">
                                            <td className="p-4"><div className="font-semibold text-white">{student.name}</div><div className="text-xs text-gray-400">{student.id}</div></td>
                                            <td className="p-4">{student.class}</td>
                                            <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${student.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{student.status}</span></td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleViewProfile(student.id)} className="text-blue-400 hover:text-blue-300 p-1" title="View Profile"><ViewProfileIcon /></button>
                                                    <button onClick={() => openModal('edit', student)} className="text-yellow-400 hover:text-yellow-300 p-1" title="Edit"><EditIcon /></button>
                                                    <button onClick={() => openModal('delete', student)} className="text-red-500 hover:text-red-400 p-1" title="Delete"><TrashIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Card>
                );
            case 'staff':
                return (
                    <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Manage Staff</h2>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="relative flex-grow">
                                <input type="text" placeholder="Search by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 pl-10 pr-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                             <select value={roleFilter} onChange={e => setRoleFilter(e.target.value as any)} className="bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition">
                                <option value="All">All Roles</option>
                                {staffRoles.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition">
                                <option value="All">All Statuses</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                            <Button onClick={() => openModal('add')}><PlusIcon /> Add Staff</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-brand-green/30">
                                        <th className="p-4">Name</th><th className="p-4">Role</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(paginatedData as Staff[]).map(member => (
                                        <tr key={member.id} className="border-b border-brand-green/20">
                                            <td className="p-4"><div className="font-semibold text-white">{member.name}</div><div className="text-xs text-gray-400">{member.id}</div></td>
                                            <td className="p-4">{member.role}</td>
                                            <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${member.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{member.status}</span></td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openModal('edit', member)} className="text-yellow-400 hover:text-yellow-300 p-1" title="Edit"><EditIcon /></button>
                                                    <button onClick={() => openModal('delete', member)} className="text-red-500 hover:text-red-400 p-1" title="Delete"><TrashIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Card>
                );
            case 'finance':
                return (
                    <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">Finance & Billing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-space-dark/50 p-4 rounded-lg"><h4 className="text-gray-400">Total Revenue (Term)</h4><p className="text-2xl font-bold text-brand-green">₦{totalRevenue.toLocaleString()}</p></div>
                            <div className="bg-space-dark/50 p-4 rounded-lg"><h4 className="text-gray-400">Outstanding Fees</h4><p className="text-2xl font-bold text-yellow-400">₦{outstandingFees.toLocaleString()}</p></div>
                        </div>
                         <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="relative flex-grow">
                                <input type="text" placeholder="Search student or description..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 pl-10 pr-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                             <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"><option value="All">All Statuses</option><option>Paid</option><option>Due</option><option>Overdue</option></select>
                             <Button onClick={() => openInvoiceModal('add')}><PlusIcon /> New Invoice</Button>
                        </div>
                         <div className="overflow-x-auto">
                           <table className="w-full text-left">
                                <thead><tr className="border-b border-brand-green/30"><th className="p-2">Student</th><th className="p-2">Description</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2 text-right">Actions</th></tr></thead>
                                <tbody>
                                    {(paginatedData as typeof invoices).map(invoice => (
                                        <tr key={invoice.id} className="border-b border-brand-green/20">
                                            <td className="p-2 text-white font-semibold">{invoice.studentName}</td>
                                            <td className="p-2 text-gray-300">{invoice.description}</td>
                                            <td className="p-2 text-gray-300">₦{invoice.amount.toLocaleString()}</td>
                                            <td className="p-2"><span className={`px-2 py-1 text-xs font-bold rounded-full ${getInvoiceStatusColor(invoice.status)}`}>{invoice.status}</span></td>
                                            <td className="p-2 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openInvoiceModal('edit', invoice)} className="text-yellow-400 hover:text-yellow-300 p-1" title="Edit"><EditIcon /></button>
                                                    <button onClick={() => openInvoiceModal('delete', invoice)} className="text-red-500 hover:text-red-400 p-1" title="Delete"><TrashIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Card>
                );
            case 'activities':
                return (
                    <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Extracurricular Activities</h2>
                        <input type="text" placeholder="Search activities..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full md:w-1/3 bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 mb-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead><tr className="border-b border-brand-green/30"><th className="p-4">Activity</th><th className="p-4">Supervisor</th><th className="p-4">Schedule</th><th className="p-4">Members</th></tr></thead>
                                <tbody>
                                    {filteredActivities.map(act => (
                                        <tr key={act.id} className="border-b border-brand-green/20"><td className="p-4">{act.name}</td><td className="p-4">{mockStaff.find(s => s.id === act.supervisor)?.name}</td><td className="p-4">{act.day}, {act.time}</td><td className="p-4">{act.members.length}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                );
            case 'roles':
                return (
                    <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Roles & Permissions</h2>
                        <div className="space-y-4">
                            {staffRoles.map(role => (
                                <div key={role} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-space-dark/50 rounded-lg gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{role}</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(rolePermissions[role] || []).map(p => <span key={p} className={`text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-300`}>{p}</span>)}
                                            {(rolePermissions[role] || []).length === 0 && <span className="text-xs text-gray-500">No permissions assigned.</span>}
                                        </div>
                                    </div>
                                    <Button onClick={() => handleOpenRoleModal(role)} variant="secondary" size="md">Edit</Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            case 'documents':
                 return <DocumentManager 
                    documentCategories={documents} 
                    onAdd={(categoryId) => openDocModal('add', null, categoryId)}
                    onEdit={(doc, categoryId) => openDocModal('edit', doc, categoryId)}
                    onDelete={(doc, categoryId) => openDocModal('delete', doc, categoryId)}
                    onPreview={handlePreviewDocument}
                 />;
            case 'audit':
                return (
                     <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-6 flex justify-between items-center">
                            <span>Audit Log</span>
                             <Button onClick={() => setAuditLog([])} variant="secondary" size="md"><TrashIcon/> Clear Log</Button>
                        </h2>
                        <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-brand-green/30">
                                        <th className="p-2">Timestamp</th><th className="p-2">User</th><th className="p-2">Action</th><th className="p-2">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auditLog.map(log => (
                                        <tr key={log.id} className="border-b border-brand-green/20 text-sm text-gray-400">
                                            <td className="p-2">{log.timestamp.toLocaleString()}</td>
                                            <td className="p-2">{log.adminUser}</td>
                                            <td className="p-2">{log.action}</td>
                                            <td className="p-2">{log.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {auditLog.length === 0 && <p className="text-center text-gray-500 py-8">No log entries found.</p>}
                        </div>
                    </Card>
                );
        }
    };

    return (
        <>
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95 min-h-screen">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white">Admin Dashboard</h1>
                        <Button onClick={handleLogout} variant="secondary">Logout</Button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className="lg:w-1/4">
                            <Card className="p-4">
                                <nav className="space-y-2">
                                    <button onClick={() => { setView('dashboard'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'dashboard' && !viewingProfileId ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <AdminIcon /> <span className="font-semibold">Dashboard</span>
                                    </button>
                                    <button onClick={() => { setView('students'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${(view === 'students' || viewingProfileId) ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <StudentIcon /> <span className="font-semibold">Students</span>
                                    </button>
                                    <button onClick={() => { setView('staff'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'staff' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <StaffIcon /> <span className="font-semibold">Staff</span>
                                    </button>
                                     <button onClick={() => { setView('activities'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'activities' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <ActivityIcon /> <span className="font-semibold">Activities</span>
                                    </button>
                                    <button onClick={() => { setView('finance'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'finance' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <FinanceIcon /> <span className="font-semibold">Finance</span>
                                    </button>
                                    <button onClick={() => { setView('documents'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'documents' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <DocumentIcon /> <span className="font-semibold">Documents</span>
                                    </button>
                                    <button onClick={() => { setView('roles'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'roles' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <AdjustmentsIcon /> <span className="font-semibold">Roles & Permissions</span>
                                    </button>
                                     <button onClick={() => { setView('audit'); resetAllFilters(); setViewingProfileId(null); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'audit' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <AuditLogIcon /> <span className="font-semibold">Audit Log</span>
                                    </button>
                                </nav>
                            </Card>
                        </aside>
                        <main className="lg:w-3/4">{renderMainContent()}</main>
                    </div>
                </div>
            </div>
            {isModalOpen && <UserModal mode={modalMode} user={currentUser} view={view} onSave={handleSave} onDelete={handleDelete} onClose={closeModal} rolePermissions={rolePermissions} />}
            {isRoleModalOpen && currentRole && <RolePermissionModal role={currentRole} currentPermissions={rolePermissions[currentRole]} onSave={handleSaveRolePermissions} onClose={handleCloseRoleModal} />}
            {isInvoiceModalOpen && <InvoiceModal mode={modalMode} invoice={currentInvoice} onSave={handleSaveInvoice} onDelete={handleDeleteInvoice} onClose={closeInvoiceModal} students={students} />}
            {isDocModalOpen && <DocumentModal mode={modalMode} doc={currentDoc} categoryId={currentDocCategory!} onSave={handleSaveDocument} onDelete={handleDeleteDocument} onClose={closeDocModal} />}
            {previewDoc && <DocumentPreviewModal doc={previewDoc} onClose={handleClosePreview} />}

        </>
    );
};

export default AdminPortal;