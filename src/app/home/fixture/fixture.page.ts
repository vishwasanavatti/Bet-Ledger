import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Ledger, currency, teamsMap } from '../../model/bet-form.model';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {
  /**
   * holds the fixtures
   */
  fixtures: any;
  /**
   * holds the value to search in the fixture list
   */
  searchValue: string;
  /**
   * holds the copy of fixtures
   */
  fixturesFilter: any;
  /**
   * holds the mapping of teams to its abbrevation
   */
  teamMap: any;
  /**
   * holds the constant value and display Name of currencies
   */
  currencies: any;
  /**
   * holds the boolean value to load the fixtures
   */
  isPromiseResolved = false;
  /**
   * holds the boolean value to indicate error while loading fixtures
   */
  isError = false;
  /**
   * holds the initial value of each bet data
   */
  betData: Ledger = {
    id: null,
    matchNumber: null,
    team1: '',
    team2: '',
    chosenTeam: '',
    date: '',
    ratio: null,
    amount: null,
    isActive: false,
    result: '',
    currency: '',
    resultAmt: null,
  };

  constructor(
    private navController: NavController,
    private http: HttpClient,
    private storage: StorageService,
    private toastController: ToastController
  ) {
    this.currencies = currency;
    this.teamMap = teamsMap;
  }
  /**
   * In this method an API is called to fetch the IPL fixtures and a method is called to filter.
   * currently cricapi is used to fetch fixtures of IPL 2020 (can be changed in future based on the tournament)
   */
  ngOnInit() {
    this.http
      .get(
        'https://cors-anywhere.herokuapp.com/https://cricapi.com/api/matches/?apikey=yJMDk1hYBZYZ92CVYtQzJb65oRq1'
      )
      .subscribe(
        (response) => {
          this.setFixture(response);
        },
        (error) => {
          this.isError = true;
          this.setFixture(error);
        }
      );
  }
  /**
   * In this method fixtures are filtered and assigned.
   * Else statement added to fetch fixture from local incase api throws error
   */
  setFixture(inp: any): void {
    this.isPromiseResolved = true;
    if (!this.isError && inp.matches.length > 0) {
      this.fixtures = inp.matches.filter((x) => x.type === 'Twenty20');
    } else {
      const localFixtures = require('../../../assets/fixtures.json');
      this.fixtures = localFixtures.fixtures;
    }
    this.fixturesFilter = this.fixtures;
  }
  /**
   * In this method fixtures are filtered based on search value.
   */
  search(): void {
    if (this.searchValue && this.searchValue.trim() !== ' ') {
      this.fixturesFilter = this.fixtures.filter(
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
      this.fixturesFilter = this.fixtures;
    }
  }

  /**
   * In this method previously set betData is reset and content is expanded or closed.
   */
  expand(data: any): void {
    this.betData = {
      id: null,
      matchNumber: null,
      team1: '',
      team2: '',
      chosenTeam: '',
      date: '',
      ratio: null,
      amount: null,
      isActive: false,
      result: '',
      currency: '',
      resultAmt: null,
    };

    if (data.expanded) {
      data.expanded = false;
    } else {
      this.fixturesFilter.map((item) => {
        if (item === data) {
          item.expanded = !item.expanded;
        } else {
          item.expanded = false;
        }
      });
    }
  }
  /**
   * In this method date is taken as input and is split to remove time and returned to just display date
   */
  getDate(data: any): string {
    return data.split('T')[0];
  }
  /**
   * In this method bet data taken as input and is stored in local storage
   */
  addBet(data: any, i: number): void {
    this.betData.isActive = true;
    this.betData.date = data.date.split('T')[0];
    this.betData.matchNumber = i + 1;
    this.betData.team1 = data['team-1'];
    this.betData.team2 = data['team-2'];

    this.storage.getNextId().then((key) => {
      this.betData.id = key;
      this.storage.addBet(this.betData.id.toString(), this.betData);
      this.betPlaceAlert();
      this.expand(data);
    });
  }
  /**
   * In this method a alert shown after the bet is placed.
   */
  async betPlaceAlert(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'bet added successfully',
      color: 'success',
      position: 'bottom',
      duration: 1000,
    });
    toast.present();
  }
  /**
   * this method navigates back to home
   */
  goBack() {
    this.navController.navigateRoot('/home');
  }
}
