export interface Ledger {
  id: number;
  matchNumber: number;
  teamFor: string;
  teamAgainst: string;
  date: string;
  ratioType: number;
  ratioValue: number;
  amount: number;
  isActive: boolean;
  result: number;
  currency: number;
  resultAmt: number;
}

export interface Stats {
  favouriteTeam: string;
  biggestWin: number;
  biggestLoss: number;
  totalMatches: number;
  winTotal: number;
  lossTotal: number;
  totalAmountPlayed: number;
}
