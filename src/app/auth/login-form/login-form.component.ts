import { AuthService } from './../auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/pages/dashboard/business/model/entities/usuario';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(){}


  @Output() sendLoginForm = new EventEmitter<Usuario>();
  @Output() google = new EventEmitter<any>();
  @Output() facebook = new EventEmitter<any>();

  public formLogin: FormGroup;
  usuario: Usuario;
  erros: Array<any> = new Array<any>();

  public ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
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

}
