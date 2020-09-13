import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Ledger, teamsMap, conversionRate } from '../../model/bet-form.model';
import { ModalController } from '@ionic/angular';
import { UpdateBetEntryComponent } from './update-bet-entry/update-bet-entry.component';

@Component({
  selector: 'app-update-bet',
  templateUrl: './update-bet.page.html',
  styleUrls: ['./update-bet.page.scss'],
})
export class UpdateBetPage implements OnInit {
  /**
   * Holds the array of active bets of type Ledger
   */
  activeBets: Ledger[];
  /**
   * Holds the size of active bets
   */
  activeBetsSize: number;
  /**
   * holds the mapping of teams to its abbrevation
   */
  teamMap: any;

  constructor(
    private navController: NavController,
    private storage: StorageService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.teamMap = teamsMap;
  }
  /**
   * In this method all bets are fetched from local storage
   */
  ngOnInit() {
    this.storage.getAllBets<Ledger>().then((data) => {
      this.activeBetsList(data);
    });
  }
  /**
   * In this method all the active bets are filtered
   */
  activeBetsList(inp: Array<Ledger>): void {
    this.activeBets = inp.filter((x) => x.isActive === true);
    this.activeBetsSize = this.activeBets.length;
  }
  /**
   * In this method a modal is opened to update the bet
   */
  async updateBet(data: any, i: number) {
    const modal = await this.modalController.create({
      component: UpdateBetEntryComponent,
      cssClass: 'modal-css',
      componentProps: {
        updateEntry: data,
      },
    });
    /**
     * In this method the bet is updated and stored in local storage
     */
    modal.onDidDismiss().then((val) => {
      if (val.data && val.data.canSaveData) {
        if (data.result && data.result !== '' && data.resultAmt !== '') {
          data.isActive = false;
          this.activeBets.splice(i, 1);
        }
        data = this.currencyConvertor(data);
        this.storage.updateBet(data.id.toString(), data);
      } else {
        window.location.reload();
      }
    });
    return await modal.present();
  }
  /**
   * In this method a bet is deleted from the storage
   */
  deleteBet(id: number, i: number): void {
    this.storage.deleteBet(id.toString());
    this.activeBets.splice(i, 1);
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
   * In this method the conversion of amount to euro takes place
   */
  currencyConvertor(val: any): any {
    if (val.currency === 'INR') {
      val.resultAmt = Number(
        (val.resultAmt / conversionRate.eurToInr).toFixed(2)
      );
    } else if (val.currency === 'USD') {
      val.resultAmt = Number(
        (val.resultAmt / conversionRate.eurToUsd).toFixed(2)
      );
    }
    return val;
  }
  /**
   * this method navigates back to home
   */
  goBack() {
    this.navController.navigateRoot('/home');
  }
}
