import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { ArtigoEdicaoDto } from '../business/model/dtos/artigoEdicaoDto';
import { AppComponent } from 'src/app/app.component';

interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  exibirHeaderCard: boolean = true;


  constructor(private route: ActivatedRoute, @Inject(AppComponent) private appComponent: AppComponent,) { }

  ngOnInit() {
  }
}
