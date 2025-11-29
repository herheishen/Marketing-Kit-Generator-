import React from 'react';

interface AlertProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'info', className }) => {
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-800';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
  }

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-md ${className || ''}`} role="alert">
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Alert;
