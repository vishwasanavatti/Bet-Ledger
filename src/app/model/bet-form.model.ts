export interface Ledger {
  id: number;
  matchNumber: number;
  team1: string;
  team2: string;
  chosenTeam: string;
  date: string;
  ratio: number;
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

export const teamsMap = {
  'Mumbai Indians': 'MI',
  'Chennai Super Kings': 'CSK',
  'Delhi Capitals': 'DC',
  'Kings XI Punjab': 'KXIP',
  'Sunrisers Hyderabad': 'SRH',
  'Royal Challengers Bangalore': 'RCB',
  'Kolkata Knight Riders': 'KKR',
  'Rajasthan Royals': 'RR',
};

export const convertInr = {
  EUR: 0.0114,
  USD: 0.0136,
};

export const convertUSD = {
  INR: 73.46,
  EUR: 0.844,
};

export const convertEUR = {
  INR: 87.01,
  USD: 1.184,
};
