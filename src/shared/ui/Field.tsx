import { createContext, forwardRef, useContext, useId } from 'react';
import { IMaskInput } from 'react-imask';
import { cn } from '@/shared/lib/cn';
import type {
  FieldContextValue,
  FieldProps,
  InputProps,
  MaskedInputProps,
  SelectProps,
} from './types';

const FieldContext = createContext<FieldContextValue | null>(null);

const useFieldContext = (): FieldContextValue | null => useContext(FieldContext);

const controlBase =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50';

const controlValid =
  'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200/70';

const controlInvalid =
  'border-red-400 focus:border-red-500 focus:ring-red-200/70';

const controlClass = (invalid: boolean): string =>
  cn(controlBase, invalid ? controlInvalid : controlValid);

export function Field({ label, error, hint, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(error);
  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <FieldContext.Provider value={{ id, invalid, describedBy }}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        {children}
        {hint && !error && (
          <span id={hintId} className="text-xs text-slate-500">
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} className="text-xs text-red-600">
            {error}
          </span>
        )}
      </div>
    </FieldContext.Provider>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, 'aria-describedby': describedBy, ...rest }, ref) => {
    const ctx = useFieldContext();
    const invalid = ctx?.invalid ?? false;
    return (
      <input
        ref={ref}
        id={id ?? ctx?.id}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy ?? ctx?.describedBy}
        className={cn(controlClass(invalid), className)}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, 'aria-describedby': describedBy, children, ...rest }, ref) => {
    const ctx = useFieldContext();
    const invalid = ctx?.invalid ?? false;
    return (
      <select
        ref={ref}
        id={id ?? ctx?.id}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy ?? ctx?.describedBy}
        className={cn(controlClass(invalid), className)}
        {...rest}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = 'Select';

export function MaskedInput({
  mask,
  value,
  onAccept,
  onBlur,
  placeholder,
  inputMode,
  type,
  name,
  className,
}: MaskedInputProps) {
  const ctx = useFieldContext();
  const invalid = ctx?.invalid ?? false;
  return (
    <IMaskInput
      id={ctx?.id}
      name={name}
      mask={mask}
      value={value}
      onAccept={(next: string) => onAccept(next)}
      onBlur={onBlur}
      type={type}
      inputMode={inputMode}
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      aria-describedby={ctx?.describedBy}
      className={cn(controlClass(invalid), className)}
    />
  );
}
