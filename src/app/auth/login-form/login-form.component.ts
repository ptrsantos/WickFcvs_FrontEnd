import { AuthService } from './../auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/pages/dashboard/business/model/entities/usuario';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {



  @Output() sendLoginForm = new EventEmitter<Usuario>();
  @Output() google = new EventEmitter<any>();
  @Output() facebook = new EventEmitter<any>();

  emailPlaceHolder = ""
  senhaPlaceHolder = ""
  buttonDisabled = true;
  public formLogin: FormGroup;
  usuario: Usuario;
  erros: Array<any> = new Array<any>();

  constructor(){}

  public ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.emailPlaceHolder = "E-mail"
    this.senhaPlaceHolder = "Senha"
  }

  public registrarLogin(): void {
    if (this.formLogin.valid) {
      this.usuario = Object.assign({}, this.usuario, this.formLogin.value);
      this.sendLoginForm.emit(this.usuario)
    }
  }

  siginGoogle(){
    this.formLogin.controls.email.setValue("")
    this.formLogin.controls.password.setValue("")
    this.google.emit();
  }

  siginFacebook(){
    this.formLogin.controls.email.setValue("")
    this.formLogin.controls.password.setValue("")
    this.facebook.emit();
  }

  onBlurEmail(){
    if(this.formLogin.get('email').errors){
      if(this.formLogin.get('email').errors.required && this.formLogin.get('email').dirty || this.formLogin.get('email')?.errors.required && this.formLogin.get('email').touched ){
        this.emailPlaceHolder = "O e-mail é brigatório"
      }
      else
      if(this.formLogin.get('email')?.errors.email && this.formLogin.get('email').dirty || this.formLogin.get('email')?.errors.valid && this.formLogin.get('email').touched ){
        this.emailPlaceHolder  = "E-mail inválido"
      }
    }
    else{
      this.emailPlaceHolder  = "E-mail"
    }
    this.desbloquearBotao()
  }

  onBlurSenha(){
    if(this.formLogin.get('password').errors){
      if(this.formLogin.get('password').errors.required && this.formLogin.get('password').dirty || this.formLogin.get('password')?.errors.required && this.formLogin.get('password').touched ){
        this.senhaPlaceHolder = "A senha é obrigatória"
      }
    }
    else{
      this.senhaPlaceHolder  = "Senha"
    }
    this.desbloquearBotao()
  }

  desbloquearBotao(){
    this.buttonDisabled = !this.formLogin.valid
  }

}
