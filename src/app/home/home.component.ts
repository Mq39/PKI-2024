import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, JsonpClientBackend } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { PageModel } from '../../models/page.model';
import { FlightModel } from '../../models/flight.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor,
    RouterLink,
    MatListModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class HomeComponent {
  public recommended: FlightModel[] = [];
  public destinations: string[] = ['Zagreb', 'Memmingen', 'Vienna'];
  public airlines: string[] = ['Air Serbia', 'Fly Emirates', 'Lufthansa'];
  public flightClasses: string[] = ['First class', 'Business', 'Economy'];

  constructor(client: HttpClient) {
    const url = 'https://flight.pequla.com/api/flight?page=0&size=3&type=departure&sort=scheduledAt,desc';
    client
      .get<PageModel<FlightModel>>(url, {
        headers: {
          Accept: 'application/json',
        },
      })
      .subscribe((rsp) => (this.recommended = rsp.content));
  }

  public generateImageUrl(dest: string) {
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpg`;
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS');
  }
}
