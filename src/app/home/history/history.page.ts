import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Ledger, teamsMap } from '../../model/bet-form.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  teamMap: any;
  constructor(
    private navController: NavController,
    private storage: StorageService
  ) {
    this.teamMap = teamsMap;
  }

  betRecords: Ledger[];
  betRecordsSize: number;

  ngOnInit() {
    this.storage.getAllBets<Ledger>().then((items) => {
      this.betList(items);
    });
  }

  betList(inp: Array<Ledger>): void {
    this.betRecords = inp.filter(
      (x) => x.isActive === false && x.result && x.result !== ''
    );
    this.betRecordsSize = this.betRecords.length;
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
