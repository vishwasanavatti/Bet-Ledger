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
      value: 'give',
      displayName: 'give',
    },
    {
      value: 'get',
      displayName: 'get',
    },
  ];
  result = [
    {
      value: 'won',
      displayName: 'won',
    },
    {
      value: 'lost',
      displayName: 'lost',
    },
    {
      value: 'NR',
      displayName: 'No Result',
    },
  ];
  currency = [
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
    this.updateEntry.resultAmt =
      this.updateEntry.amount * this.updateEntry.ratioValue;
  }
}
