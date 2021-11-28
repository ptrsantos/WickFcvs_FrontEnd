import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/utils/sessionStorage/import { Injectable } from \'@angular/sessionStorageService';
import { environment } from 'src/environments/environment';
import { InclusaoViewModel } from '../business/model/view-models/inclusaoViewModel';
import { EdicaoViewModel } from '../business/model/view-models/edicaoViewModel';
import { TemaEdicaoViewModel } from '../business/model/view-models/TemaEdicaoViewModel';
import { TemaEdicaoDto } from '../business/model/dtos/temaEdicaoDto';
import { VinculoTituloViewModel } from '../business/model/view-models/vinculoTituloViewModel';
import { TemaDto } from '../business/model/dtos/temaDto';

const headersSemAuth = new HttpHeaders({ 'nao_incluir_token': 'true', 'Content-Type': 'application/json' })
const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends SessionStorageService  {


  constructor(private http: HttpClient) {
    super();
  }


  ListarArtigosEdicoesHistorico(pagina: string, tamanho: string) {
    let params = new HttpParams();
    params = params.set('pagina', pagina);
    params = params.set('tamanho', tamanho);
    return this.http.get<any>(`${environment.ApiControleUrl}/edicoes/ListarArtigosEdicoesHistorico?${params.toString()}`, { headers: headers});
  }


  ListarArtigosEdicoesHistoricoComFiltro(pagina: string, tamanho: string, filtro: string) {
    let params = new HttpParams();
    params = params.set('pagina', pagina);
    params = params.set('tamanho', tamanho);
    params = params.set('filtro', filtro);
    return this.http.get<any>(`${environment.ApiControleUrl}/edicoes/ListarArtigosEdicoesHistoricoComFiltro?${params.toString()}`, { headers: headers});
  }

  salvarDados(inclusaoModel: InclusaoViewModel): Observable<any>{
    //return this.http.post<any>(`${environment.ApiControleUrl}edicoes/SalvarDados/`, inclusaoModel, { headers: headersSemAuth});
    return this.http.post<any>(`${environment.ApiControleUrl}/edicoes/SalvarInclusao/`, inclusaoModel, { headers: headers});
  }

  salvarEdicao(edicaoModel: EdicaoViewModel): Observable<any>{
    try {
       let jsonEdicaoModel = JSON.stringify(edicaoModel)
      //return this.http.post<any>(`${environment.ApiControleUrl}edicoes/SalvarDados/`, inclusaoModel, { headers: headersSemAuth});
      return this.http.post<any>(`${environment.ApiControleUrl}/edicoes/SalvarEdicao/`, edicaoModel, { headers: headers});
    } catch (error) {
      (error)
    }
  }

  salvarEdicaoTema(temaEdicao: TemaEdicaoDto): Observable<TemaEdicaoViewModel>{
    try {
        const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
        (`${environment.ApiControleUrl}/temas/SalvarEdicaoTema`)
        return this.http.post<TemaEdicaoViewModel>(`${environment.ApiControleUrl}/temas/SalvarEdicaoTema`, temaEdicao, { headers: reqHeader});
    } catch (error) {
      (error)
    }
  }

  ExcluirTema(temaId: string): Observable<TemaEdicaoViewModel>{
    try {
        let params = new HttpParams();
        params = params.append('temaId', temaId);
        return this.http.delete<TemaEdicaoViewModel>(`${environment.ApiControleUrl}/temas/ExcluirTema?${params}`, { headers: headers});
    } catch (error) {
      (error)
    }
  }

  ExcluirArtigo(artigoId: any): Observable<TemaEdicaoViewModel> {
    let params = new HttpParams();
    params = params.append('artigoId', artigoId);
    return this.http.delete<TemaEdicaoViewModel>(`${environment.ApiControleUrl}/artigos/ExcluirArtigo?${params}`, { headers: headers});
  }

  retornaArtigoEdicaoHistorico(edicaoId): Observable<any>{
    let params = new HttpParams();
    params = params.set('edicaoId', edicaoId);
    return this.http.get<any>(`${environment.ApiControleUrl}/edicoes/RetornaArtigoEdicaoHistorico?${params}`,  { headers: headers})
  }

  retornaArtigoEdicaoPorId(edicaoId): Observable<any>{
    let params = new HttpParams();
    params = params.set('edicaoId', edicaoId);
    return this.http.get<any>(`${environment.ApiControleUrl}/edicoes/RetornaArtigoEdicaoPorId?${params}`,  { headers: headers})
  }

  retornaArtigoEdicaoPorArtigoId(artigoId): Observable<any>{
    let params = new HttpParams();
    params = params.set('artigoId', artigoId);
    return this.http.get<any>(`${environment.ApiControleUrl}/edicoes/RetornaArtigoEdicaoPorArtigoId?${params}`,  { headers: headers})
  }

  ListarUsuarios(): Observable<any> {
    return this.http.get<any>(`${environment.ApiControleUrl}/Administrador/ListarUsuarios`);
  }

  bloqueio(usuario: any): Observable<any> {
    //let id = usuario.id;
    return this.http.get<any>(`${environment.ApiControleUrl}/Administrador/bloqueio?id=${usuario.id}` );
  }

  alterarPerfil(usuario: any) {
    return this.http.get<any>(`${environment.ApiControleUrl}/Administrador/alterarPerfil?id=${usuario.id}` );
  }

  salvarEdicaoVinculo(vinculoModel: VinculoTituloViewModel) {
    return this.http.post<TemaEdicaoViewModel>(`${environment.ApiControleUrl}/temas/SalvarEdicaoVinculoTema`, vinculoModel, { headers: headers});
  }

}
