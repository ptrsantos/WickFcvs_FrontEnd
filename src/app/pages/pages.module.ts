import { MaterialModule } from './../utils/angular-material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './page-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MenuListItemComponent } from './layout/menu-list-item/menu-list-item.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [
    LayoutComponent,
    TopNavComponent,
    SideNavComponent,
    MenuListItemComponent
  ],
  declarations: [
    LayoutComponent,
    TopNavComponent,
    SideNavComponent,
    MenuListItemComponent,

  ]
})
export class PagesModule {}
