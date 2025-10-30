import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'accent' | 'plain';
type Size = 'md' | 'sm' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'a';
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const variantStyles: Record<Variant, string> = {
  primary: 'bg-brand text-brand-contrast hover:bg-accent focus-visible:outline-accent',
  accent: 'bg-accent text-brand-contrast hover:bg-brand focus-visible:outline-brand',
  plain: 'bg-transparent text-brand hover:bg-surface',
};
const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-10 py-3 text-lg',
};

// Button or Anchor
export const Button: React.FC<ButtonProps> = ({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const classes = clsx(
    'rounded-full font-semibold shadow focus-visible:ring-2 focus-visible:ring-offset-2 transition',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
  if (as === 'a' && href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
