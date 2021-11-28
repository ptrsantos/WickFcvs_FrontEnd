import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from '../utils/sessionStorage/import { Injectable } from \'@angular/sessionStorageService';
import { Usuario } from '../pages/dashboard/business/model/entities/usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService extends SessionStorageService{

  constructor(private http: HttpClient) {
    super();
  }

  cadastrarRegistro(usuario: Usuario): Observable<Usuario> {
    let response = this.http.post<Usuario>(`${environment.ApiControleUrl}/auth/register`, usuario)
      .pipe(
        // map(this.extractData),
        // catchError(this.serviceError)
      )
    return response;
  }

  cadastrarLogin(usuario: Usuario){
    let response = this.http.post<Usuario>(`${environment.ApiControleUrl}/auth/login`, usuario)
    .pipe(
      // map(this.extractData),
      // catchError(this.serviceError)
    )
  return response;
  }

  sigInGoogle(usuario: SocialUser):  Observable<SocialUser>{
    let response =  this.http.post<SocialUser>(`${environment.ApiControleUrl}/auth/sigin-google`, usuario);
    //let response =  this.http.get<SocialUser>(`${environment.ApiControleUrl}/socialauth/google-login`);
    return response;
  }

  sigInFacebook(usuario: SocialUser):  Observable<any>{
    let response =  this.http.post<any>(`${environment.ApiControleUrl}/auth/sigin-facebook`, usuario);
    return response;
  }
}
