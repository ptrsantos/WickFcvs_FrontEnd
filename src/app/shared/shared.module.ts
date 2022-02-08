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
import { SpinnerComponent } from './core/spinner/spinner.component';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';
import { SpinnerService } from './core/spinner/spinner.service';

const ngxLoadingXConfig: NgxLoadingXConfig = {
  show: false,
  bgBlur: 2,
  bgColor: 'rgba(40, 40, 40, 0.5)',
  bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.threeStrings,
  spinnerSize: 120,
  spinnerColor: '#dd0031',
  spinnerPosition: POSITION.centerCenter,
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    MatCardModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
  ],
  declarations: [
    RouterTabs,
    RouterTab,
    PageNotFoundComponent,
    UsuarioSemAutenticacaoComponent,
    AcessoNegadoComponent,
    SpinnerComponent
  ],
  exports: [
    RouterTabs,
    RouterTab,
    PageNotFoundComponent,
    UsuarioSemAutenticacaoComponent,
    AcessoNegadoComponent,
    SpinnerComponent
  ],
  providers:[SpinnerService]
})
export class SharedModule {}
