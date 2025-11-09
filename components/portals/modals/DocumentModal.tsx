import React, { useState } from 'react';
import { DocumentItem } from '../../../types';
import Card from '../../common/Card';
import Button from '../../common/Button';
import CloseIcon from '../../icons/CloseIcon';
import WarningIcon from '../../icons/WarningIcon';
import UploadIcon from '../../icons/UploadIcon';

type ModalMode = 'add' | 'edit' | 'delete';

const DocumentModal: React.FC<{
    mode: ModalMode;
    doc: DocumentItem | null;
    categoryId: string;
    onSave: (docData: DocumentItem, categoryId: string) => void;
    onDelete: (doc: DocumentItem, categoryId: string) => void;
    onClose: () => void;
}> = ({ mode, doc, categoryId, onSave, onDelete, onClose }) => {
    const defaultDoc: Omit<DocumentItem, 'id'> = { name: '', description: '', url: '', type: 'PDF', size: '0 KB', lastModified: new Date().toISOString().split('T')[0] };
    const initialState = doc || defaultDoc;
    const [formData, setFormData] = useState(initialState);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'type') { // Reset file and error if type changes
            setFile(null);
            setError(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
        const selectedType = formData.type.toLowerCase();
        
        const validExtensions: Record<string, string[]> = {
            'pdf': ['.pdf'],
            'docx': ['.doc', '.docx'],
            'xlsx': ['.xls', '.xlsx'],
            'png': ['.png'],
            'jpg': ['.jpg', '.jpeg']
        };

        if (!validExtensions[selectedType] || !validExtensions[selectedType].includes(fileExtension)) {
            setError(`Invalid file type. Please upload a ${formData.type} file.`);
            setFile(null);
            e.target.value = '';
        } else {
            setError(null);
            setFile(selectedFile);
            setFormData(prev => ({
                ...prev,
                name: prev.name || selectedFile.name.replace(/\.[^/.]+$/, "")
            }));
        }
    };


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'add' && !file) {
            setError("Please select a file to upload.");
            return;
        }

        let docToSave = { ...formData };

        if (file) {
            // In a real app, you'd upload the file and get a URL. Here we use a blob URL for simulation.
            const fileUrl = URL.createObjectURL(file);
            const fileSizeInKB = file.size / 1024;
            const fileSize = fileSizeInKB > 1024 ? `${(fileSizeInKB / 1024).toFixed(2)} MB` : `${fileSizeInKB.toFixed(2)} KB`;
            
            docToSave = {
                ...docToSave,
                url: fileUrl,
                size: fileSize,
                lastModified: new Date().toISOString().split('T')[0]
            };
        }
        
        const finalDoc = { ...docToSave, id: doc?.id || `doc-${Date.now()}` };
        
        setSuccessMessage("Document saved successfully!");
        setTimeout(() => {
          onSave(finalDoc, categoryId);
        }, 1000); // Close modal after showing success message
    };
    
    if (mode === 'delete' && doc) {
        return (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center animate-fade-in-up p-4">
                <Card className="p-8 text-center max-w-sm">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-4"><WarningIcon /></div>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">Confirm Deletion</h3>
                    <p className="text-gray-400 mb-6">Are you sure you want to delete the document "{doc.name}"? This action cannot be undone.</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={onClose} variant="secondary">Cancel</Button>
                        <Button onClick={() => onDelete(doc, categoryId)} className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500">Delete</Button>
                    </div>
                </Card>
            </div>
        );
    }

    const inputStyles = "w-full bg-space-dark border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition";

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon /></button>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-6">{mode === 'add' ? 'Upload' : 'Edit'} Document</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Document Name" className={inputStyles} />
                    <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description" className={inputStyles} rows={2}></textarea>
                    
                     <div className="grid grid-cols-2 gap-4">
                        <select name="type" value={formData.type} onChange={handleChange} required className={inputStyles}>
                            <option>PDF</option>
                            <option>DOCX</option>
                            <option>XLSX</option>
                            <option>PNG</option>
                            <option>JPG</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            {mode === 'add' ? 'Upload File' : 'Replace File (Optional)'}
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-brand-green/30 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon />
                                <div className="flex text-sm text-gray-400 justify-center">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-space-light rounded-md font-medium text-brand-green hover:text-brand-green-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-space-light focus-within:ring-brand-green px-1">
                                        <span>Select a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    File must be of type {formData.type}
                                </p>
                            </div>
                        </div>
                         {file && <p className="mt-2 text-sm text-green-400">Selected: {file.name}</p>}
                    </div>
                    
                    {error && <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-md">{error}</p>}
                    {successMessage && <p className="text-sm text-green-400 bg-green-500/10 p-3 rounded-md">{successMessage}</p>}

                    <div className="flex justify-end gap-4 pt-4">
                        <Button onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save Document</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default DocumentModal;
