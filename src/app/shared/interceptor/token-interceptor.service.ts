import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../core/spinner/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private authService: AuthService;
  constructor(private injector: Injector, private router: Router, private spinnerService: SpinnerService) {
    // alert("interceptor acionado");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    this.spinnerService.requestStarted()
    this.authService = this.injector.get(AuthService)
    if (this.authService.sessionStorageObterTokenUsuario() && !req.headers.has('nao_incluir_token')){
      req = this.clonarHeaderInserindoToken(req);
    }

      return next.handle(req).pipe(

        retry(2),

        catchError(error => {

          if(error instanceof HttpErrorResponse){

            if(error.status === 401){
              this.authService.sessionStorageLimparDadosLocaisUsuario();
              this.spinnerService.requestEnded();
              this.router.navigate(['/usuario-sem-autenticacao'])
            }
            if(error.status === 403){
              this.spinnerService.requestEnded();
              this.router.navigate(['/acesso-negado'])
            }
            if(error.status === 404){
              this.spinnerService.requestEnded();
              this.router.navigate(['/page-not-found'])
            }

            return throwError(error)

          }

        }),

        finalize(
          () => {
            this.spinnerService.resetSpinner()
          }
        ),
        // finally(
        //   () => {
        //     this.spinnerService.hide()
        //   }
        // )

      );
  }

  private clonarHeaderInserindoToken(req: HttpRequest<any>) {
     const token = this.authService.sessionStorageObterTokenUsuario();
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
