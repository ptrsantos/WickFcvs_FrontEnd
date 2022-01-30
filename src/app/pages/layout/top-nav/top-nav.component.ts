import { _filter } from './../../forms/auto-complete/states-group/states-group.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavService } from '../nav.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  perfil: string = "";
  nomeUsuario: string = ""
  nomeExibicao: string = "Seja bem vindo "
  iconeUsuario: string =""
  caminho: string;
  contador: number = 0;


  constructor(private readonly router: Router,
              private authService: AuthService,
              public navService: NavService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    console.log(++this.contador)
    let url = this.authService.sessionStorageRetornaUltimaUrl();
     //(this.authService.sessionStorageObterUsuario());
    let usuario = this.authService.sessionStorageObterUsuario();
    this.nomeUsuario = usuario.userName;
    this.retormaLogoUsuario()
    //(usuario)
    let claim = usuario.claims.find(item => item.type === "perfil")
    // (claim.value);
    this.perfil = claim.value;
    if(this.authService.sessionStorageRetornaUltimaUrl() == '/wiki'){
      this.retornaMensagem();
    }else{
      this.authService.sessionStorageSalvarUltimaUrl(this.router.url);
    }
  }

  onLoggedout() {
    this.authService.sessionStorageLimparDadosLocaisUsuario();
    this.router.navigate(['/wiki']).then();
  }

  navegarParaHome(){
    this.router.navigate(['/wiki/home']).then();
  }

  retormaLogoUsuario(){

    let vetorNome: string[] = this.nomeUsuario.split('-')
    if(vetorNome.length < 2){
      this.iconeUsuario = "account_circle"
      this.nomeExibicao = this.nomeUsuario;
    }
    else
    if(vetorNome[1] == 'Google'){
      this.nomeExibicao = vetorNome[0] + "(" + vetorNome[1] + ")";
      this.iconeUsuario = "g_translateg";
    }else
    if(vetorNome[1]== 'Facebook')
    {
      this.nomeExibicao = vetorNome[0] + "(" + vetorNome[1] + ")";
      this.iconeUsuario = "facebook";
    }
  }

  retornaMensagem(){
    this.authService.sessionStorageSalvarUltimaUrl(this.router.url);
    this.snackBar.open(`Seja bem vindo ${this.nomeExibicao}`, "", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['blue-snackbar']
    });
  }

}
