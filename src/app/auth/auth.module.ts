import { MaterialModule } from './../utils/angular-material/material.module';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignFormComponent } from './sign-form/sign-form.component';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [
    AuthPageComponent, 
    LoginFormComponent, 
    SignFormComponent
  ],
  exports:[
    AuthPageComponent, 
    LoginFormComponent, 
    SignFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [
    AuthService,

  ]
})
export class AuthModule { }
