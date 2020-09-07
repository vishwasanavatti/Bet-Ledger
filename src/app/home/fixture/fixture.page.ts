import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {
  fixtures: any;

  constructor(private navController: NavController, private http: HttpClient) {}

  ngOnInit() {
    const json = require('../../../assets/fixtures.json');
    this.fixtures = json.fixtures;
    /*this.http
      .get(
        'https://cors-anywhere.herokuapp.com/https://cricapi.com/api/matches/?apikey=yJMDk1hYBZYZ92CVYtQzJb65oRq1'
      )
      .subscribe((response) => {
        console.log(response);
      });*/
  }

  check() {
    alert('hey');
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
