import { useCallback, useEffect, useRef, type MouseEvent } from 'react';
import { cn } from '@/shared/lib/cn';
import type { ModalProps } from './types';

export function Modal({
  open,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  className,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onClick={handleBackdropClick}
      className={cn(
        'rounded-2xl border-0 bg-white p-0 shadow-xl',
        'backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm',
        className,
      )}
    >
      <div className="p-8">{children}</div>
    </dialog>
  );
}
