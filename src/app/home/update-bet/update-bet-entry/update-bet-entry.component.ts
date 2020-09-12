import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Ledger, ratio, currency, result } from '../../../model/bet-form.model';

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
    this.ratType = ratio;
    this.currencies = currency;
    this.results = result;
  }

  ratType: any;
  currencies: any;
  results: any;

  @Input() updateEntry: Ledger;

  cancel(): void {
    this.modalController.dismiss({
      canSubmitData: false,
    });
  }

  save(): void {
    this.modalController.dismiss({
      canSubmitData: true,
    });
  }

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

  amoutUpdate(): void {
    if (this.updateEntry.result && this.updateEntry.result !== '') {
      if (this.updateEntry.result === 'nr') {
        this.updateEntry.resultAmt = 0;
      } else {
        if (
          (this.updateEntry.ratioType &&
            this.updateEntry.ratioType === 'give' &&
            this.updateEntry.result === 'won') ||
          (this.updateEntry.ratioType === 'get' &&
            this.updateEntry.result === 'lost')
        ) {
          this.updateEntry.resultAmt = this.updateEntry.amount;
        } else {
          this.updateEntry.resultAmt =
            this.updateEntry.amount * this.updateEntry.ratioValue;
        }
      }
    }
  }
}
