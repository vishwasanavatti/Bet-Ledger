import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Ledger } from '../../model/bet-form.model';
import { ModalController } from '@ionic/angular';
import { UpdateBetEntryComponent } from './update-bet-entry/update-bet-entry.component';

@Component({
  selector: 'app-update-bet',
  templateUrl: './update-bet.page.html',
  styleUrls: ['./update-bet.page.scss'],
})
export class UpdateBetPage implements OnInit {
  activeBets: Ledger[];
  activeBetsSize: number;

  constructor(
    private navController: NavController,
    private storage: StorageService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.storage.getAllBets<Ledger>().then((data) => {
      this.activeBetsList(data);
    });
  }

  activeBetsList(inp: Array<Ledger>): void {
    this.activeBets = inp.filter((x) => x.isActive === true);
    this.activeBetsSize = this.activeBets.length;
  }

  async updateBet(data: any, i: number) {
    const modal = await this.modalController.create({
      component: UpdateBetEntryComponent,
      cssClass: 'modal-css',
      componentProps: {
        updateEntry: data,
      },
    });

    modal.onDidDismiss().then((val) => {
      if (val.data && val.data.canSubmitData) {
        if (data.result && data.result !== '') {
          data.isActive = false;
          this.activeBets.splice(i, 1);
        }
        this.storage.updateBet(data.id.toString(), data);
      } else {
        window.location.reload();
      }
    });
    return await modal.present();
  }

  deleteBet(id: number, i: number): void {
    this.storage.deleteBet(id.toString());
    this.activeBets.splice(i, 1);
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

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
