import { z } from 'zod';
import { LOAN_AMOUNT, LOAN_TERM } from '@/shared/constants';

export const loanParamsSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Укажите сумму' })
    .min(LOAN_AMOUNT.min, `Минимальная сумма $${LOAN_AMOUNT.min}`)
    .max(LOAN_AMOUNT.max, `Максимальная сумма $${LOAN_AMOUNT.max}`),
  term: z
    .number({ invalid_type_error: 'Укажите срок' })
    .min(LOAN_TERM.min, `Минимальный срок ${LOAN_TERM.min} дней`)
    .max(LOAN_TERM.max, `Максимальный срок ${LOAN_TERM.max} дней`),
});

export type LoanParamsValues = z.infer<typeof loanParamsSchema>;
