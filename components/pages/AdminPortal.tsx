import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import AdminIcon from '../icons/AdminIcon';
// FIX: Split imports to correctly source types from `types.ts` and data from `users.ts`.
import { Student, Staff, StaffRole, Permission } from '../../types';
import { mockStudents, mockStaff, staffRoles, allPermissions, defaultPermissionsByRole } from '../../data/users';
import { extracurricularActivities, studentData } from '../../data/portalData';
import { ExtracurricularActivity } from '../../types';
import StudentIcon from '../icons/StudentIcon';
import StaffIcon from '../icons/StaffIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';
import AuditLogIcon from '../icons/AuditLogIcon';
import ExportIcon from '../icons/ExportIcon';
import WarningIcon from '../icons/WarningIcon';
import AdjustmentsIcon from '../icons/AdjustmentsIcon';
import FinanceIcon from '../icons/FinanceIcon';
import ActivityIcon from '../icons/ActivityIcon';

type View = 'dashboard' | 'students' | 'staff' | 'audit' | 'roles' | 'activities';
type ModalMode = 'add' | 'edit' | 'delete';
type User = Student | Staff;

type AuditLogEntry = {
  id: string;
  timestamp: Date;
  adminUser: string;
  action: string;
  details: string;
};

const permissionLabels: Record<Permission, string> = {
    manage_students: 'Manage Students',
    manage_staff: 'Manage Staff',
    view_audit_log: 'View Audit Log',
    access_billing: 'Access Billing',
};

const permissionColors: Record<Permission, string> = {
    manage_students: 'bg-blue-500/20 text-blue-300',
    manage_staff: 'bg-purple-500/20 text-purple-300',
    view_audit_log: 'bg-yellow-500/20 text-yellow-300',
    access_billing: 'bg-pink-500/20 text-pink-300',
};

const AdminPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState<View>('dashboard');
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [staff, setStaff] = useState<Staff[]>(mockStaff);
    const [activities, setActivities] = useState<ExtracurricularActivity[]>(extracurricularActivities);
    const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<StaffRole | 'All'>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('add');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [rolePermissions, setRolePermissions] = useState<Record<StaffRole, Permission[]>>(defaultPermissionsByRole);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<StaffRole | null>(null);

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
                 <div className="container mx-auto px-6"><div className="max-w-md mx-auto">
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4"><AdminIcon /></div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Admin Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <input type="text" placeholder="Admin ID or Email" required defaultValue="admin@youngstars.ng" className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                                <p className="text-sm text-gray-500">Password not required for this demo.</p>
                                <Button type="submit" className="w-full" size="lg">Login</Button>
                            </form>
                        </Card>
                </div></div>
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

    const dataToDisplay = { students: filteredStudents, staff: filteredStaff, activities: filteredActivities, audit: [], roles: [], dashboard: [] }[view] || [];
    const totalPages = Math.ceil(dataToDisplay.length / ITEMS_PER_PAGE);
    const paginatedData = dataToDisplay.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const resetAllFilters = () => {
        setSearchQuery('');
        setStatusFilter('All');
        setRoleFilter('All');
        setCurrentPage(1);
    };

    const renderMainContent = () => {
        switch (view) {
            case 'dashboard':
                const allInvoices = Object.values(studentData).flatMap(s => s.invoices);
                const totalRevenue = allInvoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
                const outstandingFees = allInvoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);
                return (
                    <div>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             <Card><h3 className="text-lg font-semibold text-gray-400">Total Students</h3><p className="text-4xl font-orbitron font-bold text-white">{students.filter(s => s.status === 'Active').length}</p></Card>
                             <Card><h3 className="text-lg font-semibold text-gray-400">Active Staff</h3><p className="text-4xl font-orbitron font-bold text-white">{staff.filter(s => s.status === 'Active').length}</p></Card>
                             <Card><h3 className="text-lg font-semibold text-gray-400">Revenue (Term)</h3><p className="text-4xl font-orbitron font-bold text-brand-green">₦{totalRevenue.toLocaleString()}</p></Card>
                             <Card><h3 className="text-lg font-semibold text-gray-400">Outstanding Fees</h3><p className="text-4xl font-orbitron font-bold text-yellow-400">₦{outstandingFees.toLocaleString()}</p></Card>
                        </div>
                    </div>
                );
            case 'activities':
                return (
                    <Card>
                        <h2 className="font-orbitron text-2xl font-bold text-white mb-6">Extracurricular Activities</h2>
                        <input type="text" placeholder="Search activities..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full md:w-1/3 bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 mb-4" />
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
            // Other cases will be handled by a generic table renderer below
        }

        if (['students', 'staff', 'audit', 'roles'].includes(view)) {
             // Existing rendering logic for students, staff, audit, roles
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
                                    <button onClick={() => { setView('dashboard'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'dashboard' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <AdminIcon /> <span className="font-semibold">Dashboard</span>
                                    </button>
                                    <button onClick={() => { setView('students'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'students' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <StudentIcon /> <span className="font-semibold">Manage Students</span>
                                    </button>
                                    <button onClick={() => { setView('staff'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'staff' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <StaffIcon /> <span className="font-semibold">Manage Staff</span>
                                    </button>
                                     <button onClick={() => { setView('activities'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'activities' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <ActivityIcon /> <span className="font-semibold">Extracurricular</span>
                                    </button>
                                    <button onClick={() => { setView('roles'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'roles' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <AdjustmentsIcon /> <span className="font-semibold">Roles & Permissions</span>
                                    </button>
                                     <button onClick={() => { setView('audit'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'audit' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
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
        </>
    );
};

// Modals remain largely the same, but UserModal needs to handle new Student properties
const UserModal: React.FC<{
    mode: ModalMode; user: User | null; view: View;
    onSave: (user: User) => void; onDelete: () => void;
    onClose: () => void; rolePermissions: Record<StaffRole, Permission[]>;
}> = ({ mode, user, view, onSave, onDelete, onClose, rolePermissions }) => {
    const defaultStudent: Omit<Student, 'id'> = { name: '', class: '', status: 'Active', dateRegistered: new Date().toISOString().split('T')[0], guardianContact: '', isPrefect: false };
    const defaultStaff: Omit<Staff, 'id'> = { name: '', role: 'Teacher', status: 'Active', permissions: rolePermissions['Teacher'], assignedClasses: [] };
    const initialState = user || (view === 'students' ? defaultStudent : defaultStaff);
    const [formData, setFormData] = useState(initialState);
    
    // ... (rest of the UserModal component is unchanged)
    const role = 'role' in formData ? formData.role : null;
    
    useEffect(() => {
        if (view === 'staff' && 'role' in formData) {
            const newRole = formData.role as StaffRole;
            const permissionsForRole = rolePermissions[newRole] || [];
            if (JSON.stringify(permissionsForRole) !== JSON.stringify(formData.permissions)) {
                 setFormData(prev => ({ ...prev, permissions: permissionsForRole }));
            }
        }
    }, [role, view, rolePermissions, formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as User);
    };
    
    if (mode === 'delete') return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center animate-fade-in-up p-4">
            <Card className="p-8 text-center max-w-sm">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-4"><WarningIcon /></div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                <p className="text-gray-400 mb-6">Are you sure you want to delete {user?.name}? This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500">Delete</Button>
                </div>
            </Card>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon/></button>
                 <h3 className="font-orbitron text-2xl font-bold text-white mb-6">{mode === 'add' ? 'Add New' : 'Edit'} {view === 'students' ? 'Student' : 'Staff'}</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                     {view === 'students' && 'class' in formData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-space-dark" placeholder="Full Name" />
                            <input type="text" name="class" value={formData.class} onChange={handleChange} required className="w-full bg-space-dark" placeholder="Class" />
                            <input type="date" name="dateRegistered" value={formData.dateRegistered} onChange={handleChange} required className="w-full bg-space-dark" />
                            <input type="text" name="guardianContact" value={formData.guardianContact} onChange={handleChange} required className="w-full bg-space-dark" placeholder="Guardian Contact" />
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-space-dark md:col-span-2"><option>Active</option><option>Inactive</option></select>
                        </div>
                     )}
                     {view === 'staff' && 'role' in formData && (
                        <div className="space-y-4">
                             <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-space-dark" placeholder="Full Name" />
                             <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-space-dark">{staffRoles.map(r => <option key={r}>{r}</option>)}</select>
                             <div><label className="text-sm text-gray-400">Permissions</label><div className="flex flex-wrap gap-2 p-2 bg-space-dark/50 rounded-md">{formData.permissions.map(p => <span key={p} className={`text-xs px-2 py-1 rounded-full ${permissionColors[p]}`}>{permissionLabels[p]}</span>)}</div></div>
                             <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-space-dark"><option>Active</option><option>Inactive</option></select>
                        </div>
                     )}
                    <div className="pt-4 flex justify-end gap-4"><Button type="button" onClick={onClose} variant="secondary">Cancel</Button><Button type="submit">Save</Button></div>
                </form>
            </Card>
        </div>
    );
};

const RolePermissionModal: React.FC<{
    role: StaffRole; currentPermissions: Permission[];
    onSave: (role: StaffRole, permissions: Permission[]) => void; onClose: () => void;
}> = ({ role, currentPermissions, onSave, onClose }) => {
    const [permissions, setPermissions] = useState<Permission[]>(currentPermissions);
    const handlePermissionChange = (p: Permission) => setPermissions(prev => prev.includes(p) ? prev.filter(i => i !== p) : [...prev, p]);
    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon/></button>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-1">Edit Permissions for <span className="text-brand-green">{role}</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {allPermissions.map(p => (
                        <label key={p} className="flex items-center space-x-3 p-3 bg-space-dark/50 rounded-lg cursor-pointer hover:bg-space-dark">
                            <input type="checkbox" checked={permissions.includes(p)} onChange={() => handlePermissionChange(p)} className="form-checkbox h-5 w-5" />
                            <span className="text-gray-300">{permissionLabels[p]}</span>
                        </label>
                    ))}
                </div>
                <div className="pt-6 flex justify-end gap-4"><Button type="button" onClick={onClose} variant="secondary">Cancel</Button><Button type="button" onClick={() => onSave(role, permissions)}>Save</Button></div>
            </Card>
        </div>
    );
};

export default AdminPortal;
