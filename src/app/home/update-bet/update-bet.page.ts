import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Ledger } from '../../model/bet-form.model';

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
    private storage: StorageService
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

  updateBet(data, i): void {}

  deleteBet(i): void {}

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
