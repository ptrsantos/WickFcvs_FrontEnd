import { DexieService } from './../../utils/dexieService/dexieService';
import {EncryptionDescryptionService}  from '../../utils/encryptionDescryptionService/encryptionDescryptionDervice';
import {AppComponent} from '../../app.component';
import { Component, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SessionStorageService } from 'src/app/utils/sessionStorage/import { Injectable } from \'@angular/sessionStorageService';
import { TemaDto } from 'src/app/pages/dashboard/business/model/dtos/temaDto';
import { Usuario } from 'src/app/pages/dashboard/business/model/entities/usuario';
import { ArtigoEdicaoDto } from 'src/app/pages/dashboard/business/model/dtos/artigoEdicaoDto';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  erros: any[] = new Array<any>();
  //listaTemasArtigos: TemaArtigoDto[] = [];
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private encrypt: EncryptionDescryptionService,
    @Inject(AppComponent) private appComponent: AppComponent,
    private socialAuthService: SocialAuthService,
    private dexieService: DexieService,
    private sessionStorageService: SessionStorageService
  ) { }

  public ngOnInit(): void {
    this.authService.sessionStorageSalvarUltimaUrl('/wiki')
    this.dexieService.db.delete().then(
      response => {
        this.socialAuthService.authState.subscribe((user) => {
          this.user = user;
          this.loggedIn = (user != null);
        });;
      })
      .catch(error => (error))
  }

  public sendLoginForm(usuario: Usuario): void {
    //this.dexieService.deletarDataBase()
    //this.dexieService.iniciarIndexedDb()
    this.spinnerService.show();
    this.authService.cadastrarLogin(usuario).subscribe(
      sucesso => { this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) }
    )
  }


  public sendSignForm(usuario: Usuario): void {
    // this.spinnerService.show();
    this.authService.cadastrarRegistro(usuario).subscribe(
      sucesso => { this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) }
    )

  }


  OnDestroy() {
    this.spinnerService.hide();
  }


  signInWithGoogle(): void {

    //this.dexieService.deletarDataBase()
    //this.dexieService.iniciarIndexedDb()
    this.spinnerService.show();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(response =>{
      let user = Object.assign({}, new SocialUser, response)
      this.enviarSigInGoogleParaBackEnd(user);
    });
  }

  enviarSigInGoogleParaBackEnd(user: SocialUser){
    this.authService.sigInGoogle(user).subscribe(
      sucesso => { this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) }
    )
  }


  signInWithFB(): void {
    this.spinnerService.show();
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(response => {
      let user = Object.assign({}, new SocialUser, response)
      this.enviarSigInFacebookParaBackEnd(user);
    });
  }


  enviarSigInFacebookParaBackEnd(user: SocialUser){
    this.authService.sigInFacebook(user).subscribe(
      sucesso => { this.processarSucesso(sucesso) },
      falha => { this.processarFalha(falha) }
    )
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  processarSucesso(response) {
    this.authService.sessionStorageSalvarDadosUsuario(response.data.loginResponsavel)
    this.erros = [];
    let toastr = this.toastrService.success("Operação realizado com sucesso.", "Parabéns: ")
    if (toastr) {
      toastr.onHidden.subscribe(async() => {
        let artigoEdicaoHome: ArtigoEdicaoDto = Object.assign({}, new ArtigoEdicaoDto(), response.data.artigoEdicao)
        //let listaTemas: Tema[] = response.data.temas.map(item =>  Object.assign({}, new Tema(), item));
        let listaTemasDto: TemaDto[] = response.data.temas.map(item =>  Object.assign({}, new TemaDto(), item));

        //let artigoEdicaoJson = JSON.stringify(artigoEdicao);
        //this.encrypt.SalvarArtigoEdicaoEncriptado(artigoEdicaoJson);
        //await this.dexieService.salvarArtigoEdicao(artigoEdicaoHome)
        //await this.dexieService.salvarArtigoEdicao(artiogoGenerico)

        if(artigoEdicaoHome.edicaoConteudo !== undefined){
          this.sessionStorageService.sessionStorageSalvarArtigoEdicaoHome(artigoEdicaoHome)
        }
        if(listaTemasDto.length > 0){
          await this.dexieService.salvarTemasDto(listaTemasDto);
        }
        this.router.navigate(['/wiki/home']).then();
       })
    }
  }


  processarFalha(fails: any) {
      this.erros = fails.error.errors;
      this.toastrService.error(
        (this.erros != undefined && this.erros != null && this.erros?.length > 0 ) ? this.erros.toString() : "Erro desconhecido", "Ocorreu um erro:")
  }

}
