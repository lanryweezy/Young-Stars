// components/common/SubmissionSuccess.tsx
import React from 'react';
import { schoolName } from '../../data/schoolData';

interface SubmissionSuccessProps {
    message: string;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ message }) => {
    return (
        <div className="bg-brand-green/10 border-l-4 border-brand-green text-brand-green p-4" role="alert">
            <p className="font-bold">Success!</p>
            <p>{message}</p>
        </div>
    );
};


export const applicationSuccessMessage = (
    <div className="prose prose-lg text-brand-cream-dark">
        <h2 className='text-brand-blue'>Application Submitted Successfully!</h2>
        <p>
            Thank you for your interest in lanrystars. We have received your application and our admissions team will be in touch with you shortly regarding the next steps.
        </p>
        <p>
            In the meantime, feel free to <a href="/gallery">explore our gallery</a> to see what life is like at our school or <a href="/contact">contact us</a> if you have any immediate questions.
        </p>
    </div>
)


export default SubmissionSuccess;
