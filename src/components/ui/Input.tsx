'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: InputProps): React.ReactElement {
  return (
    <label className="block text-sm text-neutral-700">
      {label ? <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</span> : null}
      <input
        className={cn(
          'w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200',
          error && 'border-error text-error',
          className,
        )}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-error">{error}</span> : null}
    </label>
  );
}
