
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-orbitron font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-space-dark transition-all duration-300 transform hover:-translate-y-1 shadow-lg button-glow-effect';

  const variantStyles = {
    primary: 'bg-gradient-to-br from-brand-green to-brand-green-light text-space-dark hover:shadow-brand-green/40 focus:ring-brand-green-light',
    secondary: 'bg-transparent text-brand-green border-2 border-brand-green hover:bg-brand-green hover:text-space-dark focus:ring-brand-green',
  };

  const sizeStyles = {
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;