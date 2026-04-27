import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LOAN_AMOUNT, LOAN_TERM } from '@/shared/constants';
import type {
  CompletedStep,
  Draft,
  WizardContext,
} from '@/shared/types';

const initialDraft: Draft = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: '',
  workplace: '',
  address: '',
  amount: LOAN_AMOUNT.default,
  term: LOAN_TERM.default,
};

export function WizardLayout() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [completedStep, setCompletedStep] = useState<CompletedStep>(0);

  const patch = useCallback<WizardContext['patch']>((partial, completed) => {
    setDraft((current) => ({ ...current, ...partial }));
    if (completed !== undefined) {
      setCompletedStep((current) =>
        (Math.max(current, completed) as CompletedStep),
      );
    }
  }, []);

  const reset = useCallback(() => {
    setDraft(initialDraft);
    setCompletedStep(0);
  }, []);

  const context: WizardContext = { draft, completedStep, patch, reset };

  return <Outlet context={context} />;
}
