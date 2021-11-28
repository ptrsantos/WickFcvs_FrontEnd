import { _filter } from './../../forms/auto-complete/states-group/states-group.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  perfil: string = "";
  nomeUsuario: string = ""

  constructor(private readonly router: Router,
              private authService: AuthService,
              public navService: NavService) {}

  ngOnInit() {
     //(this.authService.sessionStorageObterUsuario());
     debugger
    let usuario = this.authService.sessionStorageObterUsuario();
    this.nomeUsuario = usuario.userName;
    //(usuario)
    let claim = usuario.claims.find(item => item.type === "perfil")
    // (claim.value);
    this.perfil = claim.value;
  }

  onLoggedout() {
    this.authService.sessionStorageLimparDadosLocaisUsuario();
    this.router.navigate(['/wiki']).then();
  }

  navegarParaHome(){
    this.router.navigate(['/wiki/home']).then();
  }
}
