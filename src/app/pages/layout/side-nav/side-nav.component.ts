import { NavItem } from './../model/navItem';
import { TemaArtigoDto } from './../../dashboard/business/model/dtos/temaArtigo';
import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { childRoutes } from '../../child-routes';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],

})

export class SideNavComponent implements OnInit {

  @Input() sideNavNavItens: NavItem[]

  constructor(@Inject(AppComponent) private appComponent: AppComponent) {
  }

  ngOnInit() {
    //(this.sideNavNavItens)
    // this.listaTemas = this.appComponent.listaTemas.map(item => {
    //   return Object.assign({}, new Tema(), item)
    // })

 }

}
