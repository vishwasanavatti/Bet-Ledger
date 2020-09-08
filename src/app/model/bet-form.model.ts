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
}
