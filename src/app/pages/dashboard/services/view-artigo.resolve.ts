import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { debounce } from "rxjs/operators";
import { ArtigoEdicaoDto } from "../business/model/dtos/artigoEdicaoDto";
import { DashboardService } from "./dashboard.service";

@Injectable()
export class ViewArtigoResolve implements Resolve<ArtigoEdicaoDto>{

    constructor(private dashboardService: DashboardService, private activatedRoute: ActivatedRoute ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // let artigo = this.dashboardService.retornaArtigoEdicaoPorArtigoId(route.params.id);
        // console
        return this.dashboardService.retornaArtigoEdicaoPorArtigoId(route.params.id);
    }



}
