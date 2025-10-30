import React from 'react';
import clsx from 'clsx';
import Icon from './Icon';

type BadgeProps = {
  color?: 'primary' | 'accent' | 'muted';
  icon?: string;
  className?: string;
  children: React.ReactNode;
};

const colorClass = {
  primary: 'bg-brand text-brand-contrast',
  accent: 'bg-accent text-brand-contrast',
  muted: 'bg-muted text-brand-contrast',
};

export const Badge: React.FC<BadgeProps> = ({ color = 'primary', icon, className, children }) => (
  <span className={clsx(
    'inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-xs uppercase shadow-sm',
    colorClass[color],
    className,
  )}>
    {icon && <Icon name={icon as any} size={16} />}
    {children}
  </span>
);

export default Badge;
