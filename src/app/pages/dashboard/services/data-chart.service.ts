import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataChartService {

  constructor(private http: HttpClient) { }

  lisatarDadosEstatisticos(): Observable<any>{
    let response = this.http.get<any>(`${environment.ApiControleUrl}/Estatisticas/ListarDadosEstitisticos`)
    // .pipe(
    //   // map(this.extractData),
    //   // catchError(this.serviceError)
    // )
    return response;
  }

}
