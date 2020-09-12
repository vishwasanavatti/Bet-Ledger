import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Ledger, currency, ratio, teamsMap } from '../../model/bet-form.model';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {
  fixtures: any;
  searchValue: string;
  filterItems: any;

  // bad coding fix later
  rat: number;
  amt: number;

  teamMap: any;
  currencies: any;
  ratType: any;

  constructor(
    private navController: NavController,
    private http: HttpClient,
    private storage: StorageService,
    private toastController: ToastController
  ) {
    this.currencies = currency;
    this.ratType = ratio;
    this.teamMap = teamsMap;
  }

  betData: Ledger = {
    id: null,
    matchNumber: null,
    team1: '',
    team2: '',
    chosenTeam: '',
    date: '',
    ratioType: '',
    ratioValue: null,
    amount: null,
    isActive: false,
    result: '',
    currency: '',
    resultAmt: null,
  };

  ngOnInit() {
    const json = require('../../../assets/fixtures.json');
    // this.fixtures = json.fixtures;
    // this.filterItems = this.fixtures;
    this.http
      .get(
        'https://cors-anywhere.herokuapp.com/https://cricapi.com/api/matches/?apikey=yJMDk1hYBZYZ92CVYtQzJb65oRq1'
      )
      .subscribe((response) => {
        this.setFixture(response);
      });
  }

  setFixture(data: any): void {
    this.fixtures = data.matches.filter((x) => x.type === 'Twenty20');
    this.filterItems = this.fixtures;
  }

  search(): void {
    if (this.searchValue && this.searchValue.trim() !== ' ') {
      this.filterItems = this.fixtures.filter(
        (item) =>
          item['team-1']
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1 ||
          item['team-2']
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1 ||
          item.date
            .split('T')[0]
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase().trim()) > -1
      );
    } else {
      this.filterItems = this.fixtures;
    }
  }

  expand(data: any): void {
    this.betData = {
      id: null,
      matchNumber: null,
      team1: '',
      team2: '',
      chosenTeam: '',
      date: '',
      ratioType: '',
      ratioValue: null,
      amount: null,
      isActive: false,
      result: '',
      currency: '',
      resultAmt: null,
    };
    this.rat = null;
    this.amt = null;

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

  getDate(data: any): string {
    return data.date.split('T')[0];
  }

  addBet(data: any, i: number): void {
    this.betData.isActive = true;
    this.betData.date = data.date.split('T')[0];
    this.betData.matchNumber = i + 1;
    this.betData.ratioValue = this.rat;
    this.betData.amount = this.amt;
    this.betData.team1 = data['team-1'];
    this.betData.team2 = data['team-2'];

    this.storage.getNextId().then((key) => {
      this.betData.id = key;
      this.storage.addBet(this.betData.id.toString(), this.betData);
      this.betPlaceAlert();
    });
  }

  async betPlaceAlert(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'bet added successfully',
      color: 'success',
      position: 'bottom',
      duration: 1000,
    });
    toast.present();
  }

  goBack() {
    this.navController.navigateRoot('/home');
  }
}
