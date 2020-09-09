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
