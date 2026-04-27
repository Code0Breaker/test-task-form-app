export type Gender = 'male' | 'female';

export type Draft = {
  phone: string;
  firstName: string;
  lastName: string;
  gender: Gender | '';
  workplace: string;
  address: string;
  amount: number;
  term: number;
};

export type CompletedStep = 0 | 1 | 2 | 3;

export type WizardContext = {
  draft: Draft;
  completedStep: CompletedStep;
  patch: (partial: Partial<Draft>, completed?: 1 | 2 | 3) => void;
  reset: () => void;
};
