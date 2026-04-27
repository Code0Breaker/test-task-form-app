import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export type FieldContextValue = {
  id: string;
  invalid: boolean;
  describedBy?: string;
};

export type FieldProps = {
  label: ReactNode;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export type MaskedInputProps = {
  mask: string;
  value: string;
  onAccept: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  inputMode?: InputProps['inputMode'];
  type?: string;
  className?: string;
  name?: string;
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  children: ReactNode;
};

export type StepShellProps = {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
};
