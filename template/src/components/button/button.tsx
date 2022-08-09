import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface ButtonProps {
  type?: 'primary' | 'default';
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, children }) => {
  return (
    <button type="button" className={classNames('btn', className, `btn-${type}`)}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
