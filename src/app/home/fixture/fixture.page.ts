import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {
  fixtures: any;
  searchTerm: string;
  filterItems: any;

  constructor(private navController: NavController, private http: HttpClient) {}

  ngOnInit() {
    const json = require('../../../assets/fixtures.json');
    this.fixtures = json.fixtures;
    this.filterItems = this.fixtures;
    /*this.http
      .get(
        'https://cors-anywhere.herokuapp.com/https://cricapi.com/api/matches/?apikey=yJMDk1hYBZYZ92CVYtQzJb65oRq1'
      )
      .subscribe((response) => {
        console.log(response);
      });*/
  }

  filter() {
    if (this.searchTerm && this.searchTerm.trim() !== ' ') {
      this.filterItems = this.fixtures.filter(
        (item) =>
          item.team1
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase().trim()) > -1 ||
          item.team2
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase().trim()) > -1 ||
          item.date
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase().trim()) > -1
      );
    } else {
      this.filterItems = this.fixtures;
    }
  }

  check() {
    alert('hey');
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
