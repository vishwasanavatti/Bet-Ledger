import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private navController: NavController) {}
  /**
   * These methods are to navigate to the corresponding page
   */
  goToFixture() {
    this.navController.navigateForward(['./home/fixture']);
  }

  goToUpdate() {
    this.navController.navigateForward(['./home/update-bet']);
  }

  goToHistory() {
    this.navController.navigateForward(['./home/history']);
  }

  openStats() {
    this.navController.navigateForward(['./home/stats']);
  }
}
