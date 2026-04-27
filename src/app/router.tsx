import type { ReactElement } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { AddressWorkForm } from '@/features/addressWork/AddressWorkForm';
import { LoanParamsForm } from '@/features/loanParams/LoanParamsForm';
import { PersonalInfoForm } from '@/features/personalInfo/PersonalInfoForm';
import { ROUTES } from '@/shared/constants';
import { useWizard } from '@/shared/useWizard';
import { WizardLayout } from './WizardLayout';

function StepGuard({
  requires,
  children,
}: {
  requires: 1 | 2;
  children: ReactElement;
}) {
  const { completedStep } = useWizard();
  if (completedStep < requires) {
    return <Navigate to={requires === 1 ? ROUTES.step1 : ROUTES.step2} replace />;
  }
  return children;
}

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<WizardLayout />}>
          <Route path={ROUTES.step1} element={<PersonalInfoForm />} />
          <Route
            path={ROUTES.step2}
            element={
              <StepGuard requires={1}>
                <AddressWorkForm />
              </StepGuard>
            }
          />
          <Route
            path={ROUTES.step3}
            element={
              <StepGuard requires={2}>
                <LoanParamsForm />
              </StepGuard>
            }
          />
          <Route path="*" element={<Navigate to={ROUTES.step1} replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
