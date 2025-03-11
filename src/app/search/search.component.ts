import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlightModel } from '../../models/flight.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-search',
  imports: [
    HttpClientModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    NgIf,
    MatButton,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatSortModule,
    RouterLink,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterViewInit {
  public webService: WebService;
  public dataService: DataService;
  public destinations: string[] = [];
  public airlines: string[] = [];
  public flightClass: string[] = [];

  public sDestination: string | null = null;
  public sAirline: string | null = null;
  public sFlightClass: string | null = null;
  public sIsReturn: string | null = null;
  public _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private route: ActivatedRoute) {
    this.webService = new WebService();
    this.dataService = new DataService();
  }

  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      (this.sDestination = params['destination']), (this.sAirline = params['airline']);
      this.sFlightClass = params['flightClass'];
      this.sIsReturn = params['return'];
    });

    this.webService.getAvailableDestinations().subscribe((rsp) => (this.destinations = rsp));
    this.airlines = this.dataService.getAirlines();
    this.flightClass = this.dataService.getFlightClass();
  }

  public doSearch() {
    if (this.sDestination == null) {
      // @ts-ignore
      Swal.fire({
        title: 'Something went wrong',
        text: 'You must select a destination first',
        icon: 'error',
        confirmButtonText: 'I understand',
      });
      return;
    }
    this.webService.getFlightsByDestination(this.sDestination!).subscribe((rsp) => {
      this.dataSource = new MatTableDataSource<FlightModel>(rsp.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }
}
