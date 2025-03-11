import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightModel } from '../../models/flight.model';
import { WebService } from '../../services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flight',
  imports: [HttpClientModule, NgIf, MatCardModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css',
})
export class FlightComponent {
  public flight: FlightModel | undefined;
  public webService: WebService;

  constructor(private route: ActivatedRoute) {
    this.webService = new WebService();
    route.params.subscribe((params) => {
      this.webService.getFlightById(params['id']).subscribe((rsp) => {
        this.flight = rsp;
      });
    });
  }
}
