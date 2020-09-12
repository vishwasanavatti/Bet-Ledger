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

  deleteBet(id: number, i: number): void {
    this.storage.deleteBet(id.toString());
    this.betRecords.splice(i, 1);
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
