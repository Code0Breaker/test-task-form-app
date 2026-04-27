import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LOAN_AMOUNT, LOAN_TERM, ROUTES } from '@/shared/constants';
import { formatCurrency } from '@/shared/format';
import { useWizard } from '@/shared/useWizard';
import { Button, StepShell } from '@/shared/ui';
import { SuccessModal } from './SuccessModal';
import { useSubmitApplication } from './useSubmitApplication';
import { loanParamsSchema, type LoanParamsValues } from './schema';

const rangeClass =
  'h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600';

export function LoanParamsForm() {
  const navigate = useNavigate();
  const { draft, patch, reset } = useWizard();
  const { submit, loading, error } = useSubmitApplication();
  const [showModal, setShowModal] = useState(false);

  const { control, handleSubmit, watch } = useForm<LoanParamsValues>({
    resolver: zodResolver(loanParamsSchema),
    defaultValues: {
      amount: draft.amount,
      term: draft.term,
    },
  });

  const amount = watch('amount');
  const term = watch('term');

  const onSubmit = handleSubmit(async (values) => {
    patch(values, 3);
    try {
      await submit({
        firstName: draft.firstName,
        lastName: draft.lastName,
      });
      setShowModal(true);
    } catch {
      // Error state surfaces via the inline alert below.
    }
  });

  const handleClose = () => {
    setShowModal(false);
    reset();
    navigate(ROUTES.step1);
  };

  return (
    <StepShell
      step={3}
      total={3}
      title="Параметры займа"
      subtitle="Выберите комфортные условия"
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        {error && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            Не удалось отправить заявку. Попробуйте ещё раз.
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Сумма займа
            </span>
            <span className="text-lg font-semibold text-indigo-600">
              {formatCurrency(amount)}
            </span>
          </div>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min={LOAN_AMOUNT.min}
                max={LOAN_AMOUNT.max}
                step={LOAN_AMOUNT.step}
                value={field.value}
                onChange={(event) => field.onChange(Number(event.target.value))}
                className={rangeClass}
              />
            )}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{formatCurrency(LOAN_AMOUNT.min)}</span>
            <span>{formatCurrency(LOAN_AMOUNT.max)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Срок займа
            </span>
            <span className="text-lg font-semibold text-indigo-600">
              {term} дн.
            </span>
          </div>
          <Controller
            name="term"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min={LOAN_TERM.min}
                max={LOAN_TERM.max}
                step={LOAN_TERM.step}
                value={field.value}
                onChange={(event) => field.onChange(Number(event.target.value))}
                className={rangeClass}
              />
            )}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{LOAN_TERM.min} дн.</span>
            <span>{LOAN_TERM.max} дн.</span>
          </div>
        </div>

        <div className="mt-2 flex gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.step2)}
            disabled={loading}
            className="flex-1"
          >
            Назад
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Отправка...' : 'Подать заявку'}
          </Button>
        </div>
      </form>

      <SuccessModal
        open={showModal}
        firstName={draft.firstName}
        lastName={draft.lastName}
        amountLabel={formatCurrency(amount)}
        termDays={term}
        onClose={handleClose}
      />
    </StepShell>
  );
}
