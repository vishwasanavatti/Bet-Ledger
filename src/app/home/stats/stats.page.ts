import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  constructor(private navController: NavController) {}

  ngOnInit() {}
  goBack() {
    this.navController.navigateRoot('/home');
  }
}
