
import React, { useEffect, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 4500); // Start fade out before removal
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(onClose, 300); // Match duration of fade-out animation
  };

  const isSuccess = type === 'success';
  const baseClasses = 'relative w-full p-4 rounded-xl shadow-2xl flex items-start gap-3 transition-all duration-300 transform';
  const animationClasses = isFadingOut ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0';
  const typeClasses = isSuccess
    ? 'bg-brand-green/90 backdrop-blur-sm border border-brand-green-light/50 text-space-dark'
    : 'bg-red-600/90 backdrop-blur-sm border border-red-400/50 text-white';

  const Icon = () => (
    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isSuccess ? 'bg-white/30' : 'bg-white/30'}`}>
        {isSuccess ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
    </div>
  );

  return (
    <div className={`${baseClasses} ${typeClasses} ${animationClasses}`}>
      <Icon />
      <p className="font-semibold text-sm flex-grow">{message}</p>
      <button onClick={handleClose} className="p-1 -mt-1 -mr-1">
        <CloseIcon />
      </button>
    </div>
  );
};

export default Toast;
