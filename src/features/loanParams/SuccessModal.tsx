import { Button, Modal } from '@/shared/ui';
import type { SuccessModalProps } from './types';

export function SuccessModal({
  open,
  firstName,
  lastName,
  amountLabel,
  termDays,
  onClose,
}: SuccessModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabelledBy="application-success-title"
      className="w-full max-w-md"
    >
      <div className="text-center">
        <div
          aria-hidden
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600"
        >
          &#10003;
        </div>
        <h2
          id="application-success-title"
          className="mb-2 text-xl font-semibold text-slate-900"
        >
          Заявка одобрена
        </h2>
        <p className="text-base text-slate-600">
          Поздравляем,{' '}
          <strong className="text-slate-900">{lastName}</strong>{' '}
          <strong className="text-slate-900">{firstName}</strong>.
          <br />
          Вам одобрена{' '}
          <strong className="text-slate-900">{amountLabel}</strong> на{' '}
          <strong className="text-slate-900">{termDays} дней</strong>.
        </p>
        <Button fullWidth onClick={onClose} className="mt-6">
          Отлично
        </Button>
      </div>
    </Modal>
  );
}
