import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Ledger } from '../../../model/bet-form.model';

@Component({
  selector: 'app-update-bet-entry',
  templateUrl: './update-bet-entry.component.html',
  styleUrls: ['./update-bet-entry.component.scss'],
})
export class UpdateBetEntryComponent {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ratio = [
    {
      value: 1,
      displayName: 'give',
    },
    {
      value: 2,
      displayName: 'get',
    },
  ];
  result = [
    {
      value: 1,
      displayName: 'won',
    },
    {
      value: 2,
      displayName: 'lost',
    },
    {
      value: 3,
      displayName: 'No Result',
    },
  ];
  currency = [
    {
      value: 1,
      displayName: 'INR',
    },
    {
      value: 2,
      displayName: 'USD',
    },
    {
      value: 3,
      displayName: 'EUR',
    },
  ];

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
    if (this.updateEntry.result && this.updateEntry.result !== null) {
      if (this.updateEntry.result === 3) {
        this.updateEntry.resultAmt = 0;
      } else {
        if (
          (this.updateEntry.ratioType &&
            this.updateEntry.ratioType === 1 &&
            this.updateEntry.result === 1) ||
          (this.updateEntry.ratioType === 2 && this.updateEntry.result === 2)
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
