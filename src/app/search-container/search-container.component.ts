import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, input, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [MatCardModule, NgIf, NgFor, RouterLink, MatSelectModule, MatButtonModule, HttpClientModule],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css',
})
export class SearchContainerComponent {
  @Input() destinations: string[] | undefined;
  @Input() airlines: string[] | undefined;
  @Input() flightClass: string[] | undefined;
  @Input() defaultDestination: string | null = null;
  @Input() defaultAirline: string | null = null;
  @Input() defaultFlightClass: string | null = null;
  @Input() defaultReturn: string | null = null;
}
