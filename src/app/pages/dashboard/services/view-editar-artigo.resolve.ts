import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { debounce } from "rxjs/operators";
import { AppComponent } from "src/app/app.component";
import { CkeditorComponent } from "../business/ckeditor/ckeditor.component";
import { ArtigoEdicaoDto } from "../business/model/dtos/artigoEdicaoDto";
import { DashboardService } from "./dashboard.service";

@Injectable()
export class ViewEditarArtigoResolve implements Resolve<ArtigoEdicaoDto>{

    constructor(
                private dashboardService: DashboardService,
                private activatedRoute: ActivatedRoute){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dashboardService.retornaArtigoEdicaoPorArtigoId(route.params.id);
    }



}
