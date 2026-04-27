export const API_BASE_URL = 'https://dummyjson.com';

export const PHONE_MASK = '0000 000 000';
export const PHONE_PLACEHOLDER = '0XXX XXX XXX';

export const LOAN_AMOUNT = {
  min: 200,
  max: 1000,
  step: 100,
  default: 200,
} as const;

export const LOAN_TERM = {
  min: 10,
  max: 30,
  step: 1,
  default: 10,
} as const;

export const ROUTES = {
  step1: '/step-1',
  step2: '/step-2',
  step3: '/step-3',
} as const;
