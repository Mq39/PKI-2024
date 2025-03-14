import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FlightModel } from '../../models/flight.model';
import { WebService } from '../../services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../safe.pipe';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-flight',
  imports: [HttpClientModule, NgIf, MatCardModule, MatButtonModule, SafePipe, MatListModule, RouterLink],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css',
})
export class FlightComponent {
  public flight: FlightModel | undefined;
  public webService: WebService;
  public dataService: DataService;

  constructor(private route: ActivatedRoute) {
    this.webService = WebService.getInstance();
    this.dataService = DataService.getInstance();
    route.params.subscribe((params) => {
      this.webService.getFlightById(params['id']).subscribe((rsp) => {
        this.flight = rsp;
      });
    });
  }

  public generateMapLink() {
    return 'https://www.google.com/maps?output=embed&q=' + this.flight?.destination;
  }
}
