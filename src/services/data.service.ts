import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private static instance: DataService;
  private constructor() {}

  public static getInstance(): DataService {
    if (DataService.instance == null) DataService.instance = new DataService();

    return DataService.instance;
  }

  public getAirlines(): string[] {
    return ['Air Serbia', 'Fly Emirates', 'Lufthansa'];
  }

  public getFlightClass(): string[] {
    return ['First class', 'Business', 'Economy'];
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS');
  }

  public getSearchCriteria(): SearchModel {
    if (!localStorage.getItem('search'))
      localStorage.setItem(
        'search',
        JSON.stringify({
          airline: null,
          destination: null,
          flightClass: null,
          isReturn: false,
        })
      );

    return JSON.parse(localStorage.getItem('search')!);
  }

  public saveSearchCriteria(search: SearchModel) {
    localStorage.setItem('search', JSON.stringify(search));
  }
}
