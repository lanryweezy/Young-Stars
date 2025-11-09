import React, { useState } from 'react';
import { Invoice, Student } from '../../../types';
import Card from '../../common/Card';
import Button from '../../common/Button';
import CloseIcon from '../../icons/CloseIcon';
import WarningIcon from '../../icons/WarningIcon';

type ModalMode = 'add' | 'edit' | 'delete';

const InvoiceModal: React.FC<{
    mode: ModalMode;
    invoice: (Invoice & { studentId: string; studentName: string; }) | null;
    onSave: (invoiceData: any) => void;
    onDelete: () => void;
    onClose: () => void;
    students: Student[];
}> = ({ mode, invoice, onSave, onDelete, onClose, students }) => {
    const defaultInvoice = { description: '', amount: 0, dueDate: new Date().toISOString().split('T')[0], status: 'Due' as const, studentId: students.find(s=>s.status === 'Active')?.id || '' };
    const initialState = invoice ? { ...invoice } : defaultInvoice;
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'amount' ? Number(value) : value });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const studentName = students.find(s => s.id === formData.studentId)?.name || 'N/A';
        onSave({ ...formData, studentName });
    };

    if (mode === 'delete') {
        return (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center animate-fade-in-up p-4">
                <Card className="p-8 text-center max-w-sm">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-4"><WarningIcon /></div>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                    <p className="text-gray-400 mb-6">Are you sure you want to delete this invoice? This action cannot be undone.</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={onClose} variant="secondary">Cancel</Button>
                        <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500">Delete</Button>
                    </div>
                </Card>
            </div>
        );
    }

    const inputStyles = "w-full bg-space-dark border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition";

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon /></button>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-6">{mode === 'add' ? 'Create' : 'Edit'} Invoice</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                      <select name="studentId" value={formData.studentId} onChange={handleChange} required className={inputStyles}>
                          <option value="">Select Student...</option>
                          {students.filter(s => s.status === 'Active').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                      <input type="text" name="description" value={formData.description} onChange={handleChange} required placeholder="Description" className={inputStyles} />
                      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required placeholder="Amount (₦)" className={inputStyles} />
                      <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className={inputStyles} />
                      <select name="status" value={formData.status} onChange={handleChange} required className={inputStyles}>
                          <option>Due</option>
                          <option>Overdue</option>
                          <option>Paid</option>
                      </select>
                      <div className="flex justify-end gap-4 pt-4">
                          <Button onClick={onClose} variant="secondary">Cancel</Button>
                          <Button type="submit">Save Invoice</Button>
                      </div>
                </form>
            </Card>
        </div>
    );
};

export default InvoiceModal;
