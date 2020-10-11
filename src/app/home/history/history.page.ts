import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
    private storage: StorageService,
    private alertController: AlertController
  ) {
    this.teamMap = teamsMap;
  }
  /**
   * Holds the array of completed bets of type Ledger
   */
  betRecords: Ledger[];
  /**
   * holds the copy of fixtures
   */
  betFilters: Ledger[];
  /**
   * Holds the size of completed bets
   */
  betRecordsSize: number;
  /**
   * holds the value to search in the fixture list
   */
  searchValue: string;
  /**
   * In this method all bets are fetched from local storage
   */
  ngOnInit() {
    this.storage.getAllBets<Ledger>().then((items) => {
      this.betList(items);
    });
  }
  /**
   * In this method all the completed bets are filtered
   */
  betList(inp: Array<Ledger>): void {
    this.betFilters = inp.filter(
      (x) => x.isActive === false && x.result && x.result !== ''
    );
    this.betRecordsSize = this.betFilters.length;
    this.betRecords = this.betFilters;
  }
  /**
   * In this method an alert is displayed to confirm the deletion of bet
   */
  async delete(id: number, i: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Bet?',
      message: 'This will permanently delete from storage.',
      cssClass: 'custom-alert-button-colors',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },

        {
          text: 'Delete',
          cssClass: 'color-secondary',
          handler: () => this.deleteBet(id, i),
        },
      ],
    });
    await alert.present();
  }
  /**
   * In this method a bet is deleted from the storage
   */
  deleteBet(id: number, i: number): void {
    this.storage.deleteBet(id.toString());
    this.betRecords.splice(i, 1);
  }
  /**
   * this method navigates back to home
   */
  goBack() {
    this.navController.navigateRoot('/home');
  }
  /**
   * In this method fixtures are filtered based on search value.
   */
  search(): void {
    if (this.searchValue && this.searchValue.trim() !== ' ') {
      this.betRecords = this.betFilters.filter(
        (item) =>
          item.team1
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1 ||
          item.team2
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1 ||
          item.date
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1
      );
    } else {
      this.betRecords = this.betFilters;
    }
  }
}
