import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { T } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class AuthGestorGuard implements CanActivate{

  administrador

  constructor(private router: Router, private authService: AuthService, private spinnerService: NgxSpinnerService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarGestor()
  }


  verificarGestor(){
    debugger
    let usuario = this.authService.sessionStorageObterUsuario();
    let claim = usuario.claims.find((item) => item.type === 'perfil');
    if (claim !== undefined) {
      debugger
      if (claim.value == 'Administrador' || claim.value == 'Gestor') {
        return true;
      }else{
        debugger
        this.router.navigate(['/acesso-negado']);
        this.spinnerService.hide();
        return false;
      }
    }
  }


}
