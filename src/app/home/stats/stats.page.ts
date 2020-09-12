import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Ledger, currency, conversionRate } from '../../model/bet-form.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  currencies: any;
  currencySelected: string;
  conversionValue: number;

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
  favouriteTeam: string;
  worstTeam: string;
  favouriteTeamTotal: number;
  worstTeamTotal: number;

  constructor(
    private navController: NavController,
    private storage: StorageService
  ) {
    this.currencies = currency;
    this.conversionValue = 1;
  }

  ngOnInit() {
    this.storage
      .getAllBets<Ledger>()
      .then((betRecords) => this.statsCalculation(betRecords));
  }

  statsCalculation(val: Ledger[]): void {
    const finalizedBets = val.filter((x) => x.result && x.result !== '');
    const wonBets = finalizedBets.filter((x) => x.result === 'won');
    const lostBets = finalizedBets.filter((x) => x.result === 'lost');
    this.wonMatches = wonBets.length;
    this.lostMatches = lostBets.length;
    let teamList: Set<string>;
    teamList = new Set(finalizedBets.map((x) => x.chosenTeam));
    let teamTotals: Array<number> = [];

    this.totalBets = finalizedBets.length;
    this.totalAmountPlayed = finalizedBets
      .map((x) => x.resultAmt)
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

    this.biggestWinTeam = [...teamList][
      teamTotals.indexOf(Math.max(...teamTotals))
    ];

    teamTotals = [];

    for (const team of teamList) {
      teamTotals.push(
        lostBets
          .filter((x) => x.chosenTeam === team)
          .map((x) => x.resultAmt)
          .reduce((a, b) => a + b, 0)
      );
    }

    this.biggestLossTeam = [...teamList][
      teamTotals.indexOf(Math.max(...teamTotals))
    ];

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

    this.favouriteTeam = [...teamList][
      teamTotals.indexOf(Math.max(...teamTotals))
    ];

    this.favouriteTeamTotal =
      teamTotals.length > 0 ? Math.max(...teamTotals) : 0;

    this.worstTeam = [...teamList][teamTotals.indexOf(Math.min(...teamTotals))];

    this.worstTeamTotal = teamTotals.length > 0 ? Math.min(...teamTotals) : 0;
  }

  currencyValUpdate(): void {
    if (this.currencySelected === 'INR') {
      this.conversionValue = conversionRate.eurToInr;
    } else if (this.currencySelected === 'USD') {
      this.conversionValue = conversionRate.eurToUsd;
    } else {
      this.conversionValue = 1;
    }
  }

  goBack(): void {
    this.navController.navigateRoot('/home');
  }
}
