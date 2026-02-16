import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'elevated' | 'flat';
type CardSize = 'sm' | 'md' | 'lg';

type CardProps = {
  variant?: CardVariant;
  size?: CardSize;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<CardVariant, string> = {
  default: 'border border-neutral-200 bg-white shadow-sm',
  elevated: 'border border-neutral-200 bg-white shadow-sm hover:shadow-md',
  flat: 'border border-neutral-200 bg-white',
};

const sizeStyles: Record<CardSize, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ variant = 'default', size = 'md', className, children }: CardProps) {
  return <div className={cn('rounded-lg', variantStyles[variant], sizeStyles[size], className)}>{children}</div>;
}
