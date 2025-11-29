import React from 'react';

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

const Pill: React.FC<PillProps> = ({ children, className }) => {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
        bg-gray-100 text-gray-800
        ${className || ''}
      `}
    >
      {children}
    </span>
  );
};

export default Pill;
