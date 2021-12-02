import { DexieService } from './../../../utils/dexieService/dexieService';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { Component, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { NavItem } from '../nav-item';
import { Router } from '@angular/router';
import { NavService } from '../nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ArtigoEdicaoDto } from '../../dashboard/business/model/dtos/artigoEdicaoDto';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  erros: Array<any> = []

  constructor(public navService: NavService,
    public route: Router,
    private dashboardService: DashboardService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private dexieService: DexieService,
    @Inject(AppComponent) private appComponent: AppComponent,) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    (this.appComponent)
  }

  onItemSelected(item: NavItem) {

    if (item.children && item.children.length) {
        this.expanded = !this.expanded;
    }

    if (!item.children || !item.children.length) {

         this.navService.checkNav();

      let endereco = item.id === undefined ? item.route : (item.route + "/" + item.id.toString())

      if(endereco == '/wiki'){
        endereco = "/page-not-found"
      }
      this.navegarParaPagina(endereco);

    }

  }

  navegarParaPagina(endereco: string) {

    this.route
      .routeReuseStrategy
      .shouldReuseRoute = function () {
        return false;
      };

    this.route
      .navigateByUrl(endereco)
      .then(
        (worked) => {

        },
        (error) => {
         }
      );

  }

  OnDestroy(){
    this.spinnerService.show();
  }

}
