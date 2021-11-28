import { Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { DashboardService } from "../../pages/dashboard/services/dashboard.service";



@Injectable()
export class LoadGuard implements CanLoad {

  administrador: boolean = true;

  constructor(private dashboardService: DashboardService, private router: Router, private spinnerService: NgxSpinnerService){
    this.verificaAdministrador()
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.verificaAdministrador()
  }

  verificaAdministrador(){
    let usuario = this.dashboardService.sessionStorageObterUsuario();
    let claim = usuario.claims.find((item) => item.type === 'perfil');
    if (claim !== undefined) {
      if (claim.value == 'Administrador') {
        return true;
      }else{
        this.router.navigate(['/acesso-negado']);
        this.spinnerService.hide();
        return false;
      }
    }
  }

}
