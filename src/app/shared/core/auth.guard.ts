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
export class AuthGuard implements CanActivate{

  administrador

  constructor(private router: Router, private authService: AuthService, private spinnerService: NgxSpinnerService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.VerificaUsuarioAutenticado()
  }


  VerificaUsuarioAutenticado(){
    let token =  this.authService.sessionStorageObterTokenUsuario()
    if (this.authService.sessionStorageObterTokenUsuario()) {
      return true;
    }
    this.router.navigate(['/wiki']).then();
    return false;
  }


}
