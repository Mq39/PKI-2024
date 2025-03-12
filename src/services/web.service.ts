import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageModel } from '../models/page.model';
import { FlightModel } from '../models/flight.model';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private static instance: WebService;
  private httpClient: HttpClient;
  private baseUrl: string;

  private constructor() {
    this.httpClient = inject(HttpClient);
    this.baseUrl = 'https://flight.pequla.com/api';
  }

  public static getInstance(): WebService {
    if (WebService.instance == null) {
      WebService.instance = new WebService();
    }

    return WebService.instance;
  }

  public getRecommendedFlights() {
    const url = `${this.baseUrl}/flight?page=0&size=3&type=departure&sort=scheduledAt,desc`;
    return this.httpClient.get<PageModel<FlightModel>>(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public getFlightsByDestination(dest: string) {
    const url = `${this.baseUrl}/flight/destination/${dest}?page=0&size=30=scheduledAt,desc`;
    return this.httpClient.get<PageModel<FlightModel>>(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public getFlightById(id: any) {
    const url = `${this.baseUrl}/flight/${id}`;
    return this.httpClient.get<FlightModel>(url, {
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

  public generateImageUrl(dest: string) {
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpg`;
  }
}
