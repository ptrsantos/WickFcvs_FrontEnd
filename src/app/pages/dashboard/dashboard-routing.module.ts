import { ViewArtigoResolve } from './services/view-artigo.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewArtigoComponent } from './business/view-artigo/view-artigo.component';
import { ViewIncluirArtigoComponent } from './business/view-incluir-artigo/view-incluir-artigo.component';
import { ViewEditarArtigoComponent } from './business/view-editar-artigo/view-editar-artigo.component';
import { ViewHistoricoComponent } from './business/view-historico/view-historico.component';
import { ViewHomeComponent } from './business/view-home/view-home.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ViewEditarArtigoResolve } from './services/view-editar-artigo.resolve';

import { AdministrarAcessoComponent } from './business/administrativo/administrar-acesso/administrar-acesso.component';
import { AdministrarConteudoComponent } from './business/administrativo/administrar-conteudo/administrar-conteudo.component';
import { AdministrarEstatisticaComponent } from './business/administrativo/administrar-estatistica/administrar-estatistica.component';
import { EdicaoVinculoComponent } from './business/administrativo/administrar-conteudo/edicao-vinculo/edicao-vinculo.component';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';
import { ViewHistoricoDetalheEdicaoComponent } from './business/view-historico-detalhe-edicao/view-historico-detalhe-edicao.component';
import { AuthGestorGuard } from 'src/app/shared/core/auth-gestor-guard';
import { AuthAdminGuard } from 'src/app/shared/core/auth-admin-guard';




const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        pathMatch: 'full',
        component: ViewHomeComponent
      },
      {
        path: 'artigo/:id',
        component: ViewArtigoComponent,
        resolve: {
          artigoEdicaoDto: ViewArtigoResolve
        },
        pathMatch: 'full'
      },
      {
        path: 'incluir-artigo',
        pathMatch: 'full',
        component: ViewIncluirArtigoComponent
      },
      {
        path: 'editar-artigo/:id',
        pathMatch: 'full',
        component: ViewEditarArtigoComponent,
        resolve: {
          artigoEdicaoDto: ViewEditarArtigoResolve
        }
      },

      {
        path: 'historico',
        pathMatch: 'full',
        component: ViewHistoricoComponent
      },
      {
        path: 'historico-detalhe-edicao/:id',
        pathMatch: 'full',
        component: ViewHistoricoDetalheEdicaoComponent
      },
      {
        path: 'administrar-acessos',
        pathMatch: 'full',
        canActivate: [AuthAdminGuard],
        component: AdministrarAcessoComponent
      },
      {
        path: 'administrar-conteudo',
        pathMatch: 'full',
        canActivate: [AuthGestorGuard],
        component: AdministrarConteudoComponent
      },
      {
        path: 'administrar-estatistica',
        pathMatch: 'full',
        canActivate: [AuthGestorGuard],
        component: AdministrarEstatisticaComponent
      },
      {
        path: 'editar-vinculo/:id',
        pathMatch: 'full',
        canActivate: [AuthGestorGuard],
        component: EdicaoVinculoComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
