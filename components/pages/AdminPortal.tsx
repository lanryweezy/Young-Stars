import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import AdminIcon from '../icons/AdminIcon';
import { mockStudents, mockStaff, Student, Staff, StaffRole, staffRoles, Permission, allPermissions, defaultPermissionsByRole } from '../../data/users';
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

type View = 'students' | 'staff' | 'audit' | 'roles';
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
    const [view, setView] = useState<View>('students');
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [staff, setStaff] = useState<Staff[]>(mockStaff);
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
        adminUser: 'Admin', // Hardcoded for this demo
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

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleOpenRoleModal = (role: StaffRole) => {
        setCurrentRole(role);
        setIsRoleModalOpen(true);
    }
    
    const handleCloseRoleModal = () => {
        setCurrentRole(null);
        setIsRoleModalOpen(false);
    }
    
    const handleSaveRolePermissions = (role: StaffRole, newPermissions: Permission[]) => {
        setRolePermissions(prev => ({
            ...prev,
            [role]: newPermissions,
        }));

        // Also update permissions for all existing staff members with this role
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
                 const studentIds = students.map(s => parseInt(s.id.substring(1), 10)).filter(num => !isNaN(num));
                const maxId = studentIds.length > 0 ? Math.max(...studentIds) : 0;
                const newId = `S${String(maxId + 1).padStart(3, '0')}`;
                setStudents([...students, { ...user, id: newId } as Student]);
            } else {
                const staffIds = staff.map(s => parseInt(s.id.substring(1), 10)).filter(num => !isNaN(num));
                const maxId = staffIds.length > 0 ? Math.max(...staffIds) : 0;
                const newId = `T${String(maxId + 1).padStart(2, '0')}`;
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

        if (view === 'students') {
            setStudents(students.filter(s => s.id !== currentUser.id));
        } else {
            setStaff(staff.filter(s => s.id !== currentUser.id));
        }
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
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto">
                        <Card className="flex flex-col items-center text-center p-8">
                            <div className="text-brand-green mb-4"><AdminIcon /></div>
                            <h1 className="font-orbitron text-3xl font-bold text-white mb-6">Admin Portal</h1>
                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div>
                                    <input type="text" placeholder="Admin ID or Email" required defaultValue="admin@youngstars.ng" className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
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
    
    const filteredStudents = students.filter(student => {
        const searchMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.class.toLowerCase().includes(searchQuery.toLowerCase());
        const statusMatch = statusFilter === 'All' || student.status === statusFilter;
        return searchMatch && statusMatch;
    });

    const filteredStaff = staff.filter(member => {
        const searchMatch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.id.toLowerCase().includes(searchQuery.toLowerCase());
        const roleMatch = roleFilter === 'All' || member.role === roleFilter;
        const statusMatch = statusFilter === 'All' || member.status === statusFilter;
        return searchMatch && roleMatch && statusMatch;
    });

    const handleExportCSV = () => {
        const data = view === 'students' ? filteredStudents : filteredStaff;
        if (data.length === 0) {
            alert('No data to export.');
            return;
        }
    
        const userType = view === 'students' ? 'student' : 'staff';
        logAction(`Exported ${userType} data`, `Exported ${data.length} records to CSV.`);
    
        const headers = view === 'students'
            ? ['Student ID', 'Name', 'Class', 'Date Registered', 'Guardian Contact', 'Status']
            : ['Staff ID', 'Name', 'Role', 'Permissions', 'Status'];
    
        const escapeCSV = (value: string | undefined) => {
            if (value === undefined || value === null) return '';
            const strValue = String(value);
            if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
                return `"${strValue.replace(/"/g, '""')}"`;
            }
            return strValue;
        };
        
        const rows = data.map(item => {
            if ('class' in item) { // Student
                return [
                    escapeCSV(item.id),
                    escapeCSV(item.name),
                    escapeCSV(item.class),
                    escapeCSV(item.dateRegistered),
                    escapeCSV(item.guardianContact),
                    escapeCSV(item.status)
                ].join(',');
            } else { // Staff
                return [
                    escapeCSV(item.id),
                    escapeCSV(item.name),
                    escapeCSV(item.role),
                    escapeCSV(item.permissions.map(p => permissionLabels[p]).join('; ')),
                    escapeCSV(item.status)
                ].join(',');
            }
        });
    
        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', `${userType}_data_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const dataToDisplay = view === 'students' ? filteredStudents : filteredStaff;
    const columns = view === 'students' 
        ? ['Name', 'Student ID', 'Class', 'Date Registered', 'Guardian Contact', 'Status'] 
        : ['Name', 'Staff ID', 'Role', 'Permissions', 'Status'];

    const totalItems = dataToDisplay.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginatedData = dataToDisplay.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const goToNextPage = () => setCurrentPage(current => Math.min(current + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(current => Math.max(current - 1, 1));


    const renderMainContent = () => {
        if (view === 'audit') {
            return (
                <Card>
                    <h2 className="font-orbitron text-2xl font-bold text-white mb-6">System Audit Log</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-brand-green/30">
                                    <th className="p-4 font-semibold text-white">Timestamp</th>
                                    <th className="p-4 font-semibold text-white">User</th>
                                    <th className="p-4 font-semibold text-white">Action</th>
                                    <th className="p-4 font-semibold text-white">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLog.map(log => (
                                    <tr key={log.id} className="border-b border-brand-green/20 hover:bg-space-dark/50">
                                        <td className="p-4 text-gray-400 text-sm whitespace-nowrap">{log.timestamp.toLocaleString()}</td>
                                        <td className="p-4 text-gray-300">{log.adminUser}</td>
                                        <td className="p-4 text-white">{log.action}</td>
                                        <td className="p-4 text-gray-300">{log.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {auditLog.length === 0 && <p className="text-center text-gray-500 py-8">No actions have been logged yet.</p>}
                    </div>
                </Card>
            );
        }

        if (view === 'roles') {
            return (
                <Card>
                    <h2 className="font-orbitron text-2xl font-bold text-white mb-2">Roles & Permissions</h2>
                    <p className="text-gray-400 mb-6">Manage permissions for each staff role.</p>
                     <div className="space-y-4">
                        {(Object.keys(rolePermissions) as StaffRole[]).map(role => (
                            <div key={role} className="p-4 bg-space-dark/50 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center">
                                <div>
                                    <h3 className="font-orbitron font-bold text-lg text-white">{role}</h3>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {rolePermissions[role].length > 0 ? rolePermissions[role].map(p => (
                                            <span key={p} className={`px-2 py-0.5 text-xs font-semibold rounded-full ${permissionColors[p]}`}>
                                                {permissionLabels[p]}
                                            </span>
                                        )) : <span className="text-xs text-gray-500">No permissions assigned</span>}
                                    </div>
                                </div>
                                <Button onClick={() => handleOpenRoleModal(role)} variant="secondary" className="mt-4 sm:mt-0">
                                    <EditIcon /> Edit
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>
            );
        }

        return (
            <>
            <Card>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h2 className="font-orbitron text-2xl font-bold text-white">
                        {view === 'students' ? 'Student Roster' : 'Staff Directory'}
                    </h2>
                     <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleExportCSV} variant="secondary">
                            <ExportIcon /> Export CSV
                        </Button>
                        <Button onClick={() => openModal('add')}>
                            <PlusIcon /> Add New {view === 'students' ? 'Student' : 'Staff'}
                        </Button>
                    </div>
                </div>
                {view === 'students' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-1 relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-3"><SearchIcon className="h-5 w-5 text-gray-500" /></span>
                             <input type="text" placeholder="Search by name, ID, or class..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                        </div>
                        <div>
                            <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Inactive')} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition">
                                <option value="All">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="md:col-span-2 relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-3"><SearchIcon className="h-5 w-5 text-gray-500" /></span>
                             <input type="text" placeholder="Search by name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-brand-green focus:border-brand-green transition" />
                        </div>
                        <div>
                            <select id="roleFilter" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as StaffRole | 'All')} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition">
                                <option value="All">All Roles</option>
                                {staffRoles.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                        </div>
                        <div>
                            <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active' | 'Inactive')} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green transition">
                                <option value="All">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-brand-green/30">
                                {columns.map(col => <th key={col} className="p-4 font-semibold text-white">{col}</th>)}
                                <th className="p-4 font-semibold text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(item => (
                                <tr key={item.id} className="border-b border-brand-green/20 hover:bg-space-dark/50 align-middle">
                                    <td className="p-4 text-gray-300">{item.name}</td>
                                    <td className="p-4 text-gray-300 font-mono text-sm">{item.id}</td>
                                    <td className="p-4 text-gray-300">{'class' in item ? item.class : item.role}</td>
                                    {view === 'students' && 'dateRegistered' in item && (
                                        <>
                                          <td className="p-4 text-gray-300">{item.dateRegistered}</td>
                                          <td className="p-4 text-gray-300">{item.guardianContact}</td>
                                        </>
                                    )}
                                    {view === 'staff' && 'permissions' in item && (
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {item.permissions.map(p => (
                                                    <span key={p} className={`px-2 py-0.5 text-xs font-semibold rounded-full ${permissionColors[p]}`}>
                                                        {permissionLabels[p]}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => openModal('edit', item)} className="p-2 text-gray-400 hover:text-blue-400 transition-colors"><EditIcon /></button>
                                        <button onClick={() => openModal('delete', item)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><TrashIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {dataToDisplay.length === 0 && <p className="text-center text-gray-500 py-8">No matching records found.</p>}
            </Card>
            {totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center">
                    <Button onClick={goToPreviousPage} disabled={currentPage === 1} variant="secondary">
                        Previous
                    </Button>
                    <span className="text-gray-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button onClick={goToNextPage} disabled={currentPage === totalPages} variant="secondary">
                        Next
                    </Button>
                </div>
            )}
            </>
        );
    };

    const resetAllFilters = () => {
        setSearchQuery('');
        setStatusFilter('All');
        setRoleFilter('All');
        setCurrentPage(1);
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
                        {/* Sidebar */}
                        <aside className="lg:w-1/4">
                            <Card className="p-4">
                                <nav className="space-y-2">
                                    <button onClick={() => { setView('students'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'students' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <StudentIcon /> <span className="font-semibold">Manage Students</span>
                                    </button>
                                    <button onClick={() => { setView('staff'); resetAllFilters(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${view === 'staff' ? 'bg-brand-green/20 text-white' : 'text-gray-400 hover:bg-space-dark/50'}`}>
                                        <StaffIcon /> <span className="font-semibold">Manage Staff</span>
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

                        {/* Main Content */}
                        <main className="lg:w-3/4">
                           {renderMainContent()}
                        </main>
                    </div>
                </div>
            </div>
            {isModalOpen && <UserModal mode={modalMode} user={currentUser} view={view} onSave={handleSave} onDelete={handleDelete} onClose={closeModal} rolePermissions={rolePermissions} />}
            {isRoleModalOpen && currentRole && <RolePermissionModal role={currentRole} currentPermissions={rolePermissions[currentRole]} onSave={handleSaveRolePermissions} onClose={handleCloseRoleModal} />}
        </>
    );
};

// User Management Modal
const UserModal: React.FC<{
    mode: ModalMode;
    user: User | null;
    view: View;
    onSave: (user: User) => void;
    onDelete: () => void;
    onClose: () => void;
    rolePermissions: Record<StaffRole, Permission[]>;
}> = ({ mode, user, view, onSave, onDelete, onClose, rolePermissions }) => {
    const defaultStudent: Omit<Student, 'id'> = { name: '', class: '', status: 'Active', dateRegistered: new Date().toISOString().split('T')[0], guardianContact: '' };
    const defaultStaff: Omit<Staff, 'id'> = { name: '', role: 'Teacher', status: 'Active', permissions: rolePermissions['Teacher'] };

    const initialState = user 
        ? user 
        : (view === 'students' ? defaultStudent : defaultStaff);
    
    const [formData, setFormData] = useState(initialState);
    
    const role = 'role' in formData ? formData.role : null;
    
    useEffect(() => {
        if (view === 'staff' && 'role' in formData) {
            const newRole = formData.role as StaffRole;
            const permissionsForRole = rolePermissions[newRole] || [];
            // Update permissions only if they are different to avoid infinite loops
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
    
    if (mode === 'delete') {
        return (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center animate-fade-in-up">
                <Card className="p-8 text-center max-w-sm">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-4">
                        <WarningIcon />
                    </div>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                    <p className="text-gray-400 mb-6">Are you sure you want to delete {user?.name}? This action cannot be undone.</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={onClose} variant="secondary">Cancel</Button>
                        <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500">Delete</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon/></button>
                 
                 <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <div className="bg-brand-green/20 p-4 rounded-full flex-shrink-0">
                        {view === 'students' ? <StudentIcon /> : <StaffIcon />}
                    </div>
                    <div>
                        <h3 className="font-orbitron text-2xl font-bold text-white">
                            {mode === 'add' ? 'Add New' : 'Edit'} {view === 'students' ? 'Student' : 'Staff'}
                        </h3>
                        {mode === 'edit' && user && <p className="text-gray-500 font-mono text-sm">{user.id}</p>}
                    </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                     {view === 'students' && 'class' in formData ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                               <label className="block text-sm font-medium text-gray-300 mb-1">Class</label>
                               <input type="text" name="class" value={formData.class} onChange={handleChange} required className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Date Registered</label>
                                <input type="date" name="dateRegistered" value={formData.dateRegistered} onChange={handleChange} required className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Guardian Contact</label>
                                <input type="text" name="guardianContact" value={formData.guardianContact} onChange={handleChange} required className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                     ) : (
                        'role' in formData && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                                        <select name="role" value={formData.role} onChange={handleChange} required className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green">
                                            {staffRoles.map(role => <option key={role} value={role}>{role}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Permissions (determined by role)</label>
                                    <div className="flex flex-wrap gap-2 p-3 bg-space-dark/50 rounded-lg min-h-[44px]">
                                        {formData.permissions.length > 0 ? formData.permissions.map(p => (
                                            <span key={p} className={`px-2 py-1 text-xs font-semibold rounded-full ${permissionColors[p]}`}>
                                                {permissionLabels[p]}
                                            </span>
                                        )) : <span className="text-gray-500 text-sm italic">No permissions assigned to this role.</span>}
                                    </div>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-space-dark border border-brand-green/30 rounded-xl py-2 px-4 text-white focus:ring-brand-green focus:border-brand-green">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        )
                     )}
                    <div className="pt-4 flex justify-end gap-4">
                        <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

const RolePermissionModal: React.FC<{
    role: StaffRole;
    currentPermissions: Permission[];
    onSave: (role: StaffRole, permissions: Permission[]) => void;
    onClose: () => void;
}> = ({ role, currentPermissions, onSave, onClose }) => {
    const [permissions, setPermissions] = useState<Permission[]>(currentPermissions);

    const handlePermissionChange = (permission: Permission) => {
        setPermissions(prev => 
            prev.includes(permission) 
                ? prev.filter(p => p !== permission) 
                : [...prev, permission]
        );
    };

    const handleSave = () => {
        onSave(role, permissions);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon/></button>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-1">Edit Permissions</h3>
                <p className="text-brand-green mb-6">for <span className="font-bold">{role}</span></p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allPermissions.map(p => (
                        <label key={p} className="flex items-center space-x-3 p-3 bg-space-dark/50 rounded-lg cursor-pointer hover:bg-space-dark">
                            <input
                                type="checkbox"
                                checked={permissions.includes(p)}
                                onChange={() => handlePermissionChange(p)}
                                className="form-checkbox h-5 w-5 rounded bg-space-light border-brand-green/50 text-brand-green focus:ring-brand-green focus:ring-offset-space-dark"
                            />
                            <span className="text-gray-300">{permissionLabels[p]}</span>
                        </label>
                    ))}
                </div>
                 <div className="pt-6 flex justify-end gap-4">
                    <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                    <Button type="button" onClick={handleSave}>Save Permissions</Button>
                </div>
            </Card>
        </div>
    );
};


export default AdminPortal;