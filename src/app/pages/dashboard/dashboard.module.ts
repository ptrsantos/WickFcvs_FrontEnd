import { ViewEditarArtigoComponent } from './business/view-editar-artigo/view-editar-artigo.component';
import { NgModule/*, CUSTOM_ELEMENTS_SCHEMA*/ } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderCardComponent } from './header-card/header-cards.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtigoComponent } from './business/artigo/artigo.component';
import { CkeditorComponent } from './business/ckeditor/ckeditor.component';
import { TemaComponent } from './business/tema/tema.component';
import { ViewArtigoComponent } from './business/view-artigo/view-artigo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalErroIncluirArtigoDialog, ViewIncluirArtigoComponent } from './business/view-incluir-artigo/view-incluir-artigo.component';
import { ViewHistoricoComponent } from './business/view-historico/view-historico.component';
import { ModalHistoricoComponent, ModalHistoricoComponentDialog } from './business/modal-historico/modal-historico.component';
import { ViewHomeComponent } from './business/view-home/view-home.component';
import { ModalHistoricoAlteracaoComponent, ModalHistoricoAlteracaoDialogComponent } from './business/modal-historico-alteracao/modal-historico-alteracao.component';
import { MaterialModule } from 'src/app/utils/angular-material/material.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ViewArtigoResolve } from './services/view-artigo.resolve';
import { DashboardService } from './services/dashboard.service';
import { ViewEditarArtigoResolve } from './services/view-editar-artigo.resolve';


import { AdministrarAcessoComponent } from './business/administrativo/administrar-acesso/administrar-acesso.component';
import { AdministrarConteudoComponent } from './business/administrativo/administrar-conteudo/administrar-conteudo.component';
import { AdministrarEstatisticaComponent } from './business/administrativo/administrar-estatistica/administrar-estatistica.component';
import { AlertaExclusaoDialog, ExclusaoNegadaDialog, ExclusaoPaginaIncialNegadaDialog, TabelaListaTemasComponent } from './business/administrativo/administrar-conteudo/tabela-lista-temas/tabela-lista-temas.component';
import { GraficoBarrasComponent } from './business/administrativo/administrar-estatistica/grafico-barras/grafico-barras.component';
import { DataChartService } from './services/data-chart.service';
import { GraficoLinhasComponent } from './business/administrativo/administrar-estatistica/grafico-linhas/grafico-linhas.component';
import { EdicaoTemaComponent } from './business/administrativo/administrar-conteudo/edicao-tema-titulo/edicao-tema.component';
import { ModalEdicaoTituloComponent, ModalEdicaoTituloDialogComponent } from './business/administrativo/administrar-conteudo/modal-edicao-titulo/modal-edicao-titulo.component';
import { EdicaoTemaModalDialogComponent } from './business/administrativo/administrar-conteudo/edicao-tema-titulo/edicao-tema-dialog/edicao-tema-modal-dialog.component';
import { EdicaoVinculoComponent } from './business/administrativo/administrar-conteudo/edicao-vinculo/edicao-vinculo.component';

import { ChartsModule } from 'ng2-charts';
import { TabelaListaTemasEdicaoComponent } from './business/administrativo/administrar-conteudo/tabela-lista-temas-edicao/tabela-lista-temas-edicao.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewHistoricoDetalheEdicaoComponent } from './business/view-historico-detalhe-edicao/view-historico-detalhe-edicao.component';

import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule } from 'ngx-loading-x';

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
    DashboardRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ChartsModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig),
    ],
  declarations: [
    DashboardHomeComponent,
    HeaderCardComponent,
    ViewIncluirArtigoComponent,
    CkeditorComponent,
    TemaComponent,
    ArtigoComponent,
    ViewArtigoComponent,
    ViewEditarArtigoComponent,
    ViewHistoricoComponent,
    ModalHistoricoComponent,
    ModalHistoricoComponentDialog,
    ViewHomeComponent,
    ModalHistoricoAlteracaoComponent,
    ModalHistoricoAlteracaoDialogComponent,
    AdministrarAcessoComponent,
    AdministrarConteudoComponent,
    AdministrarEstatisticaComponent,
    TabelaListaTemasComponent,
    ModalEdicaoTituloComponent,
    ModalEdicaoTituloDialogComponent,
    GraficoLinhasComponent,
    GraficoBarrasComponent,
    EdicaoTemaComponent,
    EdicaoTemaModalDialogComponent,
    EdicaoVinculoComponent,
    TabelaListaTemasEdicaoComponent,
    AlertaExclusaoDialog,
    ExclusaoPaginaIncialNegadaDialog,
    ExclusaoNegadaDialog,
    ViewHistoricoDetalheEdicaoComponent,
    ModalErroIncluirArtigoDialog
  ],
  exports: [
    DashboardHomeComponent,
    HeaderCardComponent,
    ViewIncluirArtigoComponent,
    CkeditorComponent,
    TemaComponent,
    ArtigoComponent,
    ViewArtigoComponent,
    ViewEditarArtigoComponent,
    ViewHistoricoComponent,
    ModalHistoricoComponent,
    ViewHomeComponent,
    ModalHistoricoAlteracaoComponent,
    MaterialModule

  ],
  providers: [
    DashboardService,
    ViewArtigoResolve,
    ViewEditarArtigoResolve,
    DataChartService
  ],
  entryComponents: [
    EdicaoTemaModalDialogComponent,
    AlertaExclusaoDialog,
    ExclusaoPaginaIncialNegadaDialog,
    ExclusaoNegadaDialog,
    ModalErroIncluirArtigoDialog
  ]
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class DashboardModule {}
