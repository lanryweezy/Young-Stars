import React from 'react';
import Card from './Card';
import CheckmarkIcon from '../icons/CheckmarkIcon';

const SubmissionSuccess: React.FC = () => {
  return (
    <Card className="p-8 text-center flex flex-col items-center justify-center min-h-[500px] animate-fade-in-up">
      <div className="mb-4">
        <CheckmarkIcon />
      </div>
      <h3 className="font-orbitron text-2xl font-bold text-white mb-2">Application Submitted!</h3>
      <p className="text-gray-400 max-w-sm">
        Thank you for your interest in Young Stars International School. We have received your application and our admissions team will be in touch with you shortly regarding the next steps.
      </p>
    </Card>
  );
};

export default SubmissionSuccess;