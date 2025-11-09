import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-space-light/80 backdrop-blur-sm border border-brand-green/20 p-6 rounded-2xl shadow-lg shadow-black/20 card-glow-container ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;