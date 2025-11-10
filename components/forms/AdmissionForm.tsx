// components/forms/AdmissionForm.tsx
import React, { useState } from 'react';
import SubmissionSuccess from '../common/SubmissionSuccess';

interface AdmissionFormProps {
    setIsSubmitted: (isSubmitted: boolean) => void;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ setIsSubmitted }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        dateOfBirth: '',
        grade: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission, e.g., send to an API
        console.log('Form data submitted:', formData);
        setIsSubmitted(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="studentName" placeholder="Student's Full Name" onChange={handleChange} required className="p-3 border rounded-lg" />
                <input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} required className="p-3 border rounded-lg" />
                <select name="grade" onChange={handleChange} required className="p-3 border rounded-lg">
                    <option value="">Select Grade</option>
                    <option value="Nursery 1">Nursery 1</option>
                    <option value="Nursery 2">Nursery 2</option>
                    <option value="Primary 1">Primary 1</option>
                    <option value="Primary 2">Primary 2</option>
                    <option value="Primary 3">Primary 3</option>
                    <option value="Primary 4">Primary 4</option>
                    <option value="Primary 5">Primary 5</option>
                    <option value="Primary 6">Primary 6</option>
                </select>
                <input type="text" name="parentName" placeholder="Parent's Full Name" onChange={handleChange} required className="p-3 border rounded-lg" />
                <input type="email" name="parentEmail" placeholder="Parent's Email" onChange={handleChange} required className="p-3 border rounded-lg" />
                <input type="tel" name="parentPhone" placeholder="Parent's Phone Number" onChange={handleChange} required className="p-3 border rounded-lg" />
            </div>
            <div className="text-center mt-6">
                <button type="submit" className="bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-green-dark transition-transform duration-300 transform hover:scale-105">
                    Submit Application
                </button>
            </div>
        </form>
    );
};

export default AdmissionForm;
