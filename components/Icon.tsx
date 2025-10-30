import * as LucideIcons from 'lucide-react';
import React from 'react';

type IconProps = {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'var(--color-primary)', className }) => {
  const LucideIcon = LucideIcons[name] ?? LucideIcons.Circle;
  return <LucideIcon size={size} color={color} className={className} aria-hidden="true" />;
};

export default Icon;
