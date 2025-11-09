import React from 'react';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/2348063731163"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space-dark focus:ring-green-400"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="w-9 h-9" />
    </a>
  );
};

export default WhatsAppButton;
