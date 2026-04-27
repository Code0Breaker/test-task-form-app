import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';
import type { ButtonProps, ButtonVariant } from './types';

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium transition disabled:cursor-not-allowed disabled:opacity-60';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseClass, variantClass[variant], fullWidth && 'w-full', className)}
      {...rest}
    />
  ),
);

Button.displayName = 'Button';
