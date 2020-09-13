/**
 * @description
 *  This file handles all the CRUD operations related to ionic storage
 *  This file is referenced from Digitact project
 */
import { Injectable } from '@angular/core';
import {
  createInstance,
  defineDriver,
  INDEXEDDB,
  LOCALSTORAGE,
} from 'localforage';
import { _driver } from 'localforage-cordovasqlitedriver';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  betLedgerDB: Promise<LocalForage>;

  constructor() {
    const betLedgerDBConfig = {
      name: 'betLedgerDB',
      storeName: 'betRecords',
      driverOrder: ['sqlite', 'indexeddb', 'localstorage'],
    };

    this.betLedgerDB = new Promise((resolve, reject) => {
      let db: LocalForage;
      defineDriver(CordovaSQLiteDriver)
        .then(() => {
          db = createInstance(betLedgerDBConfig);
        })
        .then(() =>
          db.setDriver(this.getDriverOrder(betLedgerDBConfig.driverOrder))
        )
        .then(() => {
          resolve(db);
        })
        .catch((reason) => reject(reason));
    });
  }

  /**
   * Used to get the corresponding storage method keyword used by localforage
   * @param driveOrder - Holds the prioritised driver order array
   * @returns array of strings with corresponding keyword supported by localforage
   */

  getDriverOrder(driverOrder: string[]): string[] {
    return driverOrder.map((driver) => {
      switch (driver) {
        case 'sqlite':
          return _driver;
        case 'indexeddb':
          return INDEXEDDB;
        case 'localstorage':
          return LOCALSTORAGE;
      }
    });
  }

  /**
   * Used to generate next Id
   * @returns Promise of number containing next id
   */

  async getNextId(): Promise<number> {
    return await new Promise((resolve, reject) => {
      this.betLedgerDB
        .then((localForageObject) => {
          localForageObject.getItem('betid').then((val: number) => {
            const nextId: number = val ? val + 1 : 1;
            localForageObject.setItem('betid', nextId);
            resolve(nextId);
          });
        })
        .catch((reason) => reject(reason));
    });
  }

  /**
   * Used to create and add an item in the storage
   * @param key Unique key for the item
   * @param value Conatains the betData
   * @returns Promise of data object
   */
  async addBet<T>(key: string, value: T): Promise<T> {
    return await new Promise((resolve, reject) => {
      this.betLedgerDB
        .then((localForageObject) => {
          localForageObject.setItem(key, value).then((storedValue: T) => {
            resolve(storedValue);
          });
        })
        .catch((reason) => reject(reason));
    });
  }

  /**
   * Used to get an item from the storage
   * @param key Unique key for the item
   * @returns Promise of data object
   */
  async getBet<T>(key: string): Promise<T> {
    return await new Promise((resolve, reject) => {
      this.betLedgerDB
        .then((localForageObject) => {
          localForageObject.getItem(key).then((storedValue: T) => {
            resolve(storedValue);
          });
        })
        .catch((reason) => reject(reason));
    });
  }

  /**
   * Used to get all items from the storage
   * @returns Promise of array of data object
   */
  async getAllBets<T>(): Promise<Array<T>> {
    const items: Array<T> = [];
    return await new Promise((resolve, reject) => {
      this.betLedgerDB
        .then((localForageObject) => {
          localForageObject
            .iterate((storedValue: T) => {
              items.push(storedValue);
            })
            .then(() => {
              resolve(items);
            });
        })
        .catch((reason) => reject(reason));
    });
  }

  /**
   * Used to delete an item from the storage
   * @param key Unique key for the item
   * @returns Promise of void
   */
  async deleteBet(key: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      this.betLedgerDB
        .then((localForageObject) => {
          const item = localForageObject.getItem(key);
          if (!item) {
            resolve();
          }
          localForageObject.removeItem(key).then(() => {
            resolve();
          });
        })
        .catch((reason) => reject(reason));
    });
  }

  /**
   * Used to delete all items in the storage
   * @returns Promise of void
   */
  async deleteAllBets(): Promise<void> {
    return await this.betLedgerDB.then((localForageObject) => {
      localForageObject.clear();
    });
  }

  /**
   * Used to update an existing item in the storage
   * @param key Unique key for the item
   * @param value Conatains data to update
   * @returns Promise of data object
   */
  async updateBet<T>(key: string, value: T): Promise<T> {
    return await new Promise((resolve, reject) => {
      this.betLedgerDB
        .then((localForageObject) => {
          const item = localForageObject.getItem(key);
          if (!item) {
            resolve(undefined);
          }
          localForageObject.setItem(key, value).then(() => {
            resolve(value);
          });
        })
        .catch((reason) => reject(reason));
    });
  }
}
