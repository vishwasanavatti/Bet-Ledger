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
  searchValue: string;
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

  search() {
    if (this.searchValue && this.searchValue.trim() !== ' ') {
      this.filterItems = this.fixtures.filter(
        (item) =>
          item.team1
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1 ||
          item.team2
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1 ||
          item.date
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1
      );
    } else {
      this.filterItems = this.fixtures;
    }
  }

  expand(data): void {
    if (data.expanded) {
      data.expanded = false;
    } else {
      this.filterItems.map((item) => {
        if (item === data) {
          item.expanded = !item.expanded;
        } else {
          item.expanded = false;
        }
      });
    }
  }

  addBet() {
    alert('hey');
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
