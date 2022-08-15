import React from 'react';

export interface ButtonProps {
  type?: 'primary' | 'default';
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, children }) => {
  return (
    <button type="button" className={`btn btn-${type} ${className}`}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
