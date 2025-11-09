import React, { useState } from 'react';
import { StaffRole, Permission } from '../../../types';
import { allPermissions } from '../../../data/users';
import Card from '../../common/Card';
import Button from '../../common/Button';
import CloseIcon from '../../icons/CloseIcon';

const permissionLabels: Record<Permission, string> = {
    manage_students: 'Manage Students',
    manage_staff: 'Manage Staff',
    view_audit_log: 'View Audit Log',
    access_billing: 'Access Billing',
    manage_documents_academics: 'Manage Academic Docs',
    manage_documents_all: 'Manage All Docs',
};

const permissionColors: Record<Permission, string> = {
    manage_students: 'bg-blue-500/20 text-blue-300',
    manage_staff: 'bg-purple-500/20 text-purple-300',
    view_audit_log: 'bg-yellow-500/20 text-yellow-300',
    access_billing: 'bg-pink-500/20 text-pink-300',
    manage_documents_academics: 'bg-teal-500/20 text-teal-300',
    manage_documents_all: 'bg-emerald-500/20 text-emerald-300',
};

const RolePermissionModal: React.FC<{
    role: StaffRole;
    currentPermissions: Permission[];
    onSave: (role: StaffRole, newPermissions: Permission[]) => void;
    onClose: () => void;
}> = ({ role, currentPermissions, onSave, onClose }) => {
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(currentPermissions);

    const handleTogglePermission = (permission: Permission) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        );
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(role, selectedPermissions);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon /></button>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-6">Edit Permissions for {role}</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {allPermissions.map(permission => (
                            <label key={permission} className="flex items-center gap-3 p-3 bg-space-dark/50 rounded-lg cursor-pointer hover:bg-space-dark">
                                <input
                                    type="checkbox"
                                    checked={selectedPermissions.includes(permission)}
                                    onChange={() => handleTogglePermission(permission)}
                                    className="w-5 h-5 rounded text-brand-green bg-space-dark border-brand-green/50 focus:ring-brand-green"
                                />
                                <span className={`text-sm font-semibold px-2 py-1 rounded-md ${permissionColors[permission]}`}>{permissionLabels[permission]}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RolePermissionModal;
