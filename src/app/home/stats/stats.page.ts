import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import {
  Ledger,
  currency,
  convertInr,
  convertEUR,
  convertUSD,
} from '../../model/bet-form.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  /**
   * holds the constant value and display Name of currencies
   */
  currencies: any;
  /**
   * holds the value of currency
   */
  currencySelected: string;
  /**
   * holds the conversion value of respective currecies
   */
  conversionInr: any;
  conversionEur: any;
  conversionUsd: any;
  /**
   * These variables holds the stats value
   */
  biggestWin: number;
  biggestWinTeam: string;
  biggestLoss: number;
  biggestLossTeam: string;
  totalBets: number;
  winTotal: number;
  lossTotal: number;
  totalAmountPlayed: number;
  wonMatches: number;
  lostMatches: number;
  mostProfitableTeam: string;
  leastProfitableTeam: string;
  mostProfitableTeamTotal: number;
  leastProfitableTeamTotal: number;

  constructor(
    private navController: NavController,
    private storage: StorageService
  ) {
    this.currencies = currency;
    this.conversionInr = convertInr;
    this.conversionEur = convertEUR;
    this.conversionUsd = convertUSD;
    this.currencySelected = 'EUR';
  }
  /**
   * In this method all bets are fetched from local storage
   */
  ngOnInit() {
    this.fetchDataForStats();
  }
  /**
   * In this method bet data are fetched from storage and
   * data is sent as input for stats calculation
   */
  fetchDataForStats() {
    this.storage
      .getAllBets<Ledger>()
      .then((betRecords) => this.statsCalculation(betRecords));
  }
  /**
   * In this method stats are calculated
   */
  statsCalculation(val: Ledger[]): void {
    const bets = val.filter((x) => x.result && x.result !== '');
    const finalizedBets = [];
    for (const x of bets) {
      if (x.currency === 'INR' && x.currency !== this.currencySelected) {
        x.amount *= this.conversionInr[this.currencySelected];
        x.resultAmt *= this.conversionInr[this.currencySelected];
      } else if (x.currency === 'EUR' && x.currency !== this.currencySelected) {
        x.amount *= this.conversionEur[this.currencySelected];
        x.resultAmt *= this.conversionEur[this.currencySelected];
      } else if (x.currency === 'USD' && x.currency !== this.currencySelected) {
        x.amount *= this.conversionUsd[this.currencySelected];
        x.resultAmt *= this.conversionUsd[this.currencySelected];
      }
      finalizedBets.push(x);
    }
    const wonBets = finalizedBets.filter((x) => x.result === 'won');
    const lostBets = finalizedBets.filter((x) => x.result === 'lost');
    this.wonMatches = wonBets.length;
    this.lostMatches = lostBets.length;
    let teamList: Set<string>;
    teamList = new Set(finalizedBets.map((x) => x.chosenTeam));
    let teamTotals: Array<number> = [];

    this.totalBets = finalizedBets.length;

    this.totalAmountPlayed = finalizedBets
      .map((x) => x.amount)
      .reduce((a, b) => a + b, 0);

    this.winTotal = wonBets.map((x) => x.resultAmt).reduce((a, b) => a + b, 0);

    this.lossTotal = lostBets
      .map((x) => x.resultAmt)
      .reduce((a, b) => a + b, 0);

    for (const team of teamList) {
      teamTotals.push(
        wonBets
          .filter((x) => x.chosenTeam === team)
          .map((x) => x.resultAmt)
          .reduce((a, b) => a + b, 0)
      );
    }

    if (teamTotals.some((x) => x > 0)) {
      this.biggestWinTeam = [...teamList][
        teamTotals.indexOf(Math.max(...teamTotals))
      ];
    }

    teamTotals = [];

    for (const team of teamList) {
      teamTotals.push(
        lostBets
          .filter((x) => x.chosenTeam === team)
          .map((x) => x.resultAmt)
          .reduce((a, b) => a + b, 0)
      );
    }

    if (teamTotals.some((x) => x > 0)) {
      this.biggestLossTeam = [...teamList][
        teamTotals.indexOf(Math.max(...teamTotals))
      ];
    }

    teamTotals = [];

    this.biggestWin = wonBets
      .map((x) => x.resultAmt)
      .reduce((a, b) => (a > b ? a : b), 0);

    this.biggestLoss = lostBets
      .map((x) => x.resultAmt)
      .reduce((a, b) => (a > b ? a : b), 0);

    for (const team of teamList) {
      teamTotals.push(
        wonBets
          .filter((x) => x.chosenTeam === team)
          .map((x) => x.resultAmt)
          .reduce((a, b) => a + b, 0) -
          lostBets
            .filter((x) => x.chosenTeam === team)
            .map((x) => x.resultAmt)
            .reduce((a, b) => a + b, 0)
      );
    }

    this.mostProfitableTeam = [...teamList][
      teamTotals.indexOf(Math.max(...teamTotals))
    ];

    this.mostProfitableTeamTotal =
      teamTotals.length > 0 ? Math.max(...teamTotals) : 0;

    this.leastProfitableTeam = [...teamList][
      teamTotals.indexOf(Math.min(...teamTotals))
    ];

    this.leastProfitableTeamTotal =
      teamTotals.length > 0 ? Math.min(...teamTotals) : 0;
  }
  /**
   * this method navigates back to home
   */
  goBack(): void {
    this.navController.navigateRoot('/home');
  }
}
