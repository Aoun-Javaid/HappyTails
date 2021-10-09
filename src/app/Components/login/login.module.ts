import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';  
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularOtpLibModule } from 'angular-otp-box';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {MatIconModule} from '@angular/material/icon';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SocialLoginModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    ModalModule.forRoot(),  
    NgbModule,
    AngularOtpLibModule,
    MatIconModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1065377715397-bc9mao4l1ncifpp2uvefgv448fuaibv4.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('491747785409460'),
          },
       
        ],
      } as SocialAuthServiceConfig,
    }
  ],
})
export class LoginModule { }
