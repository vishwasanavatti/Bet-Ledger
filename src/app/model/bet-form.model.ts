export interface Ledger {
  id: number;
  matchNumber: number;
  teamFor: string;
  teamAgainst: string;
  date: string;
  ratioType: string;
  ratioValue: number;
  amount: number;
  isActive: boolean;
  result: string;
  currency: string;
  resultAmt: number;
}

export const currency = [
  {
    value: 'INR',
    displayName: 'INR',
  },
  {
    value: 'USD',
    displayName: 'USD',
  },
  {
    value: 'EUR',
    displayName: 'EUR',
  },
];

export const ratio = [
  {
    value: 'give',
    displayName: 'Give',
  },
  {
    value: 'get',
    displayName: 'Get',
  },
];

export const result = [
  {
    value: 'won',
    displayName: 'Won',
  },
  {
    value: 'lost',
    displayName: 'Lost',
  },
  {
    value: 'nr',
    displayName: 'No Result',
  },
];
