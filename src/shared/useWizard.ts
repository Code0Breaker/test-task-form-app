import { useOutletContext } from 'react-router-dom';
import type { WizardContext } from './types';

export const useWizard = (): WizardContext => useOutletContext<WizardContext>();
