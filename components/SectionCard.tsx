import React from 'react';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className || ''}`}>
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default SectionCard;
