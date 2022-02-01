import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/pages/dashboard/business/model/entities/usuario';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent implements OnInit {

  @Output() sendSignForm = new EventEmitter<Usuario>();
  usuario: Usuario;
  public formSign: FormGroup;

  emailPlaceHolder = ""
  senhaPlaceHolder = ""
  confirmaSenhaPlaceHolder = ""
  buttonDisabled = true;

  public ngOnInit(): void {
    this.formSign = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    this.emailPlaceHolder = "E-mail"
    this.senhaPlaceHolder = "Senha"
    this.confirmaSenhaPlaceHolder = "Confirmar senha"
  }

  public cadastrarUsuario(): void {
    if (this.formSign.valid) {
        this.usuario = Object.assign({}, this.usuario, this.formSign.value)
        this.sendSignForm.emit(this.usuario)
    }
  }

  onBlurEmail(){
    if(this.formSign.get('email').errors){
      if(this.formSign.get('email').errors.required && this.formSign.get('email').dirty || this.formSign.get('email')?.errors.required && this.formSign.get('email').touched ){
        this.emailPlaceHolder = "O e-mail é brigatório"
      }
      else
      if(this.formSign.get('email')?.errors.email && this.formSign.get('email').dirty || this.formSign.get('email')?.errors.valid && this.formSign.get('email').touched ){
        this.emailPlaceHolder  = "E-mail inválido"
      }
    }
    else{
      this.emailPlaceHolder  = "E-mail"
    }
    this.desbloquearBotao()
  }

  onBlurSenha(){
    if(this.formSign.get('password').errors){
      if(this.formSign.get('password').errors.required && this.formSign.get('password').dirty || this.formSign.get('password')?.errors.required && this.formSign.get('password').touched ){
        this.senhaPlaceHolder = "Senha obrigatória"
      }
    }
    else{
      this.senhaPlaceHolder  = "Senha"
    }
    this.desbloquearBotao()
  }

  onBlurConfirmaSenha(){
    if(this.formSign.get('confirmPassword').errors){
      if(this.formSign.get('confirmPassword').errors.required && this.formSign.get('confirmPassword').dirty || this.formSign.get('confirmPassword')?.errors.required && this.formSign.get('confirmPassword').touched ){
        this.confirmaSenhaPlaceHolder = "Senha de confirmação obrigatória"
      }
    }
    else{
      this.confirmaSenhaPlaceHolder  = "Confirmar senha obrigatório"
    }
    this.desbloquearBotao()
  }

  desbloquearBotao(){
    this.buttonDisabled = !this.formSign.valid
  }

}
