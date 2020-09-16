import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Ledger, currency, result } from '../../../model/bet-form.model';

@Component({
  selector: 'app-update-bet-entry',
  templateUrl: './update-bet-entry.component.html',
  styleUrls: ['./update-bet-entry.component.scss'],
})
export class UpdateBetEntryComponent {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.currencies = currency;
    this.results = result;
  }
  /**
   * holds the constant value and display Name of currencies
   */
  currencies: any;
  /**
   * holds the result
   */
  results: any;
  /**
   * Input taken from the update bet page
   */
  @Input() updateEntry: Ledger;
  /**
   * In this method 'canSaveData' is set a boolean value to decide whether to update or cancel
   */
  cancel(): void {
    this.modalController.dismiss({
      canSaveData: false,
    });
  }
  /**
   * In this method 'canSaveData' is set a boolean value to decide whether to update or cancel
   */
  save(): void {
    this.modalController.dismiss({
      canSaveData: true,
    });
  }
  /**
   * In this method an alert is displayed to confirm the update of data
   */
  async update(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Save?',
      message: 'The data will be saved and cannot be modified later.',
      cssClass: 'custom-alert-button-colors',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },

        {
          text: 'Save',
          cssClass: 'color-secondary',
          handler: () => this.save(),
        },
      ],
    });
    await alert.present();
  }

  /**
   * In this method amount is calculated based on ratio type, value and currency
   */
  amoutUpdate(): void {
    if (this.updateEntry.result && this.updateEntry.result !== '') {
      if (this.updateEntry.result === 'nr') {
        this.updateEntry.resultAmt = 0.0;
      } else {
      }
      this.updateEntry.resultAmt =
        Math.round(this.updateEntry.resultAmt * 100) / 100;
    }
  }
}
