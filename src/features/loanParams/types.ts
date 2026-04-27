export type SuccessModalProps = {
  open: boolean;
  firstName: string;
  lastName: string;
  amountLabel: string;
  termDays: number;
  onClose: () => void;
};

export type SubmitArgs = {
  firstName: string;
  lastName: string;
};

export type SubmitResponse = {
  id: number;
  title: string;
};
