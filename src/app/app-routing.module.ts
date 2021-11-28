import { InjectionToken, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { AuthGuard } from './shared/core/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { UsuarioSemAutenticacaoComponent } from './shared/usuario-sem-autenticacao/usuario-sem-autenticacao.component';

const routes: Routes = [
  {
    path: 'wiki', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],

  },
  {
    path: 'acesso-negado',
    component: AcessoNegadoComponent
  },
  {
    path: 'usuario-sem-autenticacao',
    component: UsuarioSemAutenticacaoComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
