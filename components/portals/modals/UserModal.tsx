import React, { useState, useEffect } from 'react';
import { Student, Staff, StaffRole, Permission } from '../../../types';
import { staffRoles } from '../../../data/users';
import Card from '../../common/Card';
import Button from '../../common/Button';
import CloseIcon from '../../icons/CloseIcon';
import WarningIcon from '../../icons/WarningIcon';

type View = 'dashboard' | 'students' | 'staff' | 'audit' | 'roles' | 'activities' | 'finance' | 'documents';
type ModalMode = 'add' | 'edit' | 'delete';
type User = Student | Staff;

const UserModal: React.FC<{
    mode: ModalMode; user: User | null; view: View;
    onSave: (user: User) => void; onDelete: () => void;
    onClose: () => void; rolePermissions: Record<StaffRole, Permission[]>;
}> = ({ mode, user, view, onSave, onDelete, onClose, rolePermissions }) => {
    const defaultStudent: Omit<Student, 'id'> = { name: '', class: '', dateOfBirth: '', status: 'Active', dateRegistered: new Date().toISOString().split('T')[0], guardianContact: '', isPrefect: false };
    const defaultStaff: Omit<Staff, 'id'> = { name: '', role: 'Teacher', status: 'Active', permissions: rolePermissions['Teacher'], assignedClasses: [] };
    const initialState = user || (view === 'students' ? defaultStudent : defaultStaff);
    const [formData, setFormData] = useState(initialState);
    
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

    const inputStyles = "w-full bg-space-dark border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition";

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon/></button>
                 <h3 className="font-orbitron text-2xl font-bold text-white mb-6">{mode === 'add' ? 'Add New' : 'Edit'} {view === 'students' ? 'Student' : 'Staff'}</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                     {'class' in formData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputStyles} placeholder="Full Name" />
                            <input type="text" name="class" value={formData.class} onChange={handleChange} required className={inputStyles} placeholder="Class (e.g., Primary 5)" />
                            <div>
                                <label className="text-xs text-gray-400">Date of Birth</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className={inputStyles} />
                            </div>
                             <div>
                                <label className="text-xs text-gray-400">Date Registered</label>
                                <input type="date" name="dateRegistered" value={formData.dateRegistered} onChange={handleChange} required className={inputStyles} />
                            </div>
                            <input type="tel" name="guardianContact" value={formData.guardianContact} onChange={handleChange} required className={`${inputStyles} md:col-span-2`} placeholder="Guardian Phone (e.g., 08012345678)" pattern="[0-9]*" />
                             <select name="status" value={formData.status} onChange={handleChange} required className={inputStyles}>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                             <div className="flex items-center gap-3">
                                <input id="isPrefect" type="checkbox" name="isPrefect" checked={(formData as Student).isPrefect} onChange={e => setFormData({...formData, isPrefect: e.target.checked})} className="w-5 h-5 rounded text-brand-green bg-space-dark border-brand-green/50 focus:ring-brand-green" />
                                <label htmlFor="isPrefect" className="text-gray-300">Is Prefect?</label>
                            </div>
                            {(formData as Student).isPrefect && (
                                <input type="text" name="prefectRole" value={(formData as Student).prefectRole || ''} onChange={handleChange} placeholder="Prefect Role (e.g., Head Boy)" className={`${inputStyles} md:col-span-2`} />
                            )}
                        </div>
                    )}
                     {'role' in formData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputStyles} placeholder="Full Name" />
                             <select name="role" value={formData.role} onChange={handleChange} required className={inputStyles}>
                                {staffRoles.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                             <input type="text" name="assignedClasses" value={Array.isArray(formData.assignedClasses) ? formData.assignedClasses.join(', ') : ''} onChange={(e) => setFormData({...formData, assignedClasses: e.target.value.split(',').map(s => s.trim())})} className={`${inputStyles} md:col-span-2`} placeholder="Assigned Classes (comma-separated)" />
                            <select name="status" value={formData.status} onChange={handleChange} required className={inputStyles}>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    )}
                    <div className="flex justify-end gap-4 pt-4">
                        <Button onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default UserModal;
