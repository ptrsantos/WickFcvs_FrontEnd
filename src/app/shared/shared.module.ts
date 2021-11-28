import { MaterialModule } from 'src/app/utils/angular-material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterTabs } from './router-tab/router-tabs.directive';
import { RouterTab } from './router-tab/router-tab.directive';
import { UsuarioSemAutenticacaoComponent } from './usuario-sem-autenticacao/usuario-sem-autenticacao.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    FlexLayoutModule,
    MaterialModule,
    MatCardModule,

  ],
  declarations: [
    RouterTabs, 
    RouterTab,
    PageNotFoundComponent, 
    UsuarioSemAutenticacaoComponent, 
    AcessoNegadoComponent
  ],
  exports: [
    RouterTabs,
    RouterTab,
    PageNotFoundComponent, 
    UsuarioSemAutenticacaoComponent, 
    AcessoNegadoComponent
  ]
})
export class SharedModule {}
