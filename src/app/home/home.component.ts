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
import { WebService } from '../../services/web.service';

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
  private service: WebService;
  public recommended: FlightModel[] = [];
  public destinations: string[] = [];
  public airlines: string[] = ['Air Serbia', 'Fly Emirates', 'Lufthansa'];
  public flightClasses: string[] = ['First class', 'Business', 'Economy'];

  constructor(private client: HttpClient) {
    this.service = new WebService(client);
  }

  ngOnInit(): void {
    this.service.getRecommendedFlghts().subscribe((rsp) => (this.recommended = rsp.content));
    this.service.getAvailableDestinations().subscribe((rsp) => (this.destinations = rsp));
  }

  public generateImageUrl(dest: string) {
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpg`;
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS');
  }
}
