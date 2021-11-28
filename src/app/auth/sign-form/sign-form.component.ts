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

  public ngOnInit(): void {
    this.formSign = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  public cadastrarUsuario(): void {

    if (this.formSign.valid) {
        this.usuario = Object.assign({}, this.usuario, this.formSign.value)
        this.sendSignForm.emit(this.usuario)
    }
  }

}
