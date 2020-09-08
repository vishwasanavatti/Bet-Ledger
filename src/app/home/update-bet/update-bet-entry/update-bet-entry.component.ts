import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ledger } from '../../../model/bet-form.model';

@Component({
  selector: 'app-update-bet-entry',
  templateUrl: './update-bet-entry.component.html',
  styleUrls: ['./update-bet-entry.component.scss'],
})
export class UpdateBetEntryComponent {
  constructor(private modalController: ModalController) {}

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
}
