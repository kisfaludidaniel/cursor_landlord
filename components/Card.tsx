import React from 'react';
import clsx from 'clsx';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  role?: string;
  'aria-labelledby'?: string;
};

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <section
    className={clsx(
      'bg-surface rounded-xl shadow-md p-6 sm:p-8 border border-brand/10',
      className,
    )}
    {...props}
  >
    {children}
  </section>
);

export default Card;
