import { DexieService } from './utils/dexieService/dexieService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './shared/interceptor/token-interceptor.service';
import { EncryptionDescryptionService } from './utils/encryptionDescryptionService/encryptionDescryptionDervice';

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './utils/angular-material/material.module';
import { NavService } from './pages/layout/nav.service';
import { AuthGuard } from './shared/core/auth.guard';
import { LoadGuard } from './shared/core/load-guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      maxOpened: 2,
      autoDismiss: true,
      closeButton: true,
      enableHtml: true,
    }),
    SocialLoginModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    EncryptionDescryptionService,
    NavService,
    AuthGuard,
    LoadGuard,
    DexieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.idGoogle)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.idFacebook)
              }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
