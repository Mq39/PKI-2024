import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageModel } from '../models/page.model';
import { FlightModel } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private httpClient: HttpClient;
  private baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.httpClient = httpclient;
    this.baseUrl = 'https://flight.pequla.com/api';
  }

  public getRecommendedFlghts() {
    const url = `${this.baseUrl}/flight?page=0&size=3&type=departure&sort=scheduledAt,desc`;
    return this.httpClient.get<PageModel<FlightModel>>(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public getAvailableDestinations() {
    const url = `${this.baseUrl}/flight/destination?type=departure`;
    return this.httpClient.get<string[]>(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
