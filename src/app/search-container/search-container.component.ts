import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, input, Input, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [MatCardModule, NgIf, NgFor, MatSelectModule, MatButtonModule, HttpClientModule],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css',
})
export class SearchContainerComponent {
  @Input() destinations: string[] | undefined;
  @Input() airlines: string[] | undefined;
  @Input() flightClass: string[] | undefined;
  public sDestination: string | null = null;
  public sAirline: string | null = null;
  public sFlightClass: string | null = null;
  public sReturn: string | null = null;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  public onChange() {}

  public doSearch() {
    if (this.router.url != '/search') {
      this.router.navigate(['/search'], { relativeTo: this.activeRoute });
    }
  }
}
